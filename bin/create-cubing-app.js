#!/usr/bin/env -S node --

import { exec } from "node:child_process";
import { exists } from "node:fs";
import { cp, mkdir } from "node:fs/promises";
import { exit } from "node:process";
import { createInterface } from "node:readline";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execPromise = promisify(exec);

let projectPath = process.argv[2];
if (!projectPath) {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  projectPath = await new Promise((resolve, reject) => {
    try {
      readline.question(
        `Where would you like to place the project?
(Enter a path or name for a new folder.)
`,
        resolve,
      );
    } catch (e) {
      reject(e);
    } finally {
    }
  });
  readline.close();
  if (projectPath === "") {
    console.log("Please enter a non-empty project path.");
    exit(1);
  }
}

console.log(`---------------------------------
Creating a cubing project in the following folder:
${projectPath}
`);

// We could use `stat` from `"fs/promises"`, but I'm not too enthused about
// catching an error in the "expected" path. So we use `exists`.
if (await promisify(exists)(projectPath)) {
  process.stderr.write(`Project already exists in the current folder: ${projectPath}
Please select a different name (or delete the existing project folder).
`);
  exit(1);
}
await mkdir(projectPath, { recursive: true });

const appTemplatePath = fileURLToPath(
  new URL("../app-template", import.meta.url),
);
await cp(appTemplatePath, projectPath, {
  recursive: true,
});
await execPromise("npm install", {
  cwd: projectPath,
});

console.log(`Your cubing app has been created.
To work on it, run:

    cd "${projectPath.replaceAll('"', '\\"')}"
    npm run dev

Edit the files in \`src\` and open the displayed URL in browser to see changes.

--------

To create an optimized build of your app that can be uploaded to a file server, run:

    npm run build

When a new version of \`cubing.js\` is released in the future, you can upgrade using:

    npm install --save cubing@latest
`);
