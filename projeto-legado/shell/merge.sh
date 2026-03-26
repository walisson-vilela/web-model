#!/usr/bin/env bash

git remote set-url origin "$BITBUCKET_GIT_SSH_ORIGIN"
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin develop
git switch develop

DIFF=$(git diff --shortstat $BITBUCKET_BRANCH develop)
# if answer is empty or "Already up to date!", skip merge
if [ -n "$DIFF" ] && [ "$DIFF" != "Already up to date!" ]; then
  git merge --no-ff $BITBUCKET_BRANCH -m "auto-merge $BITBUCKET_BRANCH -> develop"
  git push origin develop
fi
