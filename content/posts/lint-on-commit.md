---
title: Lint on Commit
date: 2021-02-09
description:
draft: false
template: post
---

On a recent project, I decided to give
[lint-staged](https://github.com/okonet/lint-staged) a try. For those who don't
know, it's a tool that runs linters against staged git files, thus preventing
poor code from slipping into the project code base.

I installed `lint-staged` and setup my `package.json` as follows.
[Husky](https://github.com/typicode/husky/tree/main) is a tool that runs
configured git hooks.

```json
{
  "scripts": {
    "type-check": "tsc --pretty --noEmit"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.@(ts|tsx)": ["yarn type-check"]
  }
}
```

When I tried to commit a change, the type check command failed, reporting errors
in packages within the `node_modules` folder. That's odd, since `tsconfig.json`
ignores `node_modules`.

The issue resides in how `lint-staged` calls `tsc`. It passes git staged files
to `tsc` via the command line, which means `tsc` ignores `tsconfig.json`.
([see reference](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson)).

My first fix moved the type check task to a different git hook.

```json
{
  "husky": {
    "hooks": {
      "pre-push": "yarn type-check"
    }
  }
}
```

Although, this prevented `lint-staged` from running the command, it had two
consequences.

1. Each call to `git push` will type check the _whole_ project
1. I can commit code with type check errors

I can live with #1, but #2 kind of defeats the whole purpose of the automatic
type checking.

An alternative approach uses a `lint-staged.config.js` file, and follow this
[example](https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments).

I removed the `lint-staged` block from `package.json` and created a
`lint-staged-config.js` file as follows:

```javascript
module.exports = {
  '**/*.ts?(x)': () => 'yarn type-check',
}
```

In this setup, `lint-staged` runs `type-check` without command-line arguments.
`tsc` will run using `tsconfig.json` and process the whole project. This setup
is okay, but I had other `lint-staged` tasks to run as well and I didn't want to
move more tasks into the config file and add complexity.

### Husky v5

While my setup above was technically complete, I saw
[typicode](https://github.com/typicode) released husky v5 and decided to try it.

I installed husky v5, removed `lint-staged.config.js` and setup my
`package.json` as follows:

```json
{
  "scripts": {
    "format": "prettier -w .",
    "lint": "eslint .",
    "type-check": "tsc --pretty --noEmit",
    "postinstall": "is-ci || husky install"
  },
  "lint-staged": {
    "*.@(js|ts|tsx)": ["yarn lint", "yarn format"]
  }
}
```

You can see I've included the other scripts I needed to run pre-commit. Next, I
ran the following command:

```bash
# this creates `.husky/pre-commit` shell script
$ npx husky add .husky/pre-commit "yarn lint-staged"
```

Lastly, I modified `.husky/pre-commit` to run the type check script. Here's the
pre-commit script:

```sh
#!/bin/sh

[ -n "$CI" ] && exit 0

. "$(dirname "$0")/_/husky.sh"

yarn type-check
yarn lint-staged
```

## Wrap-up

With this setup, I can run all my scripts manually from the command-line -
something I couldn't do in previous setups. Linting and formatting scripts run
on staged files - keeping their execution times low. Lastly, type checking is
part of the pre-commit hook - preventing errors from sneaking into the code
base.

Now I'm happy with this setup. It's simple, clear and concise. You can see this
setup in action [here](https://github.com/dtjv/next-poc).
