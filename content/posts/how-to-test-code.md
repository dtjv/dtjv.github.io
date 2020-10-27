---
title: How To Test Code
date: 2020-10-06
description: Knowing how to test your code can help you sleep well at night.
draft: true
template: post
---

When it comes to testing code, nothing is more important than simple, clear and
concise functions. I use [tap](https://nodetap.com) and so should you. Now,
don't get me wrong - you can use **mocho** or **jest**, but tap wins by a long
shot.

Over the last few years, I've dedicated myself to _TDD_. It has changed my life
in so many ways. I highly suggest you read [How TDD Can Change Your
Life](https://www.google.com).

<!-- more -->

## In the Beginning

Now, to get started with testing, we need to set a few ground rules. Oh, I mean
lets go over some history about testing and why it's important - because I have
nothing better to do (and you as well) than to re-hash history over and over.

```javascript
// will make rain
const makeRain = (color) => {
  console.log(`${color} rain`)
}
```

## Conclusion

That was painless. I should write more often. And hopefully you got some great
info. Thanks for reading.
