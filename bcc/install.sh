#!/bin/bash

dir="$(dirname "$0")"

if [ ! -d /usr/local/bin/ ]; then
    sudo mkdir -p /usr/local/bin/
fi

chmod +x "$dir/bcc.sh"
sudo cp "$dir/bcc.sh" /usr/local/bin/bcc
cc -o /usr/local/bin/bc2c "$dir/bc2c.c"
