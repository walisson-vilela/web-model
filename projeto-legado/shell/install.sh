#!/usr/bin/env bash

./exec.sh stop

if [[ " $@ " =~ " -rm " ]]; then
  sudo rm -rf ./node_modules/
fi

docker compose build --force-rm

./exec.sh yarn install --ignore-optional

if [[ " $@ " =~ " -check " ]]; then
  ./exec.sh yarn depcheck
fi

./exec.sh stop
