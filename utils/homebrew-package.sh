#!/bin/sh

cd $(dirname $0)/../

if [ ! -d out/ ]; then
    sudo mkdir out/
fi

sudo tar -zcvf out/homebrew-package.tar.gz bcc
sha256sum out/homebrew-package.tar.gz
