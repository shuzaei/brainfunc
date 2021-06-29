#!/bin/bash

VERSION="1.0.6-8"

BEFORE_COMMIT=false
TEST_BREW=false
TEST_LOCAL=true
BREW_PACKAGE=true
BREW_UPDATE=true
VSCE_PUBLISH=false
AFTER_COMMIT=false

cd "$(dirname "$0")"

if [ $BEFORE_COMMIT = true ]; then
    git add .
    git commit -m "automatic commit before deploying by deploy.sh"
    git push
fi

if [ $TEST_BREW = true ]; then
    "./tests/homebrew-test.sh"
fi

if [ $TEST_LOCAL = true ]; then
    "./tests/local-install-test.sh"
fi

if [ $BREW_PACKAGE = true ]; then
    "./utils/homebrew-package.sh" "$VERSION"

    if [ $BREW_UPDATE = true ]; then
        git add "./out"
        git commit -m "automatic commit by deploy.sh before updating formula"
        git push

        "./utils/homebrew-update.sh" <(printf "Yes")
    fi
fi

if [ $VSCE_PUBLISH = true ]; then
    cd "vscode-brainfunc/"
    vsce publish
    cd ..
fi

if [ $AFTER_COMMIT = true ]; then
    git add .
    git commit -m "automatic commit after deploying by deploy.sh"
    git push
fi