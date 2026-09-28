import "server-only";
import { Redis } from "@upstash/redis";

/**
 * Upstash Redis (Vercel Marketplace). Accepts either the Marketplace env names
 * (KV_REST_API_URL / KV_REST_API_TOKEN) or Upstash's own.
 */
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;

/** Mock mode: FEEDS_MODE=mock. Live data and storage are skipped and design mock data is served. */
export const MOCK = process.env.FEEDS_MODE === "mock";

// In-memory fallback so mock mode works locally without Redis. Not durable.
const mem = new Map<string, { n: number; exp: number }>();

/** Fixed-window rate limit. Returns true when the caller is over the limit. */
export async function rateLimited(key: string, limit: number, windowSec: number) {
  const k = `rl:${key}`;
  if (redis) {
    const n = await redis.incr(k);
    if (n === 1) await redis.expire(k, windowSec);
    return n > limit;
  }
  const now = Date.now();
  const cur = mem.get(k);
  if (!cur || cur.exp < now) {
    mem.set(k, { n: 1, exp: now + windowSec * 1000 });
    return false;
  }
  cur.n++;
  return cur.n > limit;
}

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "local").trim();
}
