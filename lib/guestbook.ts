import "server-only";
import { unstable_rethrow } from "next/navigation";
import { englishDataset, englishRecommendedTransformers, RegExpMatcher } from "obscenity";
import { MOCK_SCORES, type GuestEntry } from "./content";
import { MOCK, redis } from "./redis";

/**
 * Auto-approved guestbook with a profanity/slur filter.
 *   gb:entry:{id}  JSON entry
 *   gb:approved    zset of ids on the board (score = createdAt)
 */
const memEntries: GuestEntry[] = [];

// Catches common obfuscation too (l33t, repeated letters, spacing, confusables).
const matcher = new RegExpMatcher({ ...englishDataset.build(), ...englishRecommendedTransformers });

export const isProfane = (text: string) => matcher.hasMatch(text);

export async function listApproved(limit = 10): Promise<GuestEntry[]> {
  if (MOCK || !redis) return [...memEntries].reverse().concat(MOCK_SCORES).slice(0, limit);
  try {
    const ids = await redis.zrange<string[]>("gb:approved", 0, limit - 1, { rev: true });
    if (!ids.length) return [];
    const rows = await redis.mget<(GuestEntry | null)[]>(...ids.map((id) => `gb:entry:${id}`));
    return rows.filter((r): r is GuestEntry => !!r);
  } catch (err) {
    // Let Next see the uncached Redis read (it renders the page per request) instead of logging it as a failure.
    unstable_rethrow(err);
    console.warn("[guestbook] read failed:", (err as Error).message);
    return [];
  }
}

/** Returns false when there is nowhere to store the entry. */
export async function addEntry(entry: GuestEntry) {
  if (!redis) {
    if (!MOCK) return false;
    memEntries.push(entry);
    return true;
  }
  await redis.set(`gb:entry:${entry.id}`, entry);
  await redis.zadd("gb:approved", { score: entry.createdAt, member: entry.id });
  return true;
}

/** Takes an entry off the board. */
export async function removeEntry(id: string) {
  if (!redis) throw new Error("Guestbook storage is not configured");
  const removed = await redis.zrem("gb:approved", id);
  await redis.del(`gb:entry:${id}`);
  return removed > 0;
}
