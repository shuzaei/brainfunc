#!/bin/bash

id="lang/if"
in=(
    ""
)

out=(
    "$(printf "0%255s" | sed "s/ /1/g")\n"
)

root="$(dirname "$0")/../.."

. "$root/unit-test.sh"
