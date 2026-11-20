import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_EMAIL = "fastsitecheck@gmail.com";
const SUBJECTS = new Set(["General Inquiry", "Bug Report", "Feature Request", "Business / Partnership"]);
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character] ?? character);
}

function isRateLimited(request: Request) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  return current.count > 5;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 20_000) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }
  if (isRateLimited(request)) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }

  if (clean(body.website, 200)) return Response.json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 254).toLowerCase();
  const subject = clean(body.subject, 80);
  const message = clean(body.message, 5_000);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || !validEmail || !SUBJECTS.has(subject) || message.length < 10) {
    return Response.json({ error: "Please complete every field with valid information." }, { status: 400 });
  }

  const password = process.env.GMAIL_APP_PASSWORD;
  if (!password) {
    console.error("GMAIL_APP_PASSWORD is not configured.");
    return Response.json({ error: "Email delivery is temporarily unavailable. Please email us directly." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: CONTACT_EMAIL, pass: password },
  });

  try {
    await transporter.sendMail({
      from: `MoviFile Contact <${CONTACT_EMAIL}>`,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[MoviFile] ${subject}: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<h2>New message from MoviFile</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return Response.json({ error: "We could not send your message. Please email us directly." }, { status: 502 });
  }
}
