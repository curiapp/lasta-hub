import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [tsconfigPaths()],
    test: {
        globals: true, // use global describe/it/expect
        environment: "node", // Node environment
        include: ["tests/**/*.test.ts"], // path to test files
    },
});
