# `cubing-app-template`

This is a template project for project using `cubing.js` with `node` and `npm`. In an editor like VSCode, this will give you nice imports, autocompletions, and other TypeScript benefits.

See <https://js.cubing.net/cubing/> for (in-progress) documentation on `cubing.js`. If you think you have any issues, don't hesitate to [file an issue here](https://github.com/cubing/cubing.js/issues/new/choose).

## Getting started

Make sure `node` is installed first (which will also install `npm`): <https://nodejs.org/en/download/>

```shell
# Set up the project for the first time
git clone https://github.com/cubing/cubing-app-template my-app && cd my-app
npm install

# Start working on the project at http://localhost:1234
npm run dev
```

## Building the site for the web

```shell
npm run build
```

The site will be built to the `dist/src` folder, ready to place onto any static web server.

(Note: the output uses module scripts, which means you can't just open the output HTML files directly in the browser. You have to use a web server. Something like `python3 -m http.server` might help if you just need to test the output locally.)

## Getting the latest version of `cubing.js`

See <https://github.com/cubing/cubing.js/releases> for information on the latest releases.

```shell
# Check what version of `cubing.js` you have
npm list cubing

# Update to the latest
npm install --save cubing@latest
```
