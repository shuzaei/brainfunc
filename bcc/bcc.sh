#!/bin/sh
#
#   Copyright 2021 shuzaei
#
#   Contact: shuzaei@gmail.com
#   URL: https://github.com/shuzaei/brainfunc/
#

if [ $# = 0 ]; then
    printf "Usage: bcc <filename> [output filename]\n"
    exit 1
elif [ $# = 1 ]; then
    out="a.out"
elif [ $# = 2 ]; then
    out=$2
else
    printf "\e[31mError:\e[0m Too many argments\n"
    exit 1
fi

if [ ! -e $1 ]; then
    printf "\e[31mError:\e[0m $1: No such file or directory\n"
    exit 1
fi

bc2c="/tmp/tmp.bc2c.$(uuidgen).out"
c="/tmp/tmp.$(basename $1 .bc).$(uuidgen).c"

cc -o $bc2c "$(dirname $0)/../lib/bc2c.c"
if [ $? -gt 0 ]; then
    exit 1
fi

$bc2c $1 > $c
if [ $? -gt 0 ]; then
    rm $bc2c
    rm $c
    exit 1
fi

cc -o $out $c
if [ $? -gt 0 ]; then
    rm $bc2c
    rm $c
    exit 1
fi

rm $bc2c
rm $c
