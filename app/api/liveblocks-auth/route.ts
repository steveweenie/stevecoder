import { Liveblocks } from "@liveblocks/node";
import { clientIp, rateLimited } from "@/lib/redis";
import { CURSOR_ROOM } from "@/lib/site";

const secret = process.env.LIVEBLOCKS_SECRET_KEY;
const liveblocks = secret ? new Liveblocks({ secret }) : null;

/**
 * Issues a Liveblocks token for the live cursors room only: read access plus
 * presence writes, so a token can move a cursor but can't touch room storage.
 */
export async function POST(req: Request) {
  if (!liveblocks) return Response.json({ error: "Cursors off" }, { status: 403 });
  const { room, id } = (await req.json().catch(() => ({}))) as { room?: string; id?: string };
  if (room !== CURSOR_ROOM || !id || !/^[\w-]{8,64}$/.test(id)) {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }
  if (await rateLimited(`cursors:${clientIp(req)}`, 30, 600)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }
  const session = liveblocks.prepareSession(id);
  session.allow(CURSOR_ROOM, ["*:read", "room:presence:write"]);
  const { status, body } = await session.authorize();
  return new Response(body, { status, headers: { "Content-Type": "application/json" } });
}
