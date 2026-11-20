import { del, head } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url) return NextResponse.json({ ok: true });
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || !parsed.hostname.endsWith(".blob.vercel-storage.com")) {
      return NextResponse.json({ error: "Invalid file URL." }, { status: 400 });
    }
    const metadata = await head(url);
    if (!metadata.pathname.startsWith("outputs/")) {
      return NextResponse.json({ error: "Invalid output file." }, { status: 400 });
    }
    await del(url);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
