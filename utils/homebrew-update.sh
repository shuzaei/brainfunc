#!/bin/bash

root="$(dirname "$0")/.."

printf "\e[93mWarning:\e[0m this operation is unsafe.\n"
printf "Please use only for updating the homebrew formula.\n"

printf "\e[92m?\e[0m Do you want to execute? \e[90m(y/N)\e[0m "

while true
do
    read ANS
    case $ANS in
        [yY][eE][sS] | [yY])
            printf "Yes\n"
            break
            ;;
        [nN][oO] | [nN] | "")
            printf "No\n"
            exit
            ;;
        * )
            printf "\e[91mSorry, again.\e[0m "
            ;;
    esac
done

if [ "$(git branch --contains)" != "* main" ]; then
    printf "\e[91mError:\e[0m Not in branch main\n"
    exit
fi

[[ -z $(git status -s) ]]
if [ $? != 0 ]; then
    printf "\e[91mError:\e[0m Working tree is not clean\n"
    exit
fi

cp "$root/out/brainfunc.rb" "$root/homebrew-brainfunc/"

git submodule foreach git add .
git submodule foreach git commit -m "Update formula from parent repo shuzaei/brainfunc (automatic)"
git submodule foreach git push
git add "$root/homebrew-brainfunc/"
git commit -m "Update formula (automatic)"
git push --recurse-submodules=check