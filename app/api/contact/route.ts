import { Resend } from "resend";
import { clientIp, MOCK, rateLimited } from "@/lib/redis";
import { SITE } from "@/lib/site";

const SUBJECTS = ["Job opportunity", "Freelance", "Collab", "Just saying hi"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend it worked.
  if (body.botcheck) return Response.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const subject = SUBJECTS.includes(String(body.subject)) ? String(body.subject) : SUBJECTS[0];
  const message = String(body.message ?? "").trim().slice(0, 5000);
  if (!name || !EMAIL.test(email) || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  if (await rateLimited(`contact:${clientIp(req)}`, 5, 600)) {
    return Response.json({ error: "Too many messages" }, { status: 429 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (MOCK) return Response.json({ ok: true, mock: true });
    console.error("[contact] RESEND_API_KEY is not set");
    return Response.json({ error: "Mail is not configured" }, { status: 500 });
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "stevecoder.com <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? SITE.email,
    replyTo: email,
    subject: `[stevecoder.com] ${subject} from ${name}`,
    text: `${message}\n\n--\n${name} <${email}>\nSubject: ${subject}`,
  });
  if (error) {
    console.error("[contact] resend failed:", error);
    return Response.json({ error: "Send failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
