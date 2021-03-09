---
title: Lint on Commit
date: 2021-02-09
description:
  My project setup to lint and type check my TypeScript code on commits.
draft: false
template: post
---

<!-- intro -->

On a recent project, I decided to give
[`lint-staged`](https://github.com/okonet/lint-staged) a try. For those who
don't know, it's a tool that runs linters against staged git files, thus
preventing poor code from slipping into the project code base. As I followed two
implementations, [here](https://github.com/paulintrognon/next-typescript) and
[here](https://github.com/vercel/next.js/tree/canary/examples/with-typescript-eslint-jest),
I made my changes and stumbled down yet another hole of tooling pain.

<!-- intro -->

To begin, I installed `lint-staged` and setup my `package.json` .

```json:title=package.json
{
  "scripts": {
    "format": "prettier -w .",
    "lint": "eslint . --ext ts --ext tsx",
    "type-check": "tsc --pretty --noEmit"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.@(ts|tsx)": ["yarn format", "yarn lint", "yarn type-check"]
  }
}
```

You'll notice I use [`husky`](https://github.com/typicode/husky) - a tool that
runs configured git hooks.

When I tried to commit a change, the `type-check` script failed, reporting
errors in packages within the `node_modules` folder. That's odd, since
`tsconfig.json` ignores `node_modules`.

The issue resides in how `lint-staged` calls `tsc`. It passes git staged files
to `tsc` via the command line, which means `tsc` ignores `tsconfig.json`.
([reference](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson)).

## Fix #1

My first fix moved the call to `type-check` to a different git hook and removed
it from the `lint-staged` call list.

```json:title=package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "yarn type-check"
    }
  },
  "lint-staged": {
    "*.@(ts|tsx)": ["yarn format", "yarn lint"]
  }
}
```

This setup works, but I saw two consequences to this change.

1. `type-check` checks the **entire** project on each `git push`.
1. `type-check` runs **after** a commit, potentially allowing errors into the
   code base.

I can live with #1, but #2 defeats the whole purpose of the automatic type
checking to ensure no errors get committed..

## Fix #2

An alternative approach follow this
[example](https://github.com/okonet/lint-staged#example-run-tsc-on-changes-to-typescript-files-but-do-not-pass-any-filename-arguments).
I removed the `lint-staged` block from `package.json` and created a
`lint-staged-config.js` file as follows:

```javascript:title=lint-staged-config.js
module.exports = {
  '**/*.ts?(x)': () => 'yarn type-check',

  '**/*.(ts|js)?(x)': (filenames) => `yarn lint ${filenames.join(' ')}`,

  '**/*.js?(x)': (filenames) =>
    filenames.map((filename) => `prettier --write '${filename}'`),
}
```

In this setup, `lint-staged` runs `type-check` without command-line arguments
and `tsc` will run using `tsconfig.json`. This solution is cool, but perhaps
unnecessarily complex.

## Husky v5

While my setup above was technically complete, I saw
[typicode](https://github.com/typicode) released husky v5 and decided to try it.
I installed husky v5, removed `lint-staged.config.js` and setup my
`package.json`.

```json:title=package.json
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

Next, I ran the following command.

```bash
$ npx husky add .husky/pre-commit "yarn lint-staged"
```

Lastly, I modified `.husky/pre-commit` - created in the last step - to run the
`type-check` script. Here's my final `pre-commit` script.

```bash:title=pre-commit
#!/bin/sh

[ -n "$CI" ] && exit 0

. "$(dirname "$0")/_/husky.sh"

yarn type-check
yarn lint-staged
```

## Wrap-up

With this setup, I can run all my scripts manually from the command-line. The
linting and formatting scripts run on staged files - keeping their execution
times low. Lastly, type checking is part of the pre-commit hook - preventing
errors from sneaking into the code base.

I'm happy with this setup. It's simple, clear and concise. You can see this
setup in action [here](https://github.com/dtjv/next-poc).
