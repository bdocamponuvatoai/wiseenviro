import "server-only";

import { headers } from "next/headers";

import { HONEYPOT_FIELD, MIN_FILL_MS, STARTED_AT_FIELD } from "@/lib/form-state";
import { createRateLimiter } from "@/lib/rate-limit";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

type SpamVerdict = "ok" | "bot" | "rate-limited";

/** Honeypot, minimum fill time and per-IP rate limit for public form submissions. */
export async function checkSubmission(formData: FormData): Promise<SpamVerdict> {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim() !== "") return "bot";

  // startedAt is set by client JS; without JS it is absent and only the other checks apply.
  const startedAt = Number(formData.get(STARTED_AT_FIELD));
  if (Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS)
    return "bot";

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return limiter(ip).ok ? "ok" : "rate-limited";
}
