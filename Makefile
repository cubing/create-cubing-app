.PHONY: app-template-dev
app-template-dev: setup
	cd app-template && bun run dev

.PHONY: check
check: lint test build check-package.json

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
	bun install --frozen-lockfile

.PHONY: build
build: app-template-build

.PHONY: app-template-clean
app-template-clean:
	cd app-template && bun run clean

.PHONY: check-package.json
check-package.json: build
	bun x --package @cubing/dev-config package.json check

.PHONY: clean
clean: app-template-clean
	rm -rf ./.test/ ./dist/ ./app-template/node_modules/

.PHONY: reset
reset: clean
	rm -rf ./node_modules/

.PHONY: auto-publish
auto-publish: setup
	bun run ./script/auto-publish.ts

.PHONY: publish
publish: setup
	npm publish --globalconfig="${HOME}/.config/npm/cubing-publish.npmrc"

.PHONY: prepublishOnly
prepublishOnly: test check build

.PHONY: test
test: build test-create-and-build

.PHONY: lint
lint: setup
	npx @biomejs/biome check

.PHONY: format
format: setup
	npx @biomejs/biome check --write

TEST_CREATE_AND_BUILD_FOLDER = ./.test/create-and-build

.PHONY: test-create-and-build
test-create-and-build:
	mkdir -p ${TEST_CREATE_AND_BUILD_FOLDER}
	node bin/create-cubing-app ${TEST_CREATE_AND_BUILD_FOLDER}/my-cubing-project
	cd ${TEST_CREATE_AND_BUILD_FOLDER}/my-cubing-project && npm run build
	rm -rf ${TEST_CREATE_AND_BUILD_FOLDER}
