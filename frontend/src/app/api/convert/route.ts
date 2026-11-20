import { del, head, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { convertFile, type ConversionRequest } from "@/lib/convert-file";

export const runtime = "nodejs";
export const maxDuration = 300;

type RequestBody = ConversionRequest & { sourceUrl?: string };

function isBlobUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let sourceUrl = "";
  try {
    const body = (await request.json()) as RequestBody;
    sourceUrl = body.sourceUrl || "";
    if (!sourceUrl || !isBlobUrl(sourceUrl)) {
      return NextResponse.json({ error: "Invalid uploaded file URL." }, { status: 400 });
    }

    const metadata = await head(sourceUrl);
    if (!metadata.pathname.startsWith("inputs/") || metadata.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: "Invalid uploaded file." }, { status: 400 });
    }

    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok) throw new Error("Could not read the uploaded file.");
    const input = Buffer.from(await sourceResponse.arrayBuffer());
    const output = await convertFile(input, body);
    const result = await put(`outputs/${crypto.randomUUID()}-${output.filename}`, output.buffer, {
      access: "public",
      contentType: output.contentType,
      addRandomSuffix: false,
      cacheControlMaxAge: 60,
    });

    return NextResponse.json({ downloadUrl: result.downloadUrl, blobUrl: result.url, filename: output.filename });
  } catch (error) {
    console.error("Conversion failed", error);
    const message = error instanceof Error ? error.message : "Conversion failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    if (sourceUrl && isBlobUrl(sourceUrl)) {
      await del(sourceUrl).catch((error) => console.error("Source cleanup failed", error));
    }
  }
}
