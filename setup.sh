#!/bin/bash

root_directory=hosseinazadi
service=server.js
port=9000

if [[ $UID -eq 0 ]]; then
    echo "you cannot be root, run by an unprivilaged user"
    exit 1
else
    echo "running, this might take a few seconds..."
fi

pid=$(netstat -antp 2>/dev/null | grep -E "8000.*\/node" | sed -r 's/^.*\ ([0-9]*)\/node.*$/\1/')

if [[ -n $pid ]]; then
    sudo kill $pid 2>/dev/null
    if [[ $? -eq 0 ]]; then
        echo "process $pid was killed on port $port"
    else
        echo "failed to kill process $pid, something went wrong!"
        exit 3
    fi
else
    echo "no services are already running! skipping..."
fi

sudo npm install &>/tmp/setup.log
if [[ $? -ne 0 ]]; then
    echo "something went wrong while installing npm packages, cannot ignore it"
    echo "log -> /tmp/setup.log"
    exit 5
else
    echo "npm packages installed"
fi

node $service &
if [[ $? -eq 0 ]]; then
    echo "services are running :)"
    if [ -f /tmp/setup.log ]; then rm -f /tmp/setup.log; fi
else
    echo "failed to run server, cannot ignore it"
    exit 6
fi
