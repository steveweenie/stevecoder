import { MOCK, redis } from "@/lib/redis";

/** Players online: each tab pings every 30s; anyone seen in the last 60s counts. */
const WINDOW_MS = 60_000;

export async function POST(req: Request) {
  const { id } = (await req.json().catch(() => ({}))) as { id?: string };
  if (!redis) return Response.json({ players: MOCK ? 3 : 1 });
  if (!id || !/^[\w-]{8,64}$/.test(id)) return Response.json({ error: "Bad id" }, { status: 400 });
  try {
    const now = Date.now();
    const p = redis.pipeline();
    p.zadd("presence", { score: now, member: id });
    p.zremrangebyscore("presence", 0, now - WINDOW_MS);
    p.zcard("presence");
    const [, , players] = (await p.exec()) as [unknown, unknown, number];
    return Response.json({ players: Math.max(1, players) });
  } catch {
    return Response.json({ players: 1 });
  }
}
