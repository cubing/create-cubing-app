#!/usr/bin/env node
import { exec } from "child_process";
import { exists } from "fs";
import { cp, mkdir, readFile, stat, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { exit, stderr } from "process";
import { createInterface } from "readline";
import { promisify } from "util";

const CREATE_CUBING_APP_PACKAGE_JSON = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf-8"),
);

const execPromise = promisify(exec);

function printHelpAndExit() {
  stderr.write(`Usage:

npm create cubing-app <project folder name>

The project folder name should consist of only letters, numbers, dashes, and u
nderscores.
`);
  exit(1);
}

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

// We could uses `stat` from `"fs/promises"`, but I'm not too enthused about
// catching an error in the "expected" path. So we use `exists`.
if (await promisify(exists)(projectPath)) {
  process.stderr.write(`Project already exists in the current folder: ${projectPath}
Please select a different name (or delete the existing project folder).
`);
  exit(1);
}
await mkdir(projectPath, { recursive: true });

const f = new URL("../app", import.meta.url).pathname;
console.log(f);
await cp(f, projectPath, {
  recursive: true,
});
await execPromise("npm install", {
  cwd: projectPath,
});

console.log(`Your cubing app has been created.
To work on it, run:

    cd \"${projectPath.replaceAll('"', '\\"')}\"
    npm run dev

Edit the files in \`src\` and open the displayed URL in browser to see changes.

--------

To create an optimized build of your app that can be uploaded to a file server, run:

    npm run build

When a new version of \`cubing.js\` is released in the future, you can upgrade using:

    npm install --save cubing@latest
`);
