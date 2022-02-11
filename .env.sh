#!/usr/bin/env bash

# .env defaults:
#   PORT=6969
#   HOST='localhost'

if [ ! -f ".env" ]; then
    touch .env
    printf "PORT=6969\nHOST='localhost'\n" >> .env
    echo "Made default .env file"
else
    echo ".env already exists"
fi
