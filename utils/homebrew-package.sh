#!/bin/sh

cd $(dirname $0)/../
tar -zcvf out/homebrew-package.tar.gz bcc/
