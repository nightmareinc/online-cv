#!/bin/bash

service=server.js
port=9000

if [[ $UID -eq 0 ]]; then
    echo "you cannot be root, run by an unprivilaged user"
    exit 1
else
    echo "running, this might take a few seconds..."
fi

echo "pulling latest changes into server"
git pull origin master --tags
if [[ $? -ne 0 ]]; then
    echo "something horribly happened! check the server status"
    exit 2
else
    echo "changes applied"
fi

pid=$(sudo netstat -antp 2>/dev/null | grep $port | head -n1 | sed -r 's/^.* ([0-9]*)\/node/\1/')

if [[ -n $pid ]]; then
    sudo kill $pid
    if [[ $? -eq 0 ]]; then
        echo "process $pid was killed on port $port"
    else
        echo "failed to kill process $pid, something went wrong!"
        exit 3
    fi
else
    echo "no services are already running! skipping..."
fi

npm install &> sudo /tmp/npm-install.log
if [[ $? -ne 0 ]]; then
    echo "some warnings or errors were give while installing npm packages, check log in /tmp/npm-install.log"
else
    echo "npm packages installed"
fi

sudo npm run build &> sudo /tmp/npm-build.log
if [[ $? -ne 0 ]]; then
    echo "some warnings or errors reported while building npm packages, check log in /tmp/npm-build.log"
else
    echo "npm packages built"
fi

if ! [[ -f $service ]]; then
    echo "$service file does not exist, if you renamed it, modify script file on line 4 and rename it here too, otherwise check for its existance"
    exit 4
fi

node $service &
if [[ $? -eq 0 ]]; then
    echo "services are running :)"
else
    echo "failed to run server, cannot ignore it"
    exit 6
fi
