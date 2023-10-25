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

.PHONY: roll-cubing-commit
roll-cubing-commit:
	./script/roll-cubing-commit.bash

.PHONY: publish
publish:
	npm publish

.PHONY: prepublish-only
prepublish-only: test

.PHONY: test
test: build
