---
title: Excerpts with Gatsby and MDX
date: 2021-02-13
description:
  A simple solution to extract an excerpt from Markdown in a Gatsby + MDX site.
draft: false
template: post
---

<!-- intro -->

I built my website using [Gatsby]() and it used the
[`gatsby-transformer-remark`]() plugin to extract excerpts from [Markdown]()
files. After migrating the website to use [MDX](), I lost the built-in excerpt
functionality. This articles covers my work-around.

<!-- intro -->

## Before MDX

The basic Gatsby setup to process Markdown files begins by configuring
`gatsby-transformer-remark` plugin in `gatsby-config.js`.

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- excerpt -->`,
      },
    },
  ]
}
```

Next, I create a page with a GraphQL data query for the excerpt field. In the
example below, `blog.js` renders a summary of all blog posts at the `/blog` url
path.

```javascript:title=pages/blog.js
const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter { title }
          excerpt(format: HTML)
          fields { slug }
      }
    }
  }
`
const BlogPage = () => {
  const { allMarkdownRemark: { edges: post } } = useStaticQuery(query)

  return (
    <ul>
      {
        posts.map(post => (
          <li key={post.node.fields.slug}>
            <h1>{post.node.frontmatter.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: post.node.excerpt }}
            />
          </li>
        ))
      }
    </ul>
  )
}
```

Lastly, we write the blog post and include the excerpt delimiter.

```markdown:title=content/brew-coffee-the-right-way.md
---
title: Brew Coffee The Right Way
---

In today's article, I'll talk about the pros and cons of 5 typical coffee
brewing methods. Then, I'll present my approach and why I think everyone should
use it.

<!-- excerpt -->
```

With the setup outlined above, Gatsby extracts all Markdown between the last
frontmatter delimiter(`---`) and the excerpt separator (`<!-- excerpt -->`) and
makes it available in the GraphQL data layer and thus accessible - as HTML - for
a component to render.

## Using MDX

Adding [MDX](https://mdxjs.com) to my website meant removing the
`gatsby-transformer-remark` plugin - and with it the ability to automatically
extract an excerpt of Markdown and render it to the screen.

Here's a snippet of the updated `gatsby-config.js`.

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`]
      },
    },
  ]
}
```

To solve my dilemma, I began with a change to the excerpt separator used in
Markdown files. Below you can see the separator is before and after the excerpt.

```markdown:title=content/top-5-cat-vids.md
---
title: Top 5 Cat Videos
---

<!-- excerpt -->

In today's article, I discuss the top 5 cat videos of all time.

<!-- excerpt -->
```

Next, I added logic in Gatsby's `onCreateNode` API function to extract the
entire post's raw markdown, parse the excerpt out, convert it to HTML and store
the result in a field in the GraphQL data layer. Here's the function in
`gatsby-node-js`.

```javascript:title=gatsby-node.js
const remark = require('remark')
const remarkHTML = require('remark-html')

const EXCERPT_SEPARATOR = '<!-- excerpt -->'

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const [, rawExcerpt] = node.rawBody.split(EXCERPT_SEPARATOR)
    const excerpt = rawExcerpt
      ? remark().use(remarkHTML).processSync(rawExcerpt.trim()).toString()
      : ''

    createNodeField({
      name: `excerpt`,
      node,
      value: excerpt,
    })
  }
}
```

Then I made three changes to `blog.js`:

1. Replace `allMarkdownRemark` with `allMdx`
1. Add `excerpt` to the `fields` path in the GraphQL query
1. Extract `excerpt` from the `fields` path to render the HTML

```javascript:title=pages/blog.js
const query = graphql`
  query {
    allMdx(
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          frontmatter { title }
          fields { slug, excerpt }
      }
    }
  }
`
const BlogPage = () => {
  const { allMdx: { edges: posts } } = useStaticQuery(query)

  return (
    <ul>
      {
        posts.map(post => (
          <li key={post.node.fields.slug}>
            <h1>{post.node.frontmatter.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: post.node.fields.excerpt }}
            />
          </li>
        ))
      }
    </ul>
  )
}
```

## Wrap-up

This implementation works like a charm - given the one rule that Markdown
authors cannot include a React component in the excerpt. I can live with that.
