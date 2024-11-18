.PHONY: app-template-dev
app-template-dev:
	cd app-template && npm run dev

.PHONY: dev
dev: app-template-dev

.PHONY: app-template-build
app-template-build: app-template/node_modules
	cd app-template && npm run build

.PHONY: app-template/node_modules
app-template/node_modules:
	cd app-template && npm install


.PHONY: build
build: app-template-build

.PHONY: app-template-clean
app-template-clean: 
	cd app-template

.PHONY: clean
clean: app-template-clean
	rm -rf ./dist

.PHONY: auto-publish
auto-publish:
	bun run ./script/auto-publish.ts

.PHONY: publish
publish:
	npm publish --globalconfig=$HOME/.config/npm/cubing-publish.npmrc

.PHONY: prepublish-only
prepublish-only: test

.PHONY: test
test: build

.PHONY: lint
lint:
	npx @biomejs/biome check ./bin ./script ./app-template/script ./app-template/src

.PHONY: format
format:
	npx @biomejs/biome format --write ./bin ./script ./app-template/script ./app-template/src
