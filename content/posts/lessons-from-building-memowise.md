---
title: Lessons from Building Memowise
date: 2021-03-04
description: A few notes on how I might improve my project development.
draft: false
template: post
---

<!-- intro -->

Yesterday, I released the latest version of
[Memowise](https://memowise.vercel.app) - now a complete CRUD application with
GitHub authentication. Over the last two weeks its size and complexity grew
large enough for me to experience pain points in my development process. This
article covers what I did right and what I can improve on the next project.

<!-- intro -->

- View the [app](https://memowise.vercel.app)
- View the [source code](https://github.com/dtjv/memowise).

## MVP

I started this project mid-November of 2020 with a goal to buid and deploy a
simple flashcard app using Next.js, Tailwind CSS and MongoDB Atlas. By January,
2021, I hit my goal.

The MVP release of Memowise allowed visitors to browse flashcard sets by topic
and subtopic, flip through flashcards within a set and assess their knowledge
via a quiz feature.

From a technical perspective, the Memowise MVP read data from a database and
rendered it to the browser. While limited in functionality, I was happy I
established the application foundation.

## Version 2

In February, I realized I needed a completed
[CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
application in my portfolio. Since Memowise was sorely lacking in features, I
decided to enhance the app. Over the next month I added authentication, a user
dashboard, the ability to create, edit and delete a flashcard set and the
ability to link and unlink a public set to a user's account.

The process to develop those features was a twisty road of learning, source-code
reading, frustration, scope-creep, self-imposed bugs, integration limitations,
refactors, and small successes. Memowise is not the most complex app, but when
you're building and learning, even small features are non-trivial until the
experience deepens. The experience I gained shed a light on missteps along the
way - and lessons to learn.

## Design

At a high level, application design includes UI/UX, data models, code structure,
component composition, abstraction, and error handling - among other areas.
Addressing design in these areas promotes discovery and avoidance of pain points
possibly experienced later in the development cycle.

It's unrealistic to believe upfront design will solve all potential problems or
never change as development progresses. Case in point, I didn't realize I needed
a custom React hook to grab the user database profile until most of my page
routes had the same chunk of code. But, I should have designed my database a bit
better to reduce the complexity of an unnecessarily deep data structure.

## Type Safety

Out of the box, Next.js and JavaScript do not provided any reasonable assurance
the code you write at the time you write it doesn't have a basic error. So you
are free to reference a component that's not imported, or misspell a variable,
or access a deeply nested data structure without `undefined` checks. This
development experience annoys me and wastes too much time.

Next time I'll use TypeScript. Actually, I'd like to try
[Elm](https://elm-lang.org/).🧐

## Scope Creep

The original scope of my MVP was more complex. Over time, I trimmed the project
scope due to feature development taking too long. During version 2 development,
I let the project requirements expand on a daily basis - which added unnecessary
stress and the feeling I wasn't getting anything done.

Scoping a project well comes from experience. For now, I'll work towards
development to a specification to maintain a sense of progress and completion of
the project milestones.

## Continous Integration and Testing

Memowise does not have any tests or automated continuous integration to ensure
the app doesn't break when I add new features. This bit me when I realized my
code was not deploying due to build failures. The problem stemmed from me
pushing code commits from a local development to production without testing a
production build.

I've used [Travis CI](https://www.travis-ci.com/) in the past. I think it's time
to dive into [GitHub Actions](https://github.com/features/actions).

## Wrap Up

I'm glad I finished Memowise. I still have a list of feature TODOs that I could
add - but I'm anxious to move on to another project. And now I have lessons
learned I can put into practice as I work to improve my skill as a developer.
