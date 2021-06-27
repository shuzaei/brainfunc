#!/bin/sh
#
#   Copyright 2021 shuzaei
#
#   Contact: shuzaei@gmail.com
#   URL: https://github.com/shuzaei/brainfunc/
#

if [ $# = 0 ]; then
    printf "Usage: $0 <filename> [output filename]\n"
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

bc2c=`mktemp "/tmp/tmp.XXXXXX.bc2c.out"`
c=`mktemp "/tmp/tmp.XXXXXX.`basename $1`.c"`

cc /usr/local/brainfunc/bc2c.c -o $bc2c
if [ $? -gt 0 ]; then
    exit 1
fi

$bc2c $1 > $c
if [ $? -gt 0 ]; then
    rm $bc2c
    rm $c
    exit 1
fi

cc $c -o $out
if [ $? -gt 0 ]; then
    rm $bc2c
    rm $c
    exit 1
fi

rm $bc2c
rm $c
