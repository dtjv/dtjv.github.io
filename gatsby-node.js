const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = `/${path.basename(createFilePath({ node, getNode }))}/`

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                template
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.template === 'post'
  )

  posts.forEach((post) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve('src/templates/post.js'),
      context: {
        id: post.node.id,
      },
    })
  })

  /*
  const pages = result.data.allMarkdownRemark.edges.filter(
    ({ node }) => node.frontmatter.template === 'page'
  )

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: path.resolve('src/templates/page.js'),
      context: {
        slug: page.node.fields.slug,
      },
    })
  })
  */
}
