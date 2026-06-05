const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { Readable } = require('stream');
const { execFile } = require('child_process');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Prevent silent crashes — log everything
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

// Conversion Libraries
const sharp = require('sharp');
const { PDFParse } = require('pdf-parse');
const mammoth = require('mammoth');
const puppeteer = require('puppeteer');
const { Document, Packer, Paragraph, TextRun, ImageRun } = require('docx');
const {
    ServicePrincipalCredentials,
    PDFServices,
    MimeType,
    ExportPDFJob,
    ExportPDFParams,
    ExportPDFTargetFormat,
    ExportPDFResult,
} = require('@adobe/pdfservices-node-sdk');

const getBrowserExecutablePath = () => {
    const candidates = [
        process.env.PUPPETEER_EXECUTABLE_PATH,
        process.env.CHROME_PATH,
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
    ].filter(Boolean);

    return candidates.find((candidate) => fs.existsSync(candidate));
};

// Puppeteer launch options for Linux production
const PUPPETEER_ARGS = {
    headless: 'new',
    executablePath: getBrowserExecutablePath(),
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-software-rasterizer',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
    ],
};

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure directories exist
const uploadDir = path.join(os.tmpdir(), 'movifile-uploads');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const parsePositiveInteger = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const getImageContentType = (format) => ({
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
})[format] || 'image/png';

const getImageOutputExtension = (format) => (format === 'jpeg' ? 'jpg' : format);

const getLibreOfficeExecutablePath = () => {
    const candidates = [
        process.env.LIBREOFFICE_PATH,
        process.env.SOFFICE_PATH,
        'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
        'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
        '/usr/bin/libreoffice',
        '/usr/bin/soffice',
        '/snap/bin/libreoffice',
    ].filter(Boolean);

    return candidates.find((candidate) => fs.existsSync(candidate));
};

const getPdfToImageExecutablePath = () => {
    const candidates = [
        process.env.PDFTOPPM_PATH,
        'C:\\Program Files\\poppler\\Library\\bin\\pdftoppm.exe',
        'C:\\Program Files\\poppler\\bin\\pdftoppm.exe',
        '/usr/bin/pdftoppm',
        '/usr/local/bin/pdftoppm',
    ].filter(Boolean);

    return candidates.find((candidate) => fs.existsSync(candidate));
};

const execFileAsync = (file, args, options = {}) => new Promise((resolve, reject) => {
    execFile(file, args, { timeout: 120000, ...options }, (error, stdout, stderr) => {
        if (error) {
            error.stdout = stdout;
            error.stderr = stderr;
            reject(error);
            return;
        }
        resolve({ stdout, stderr });
    });
});

const OFFICE_FILTERS = {
    docx: 'docx:"Office Open XML Text"',
    pdf: 'pdf:writer_pdf_Export',
};

const getAdobeCredentials = () => ({
    clientId: process.env.PDF_SERVICES_CLIENT_ID || process.env.ADOBE_PDF_CLIENT_ID || process.env.ADOBE_CLIENT_ID,
    clientSecret: process.env.PDF_SERVICES_CLIENT_SECRET || process.env.ADOBE_PDF_CLIENT_SECRET || process.env.ADOBE_CLIENT_SECRET,
});

const isAdobePdfServicesConfigured = () => {
    const credentials = getAdobeCredentials();
    return Boolean(credentials.clientId && credentials.clientSecret);
};

const streamToBuffer = (readStream) => new Promise((resolve, reject) => {
    const chunks = [];

    readStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    readStream.on('error', reject);
    readStream.on('end', () => resolve(Buffer.concat(chunks)));
});

const findConvertedFile = async (directory, basename, outputExtension) => {
    const files = await fs.promises.readdir(directory);
    const wantedExtension = `.${outputExtension.toLowerCase()}`;

    return files.find((file) => {
        const parsed = path.parse(file);
        return parsed.name === basename && parsed.ext.toLowerCase() === wantedExtension;
    });
};

const convertWithLibreOffice = async (inputBuffer, inputExtension, outputExtension, options = {}) => {
    const { required = false } = options;
    const sofficePath = getLibreOfficeExecutablePath();
    if (!sofficePath) {
        if (required) {
            throw new Error('LibreOffice is required to preserve formatting for this conversion, but it is not installed on the server.');
        }
        return null;
    }

    const jobId = uuidv4();
    const jobDir = path.join(uploadDir, jobId);
    await fs.promises.mkdir(jobDir, { recursive: true });

    const normalizedInputExtension = inputExtension.startsWith('.') ? inputExtension : `.${inputExtension}`;
    const inputPathForOffice = path.join(jobDir, `source${normalizedInputExtension}`);
    const userProfileDir = path.join(jobDir, 'lo-profile');

    try {
        await fs.promises.writeFile(inputPathForOffice, inputBuffer);
        await fs.promises.mkdir(userProfileDir, { recursive: true });

        const userInstallation = `-env:UserInstallation=file:///${userProfileDir.replace(/\\/g, '/')}`;
        const convertTarget = OFFICE_FILTERS[outputExtension] || outputExtension;

        await execFileAsync(sofficePath, [
            '--headless',
            '--nologo',
            '--nodefault',
            '--nofirststartwizard',
            '--nolockcheck',
            userInstallation,
            '--convert-to',
            convertTarget,
            '--outdir',
            jobDir,
            inputPathForOffice,
        ]);

        const convertedFile = await findConvertedFile(jobDir, 'source', outputExtension);
        if (!convertedFile) {
            throw new Error(`LibreOffice did not produce a ${outputExtension} file.`);
        }

        return await fs.promises.readFile(path.join(jobDir, convertedFile));
    } finally {
        fs.promises.rm(jobDir, { recursive: true, force: true }).catch((err) => {
            console.error(`Error deleting LibreOffice temp directory ${jobDir}:`, err.message);
        });
    }
};

const convertPdfToWordWithAdobe = async (inputBuffer) => {
    const { clientId, clientSecret } = getAdobeCredentials();

    if (!clientId || !clientSecret) {
        return null;
    }

    const credentials = new ServicePrincipalCredentials({
        clientId,
        clientSecret,
    });
    const pdfServices = new PDFServices({ credentials });
    const readStream = Readable.from([inputBuffer]);

    try {
        const inputAsset = await pdfServices.upload({
            readStream,
            mimeType: MimeType.PDF,
        });
        const params = new ExportPDFParams({
            targetFormat: ExportPDFTargetFormat.DOCX,
        });
        const job = new ExportPDFJob({ inputAsset, params });
        const pollingURL = await pdfServices.submit({ job });
        const pdfServicesResponse = await pdfServices.getJobResult({
            pollingURL,
            resultType: ExportPDFResult,
        });
        const resultAsset = pdfServicesResponse.result.asset;
        const streamAsset = await pdfServices.getContent({ asset: resultAsset });

        return await streamToBuffer(streamAsset.readStream);
    } finally {
        readStream.destroy();
    }
};

const convertPdfToVisualWord = async (inputBuffer, options = {}) => {
    const { required = false } = options;
    const pdftoppmPath = getPdfToImageExecutablePath();
    if (!pdftoppmPath) {
        if (required) {
            throw new Error('PDF visual renderer is not installed on the server. Install poppler-utils so PDF to Word can preserve the original format.');
        }
        return null;
    }

    const jobId = uuidv4();
    const jobDir = path.join(uploadDir, jobId);
    const inputPathForPdf = path.join(jobDir, 'source.pdf');
    const outputPrefix = path.join(jobDir, 'page');

    try {
        await fs.promises.mkdir(jobDir, { recursive: true });
        await fs.promises.writeFile(inputPathForPdf, inputBuffer);

        await execFileAsync(pdftoppmPath, [
            '-png',
            '-r',
            '180',
            inputPathForPdf,
            outputPrefix,
        ]);

        const imageFiles = (await fs.promises.readdir(jobDir))
            .filter((file) => /^page-\d+\.png$/i.test(file))
            .sort((a, b) => {
                const pageA = Number(a.match(/\d+/)[0]);
                const pageB = Number(b.match(/\d+/)[0]);
                return pageA - pageB;
            });

        if (imageFiles.length === 0) {
            throw new Error('PDF page renderer did not produce any images.');
        }

        const children = [];
        for (const file of imageFiles) {
            const imagePath = path.join(jobDir, file);
            const imageBuffer = await fs.promises.readFile(imagePath);
            const metadata = await sharp(imageBuffer).metadata();
            const pageWidthTwips = 11906;
            const pageHeightTwips = Math.round(pageWidthTwips * ((metadata.height || 1123) / (metadata.width || 794)));
            const width = 794;
            const height = Math.round(width * ((metadata.height || 1123) / (metadata.width || 794)));

            children.push({
                properties: {
                    page: {
                        size: {
                            width: pageWidthTwips,
                            height: pageHeightTwips,
                        },
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                        },
                    },
                },
                children: [
                    new Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                            new ImageRun({
                                data: imageBuffer,
                                type: 'png',
                                transformation: { width, height },
                            }),
                        ],
                    }),
                ],
            });
        }

        const doc = new Document({
            sections: children,
        });

        return await Packer.toBuffer(doc);
    } finally {
        fs.promises.rm(jobDir, { recursive: true, force: true }).catch((err) => {
            console.error(`Error deleting PDF visual Word temp directory ${jobDir}:`, err.message);
        });
    }
};

const convertPdfToBasicWord = async (inputBuffer) => {
    const parser = new PDFParse({ data: inputBuffer });

    try {
        const result = await parser.getText();
        const paragraphs = result.text
            .split(/\n{2,}/)
            .map(block => block.replace(/\n/g, ' ').trim())
            .filter(Boolean)
            .map(block => new Paragraph({
                spacing: { after: 160 },
                children: [new TextRun(block)],
            }));

        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs.length > 0 ? paragraphs : [
                    new Paragraph({
                        children: [new TextRun('No selectable text was found in this PDF.')],
                    }),
                ],
            }],
        });

        return await Packer.toBuffer(doc);
    } finally {
        await parser.destroy();
    }
};

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Utility to cleanup files
const cleanup = async (files) => {
    // Small delay to ensure all file handles are released (especially on Windows)
    setTimeout(async () => {
        for (const file of files) {
            if (file && fs.existsSync(file)) {
                try {
                    await fs.promises.unlink(file);
                } catch (err) {
                    console.error(`Error deleting file ${file}:`, err.message);
                }
            }
        }
    }, 1000);
};

// --- Conversion Routes ---

app.post('/api/convert', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { type } = req.body;
    const inputBuffer = req.file.buffer;
    const inputExt = path.extname(req.file.originalname || '');
    let inputPath = '';
    let outputBuffer;
    let contentType = 'application/octet-stream';
    let responseFilename = '';

    try {
        switch (type) {
            // Image to Image Conversions
            case 'jpg-to-png':
                outputBuffer = await sharp(inputBuffer).png().toBuffer();
                responseFilename = 'converted.png';
                contentType = 'image/png';
                break;

            case 'png-to-jpg':
                outputBuffer = await sharp(inputBuffer).jpeg({ quality: 90 }).toBuffer();
                responseFilename = 'converted.jpg';
                contentType = 'image/jpeg';
                break;

            case 'jpg-to-webp':
                outputBuffer = await sharp(inputBuffer).webp({ quality: 90 }).toBuffer();
                responseFilename = 'converted.webp';
                contentType = 'image/webp';
                break;

            case 'png-to-webp':
                outputBuffer = await sharp(inputBuffer).webp({ quality: 90 }).toBuffer();
                responseFilename = 'converted.webp';
                contentType = 'image/webp';
                break;

            case 'jpg-to-gif':
                outputBuffer = await sharp(inputBuffer).gif().toBuffer();
                responseFilename = 'converted.gif';
                contentType = 'image/gif';
                break;

            case 'png-to-gif':
                outputBuffer = await sharp(inputBuffer).gif().toBuffer();
                responseFilename = 'converted.gif';
                contentType = 'image/gif';
                break;

            case 'gif-to-jpg':
                outputBuffer = await sharp(inputBuffer).jpeg({ quality: 90 }).toBuffer();
                responseFilename = 'converted.jpg';
                contentType = 'image/jpeg';
                break;

            case 'gif-to-png':
                outputBuffer = await sharp(inputBuffer).png().toBuffer();
                responseFilename = 'converted.png';
                contentType = 'image/png';
                break;

            case 'webp-to-jpg':
                outputBuffer = await sharp(inputBuffer).jpeg({ quality: 90 }).toBuffer();
                responseFilename = 'converted.jpg';
                contentType = 'image/jpeg';
                break;

            case 'webp-to-png':
                outputBuffer = await sharp(inputBuffer).png().toBuffer();
                responseFilename = 'converted.png';
                contentType = 'image/png';
                break;

            case 'image-resize': {
                const width = parsePositiveInteger(req.body.width);
                const height = parsePositiveInteger(req.body.height);
                const fit = ['inside', 'cover', 'contain', 'fill'].includes(req.body.fit) ? req.body.fit : 'inside';
                const format = ['jpg', 'jpeg', 'png', 'webp'].includes(req.body.format) ? req.body.format : 'png';

                if (!width && !height) {
                    throw new Error('Please enter a width, height, or both to resize the image.');
                }

                let pipeline = sharp(inputBuffer)
                    .rotate()
                    .resize({
                        width: width || undefined,
                        height: height || undefined,
                        fit,
                        withoutEnlargement: req.body.allowEnlarge !== 'true',
                        background: { r: 255, g: 255, b: 255, alpha: 1 },
                    });

                switch (format) {
                    case 'jpg':
                    case 'jpeg':
                        pipeline = pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: 92, mozjpeg: true });
                        break;
                    case 'webp':
                        pipeline = pipeline.webp({ quality: 92 });
                        break;
                    case 'png':
                    default:
                        pipeline = pipeline.png({ compressionLevel: 9 });
                        break;
                }

                outputBuffer = await pipeline.toBuffer();
                responseFilename = `resized.${getImageOutputExtension(format)}`;
                contentType = getImageContentType(format);
                break;
            }

            // PDF Conversions
            case 'pdf-to-text': {
                const parser = new PDFParse({ data: inputBuffer });
                const result = await parser.getText();
                outputBuffer = Buffer.from(result.text, 'utf8');
                await parser.destroy();
                responseFilename = 'converted.txt';
                contentType = 'text/plain; charset=utf-8';
                break;
            }

            case 'pdf-to-word': {
                outputBuffer = await convertPdfToVisualWord(inputBuffer, { required: true });
                responseFilename = 'converted.docx';
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                break;
            }

            case 'pdf-to-jpg': {
                let browserPdfJpg;
                try {
                    inputPath = path.join(uploadDir, `${uuidv4()}${inputExt || '.pdf'}`);
                    fs.writeFileSync(inputPath, inputBuffer);
                    browserPdfJpg = await puppeteer.launch(PUPPETEER_ARGS);
                    const pagePdfJpg = await browserPdfJpg.newPage();
                    await pagePdfJpg.goto(`file://${inputPath}`, { waitUntil: 'networkidle2', timeout: 30000 });
                    outputBuffer = await pagePdfJpg.screenshot({ type: 'jpeg' });
                } finally {
                    if (browserPdfJpg) await browserPdfJpg.close();
                }
                responseFilename = 'converted.jpg';
                contentType = 'image/jpeg';
                break;
            }

            case 'pdf-to-png': {
                let browserPdfPng;
                try {
                    inputPath = path.join(uploadDir, `${uuidv4()}${inputExt || '.pdf'}`);
                    fs.writeFileSync(inputPath, inputBuffer);
                    browserPdfPng = await puppeteer.launch(PUPPETEER_ARGS);
                    const pagePdfPng = await browserPdfPng.newPage();
                    await pagePdfPng.goto(`file://${inputPath}`, { waitUntil: 'networkidle2', timeout: 30000 });
                    outputBuffer = await pagePdfPng.screenshot({ type: 'png' });
                } finally {
                    if (browserPdfPng) await browserPdfPng.close();
                }
                responseFilename = 'converted.png';
                contentType = 'image/png';
                break;
            }

            // Word Conversions
            case 'word-to-pdf': {
                outputBuffer = await convertWithLibreOffice(inputBuffer, inputExt || '.docx', 'pdf', { required: true });
                responseFilename = 'converted.pdf';
                contentType = 'application/pdf';
                break;
            }

            case 'word-to-text':
                const wordResult = await mammoth.extractRawText({ buffer: inputBuffer });
                outputBuffer = Buffer.from(wordResult.value, 'utf8');
                responseFilename = 'converted.txt';
                contentType = 'text/plain; charset=utf-8';
                break;

            case 'word-to-html':
                const htmlResult = await mammoth.convertToHtml({ buffer: inputBuffer });
                outputBuffer = Buffer.from(htmlResult.value, 'utf8');
                responseFilename = 'converted.html';
                contentType = 'text/html; charset=utf-8';
                break;

            default:
                throw new Error('Unsupported conversion type.');
        }

        cleanup([inputPath]);
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${responseFilename}"`);
        res.send(outputBuffer);

    } catch (error) {
        console.error('Conversion error:', error);
        cleanup([inputPath]);
        res.status(500).json({ error: error.message || 'Conversion failed.' });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime(), memory: process.memoryUsage() });
});

// Also handle /api/health for Nginx proxy setups
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy', uptime: process.uptime(), memory: process.memoryUsage() });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`NODE_ENV=${process.env.NODE_ENV}`);
    console.log(`Process PID: ${process.pid}`);
    console.log(`LibreOffice path: ${getLibreOfficeExecutablePath() || 'not found'}`);
    console.log(`PDF page renderer path: ${getPdfToImageExecutablePath() || 'not found'}`);
    console.log(`Adobe PDF Services: ${isAdobePdfServicesConfigured() ? 'configured' : 'not configured'}`);
});
