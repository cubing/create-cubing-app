#!/usr/bin/env node
import { exec } from "child_process";
import { exists } from "fs";
import { mkdir, readFile, stat, writeFile } from "fs/promises";
import { join, resolve } from "path";
import { exit, stderr } from "process";
import { createInterface } from "readline";
import { promisify } from "util";

function execPromise(cmd, options) {
	return new Promise((resolve, reject) => {
		const childProcess = exec(cmd, options, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			// console.log(stdout);
			resolve(stdout ? stdout : stderr);
		});
	});
}

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

function projectPathed(path) {
	return join(projectPath, path);
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

const initialPackageJSON = {
	scripts: {
		build:
			"node -e 'import(\"barely-a-dev-server\").then(s => s.barelyServe({entryRoot: \"src\", dev: false, outDir: \"dist/web\"}))' && echo '' && echo 'Your app has been built in: ./dist/web' && echo ''",
		dev: 'node -e \'import("barely-a-dev-server").then(s => s.barelyServe({entryRoot: "src"}))\'',
		clean: "rm -rf ./dist",
		"upgrade-cubing": "npm install --save cubing@latest",
	},
};
await writeFile(
	projectPathed("package.json"),
	JSON.stringify(initialPackageJSON, null, "  "),
);

const execOptions = {
	cwd: projectPath,
};
await mkdir(projectPathed("src"), { recursive: true });
async function transferFile(rootedPath, contents) {
	contents ??= await (async () => {
		const filePath = new URL(join("..", rootedPath), import.meta.url);
		return readFile(filePath, "utf-8");
	})();
	await writeFile(projectPathed(rootedPath), contents);
}
await transferFile("src/index.html");
await transferFile("src/main.ts");
await transferFile("src/index.css");
await transferFile(
	".gitignore",
	`/dist
/node_modules
`,
);

await execPromise("npm install --save cubing", execOptions);
await execPromise("npm install --save-dev barely-a-dev-server", execOptions);

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
