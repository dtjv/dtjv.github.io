#!/bin/bash

# enable error reporting to the console
set -e

# set variables
src=~/sw/sites/dtjv.github.io/_site
tmp=~/tmp/dtjv.github.io.master

# prep target dir
rm -rf $tmp

# build the site
npm run build

# checkout master and remove everthing
git clone https://github.com/dtjv/dtjv.github.io.git $tmp
cd $tmp
git checkout master
rm -rf *

# copy generated HTML from 'source' branch to 'master' branch of clone
cp -R $src/* .

#
rm .editorconfig
rm .gitignore

# commit and push generated content to 'master' branch
git status
git add -A .
git status
git commit -a -m "Auto deployed"
git push origin master

# cleanup
rm -rf $tmp

echo "Site deployed!"
