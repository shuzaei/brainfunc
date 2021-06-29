#!/bin/bash

count_ok=0
count_failed=0

files=$(find ./tests/unit-test/ -name *.sh)
for file in $files
do
    $file
    if [ $? = 0 ]; then
        count_ok=$(($count_ok+1))
    else
        count_failed=$(($count_failed+1))
    fi
    printf "\n"
done

printf "\e[93mSummary:\e[0m\n"
printf "    %d test(s), " $(($count_ok+$count_failed))
printf "%d \e[92mOK\e[0m, " $count_ok
printf "%d \e[91mFAILED\e[0m\n" $count_failed

if [ $count_failed = 0 ]; then
    printf "\e[92mOK\e[0m\n"
else
    printf "\e[91mFAILED\e[0m\n"
fi

[[ $count_failed == 0 ]]