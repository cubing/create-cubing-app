#!/usr/bin/env node
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
async function transferFile(rootedPath, contents) {
	await writeFile(`./${rootedPath}`, contents);
}
await transferFile(
	"src/index.html",
	`<!DOCTYPE html>
<html>

<head>
  <meta charset="utf8">
  <title>My Cubing App</title>
  <link rel="stylesheet" href="./index.css">
  <!-- Note: the source file is \`main.ts\`, but here we use the transpiled file name it will have on the web server. -->
  <script src="./main.js" type="module"></script>
</head>

<body>
  <h1>My Cubing App</h1>
  <twisty-player id="main-player"></twisty-player>
</body>

</html>
`,
);
await transferFile(
	"src/main.ts",
	`// Always keep the following line if you are using any twisty players on your page.
import "cubing/twisty";
// Use the following line for specific imports from \`cubing/twisty\`.
import { TwistyAlgViewer, type TwistyPlayer } from "cubing/twisty";

// Import from other modules as usual.
import { randomScrambleForEvent } from "cubing/scramble";

class App {
  // Example of getting an element from the page.
  twistyPlayer: TwistyPlayer = document.querySelector("#main-player")!;
  // Example of creating a new element and adding it to the page.
  twistyAlgViewer = document.body.appendChild(
    new TwistyAlgViewer({ twistyPlayer: this.twistyPlayer })
  );
  constructor() {
    this.updateScramble();
  }

  async updateScramble() {
    this.twistyPlayer.alg = await randomScrambleForEvent("333");
  }
}

// Make the app object available in the console for debugging.
// Try running: app.updateScramble()
globalThis.app = new App();
`,
);
await transferFile(
	"src/index.css",
	`/* Center everything on the page. */
html, body {
  height: 100%;
  margin: 0;
  display: grid;
  place-content: center;
  gap: 1em;
  font-family: sans-serif;
}
`,
);
await transferFile(
	".gitignore",
	`/dist
/node_modules
`,
);
