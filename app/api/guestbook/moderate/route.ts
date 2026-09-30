import { revalidatePath } from "next/cache";
import { listApproved, removeEntry } from "@/lib/guestbook";

/**
 * Guestbook takedowns for anything the filter misses.
 * Send `Authorization: Bearer $GUESTBOOK_ADMIN_TOKEN`.
 *   GET   → latest entries
 *   POST  { id } → remove from the board
 */
function authorized(req: Request) {
  const token = process.env.GUESTBOOK_ADMIN_TOKEN;
  return !!token && req.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(req: Request) {
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json({ entries: await listApproved(50) });
}

export async function POST(req: Request) {
  if (!authorized(req)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!id) return Response.json({ error: "Expected { id }" }, { status: 400 });
  const ok = await removeEntry(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/");
  return Response.json({ ok: true });
}
