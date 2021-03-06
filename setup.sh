#!/bin/bash

root_directory=hosseinazadi
service=server.js
logfile=/tmp/$root_directory.log
port=9000
# color codes
RED="\e[31m"
GREEN="\e[32m"
BLUE="\e[34m"
BOLD="\e[1m"
BLINK="\e[5m"
STRIKE_THROUGH="\e[9m"
DEFAULT="\e[39m\e[49m\e[0m"

if [[ $UID -eq 0 ]]; then
    echo -e $BOLD"you cannot be root, run by an unprivilaged user"$DEFAULT
    exit 1
else
    echo -e $BLUE"running, this might take a few seconds..."$DEFAULT
fi

pid=$(sudo netstat -antp 2>/dev/null | grep -E "$port.*\/node" | sed -r 's/^.*\ ([0-9]*)\/node.*$/\1/')

if [[ -n $pid ]]; then
    sudo kill $pid 2>/dev/null
    if [[ $? -eq 0 ]]; then
        echo -e $BLUE"process $pid was killed on port $port"$DEFAULT
    else
        echo -e $BOLD"failed to kill process $pid, something went wrong!"$DEFAULT
        exit 3
    fi
else
    echo -e $BLUE"no services are already running! skipping..."$DEFAULT
fi

echo -e $BLUE"installing node packages, this might take a few seconds..."$DEFAULT
sudo npm install &>$logfile
if [[ $? -ne 0 ]]; then
    echo -e $BOLD"something went wrong while installing npm packages, cannot ignore it"$DEFAULT
    echo "log -> /tmp/setup.log"
    exit 5
else
    echo -e $GREEN"npm packages installed"$DEFAULT
fi

node $service &
if [[ $? -eq 0 ]]; then
    echo -e $GREEN"service is running in background"$DEFAULT
    if [ -f $logfile ]; then rm -f $logfile; fi
else
    echo -e $BOLD"failed to run server, cannot ignore it"$DEFAULT
    exit 6
fi
