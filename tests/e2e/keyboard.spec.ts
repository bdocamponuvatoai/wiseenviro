import { expect, test } from "@playwright/test";

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("desktop services menu opens from the keyboard and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Residential services menu" });
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  const septic = page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Septic", exact: true });
  await expect(septic).toBeVisible();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
  await expect(septic).toBeHidden();
});

test("mobile menu traps focus, locks scroll, closes on Escape and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).toBe("hidden");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("mobile menu links navigate and close the sheet", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Septic", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/septic$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("FAQ answers are readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/services/septic");
  await page.getByText("How often should a septic tank be pumped?").click();
  await expect(
    page.getByText(/inspected and pumped at least every three years/).last(),
  ).toBeVisible();
  await context.close();
});
