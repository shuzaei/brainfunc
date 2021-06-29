#!/bin/bash

root="$(dirname "$0")/.."

if [ ! -d "$root/out/" ]; then
    sudo mkdir "$root/out/"
fi

sudo tar -zcvf "$root/out/homebrew-package.tar.gz" bcc
sha256sum "$root/out/homebrew-package.tar.gz" | awk '{print $1}' > "$root/out/homebrew-package.tar.gz.sha256sum"
