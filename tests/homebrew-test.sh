#!/bin/bash

root="$(dirname "$0")/.."

brew install shuzaei/brainfunc/brainfunc
"$root/tests/unit-test-all.sh"
brew uninstall brainfunc