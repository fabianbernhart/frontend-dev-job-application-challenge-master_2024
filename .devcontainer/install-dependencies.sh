#!/bin/bash

{
    nvm install 22 -i && npm install
} || {
    echo "Cant install nvm && install dependencies"
}


