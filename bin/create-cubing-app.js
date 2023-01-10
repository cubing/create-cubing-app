import { exec } from "child_process";
import { mkdir, readFile, writeFile } from "fs/promises";

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

const initialPackageJSON = {
	scripts: {
		build:
			'node -e \'import("barely-a-dev-server").then(s => s.barelyServe({entryRoot: "src", dev: false, outDir: "dist/web"}))\'',
		dev: 'node -e \'import("barely-a-dev-server").then(s => s.barelyServe({entryRoot: "src"}))\'',
		clean: "rm -rf ./dist",
	},
};
await writeFile(
	"./package.json",
	JSON.stringify(initialPackageJSON, null, "  "),
);

await execPromise("npm install --save cubing");
await execPromise("npm install --save-dev barely-a-dev-server");

await mkdir("./src", { recursive: true });
async function transferFile(rootedPath) {
	const indexHTML = await readFile(
		new URL(`../${rootedPath}`, import.meta.url),
	);
	await writeFile(`./${rootedPath}`, indexHTML);
}
await transferFile("src/index.html");
await transferFile("src/main.ts");
await transferFile("src/index.css");
await transferFile(".gitignore");
