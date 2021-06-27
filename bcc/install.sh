#!/bin/sh

cd $(dirname $0)

chmod +x bcc.sh
if [ ! -d /usr/local/bin/ ]; then
    sudo mkdir -p /usr/local/bin/
fi
sudo cp bcc.sh /usr/local/bin/bcc
if [ ! -d /usr/local/lib/ ]; then
    sudo mkdir -p /usr/local/lib/
fi
sudo cp bc2c.c /usr/local/lib/bc2c.c
