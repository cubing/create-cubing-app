.PHONY: app-dev
app-dev:
	cd app-template && npm run dev

.PHONY: dev
dev: app-dev

.PHONY: app-build
app-build:
	cd app-template && npm run build

.PHONY: build
build: app-build

.PHONY: app-clean
app-clean:
	cd app-template && npm run clean

.PHONY: clean
clean:
	rm -rf ./dist && npm run app-clean

.PHONY: auto-publish
auto-publish:
	bun run ./script/auto-publish.ts

.PHONY: publish
publish:
	npm publish

.PHONY: prepublish-only
prepublish-only: test

.PHONY: test
test: build
