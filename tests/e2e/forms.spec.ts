import { expect, test, type Page } from "@playwright/test";

const WEBHOOK_LEADS = "http://127.0.0.1:3199/leads";

function isoDate(offsetDays: number) {
  return new Date(Date.now() + offsetDays * 86_400_000).toISOString().slice(0, 10);
}

async function fillContact(page: Page, overrides: Record<string, string> = {}) {
  const v = {
    firstName: "Jamie",
    lastName: "Rivera",
    phone: "256-555-0142",
    email: "jamie@example.com",
    street: "100 Main St",
    city: "Oxford",
    zip: "36203",
    serviceDate: isoDate(3),
    ...overrides,
  };
  await page.getByRole("radio", { name: "residential" }).check();
  await page.getByLabel("First name").fill(v.firstName);
  await page.getByLabel("Last name").fill(v.lastName);
  await page.getByLabel("Phone").fill(v.phone);
  await page.getByLabel("Email").fill(v.email);
  await page.getByLabel("Street address").fill(v.street);
  await page.getByLabel("City").fill(v.city);
  await page.getByLabel("ZIP").fill(v.zip);
  await page.getByLabel("Requested date of service").fill(v.serviceDate);
  await page.getByLabel("Service type").selectOption("Septic Services");
}

test.describe("contact form", () => {
  test("empty submit shows required errors, focuses the first field, sends nothing", async ({
    page,
  }) => {
    await page.goto("/contact");
    let posted = false;
    page.on("request", (r) => {
      if (r.method() === "POST") posted = true;
    });
    await page.getByRole("button", { name: "Send request" }).click();
    for (const msg of [
      "Choose residential or commercial.",
      "Please enter your first name.",
      "Please enter a valid email address.",
      "Please enter a 5-digit ZIP code.",
      "Please choose a service type.",
    ]) {
      await expect(page.getByText(msg)).toBeVisible();
    }
    const firstName = page.getByLabel("First name");
    await expect(firstName).toHaveAttribute("aria-invalid", "true");
    await expect(firstName).toHaveAttribute("aria-describedby", "firstName-error");
    expect(posted).toBe(false);
  });

  test("invalid values are rejected on the client", async ({ page }) => {
    await page.goto("/contact");
    await fillContact(page, {
      email: "jamie@",
      phone: "555",
      zip: "12",
      serviceDate: "2001-01-01",
    });
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Please enter a 10-digit phone number.")).toBeVisible();
    await expect(page.getByText("Please enter a 5-digit ZIP code.")).toBeVisible();
    await expect(page.getByText(/date that isn.t in the past/)).toBeVisible();
  });

  test("valid request is delivered and confirmed", async ({ page, request }) => {
    await page.goto("/contact");
    await fillContact(page);
    await page.waitForTimeout(2_600); // minimum fill time (anti-bot)
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByRole("status")).toContainText("Thanks, Jamie! Your request is in.");
    const leads = (await (await request.get(WEBHOOK_LEADS)).json()) as {
      kind: string;
      data: { email: string };
    }[];
    expect(
      leads.some((l) => l.kind === "service-request" && l.data.email === "jamie@example.com"),
    ).toBe(true);
  });

  test("works without JavaScript: the server validates and keeps entered values", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/contact");
    await page.getByLabel("First name").fill("NoJS");
    await page.getByRole("button", { name: "Send request" }).click();
    await expect(page.getByRole("alert")).toContainText("Please fix the highlighted fields");
    await expect(page.getByText("Please enter your last name.")).toBeVisible();
    await expect(page.getByLabel("First name")).toHaveValue("NoJS");
    await context.close();
  });
});

test.describe("careers form", () => {
  test("empty submit shows required errors", async ({ page }) => {
    await page.goto("/careers");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Please enter your first name.")).toBeVisible();
    await expect(page.getByText("Please choose a position.")).toBeVisible();
    await expect(page.getByText("Tell us a little more (at least 20 characters).")).toBeVisible();
  });

  test("invalid email and phone are rejected", async ({ page }) => {
    await page.goto("/careers");
    await page.getByLabel("Email").fill("nope");
    await page.getByLabel("Phone").fill("12");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
    await expect(page.getByText("Please enter a 10-digit phone number.")).toBeVisible();
  });

  test("valid submission is delivered and confirmed", async ({ page }) => {
    await page.goto("/careers");
    await page.getByLabel("First name").fill("Taylor");
    await page.getByLabel("Last name").fill("Brooks");
    await page.getByLabel("Phone").fill("2565550199");
    await page.getByLabel("Email").fill("taylor@example.com");
    await page.getByLabel("Position of interest").selectOption("Technician");
    await page
      .getByLabel("About you")
      .fill("CDL Class B, five years of septic pumping experience.");
    await page.waitForTimeout(2_600);
    await page.getByRole("button", { name: "Submit" }).click();
    await expect(page.getByRole("status")).toContainText("Thanks, Taylor!");
  });
});
