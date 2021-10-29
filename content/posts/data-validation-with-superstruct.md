---
title: Data Validation with Superstruct
date: 2021-08-05
description:
draft: false
template: post
---

<!-- intro -->

I came across [Superstruct](https://docs.superstructjs.org/) from the
[React Hook Form](https://react-hook-form.com/) documentation - in particular
the [schema-based](https://react-hook-form.com/get-started#SchemaValidation)
form validation. Since I wasn't thrilled about burying form field validation
logic inside JSX, I choose to use Superstruct. In this short post, I'll walk
through an example of how to use Superstruct for simple to slightly more complex
data validation.

<!-- intro -->

- View the
  [source code](https://github.com/dtjv/blog-demos/tree/main/data-validation-with-superstruct).

## Superstruct Schema

Superstruct provides an intuitive API to define the shape of your application
data and functions to validate that data at runtime. You can compose type
annotations and utility functions to build complex data structures and more
refined data validation checks.

> In Superstruct parlance, the `Struct` is the data structure created and
> returned by Superstruct utilities. In this post, I use `Schema` in place of
> `Struct`.

We start by creating a schema to describe our data.

```typescript:title=index.ts
import * as ss from 'superstruct'

const PersonSchema = ss.object({
  name: ss.string(),
  password: ss.string()
})
```

Next, we add a data object and validation logic.

```typescript:title=index.ts
// ...snipped for brevity...

const person = {
  name: 'joe',
  password: 'admin',
}

ss.is(person, PersonSchema) // returns true
```

Okay, we've got a working example. In the next sections, we'll add TypeScript
types to our data object and tighten up validation for `name` and `password`
properties.

## TypeScript Types

One option to type our data object is to create an interface.

```typescript:title=index.ts
// ...snipped for brevity...

interface Person {
  name: string
  password: string
}

const person: Person = {
  name: 'joe',
  password: 'admin',
}
```

The downside to the approach above is the duplication of defining a schema _and_
a TypeScript interface. Depending on your project structure and data complexity,
keeping the two in sync might become a burden to maintain.

The good news is Superstruct provides the `Infer` utility to derive TypeScript
types from a Superstruct schema. We can replace our interface definition with
the following line.

```typescript
type Person = ss.Infer<typeof PersonSchema>
```

## Data Validation

Our example thus far validates `name` and `password` as type string - which is a
bit too broad. Let's refine the types by composing Superstruct's utilities.

```typescript:title=index.ts
import * as ss from 'superstruct'

const alphanum = () => ss.pattern(ss.string(), /[a-zA-Z0-9]/)
const password = () => ss.pattern(ss.string(), /^[a-zA-Z0-9*:?]{3,6}$/)

const PersonSchema = ss.object({
  name: ss.defaulted(ss.size(alphanum(), 3, 30), 'admin'),
  password: password()
})

type Person = ss.Infer<typeof PersonSchema>

const admin: Pick<Person, 'password'> & Partial<Person> = {
  password: '?g4Lxx'
}

const [error, admin] = ss.validate(person, PersonSchema)

if (error) {
  console.error(error)
} else {
  console.log(admin)
}
```

In the snippet above, `alphanum` and `password` are custom validation functions
that compose Superstruct's `pattern` and `string` utilities. The `PersonSchema`
further refines the `name` property to a length between 3 and 30 characters and
sets a default value if `name` is not provided.

The use of Superstruct's `defaulted` utility implies that `name` is optional.
Superstruct's `Infer` utility does not recognize this nuance and creates the
`Person` type with `name` required. As a result, I've typed the `admin` data
object in a way to make `password` required and `name` optional.

If we run the code above, the `validate` function will fail, returning the
following error.

```
StructError: At path: name -- Expected a string, but received: undefined {
  value: undefined,
  type: 'string',
  refinement: undefined,
  key: 'name',
  path: [ 'name' ],
  branch: [ { password: '?g4Lxx' }, undefined ],
  failures: [Function (anonymous)]
}
```

This error is due to the `defaulted` function not executing. The `defaulted`
function is a _coerce_ function that runs before validation - if configured to.
To run coerce utilities before validation, pass the `{ coerce: true }` option to
the `validate` function.

```typescript:title=index.ts
// ...snipped for brevity...

const [error, admin] = ss.validate(person, PersonSchema, { coerce: true })
```

With the change above, and the program re-run, the output changes to the
following.

```
{ password: '?g4Lxx', name: 'admin' }
```

It's important to note, on successful validations, the `validate` function will
return a reference to the original data object passed - changed and augmented by
Superstruct's coercing functions.

## Complex Validation Rules

Validation rules become complex in real-world applications. Let's simulate a
more realistic scenario by introducing a `role` property that's limited to a set
of values, a `repeatPassword` that must match `password` (if `password` exists)
and a `token` field that has a mutually exclusive relationship to `password` and
`repeatPassword`.

```typescript:title=index.ts
import * as ss from 'superstruct'

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const alphanum = () => ss.pattern(ss.string(), /[a-zA-Z0-9]/)
const password = () => ss.pattern(ss.string(), /^[a-zA-Z0-9*:?]{3,6}$/)

const BaseSchema = ss.object({
  name: ss.defaulted(ss.size(alphanum(), 3, 30), 'admin'),
  role: ss.defaulted(ss.enums([Roles.USER, Roles.ADMIN]), Roles.ADMIN),
  token: ss.optional(ss.union([ss.number(), ss.string()])),
  password: ss.optional(password()),
  repeatPassword: ss.optional(password()),
})

// ...snipped for brevity...
```

The first addition above is the `enum` constants definition to represent valid
roles. I use the Superstruct `enums` utility to list valid values and also pass
it a default value - implicitly making `role` optional.

Next, I added the optional `token` field that can be a number or a string and I
added the `repeatPassword` field that must conform to the custom password
validation function.

Take note that all schema fields are now optional - some marked explicitly,
others implicitly set by the `defaulted` utility. This will simplify our data
object typing later.

Also notice I renamed the schema as `BaseSchema`. We need `BaseSchema` as a
starting point for one more composition step to build the `token`, `password`
and `repeatPassword` conditional validations. The `PersonSchema` will be the
resultant schema of all composition steps.

```typescript:title=index.ts
import * as ss from 'superstruct'

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

const alphanum = () => ss.pattern(ss.string(), /[a-zA-Z0-9]/)
const password = () => ss.pattern(ss.string(), /^[a-zA-Z0-9*:?]{3,6}$/)

const BaseSchema = ss.object({
  name: ss.defaulted(ss.size(alphanum(), 3, 30), 'admin'),
  role: ss.defaulted(ss.enums([Roles.USER, Roles.ADMIN]), Roles.ADMIN),
  token: ss.optional(ss.union([ss.number(), ss.string()])),
  password: ss.optional(password()),
  repeatPassword: ss.optional(password()),
})

const PersonSchema = ss.intersection([
  ss.refine(BaseSchema, 'PasswordOrToken', (schema) =>
    schema.password || schema.repeatPassword
      ? !!schema.token
        ? false
        : true
      : !!schema.token
  ),
  ss.refine(
    BaseSchema,
    'PasswordMatch',
    (schema) => schema.password === schema.repeatPassword
  ),
])

// ...snipped for brevity...
```

The `intersection` type annotation accepts an array of schemas, where each one
must pass validation. The first schema passed to `intersection` is a refinement
of `BaseSchema` via the Superstruct `refine` utility. It validates the mutual
exclusion relationship of `token` to `password` and `repeatPassword`. The second
refinement schema validates whether `password` matches `repeatPassword`.

With our `PersonSchema` complete, we can expect the following validation results
(noted in comments) for these data object scenarios.

```typescript
// `Partial` makes all properties optional. This matches PersonSchema.
let person: Partial<Person>

person = {} // fails. token must exist.
person = { token: 4 } // passes.
person = { token: 'abc' } // passes.
person = { token: 4, password: '?xp' } // fails. token or password.
person = { token: 4, repeatPassword: '?xp' } // fails. token or password.
person = { password: '?xp' } // fails. passwords don't match.
person = { password: '?xp', repeatPassword: '?xp' } // passes.
```

## Custom Error Handling

If an error occurs during a base type (e.g. string, number, etc) validation
failure, Superstruct throws a clear and helpful error message. Here's an
example:

```typescript
import * as ss from 'superstruct'
ss.assert(4, ss.string())
```

The code above fails validation and throws the following error message.

```
StructError: Expected a string, but received: 4
```

When our refinement validations fail, the error message is far from helpful.

```
StructError: Expected a value of type `object`, but received: `[object Object]`
```

If we log our last error to the console, the Superstruct error object tells us
the specific refinement schema that failed validation.

```
StructError: Expected a value of type `object`, but received: `[object Object]`
  value: {
    token: 4,
    password: 'xxxx',
    name: 'admin',
    role: 'ADMIN',
    repeatPassword: undefined
  },
  type: 'object',
  refinement: 'PasswordOrToken',
  key: undefined,
  path: [],
  branch: [
    {
      token: 4,
      password: 'xxxx',
      name: 'admin',
      role: 'ADMIN',
      repeatPassword: undefined
    }
  ],
  failures: [Function (anonymous)]
}
```

Using the `refinement` property of the error object, we can customize error
messages and decide to throw an error, report a warning or continue execution on
a different path.

Here's a snippet of how we'll handle these errors.

```typescript:title=index.ts
// ...snipped for brevity...

const [error, admin] = ss.validate(person, PersonSchema, { coerce: true })

if (error) {
  switch (error.refinement) {
    case 'PasswordOrToken':
      console.error(`Please provide a 'password' or 'token'; not both`)
      process.exit(1)
    case 'PasswordMatch':
      console.error(`Passwords must match`)
      process.exit(1)
    default:
      throw error
  }
}

console.log(admin)
```

## Summary

In this post I covered data validation using Superstruct for simple data types,
like strings and numbers. I showed how to compose Superstruct utilities to
create slightly more complex validation schemas - in particular the `alphanum`
and `password` helpers.

Next, I provided examples for setting defaults and limiting a value to a defined
list of constants via the `enums` utility. Then we jumped into the advanced
validation rules, with conditional dependency, and mutual exclusion.

The last section demonstrated custom error handling logic for those deeply
nested refinement schemas.

I hope you found this post useful. Check out the
[source code](https://github.com/dtjv/blog-demos/tree/main/data-validation-with-superstruct)
on Github to see the complete example.

Thanks for reading.
