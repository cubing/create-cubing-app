# `cubing-app-template`

This is a template project for project using `cubing.js` with `npm`. In an editor like VSCode, this will give you nice imports, autocompletions, and other TypeScript benefits.

## Getting started

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
