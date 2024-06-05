// @ts-ignore: No `bun` types in this repo.
import { $ } from "bun";

import appTemplatePackageJson from "../app-template/package-lock.json" with {
  type: "json",
};

const version = appTemplatePackageJson.packages["node_modules/cubing"].version;
await $`npm version --no-git-tag-version v${version}`;
