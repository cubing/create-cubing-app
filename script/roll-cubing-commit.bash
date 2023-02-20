#!/usr/bin/env bash

# This is simplified `bash` version of: https://github.com/lgarron/scripts/blob/9aa4a016c7853b7a7588dd11bacd327156251b1e/web/npm-roll

if [ ! -z "$(git status --porcelain)" ]
then
  echo "git status must be clean"
  echo ""
  git status
  exit 1
fi

VERSION=$(npm show cubing version)
echo "Rolling \`cubing\` to version: v${VERSION}"

npm install "cubing@v${VERSION}"
git stage package*
git commit -m "\`npm install cubing@v${VERSION}\`"
