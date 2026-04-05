const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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
const { Document, Packer, Paragraph, TextRun } = require('docx');

// Puppeteer launch options for Linux production
const PUPPETEER_ARGS = {
    headless: 'new',
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
const uploadDir = path.join(__dirname, '../uploads');
const outputDir = path.join(__dirname, '../outputs');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + uuidv4();
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
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
    const inputPath = req.file.path;
    const outputFilename = `${uuidv4()}`;
    let outputPath = '';
    let responseFilename = '';

    try {
        switch (type) {
            // Image to Image Conversions
            case 'jpg-to-png':
                outputPath = path.join(outputDir, `${outputFilename}.png`);
                await sharp(inputPath).png().toFile(outputPath);
                responseFilename = 'converted.png';
                break;

            case 'png-to-jpg':
                outputPath = path.join(outputDir, `${outputFilename}.jpg`);
                await sharp(inputPath).jpeg({ quality: 90 }).toFile(outputPath);
                responseFilename = 'converted.jpg';
                break;

            case 'jpg-to-webp':
                outputPath = path.join(outputDir, `${outputFilename}.webp`);
                await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
                responseFilename = 'converted.webp';
                break;

            case 'png-to-webp':
                outputPath = path.join(outputDir, `${outputFilename}.webp`);
                await sharp(inputPath).webp({ quality: 90 }).toFile(outputPath);
                responseFilename = 'converted.webp';
                break;

            case 'jpg-to-gif':
                outputPath = path.join(outputDir, `${outputFilename}.gif`);
                await sharp(inputPath).gif().toFile(outputPath);
                responseFilename = 'converted.gif';
                break;

            case 'png-to-gif':
                outputPath = path.join(outputDir, `${outputFilename}.gif`);
                await sharp(inputPath).gif().toFile(outputPath);
                responseFilename = 'converted.gif';
                break;

            case 'gif-to-jpg':
                outputPath = path.join(outputDir, `${outputFilename}.jpg`);
                await sharp(inputPath).jpeg({ quality: 90 }).toFile(outputPath);
                responseFilename = 'converted.jpg';
                break;

            case 'gif-to-png':
                outputPath = path.join(outputDir, `${outputFilename}.png`);
                await sharp(inputPath).png().toFile(outputPath);
                responseFilename = 'converted.png';
                break;

            case 'webp-to-jpg':
                outputPath = path.join(outputDir, `${outputFilename}.jpg`);
                await sharp(inputPath).jpeg({ quality: 90 }).toFile(outputPath);
                responseFilename = 'converted.jpg';
                break;

            case 'webp-to-png':
                outputPath = path.join(outputDir, `${outputFilename}.png`);
                await sharp(inputPath).png().toFile(outputPath);
                responseFilename = 'converted.png';
                break;

            // PDF Conversions
            case 'pdf-to-text': {
                const dataBuffer = fs.readFileSync(inputPath);
                const parser = new PDFParse({ data: dataBuffer });
                const result = await parser.getText();
                outputPath = path.join(outputDir, `${outputFilename}.txt`);
                fs.writeFileSync(outputPath, result.text);
                await parser.destroy();
                responseFilename = 'converted.txt';
                break;
            }

            case 'pdf-to-word': {
                const dataBuffer = fs.readFileSync(inputPath);
                const parser = new PDFParse({ data: dataBuffer });
                const result = await parser.getText();
                
                // Create a real .docx file using docx library
                const doc = new Document({
                    sections: [{
                        properties: {},
                        children: result.text.split('\n').map(line => 
                            new Paragraph({
                                children: [new TextRun(line)],
                            })
                        ),
                    }],
                });

                outputPath = path.join(outputDir, `${outputFilename}.docx`);
                const docBuffer = await Packer.toBuffer(doc);
                fs.writeFileSync(outputPath, docBuffer);
                await parser.destroy();
                responseFilename = 'converted.docx';
                break;
            }

            case 'pdf-to-jpg': {
                let browserPdfJpg;
                try {
                    browserPdfJpg = await puppeteer.launch(PUPPETEER_ARGS);
                    const pagePdfJpg = await browserPdfJpg.newPage();
                    await pagePdfJpg.goto(`file://${inputPath}`, { waitUntil: 'networkidle2', timeout: 30000 });
                    outputPath = path.join(outputDir, `${outputFilename}.jpg`);
                    await pagePdfJpg.screenshot({ path: outputPath, type: 'jpeg' });
                } finally {
                    if (browserPdfJpg) await browserPdfJpg.close();
                }
                responseFilename = 'converted.jpg';
                break;
            }

            case 'pdf-to-png': {
                let browserPdfPng;
                try {
                    browserPdfPng = await puppeteer.launch(PUPPETEER_ARGS);
                    const pagePdfPng = await browserPdfPng.newPage();
                    await pagePdfPng.goto(`file://${inputPath}`, { waitUntil: 'networkidle2', timeout: 30000 });
                    outputPath = path.join(outputDir, `${outputFilename}.png`);
                    await pagePdfPng.screenshot({ path: outputPath, type: 'png' });
                } finally {
                    if (browserPdfPng) await browserPdfPng.close();
                }
                responseFilename = 'converted.png';
                break;
            }

            // Word Conversions
            case 'word-to-pdf': {
                const result = await mammoth.convertToHtml({ path: inputPath });
                let browserWordPdf;
                try {
                    browserWordPdf = await puppeteer.launch(PUPPETEER_ARGS);
                    const page = await browserWordPdf.newPage();
                    await page.setContent(result.value, { waitUntil: 'networkidle0', timeout: 30000 });
                    outputPath = path.join(outputDir, `${outputFilename}.pdf`);
                    await page.pdf({ path: outputPath, format: 'A4' });
                } finally {
                    if (browserWordPdf) await browserWordPdf.close();
                }
                responseFilename = 'converted.pdf';
                break;
            }

            case 'word-to-text':
                const wordResult = await mammoth.extractRawText({ path: inputPath });
                outputPath = path.join(outputDir, `${outputFilename}.txt`);
                fs.writeFileSync(outputPath, wordResult.value);
                responseFilename = 'converted.txt';
                break;

            case 'word-to-html':
                const htmlResult = await mammoth.convertToHtml({ path: inputPath });
                outputPath = path.join(outputDir, `${outputFilename}.html`);
                fs.writeFileSync(outputPath, htmlResult.value);
                responseFilename = 'converted.html';
                break;

            default:
                throw new Error('Unsupported conversion type.');
        }

        // Send file and then cleanup
        res.download(outputPath, responseFilename, (err) => {
            if (err) {
                console.error('Download error:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Failed to download file.' });
                }
            }
            // Cleanup input and output files
            cleanup([inputPath, outputPath]);
        });

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
});
