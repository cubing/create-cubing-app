# `create-cubing-app`

This is a tool to initialize for apps using [`cubing.js`](https://github.com/cubing/cubing.js) with `node` and `npm`. In an editor like VSCode, this will give you nice imports, autocompletions, and other TypeScript benefits.

See <https://js.cubing.net/cubing/> for (in-progress) documentation on `cubing.js`. If you think you have any issues, don't hesitate to [file an issue here](https://github.com/cubing/cubing.js/issues/new/choose).

## Getting started

Make sure `node` is installed first (which will also install `npm`): <https://nodejs.org/en/download/>

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

(Note: the output uses module scripts, which means you can't just open the output HTML files directly in the browser. You have to use a web server. Something like `python3 -m http.server -d dist/web` might help if you just need to test the output locally.)

## Getting the latest version of `cubing.js`

See <https://github.com/cubing/cubing.js/releases> for information on the latest releases.

```shell
# Check what version of `cubing.js` you have
npm list cubing

# Update to the latest
npm install --save cubing@latest
```
