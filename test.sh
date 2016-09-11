#!/bin/bash

finish() {
  docker-compose down
}

trap finish EXIT

docker-compose up -d &
./wait-for-it.sh localhost:28015
sleep 5
mocha --opts tests/mocha.opts tests/**/*-test.ts
