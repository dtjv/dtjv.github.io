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

  const docs = result.data.allMarkdownRemark.edges.filter(
    ({ node }) =>
      node.frontmatter.template === 'post' ||
      node.frontmatter.template === 'page'
  )

  docs.forEach((doc) => {
    createPage({
      path: doc.node.fields.slug,
      component: path.resolve(
        `src/templates/${doc.node.frontmatter.template}.js`
      ),
      context: {
        id: doc.node.id,
      },
    })
  })
}
