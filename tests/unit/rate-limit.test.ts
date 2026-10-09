import { describe, expect, it } from "vitest";

import { createRateLimiter } from "@/lib/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit within a window, then blocks", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1_000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 10).ok).toBe(true);
    expect(check("ip", 20).ok).toBe(false);
    expect(check("other-ip", 20).ok).toBe(true);
  });

  it("resets after the window passes", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 500).ok).toBe(false);
    expect(check("ip", 1_000).ok).toBe(true);
  });
});
