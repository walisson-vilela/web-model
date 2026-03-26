#!/usr/bin/env bash

MESSAGE=$(git log --pretty=oneline "$BITBUCKET_COMMIT" | awk '$0~var {print $4}' var="$BITBUCKET_COMMIT")
PREFIX=${MESSAGE%/*}
SUFIX=${MESSAGE#*/}

git switch -c "$BITBUCKET_COMMIT"

if [ "$PREFIX" = "release" ]; then
    git tag -a "v$SUFIX" -m "build release v$SUFIX"
else
    ./exec.sh autotag b
fi

git push --tags
