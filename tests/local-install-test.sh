#!/bin/bash

root="$(dirname "$0")/.."

"$root/bcc/install.sh"
"$root/tests/unit-test-all.sh"
result=$?
"$root/bcc/uninstall.sh"
[[ result == 0 ]]
