import "server-only";

interface Bucket {
  count: number;
  resetAt: number;
}

/**
 * Fixed-window, in-memory limiter. Good enough to blunt form spam on a single instance;
 * on multi-instance hosting each instance keeps its own counts (see README for a shared store).
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const buckets = new Map<string, Bucket>();

  return function check(key: string, now = Date.now()) {
    if (buckets.size > 5_000) {
      for (const [k, bucket] of buckets) if (bucket.resetAt <= now) buckets.delete(k);
    }
    const bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, remaining: limit - 1 };
    }
    bucket.count += 1;
    return { ok: bucket.count <= limit, remaining: Math.max(0, limit - bucket.count) };
  };
}
