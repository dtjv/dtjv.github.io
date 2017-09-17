# README

This branch holds the source code to my website - [dtjv.io](http://dtjv.io).

## Tech Stack

* [Jekyll](http://jekyllrb.com)
* [Sass](http://sass-lang.com/)
* [Materialize](http://materializecss.com/)

### A Complete List

Here's a full software list I use in order to install/use the tech stack listed above.

* Install [Homebrew](https://brew.sh/)
* Use `brew` to install [rbenv](https://github.com/rbenv/rbenv)
* Use `brew` to install [nvm](https://github.com/creationix/nvm)
  * *The homebrew install is not supported by creationix - but oh well, it works!*
* Use `nvm` to install [Node](https://nodejs.org/en/)
* Use `rbenv` to install [Ruby](https://www.ruby-lang.org/en/downloads/)
  * Use `rbenv` to switch to the latest ruby version
* Use `gem` to install [Jekyll](http://jekyllrb.com/)
* Use `gem` to install [Bundler](http://bundler.io/)
* Use `gem` to install [Sass](http://sass-lang.com/)
* Use `bundle` to install Gemfile dependencies

Once you've got this far, follow the [Quick Start](#quick-start) steps to get up and running.

## Quick Start

Clone Repo:

```sh
$ git clone https://github.com/dtjv/dtjv.github.io.git
```

Install dependencies:

```sh
$ cd dtjv.github.io/
$ npm install
```

Build site:

```sh
$ npm run build
```

Start server:

```sh
$ npm start
```

Navigate to `http://localhost:8080`.

## Development

### Commands

#### clean

Removes all generated html and copied assets.

```sh
$ npm run clean
```

### build

Builds the site with Sass/CSS optimizations.

```sh
$ npm run build
```

#### watch

Builds the site and watches for file changes. Rebuilds when files change. 

```sh
$ npm run watch
```

#### start

Starts `live-server` and opens browser to generated site. Reloads when files change.

```sh
$ npm start
```

#### deploy 

Builds, commits and pushes production site to dtjv.github.io master branch.

```sh
$ npm run deploy
```

## Design

### Goals

1. Build a Jekyll based website where I can tweak the styles prior to deployment.

### Challenges

1. How do I incorporate Materialize Sass from npm and still use Jekyll?
1. How do I modify Jekyll processed CSS to just include what the HTML files use?
1. How can I centralize all configuration settings?
1. How do I create a simple build process? 
1. How do I deploy a site to GitHub Pages when I need to process files(i.e. CSS) **after** Jekyll builds the site?

### Solutions

#### Materialize Sass

I wanted to import the [npm module of Materialize CSS](https://www.npmjs.com/package/materialize-css) for easy future upgrades. This meant I had to add a build step that copied the Materialize distribution (and Sass source) files into my project.

#### PostCSS

My build process adds a step to process CSS in the following way:

* Adds vendor prefixes to CSS rules via [autoprefixer](https://www.npmjs.com/package/autoprefixer).
* Removes unused CSS via [uncss](https://www.npmjs.com/package/postcss-uncss).
* Checks for CSS immutability via [immutable-css](https://www.npmjs.com/package/immutable-css)
* Minifies CSS via [cssnano](https://www.npmjs.com/package/cssnano)

All these are [PostCSS](https://www.npmjs.com/package/postcss) plugins. The result? Jekyll processed CSS is 177kb. After this build step, CSS is 8kb!

#### Configuration

Since Jekyll uses `_config.yml`, I just store all my configuration in there and let my build script read and parse it via [js-yaml](https://www.npmjs.com/package/yaml-js).

#### Build 

I decided to use a [Gulp](https://gulpjs.com/) as my build tool. 

#### Deployment

I wrote a shell script that will do the following:

1. Build production version of site
1. Clone master branch locally and remove everything 
1. Copy the newly built site to the master branch clone
1. Commit and push the master branch clone to origin
1. Remove local clone

## Resources

For how to build a gulpfile with Jekyll:
* https://savaslabs.com/2016/10/19/optimizing-jekyll-with-gulp.html

For how to build a deployment shell script:
* https://github.com/savaslabs/savaslabs.github.io

For introducing me to the excess CSS I send to clients:
* http://johnotander.com/jekyll/2015/06/26/jekyll-and-uncss/

## Todo

* [ ] "price listed is per person per session" - wraps on tablet and gets hidden under "Learn More" button
* [ ] swap out live-server for browser-sync to test on mobile

## License

MIT © David Valles
