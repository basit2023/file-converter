const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
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
                outputBuffer = await convertWithLibreOffice(inputBuffer, inputExt || '.pdf', 'docx', { required: true });
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
});
