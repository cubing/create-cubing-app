#!/usr/bin/env node

import {barelyServe} from "barely-a-dev-server";

const outDir = "./dist/web";
export const COMMON_OPTIONS = {
  entryRoot: "./src",
  esbuildOptions: {chunkNames: "chunks/[name]-[hash]"}
}

await barelyServe({
  ...COMMON_OPTIONS,
  dev: false,
  outDir,
});

console.log(`
Your app has been built in: ${outDir}
`)
