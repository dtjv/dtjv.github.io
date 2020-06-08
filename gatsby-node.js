const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const { get } = require('./src/utils/get')

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

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
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = get(result, ['data', 'allMarkdownRemark', 'edges']) || []

  posts.forEach(post => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve('src/templates/post.js'),
      context: {
        id: post.node.id,
      },
    })
  })
}
