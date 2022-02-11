#!/usr/bin/env bash

SECRET_DIR=.secrets/

if [ ! -d "$SECRET_DIR" ]; then
    mkdir $SECRET_DIR
    echo "Made secret directory"
else
    echo "Secret directory already exists"
fi

if [ -d "$SECRET_DIR" ]; then
    cd $SECRET_DIR || exit
    if [ ! -f "ca.key" ]; then
        ### CA
        # Generate key (to sign all certs)
        openssl genrsa -des3 -out ca.key 4096
        # Generate certificate with said key
        openssl req -new -x509 -days 365 -key ca.key -out ca.crt

        ### SERVER
        # Generate server key
        openssl genrsa -out server.key 1024
        # Request signature of server key
        openssl req -new -key server.key -out server.csr
        # Sign signature request with ca.crt
        openssl x509 -req -days 365 -in server.csr \
            -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

        ### CLIENT
        # Generate client key
        openssl genrsa -out client.key 1024
        # Request signature of client key
        openssl req -new -key client.key -out client.csr
        # Sign signature request with ca.crt
        openssl x509 -req -days 365 -in client.csr \
            -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt
        echo "Key generation successful"
    else
        echo "ca.key already exists. Nothing was generated"
    fi
fi
