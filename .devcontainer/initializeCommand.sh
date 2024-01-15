#!/usr/bin/env bash

echo "Initialize...."

sudo chown -R $USER:$USER .

rm -rf .devcontainer/.env
cp .env .devcontainer/.env
