#!/bin/bash

# enable error reporting to the console
set -e

function usage
{
  echo ""
  echo "Usage: REPO=<repo name> deploy"
  echo ""
}

# ensure REPO environment variable is set
if [ "$REPO" = "" ]; then
  usage
  exit 1
fi

# set local variables
src=~/sw/sites/$REPO/_site
tmp=~/tmp/$REPO.master

# prep target dir
rm -rf $tmp

# build the site
npm run build

# checkout master and remove everthing
git clone https://github.com/dtjv/$REPO.git $tmp
cd $tmp
git checkout master
rm -rf *

# copy generated HTML from 'source' branch to 'master' branch of clone
cp -R $src/* .

# commit and push generated content to 'master' branch
git status
git add -A .
git status
git commit -a -m "Auto deployed"
git push origin master

# cleanup
rm -rf $tmp

echo ""
echo "Site deployed!"
