#!/usr/bin/env bash

tmux \
    # Chat server
    new-session "nodemon tcp-chat/tcp_chat_server.mjs"\; \
    # Individual chatters
    split-window "telnet 127.0.0.1 9001"\; \
    split-window "telnet 127.0.0.1 9001"\; \
