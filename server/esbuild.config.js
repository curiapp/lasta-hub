import { build } from "esbuild";
import { builtinModules } from "module";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

const deps = Object.keys(pkg.dependencies || {});
const builtins = [...builtinModules, ...builtinModules.map((m) => `node:${m}`)];

build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  sourcemap: true,

  // Externalize everything except your app code
  external: [...deps, ...builtins],

  alias: {
    "@": "./src",
  },
}).catch(() => process.exit(1));
