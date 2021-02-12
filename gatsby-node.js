const path = require('path')
const remark = require('remark')
const remarkHTML = require('remark-html')
const { createFilePath } = require('gatsby-source-filesystem')

const INTRO_SEPARATOR = '<!-- intro -->'

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = `/${path.basename(createFilePath({ node, getNode }))}/`

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })

    const [, raw] = node.rawBody.split(INTRO_SEPARATOR)
    const excerpt = raw
      ? remark().use(remarkHTML).processSync(raw.trim()).toString()
      : ''

    createNodeField({
      name: `excerpt`,
      node,
      value: excerpt,
    })
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMdx(limit: 1000) {
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

  const docs = result.data.allMdx.edges.filter(
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
