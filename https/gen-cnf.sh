#!/usr/bin/env bash

CONF_DIR=.conf/

if [ ! -d "$CONF_DIR" ]; then
    mkdir -p $CONF_DIR
    echo "Made ${CONF_DIR} directory"
else
    echo "${CONF_DIR} directory already exists"
fi

if [ -e "cnf/ca.cnf" ] && [ -e "cnf/server.cnf" ]; then
    echo "Found ca.cnf and server.cnf"
    if [ -d "$CONF_DIR" ]; then
        echo "Found ${CONF_DIR}"
        cd $CONF_DIR || exit

        # Use ca.cnf to
        # Generate ca-key and ca-cert
        openssl req -new -x509 -days 9999 \
            -config ../cnf/ca.cnf -keyout ca-key.pem -out ca-cert.pem

        # Generate private server key
        openssl genrsa -out private_server_key.pem 4096

        # Use server.cnf to
        # Generate cert signing request (csr)
        openssl req -new -config ../cnf/server.cnf -key private_server_key.pem -out csr.pem

        # Sign csr
        openssl x509 -req -extfile ../cnf/server.cnf -days 999 -passin "pass:password" \
            -in csr.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out cert.pem

        echo "Key generation successful"
    else
        echo "No ${CONF_DIR} directory found"
    fi
else
    echo "No ca- or server-cnf found"
fi

# Then install as a root cert
# sudo cp ca-cert.pem /usr/local/share/ca-certificates/ca-cert.pem
# sudo update-ca-certificates
