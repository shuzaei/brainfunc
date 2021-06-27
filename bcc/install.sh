#!/bin/sh

cd $(dirname $0)

chmod +x bcc.sh
if [ ! -d /usr/local/bin/ ]; then
    sudo mkdir -p /usr/local/bin/
fi
sudo cp bcc.sh /usr/local/bin/bcc
if [ ! -d /usr/local/brainfunc/ ]; then
    sudo mkdir -p /usr/local/brainfunc/
fi
sudo cp bc2c.c /usr/local/brainfunc/bc2c.c
