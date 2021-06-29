#!/bin/bash

root="$(dirname "$0")/.."

"$root/bcc/install.sh"
"$root/tests/unit-test-all.sh"
"$root/bcc/uninstall.sh"