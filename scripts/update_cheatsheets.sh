#!/bin/sh
git submodule update --remote cheatsheets

# True if the length of string is zero.
if [ -z "$1" ]; then
  message="Update cheatsheets"
else
  message="$1"
fi

git commit -m "$message" cheatsheets
