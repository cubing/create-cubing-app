#!/usr/bin/env node
import { exec } from "child_process";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { exit, stderr } from "process";

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

await execPromise("npm install validate-npm-package-name", {
	cwd: new URL(".", import.meta.url),
});

function badPackageName() {
	stderr.write(`Please specify a valid project name!
For example:

    npm create cubing-app my-cubing-project

`);
	exit(1);
}
const packageName = process.argv[2];
if (!packageName) {
	badPackageName();
}

const validate = (await import("validate-npm-package-name")).default;
const validationResults = validate(packageName);
if (!validationResults.validForNewPackages) {
	badPackageName();
}

const packageRoot = join(".", packageName);
function packageRooted(path) {
	return join(packageRoot, path);
}
await mkdir(packageRoot);

const initialPackageJSON = {
	scripts: {
		build:
			"node -e 'import(\"barely-a-dev-server\").then(s => s.barelyServe({entryRoot: \"src\", dev: false, outDir: \"dist/web\"}))' && echo '' && echo 'Your app has been built in: ./dist/web' && echo ''",
		dev: 'node -e \'import("barely-a-dev-server").then(s => s.barelyServe({entryRoot: "src"}))\'',
		clean: "rm -rf ./dist",
	},
};
await writeFile(
	packageRooted("package.json"),
	JSON.stringify(initialPackageJSON, null, "  "),
);

const execOptions = {
	cwd: packageRoot,
};
await mkdir(packageRooted("src"), { recursive: true });
async function transferFile(rootedPath) {
	const filePath = new URL(join("..", rootedPath), import.meta.url);
	const contents = await readFile(filePath, "utf-8");
	await writeFile(packageRooted(rootedPath), contents);
}
await transferFile("src/index.html");
await transferFile("src/main.ts");
await transferFile("src/index.css");
await transferFile(".gitignore");

await execPromise("npm install --save cubing", execOptions);
await execPromise("npm install --save-dev barely-a-dev-server", execOptions);

console.log(`Your cubing app has been created.
To work on it, run:

    cd ${packageRoot}
    npm run dev

To create an optimized build of your app that can be uploaded to a file server, run:

    npm run build

When a new version of \`cubing.js\` is released in the future, you can upgrade using:

    npm install cubing@latest
`);
