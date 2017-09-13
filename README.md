# README

[dtjv.github.io](http://dtjv.github.io).

## Development

* Install/Update [Homebrew](https://brew.sh/)
* Install [rbenv](https://github.com/rbenv/rbenv) via `brew` command
* Install the latest [Ruby](https://www.ruby-lang.org/en/downloads/) version via `rbenv` command
* Switch to use the latest ruby version via `rbenv` command
* Install [Jekyll](http://jekyllrb.com/) and [Bundler](http://bundler.io/) via `gem` command
* In project root directory, install project dependencies via `bundle` command 
* Build project via `./build` script


## Design


### Build

1. npm install deps
1. post install should copy materialize assets:
  1. sass files go _assets/styles
  1. js/ goes to assets/
  1. fonts/ goes to assets/

> i don't really want to copy those files for every build. once the install, it should be done!
> in the event its not, then there should be a command to fix this issue - so document the gulp command.

1. build sass
  1. will compile sass
  1. prefix the css
  1. remove unused css (checked against html files)
  1. lint css for immutable selectors - this will be tough to get 100% because materialize isn't compliant.
  1. minimize the resultant css

> this process brings compiled css from 177k to 8k!

1. copy images from /_assets/imgs to /assets/imgs

1. run jekyll
