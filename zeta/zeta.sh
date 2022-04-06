#!/usr/bin/env bash

tmux \
    new-session "nodemon --trace-warnings app.mjs"\; \
    split-window "nodemon --delay 2000ms --trace-warnings app.test.mjs"\; \
