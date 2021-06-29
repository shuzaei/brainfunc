#!/bin/bash

shopt -s expand_aliases

VERSION="1.0.6-12"

BEFORE_COMMIT=true

TEST_UNIT=true

BREW_PACKAGE=true
BREW_UPDATE=true

VSCE_PUBLISH=false

AFTER_COMMIT=true

PUSH_TAG=true
CREATE_RELEASE=true

TEST_LOCAL=false
TEST_BREW=false

LOCAL_INSTALL=false
BREW_UPGRADE=true

cd "$(dirname "$0")"

if [ $PUSH_TAG = true ]; then
    if [ "$(git tag -l "$VERSION")" != "" ]; then
        printf "\e[91mError:\e[0m tag $VERSION already exists\n"
        printf "\e[93mSTOPPED\e[0m\n"
        exit 1
    fi
fi

if [ $BEFORE_COMMIT = true ]; then
    git add .
    git commit -m "automatic commit before deploying by deploy.sh"
    git push
fi

if [ $TEST_UNIT = true ]; then
    cc -o "./out/bc2c" "./bcc/bc2c.c"

    alias bcc='./bcc/bcc.sh'
    alias bc2c='./out/bc2c'
    
    cd tests
    . "./unit-test-all.sh"

    if [ $? != 0 ]; then
        cd ..

        printf "\e[93mSTOPPED\e[0m\n"
        rm "./out/bc2c"
        exit 1
    fi

    cd ..
    
    unalias bcc
    unalias bc2c

    rm "./out/bc2c"
fi

if [ $BREW_PACKAGE = true ]; then
    "./utils/homebrew-package.sh" "$VERSION"

    if [ $BREW_UPDATE = true ]; then
        git add "./out"
        git commit -m "automatic commit by deploy.sh before updating formula"
        git push

        "./utils/homebrew-update.sh" < "./utils/yes"
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

if [ $PUSH_TAG = true ]; then
    git tag "$VERSION"
    git push origin "$VERSION"

    if [ $CREATE_RELEASE = true ]; then
        gh release create -t "Brainfunc-$VERSION" "$VERSION" "./out/homebrew-package.tar.gz"
    fi
fi

if [ $TEST_LOCAL = true ]; then
    "./tests/local-install-test.sh"
    if [ $? != 0]; then
        printf "\e[93mSTOPPED\e[0m\n"
        exit 1
    fi
fi
if [ $TEST_BREW = true ]; then
    "./tests/homebrew-test.sh"
    if [ $? != 0]; then
        printf "\e[93mSTOPPED\e[0m\n"
        exit 1
    fi
fi

if [ $LOCAL_INSTALL = true ]; then
    "./bcc/install.sh"
fi

if [ $BREW_UPGRADE = true ]; then
    brew install shuzaei/brainfunc/brainfunc
    brew upgrade brainfinc
fi