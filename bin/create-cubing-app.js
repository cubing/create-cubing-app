import { exec } from "child_process";
import { writeFile } from "fs";
import { mkdir, readFile } from "fs/promises";

export function execPromise(cmd, options) {
	return new Promise((resolve, reject) => {
		const childProcess = exec(cmd, options, (error, stdout, stderr) => {
			if (error) {
				reject(error);
			}
			// console.log(stdout);
			resolve(stdout ? stdout : stderr);
		});
		childProcesses.push(childProcess);
	});
}

execPromise("npm install --save cubing");
execPromise("npm install --save-dev barely-a-dev-server");

await mkdir("./src", { recursive: true });
async function transferFile(basename) {
	const indexHTML = await readFile(
		new URL(`../src/${basename}`),
		import.meta.url,
	);
	writeFile(`./src/${basename}`, indexHTML);
}
await transferFile("index.html");
await transferFile("index.ts");
await transferFile("index.css");
