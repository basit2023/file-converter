import {
  CreatePDFJob,
  CreatePDFResult,
  ExportPDFJob,
  ExportPDFParams,
  ExportPDFResult,
  ExportPDFTargetFormat,
  MimeType,
  PDFServices,
  ServicePrincipalCredentials,
} from "@adobe/pdfservices-node-sdk";
import { Document, Packer, Paragraph } from "docx";
import mammoth from "mammoth";
import sharp from "sharp";
import { Readable } from "node:stream";

export type ConversionRequest = {
  type: string;
  width?: string;
  height?: string;
  fit?: string;
  format?: string;
  allowEnlarge?: boolean;
  sourceName?: string;
};

export type ConversionResult = {
  buffer: Buffer;
  filename: string;
  contentType: string;
};

const IMAGE_TYPES: Record<string, { format: "jpeg" | "png" | "webp" | "gif"; extension: string; contentType: string }> = {
  "jpg-to-png": { format: "png", extension: "png", contentType: "image/png" },
  "jpg-to-webp": { format: "webp", extension: "webp", contentType: "image/webp" },
  "jpg-to-gif": { format: "gif", extension: "gif", contentType: "image/gif" },
  "png-to-jpg": { format: "jpeg", extension: "jpg", contentType: "image/jpeg" },
  "png-to-webp": { format: "webp", extension: "webp", contentType: "image/webp" },
  "png-to-gif": { format: "gif", extension: "gif", contentType: "image/gif" },
  "gif-to-jpg": { format: "jpeg", extension: "jpg", contentType: "image/jpeg" },
  "gif-to-png": { format: "png", extension: "png", contentType: "image/png" },
  "webp-to-jpg": { format: "jpeg", extension: "jpg", contentType: "image/jpeg" },
  "webp-to-png": { format: "png", extension: "png", contentType: "image/png" },
};

function positiveInteger(value?: string) {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

async function createPdfParser(input: Buffer) {
  // pdf.js expects these browser geometry primitives at module initialization.
  // @napi-rs/canvas supplies their native Node implementations on Vercel.
  const canvas = await import("@napi-rs/canvas");
  Object.assign(globalThis, {
    DOMMatrix: canvas.DOMMatrix,
    ImageData: canvas.ImageData,
    Path2D: canvas.Path2D,
  });
  const { PDFParse } = await import("pdf-parse");
  return new PDFParse({ data: input });
}

function adobeServices() {
  const clientId = process.env.PDF_SERVICES_CLIENT_ID;
  const clientSecret = process.env.PDF_SERVICES_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Document conversion is not configured yet. Add the Adobe PDF Services credentials in Vercel.");
  }

  const credentials = new ServicePrincipalCredentials({ clientId, clientSecret });
  return new PDFServices({ credentials });
}

async function streamToBuffer(stream: NodeJS.ReadableStream) {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  return Buffer.concat(chunks);
}

async function wordToPdf(input: Buffer, sourceName = "source.docx") {
  const pdfServices = adobeServices();
  const mimeType = sourceName.toLowerCase().endsWith(".doc") ? MimeType.DOC : MimeType.DOCX;
  const inputAsset = await pdfServices.upload({ readStream: Readable.from(input), mimeType });
  const pollingURL = await pdfServices.submit({ job: new CreatePDFJob({ inputAsset }) });
  const response = await pdfServices.getJobResult({ pollingURL, resultType: CreatePDFResult });
  if (!response.result) throw new Error("Adobe PDF Services did not return a converted PDF.");
  return streamToBuffer((await pdfServices.getContent({ asset: response.result.asset })).readStream);
}

async function pdfToWord(input: Buffer) {
  try {
    const pdfServices = adobeServices();
    const inputAsset = await pdfServices.upload({ readStream: Readable.from(input), mimeType: MimeType.PDF });
    const params = new ExportPDFParams({ targetFormat: ExportPDFTargetFormat.DOCX });
    const pollingURL = await pdfServices.submit({ job: new ExportPDFJob({ inputAsset, params }) });
    const response = await pdfServices.getJobResult({ pollingURL, resultType: ExportPDFResult });
    if (!response.result) throw new Error("Adobe PDF Services did not return a Word document.");
    return streamToBuffer((await pdfServices.getContent({ asset: response.result.asset })).readStream);
  } catch (error) {
    if (process.env.PDF_SERVICES_CLIENT_ID && process.env.PDF_SERVICES_CLIENT_SECRET) throw error;
    const parser = await createPdfParser(input);
    try {
      const result = await parser.getText();
      const document = new Document({ sections: [{ children: result.text.split(/\r?\n/).map((text) => new Paragraph(text)) }] });
      return Buffer.from(await Packer.toBuffer(document));
    } finally {
      await parser.destroy();
    }
  }
}

async function pdfToImage(input: Buffer, format: "jpeg" | "png") {
  const parser = await createPdfParser(input);
  try {
    const result = await parser.getScreenshot({ first: 1, desiredWidth: 1600, imageBuffer: true, imageDataUrl: false });
    if (!result.pages[0]?.data) throw new Error("The PDF has no renderable pages.");
    const pipeline = sharp(Buffer.from(result.pages[0].data));
    return format === "jpeg" ? pipeline.jpeg({ quality: 92 }).toBuffer() : pipeline.png().toBuffer();
  } finally {
    await parser.destroy();
  }
}

export async function convertFile(input: Buffer, options: ConversionRequest): Promise<ConversionResult> {
  const imageOutput = IMAGE_TYPES[options.type];
  if (imageOutput) {
    const pipeline = sharp(input).rotate();
    const buffer = imageOutput.format === "jpeg"
      ? await pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: 90 }).toBuffer()
      : await pipeline.toFormat(imageOutput.format, { quality: 90 }).toBuffer();
    return { buffer, filename: `converted.${imageOutput.extension}`, contentType: imageOutput.contentType };
  }

  if (options.type === "image-resize") {
    const width = positiveInteger(options.width);
    const height = positiveInteger(options.height);
    if (!width && !height) throw new Error("Please enter a width, height, or both.");
    const fit = (["inside", "cover", "contain", "fill"].includes(options.fit || "") ? options.fit : "inside") as "inside" | "cover" | "contain" | "fill";
    const format = ["jpg", "jpeg", "png", "webp"].includes(options.format || "") ? options.format! : "png";
    let pipeline = sharp(input).rotate().resize({
      width,
      height,
      fit,
      withoutEnlargement: !options.allowEnlarge,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    });
    if (format === "jpg" || format === "jpeg") pipeline = pipeline.flatten({ background: "#ffffff" }).jpeg({ quality: 92 });
    else if (format === "webp") pipeline = pipeline.webp({ quality: 92 });
    else pipeline = pipeline.png({ compressionLevel: 9 });
    const extension = format === "jpeg" ? "jpg" : format;
    return { buffer: await pipeline.toBuffer(), filename: `resized.${extension}`, contentType: extension === "jpg" ? "image/jpeg" : `image/${extension}` };
  }

  if (options.type === "pdf-to-text") {
    const parser = await createPdfParser(input);
    try {
      const result = await parser.getText();
      return { buffer: Buffer.from(result.text), filename: "converted.txt", contentType: "text/plain; charset=utf-8" };
    } finally {
      await parser.destroy();
    }
  }

  if (options.type === "pdf-to-word") {
    return { buffer: await pdfToWord(input), filename: "converted.docx", contentType: MimeType.DOCX };
  }
  if (options.type === "pdf-to-jpg" || options.type === "pdf-to-png") {
    const format = options.type.endsWith("jpg") ? "jpeg" : "png";
    return { buffer: await pdfToImage(input, format), filename: `converted.${format === "jpeg" ? "jpg" : "png"}`, contentType: `image/${format}` };
  }
  if (options.type === "word-to-pdf") {
    return { buffer: await wordToPdf(input, options.sourceName), filename: "converted.pdf", contentType: MimeType.PDF };
  }
  if (options.type === "word-to-text") {
    const result = await mammoth.extractRawText({ buffer: input });
    return { buffer: Buffer.from(result.value), filename: "converted.txt", contentType: "text/plain; charset=utf-8" };
  }
  if (options.type === "word-to-html") {
    const result = await mammoth.convertToHtml({ buffer: input });
    return { buffer: Buffer.from(result.value), filename: "converted.html", contentType: "text/html; charset=utf-8" };
  }

  throw new Error("Unsupported conversion type.");
}
