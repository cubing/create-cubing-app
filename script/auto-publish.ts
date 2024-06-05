import { exit } from "node:process";
import { $ } from "bun";

if ((await $`git status --porcelain`).stdout.toString().trim()) {
  console.error("git status must be clean.");
  exit(1);
}

const version = (await $`npm show cubing version`).stdout.toString().trim();

console.log(new URL(import.meta.resolve("../app-template/")).pathname);
await $`npm install --prefix ${new URL(import.meta.resolve("../app-template/")).pathname} "cubing@v${version}"`;
await $`npm version --no-git-tag-version "v${version}"`;
await $`git commit --all --message "v${version}"`;
await $`git push`;
await $`git tag "v${version}"`;
await $`git push origin "v${version}"`;
await $`npm publish`;
