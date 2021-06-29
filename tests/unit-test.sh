#!/bin/bash

printf "Start an unit test for \e[94m%s\e[0m\n" "$id"

bcc "$root/$id.bc" "$root/$id"

flag=true

for ((i = 0; i < ${#in[@]}; i++)) {
    diff <("$root/$id" < <(printf "${in[i]}")) <(printf "${out[i]}")
    if [ $? = 0 ]; then
        printf "[test %d/%d] \e[92mOK\e[0m\n" $(($i+1)) ${#in[@]}
    else
        printf "[test %d/%d] \e[91mFAILED\e[0m\n" $(($i+1)) ${#in[@]}
        flag=false
    fi
}

if [ $flag = true ]; then
    printf "\e[92mOK\e[0m\n"
else
    printf "\e[91mFAILED\e[0m\n"
fi

rm "$root/$id"

[[ $flag == true ]]