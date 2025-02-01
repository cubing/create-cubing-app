.PHONY: app-template-dev
app-template-dev: setup
	cd app-template && bun run dev

.PHONY: dev
dev: app-template-dev

.PHONY: app-template-build
app-template-build: setup
	cd app-template && bun run build

.PHONY: app-template/node_modules
app-template/node_modules:
	# TODO: the `rm -rf ./bun.lock ./bun.lockb` is a workaround for https://github.com/oven-sh/bun/issues/16965
	cd app-template && bun install --no-save && rm -f ./bun.lock ./bun.lockb

.PHONY: setup
setup: app-template/node_modules
	bun install --no--save

.PHONY: build
build: app-template-build

.PHONY: app-template-clean
app-template-clean:
	cd app-template && bun run clean

.PHONY: clean
clean: app-template-clean
	rm -rf ./dist ./app-template/node_modules

.PHONY: reset
reset: clean
	rm -rf ./node_modules

.PHONY: auto-publish
auto-publish: setup
	bun run ./script/auto-publish.ts

.PHONY: publish
publish: setup
	npm publish --globalconfig=$HOME/.config/npm/cubing-publish.npmrc

.PHONY: prepublishOnly
prepublishOnly: clean test

.PHONY: test
test: build

.PHONY: lint
lint: setup
	npx @biomejs/biome check

.PHONY: format
format: setup
	npx @biomejs/biome check --write
