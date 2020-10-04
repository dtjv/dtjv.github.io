const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { getNestedProperty } = require('./src/utils/get')

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

  const posts =
    getNestedProperty(result, ['data', 'allMarkdownRemark', 'edges']) || []

  posts.forEach((post) => {
    const id = getNestedProperty(post, ['node', 'id'])
    const slug = getNestedProperty(post, ['node', 'fields', 'slug'])

    if (!id || !slug) {
      throw new Error('Error creating page for post')
    }

    createPage({
      path: slug,
      component: path.resolve('src/templates/post.js'),
      context: {
        id,
      },
    })
  })
}
