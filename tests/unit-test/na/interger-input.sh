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

. "$root/unit-test.sh"
