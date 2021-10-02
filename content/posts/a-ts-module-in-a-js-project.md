---
title: A TypeScript module in a JavaScript Project
date: 2021-10-01
description: How my published TypeScript module failed in a JavaScript project.
draft: false
template: post
---

<!-- intro -->

In January, 2021, I published [@dtjv/sm-2](https://github.com/dtjv/sm-2), a
TypeScript package that implements the
[SM2 algorithm](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2).
It passed linting, type-check and unit testing for a confidence boosting 100%
coverage report. Yet, it failed as soon as I integrated it into my vanilla
JavaScript application. How could this be? Read on to find out.

<!-- intro -->

## What assumptions did I make?

As a developer of a TypeScript module, my development environment is setup to
verify my code is type safe. In order for my tests to compile and run, I must
use the module as intended - which I expect other developers to do as well.

It's wrong to assume other developers are running an environment that guides
them to the proper path of usage. And in my case, the project that used this
module had no type-checking tools running. I never received a heads-up that
arguments I passed in where not type verified, and thus potentially invalid.

Still, all my tests passed and code coverage was great - what's missing?

## What does 100% coverage mean?

At a superficial level, 100% coverage means every line executed at least once
during testing. If all tests pass, then there exists a happy path to success for
the data provided in the test cases. But coverage statistics and passing tests
say nothing about code correctness for data **not** provided, nor do they say
anything about the correctness of every program state.

Without the "safety net" of a type-checker, and no confidence in test
completeness, it's obvious my TypeScript module is a vanilla JavaScript program
without comprehensive parameter validation.

## How to test TypeScript for a JavaScript environment?

Once I implemented the validation logic, I disabled the automatic type-checking
when tests run. This change allowed test cases for invalid data inputs to run
free from the restrictions of type-checking rules.

As expected, I continue to receive type-errors for the invalid data test cases
in my code editor and via a type-check script - and I ignore them.

### A Short Example

For future reference, here's an example of the setup I'm using.

```bash
# sample project layout
app/
├── package.json
├── src/
│   └── index.ts
├── tests/
│   └── index-test.ts
├── tsconfig.json
└── tsconfig.xo.json
```

My TypeScript module project uses the test framework,
[node-tap](https://node-tap.org) which relies on
[ts-node](https://typestrong.org/ts-node/) to run test files written in
TypeScript. Below, I add ts-node configuration to `tsconfig.json` that disables
type-checking.

> Code blocks snipped for brevity.

```json:title=tsconfig.json
{
  "include": ["src"],
  "ts-node": {
    "transpileOnly": true
  }
```

Here, I added a separate type-check script to `package.json`.

```json:title=package.json
{
  "scripts": {
    "test": "tap --ts",
    "type-check": "tsc --pretty --noEmit --project tsconfig.xo.json"
  }
}
```

For clarity, you can see the `tsconfig.xo.json` adds the `tests/` folder.

```json:title=tsconfig.xo.json
{
  "extends": "./tsconfig.json",
  "include": ["src", "tests"]
}
```

## Summary

I find TypeScript a great tool to improve code quality, but it guarantees
nothing. In the end, confidence in correctness relies on the robustness of the
code and the breadth of our tests - not just the type annotations.

And, I need to validate my parameters better. 🤪

Thanks for reading.
