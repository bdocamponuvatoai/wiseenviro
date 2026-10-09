import { expect, test } from "@playwright/test";

import { routes } from "./routes";

const widths = [320, 360, 390, 768, 1024, 1280, 1440];

for (const route of routes) {
  test(`${route} renders cleanly`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page).toHaveTitle(/Wise Environmental/);
    expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toMatch(
      /^https?:\/\//,
    );

    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(0);
    }

    expect(await page.locator("img:not([alt])").count()).toBe(0);
    expect(errors).toEqual([]);
  });
}

test("every internal link resolves", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const found = await page
      .locator('a[href^="/"]')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")));
    for (const href of found) if (href) hrefs.add(href.split("#")[0] || "/");
  }
  const broken: string[] = [];
  for (const href of hrefs) {
    const res = await request.get(href);
    if (res.status() !== 200) broken.push(`${href} -> ${res.status()}`);
  }
  expect(broken).toEqual([]);
  expect(hrefs.size).toBeGreaterThanOrEqual(15);
});

test("unknown pages return a branded 404", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/find that page/);
});

test("old WordPress paths redirect", async ({ request }) => {
  const res = await request.get("/job-openings", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("/careers");
});

test("security headers are set", async ({ request }) => {
  const h = (await request.get("/")).headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["strict-transport-security"]).toContain("max-age=");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(h["permissions-policy"]).toContain("camera=()");
  expect(h["cross-origin-opener-policy"]).toBe("same-origin");
  expect(h["x-powered-by"]).toBeUndefined();
});

test("SEO files are served", async ({ request }) => {
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/services/septic");
  expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  const og = await request.get("/opengraph-image");
  expect(og.status()).toBe(200);
  expect(og.headers()["content-type"]).toContain("image/png");
});
