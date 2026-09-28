import "server-only";
import { MOCK_SCORES, type GuestEntry } from "./content";
import { MOCK, redis } from "./redis";

/**
 * Moderated guestbook.
 *   gb:entry:{id}  JSON entry
 *   gb:pending     zset of ids awaiting review (score = createdAt)
 *   gb:approved    zset of ids on the board (score = createdAt)
 */
const memPending: GuestEntry[] = [];

export async function listApproved(limit = 10): Promise<GuestEntry[]> {
  if (MOCK || !redis) return MOCK_SCORES.slice(0, limit);
  try {
    const ids = await redis.zrange<string[]>("gb:approved", 0, limit - 1, { rev: true });
    if (!ids.length) return [];
    const rows = await redis.mget<(GuestEntry | null)[]>(...ids.map((id) => `gb:entry:${id}`));
    return rows.filter((r): r is GuestEntry => !!r);
  } catch (err) {
    console.warn("[guestbook] read failed:", (err as Error).message);
    return [];
  }
}

export async function listPending(): Promise<GuestEntry[]> {
  if (!redis) return memPending;
  const ids = await redis.zrange<string[]>("gb:pending", 0, -1);
  if (!ids.length) return [];
  const rows = await redis.mget<(GuestEntry | null)[]>(...ids.map((id) => `gb:entry:${id}`));
  return rows.filter((r): r is GuestEntry => !!r);
}

/** Returns false when there is nowhere to store the entry. */
export async function addPending(entry: GuestEntry) {
  if (!redis) {
    if (!MOCK) return false;
    memPending.push(entry);
    return true;
  }
  await redis.set(`gb:entry:${entry.id}`, entry);
  await redis.zadd("gb:pending", { score: entry.createdAt, member: entry.id });
  return true;
}

export async function moderate(id: string, action: "approve" | "reject") {
  if (!redis) throw new Error("Guestbook storage is not configured");
  const removed = await redis.zrem("gb:pending", id);
  if (!removed) return false;
  if (action === "approve") {
    const entry = await redis.get<GuestEntry>(`gb:entry:${id}`);
    if (!entry) return false;
    await redis.zadd("gb:approved", { score: entry.createdAt, member: id });
  } else {
    await redis.del(`gb:entry:${id}`);
  }
  return true;
}
