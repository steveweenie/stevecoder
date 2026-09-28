import { revalidatePath } from "next/cache";
import { listPending, moderate } from "@/lib/guestbook";

/**
 * Guestbook moderation. Send `Authorization: Bearer $GUESTBOOK_ADMIN_TOKEN`.
 *   GET   → pending entries
 *   POST  { id, action: "approve" | "reject" }
 */
function authorized(req: Request) {
  const token = process.env.GUESTBOOK_ADMIN_TOKEN;
  return !!token && req.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ pending: await listPending() });
}

export async function POST(req: Request) {
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id, action } = (await req.json().catch(() => ({}))) as { id?: string; action?: string };
  if (!id || (action !== "approve" && action !== "reject")) {
    return Response.json({ error: "Expected { id, action: approve | reject }" }, { status: 400 });
  }
  const ok = await moderate(id, action);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  if (action === "approve") revalidatePath("/");
  return Response.json({ ok: true });
}
