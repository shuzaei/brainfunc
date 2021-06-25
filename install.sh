#!/bin/sh

chmod +x bcc.sh
sudo cp bcc.sh /usr/local/bin/bcc
if [ ! -d /usr/local/brainfunc/ ]; then
    sudo mkdir /usr/local/brainfunc/
fi
sudo cp interpreter.c /usr/local/brainfunc/interpreter.c

