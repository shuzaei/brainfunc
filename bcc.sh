#!/bin/sh

if [ $# = 0 ]; then
    printf "Usage: $0 <filename> [execname]\n"
    exit 1
elif [ $# = 1 ]; then
    execfile="a.out"
elif [ $# = 2 ]; then
    execfile=$2
else
    printf "\e[31mError:\e[0m Too many argments\n"
    exit 1
fi

if [ ! -e $1 ]; then
    printf "\e[31mError:\e[0m $1: No such file or directory\n"
    exit 1
fi

intexec=`mktemp "/tmp/tmp.XXXXXX.out"`
cfile=`mktemp "/tmp/tmp.XXXXXX.c"`

cc /usr/local/brainfunc/interpreter.c -o $intexec
if [ $? -gt 0 ]; then
    rm $intexec
    exit 1
fi

$intexec $1 > $cfile
if [ $? -gt 0 ]; then
    rm $intexec
    rm $cfile
    exit 1
fi

cc $cfile -o $execfile
if [ $? -gt 0 ]; then
    rm $intexec
    rm $cfile
    rm $execfile
    exit 1
fi

rm $intexec
rm $cfile
