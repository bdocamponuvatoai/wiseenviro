import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // `server-only` throws outside the React Server bundle; it's a no-op for unit tests.
      "server-only": fileURLToPath(new URL("./tests/unit/server-only-stub.ts", import.meta.url)),
    },
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
