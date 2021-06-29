#!/bin/bash

if [ $# = 1 ]; then
    version="$1"
else
    printf "Usage: %s <version>\n" "$0"
    exit 1
fi

root="$(dirname "$0")/.."

if [ ! -d "$root/out/" ]; then
    sudo mkdir "$root/out/"
fi

sudo tar -zcvf "$root/out/homebrew-package.tar.gz" bcc

sum="$(sha256sum "$root/out/homebrew-package.tar.gz" | awk '{print $1}')"

printf "\nSHA256 hashsum of %s:\n$sum\n" "homebrew-package.tar.gz"
printf "$sum" > "$root/out/homebrew-package.tar.gz.sha256sum"

sed -e "s/__VERSION__/$version/g" -e "s/__SHA256__/$sum/g" \
    "$root/utils/homebrew-template.rb" > "$root/out/brainfunc.rb"