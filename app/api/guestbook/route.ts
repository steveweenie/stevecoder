import { revalidatePath } from "next/cache";
import { addEntry, isProfane } from "@/lib/guestbook";
import { GB_ICONS } from "@/lib/content";
import { clientIp, rateLimited } from "@/lib/redis";

const TAG = /^[A-Z0-9 _.-]{3,12}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot.
  if (body.botcheck) return Response.json({ ok: true });

  const tag = String(body.tag ?? "").trim().toUpperCase();
  const msg = String(body.msg ?? "").trim().replace(/\s+/g, " ");
  const icon = Number(body.icon);
  if (!TAG.test(tag) || !msg || msg.length > 80 || !Number.isInteger(icon) || icon < 0 || icon >= GB_ICONS.length) {
    return Response.json({ error: "Invalid entry" }, { status: 400 });
  }

  if (isProfane(tag) || isProfane(msg)) {
    return Response.json({ error: "Keep it clean" }, { status: 422 });
  }

  if (await rateLimited(`gb:${clientIp(req)}`, 3, 3600)) {
    return Response.json({ error: "Too many entries" }, { status: 429 });
  }

  const ok = await addEntry({ id: crypto.randomUUID(), tag, msg, icon, createdAt: Date.now() }).catch((err) => {
    console.error("[guestbook] write failed:", err);
    return false;
  });
  if (!ok) return Response.json({ error: "Storage unavailable" }, { status: 503 });
  revalidatePath("/");
  return Response.json({ ok: true });
}
