import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const WEBHOOK_PORT = 3199;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: `node tests/e2e/mock-webhook.mjs ${WEBHOOK_PORT}`,
      url: `http://127.0.0.1:${WEBHOOK_PORT}/health`,
      reuseExistingServer: false,
    },
    {
      // Run against the production build: `npm run build` first.
      command: `npx next start -p ${PORT}`,
      url: `http://localhost:${PORT}`,
      reuseExistingServer: false,
      env: { LEAD_WEBHOOK_URL: `http://127.0.0.1:${WEBHOOK_PORT}/lead` },
    },
  ],
});
