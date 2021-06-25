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

logfile=`mktemp "/tmp/tmp.XXXXXX.log"`
intexec=`mktemp "/tmp/tmp.XXXXXX.out"`
cfile=`mktemp "/tmp/tmp.XXXXXX.c"`

cc /usr/local/brainfunc/interpreter.c -o $intexec >> $logfile 2>&1
if [ $? -gt 0 ]; then
    rm $intexec >> $logfile
    printf "\e[31mError:\e[0m cc: interpreter.c: Compile error\n"
    exit 1
fi

$intexec $1 > $cfile 2>>$logfile
if [ $? -gt 0 ]; then
    rm $intexec >> $logfile
    rm $cfile >> $logfile
    printf "\e[31mError:\e[0m $intexec: Interpret error\n"
    exit 1
fi

cc $cfile -o $execfile 2>>$logfile
if [ $? -gt 0 ]; then
    rm $intexec >> $logfile
    rm $cfile >> $logfile
    rm $execfile >> $logfile
    printf "\e[31mError:\e[0m cc: $cfile: Compile error\n"
    exit 1
fi

rm $intexec >> $logfile
rm $cfile >> $logfile
