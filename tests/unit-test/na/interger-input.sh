#!/bin/bash

id="na/integer-input"
in=(
    "abcdefgh12345678ABCDEFGH\n"
    "100 99\n"
    "1234567812345678\n"
)
out=(
    "0000000012345678\n"
    "0000000000000100\n"
    "1234567812345678\n"
)

root="$(dirname "$0")/../.."

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
[[ $flag == true ]]
