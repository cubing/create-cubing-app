# `create-cubing-app`

This is a tool to initialize apps using [`cubing.js`](https://github.com/cubing/cubing.js) with `node` and `npm`. In an editor like VS Code, this will give you nice imports, autocompletions, and other TypeScript benefits.

See <https://js.cubing.net/cubing/> for (in-progress) documentation on `cubing.js`. If you think you have any issues, don't hesitate to [file an issue here](https://github.com/cubing/cubing.js/issues/new/choose).

## Getting started

1. Install `node` (which will also install `npm`): <https://nodejs.org/en/download/>
2. Run:

```shell
npm create --yes cubing-app@latest my-cubing-project
cd my-cubing-project
npm run dev
```

## Building the site for the web

```shell
npm run build
```

The site will be built to the `dist/web` folder, ready to place onto any static web server.

(Note: the output uses module scripts, which means you can't just open the output HTML files directly in the browser. You have to use a web server. If you want to test the output of `npm run build` locally on your computer, you can run: `npx http-server ./dist/web`)

## Getting the latest version of `cubing.js`

See <https://github.com/cubing/cubing.js/releases> for information on the latest releases.

```shell
# Check what version of `cubing.js` you have
npm list cubing

# Update to the latest
npm install --save cubing@latest
```
