#!/bin/sh

cd $(dirname $0)/../

if [ ! -d out/ ]; then
    sudo mkdir out/
fi

tar -zcvf out/homebrew-package.tar.gz bcc/
