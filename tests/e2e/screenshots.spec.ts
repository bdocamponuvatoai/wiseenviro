import { test } from "@playwright/test";

import { routes } from "./routes";

const outDir = process.env.SCREENSHOT_DIR ?? "screenshots";

test.describe("screenshots", () => {
  test.skip(!process.env.SCREENSHOTS, "set SCREENSHOTS=1 to capture");
  for (const width of [390, 1440]) {
    for (const route of routes) {
      test(`${width}px ${route}`, async ({ page }) => {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(route);
        // Scroll through the page so lazy-loaded images below the fold load before capture.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForLoadState("networkidle");
        const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "_");
        await page.screenshot({ path: `${outDir}/${width}/${name}.png`, fullPage: true });
      });
    }
  }
});
