import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Posts } from '../components/Posts'
import { Section } from '../components/Section'

const query = graphql`
  query {
    articles: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
            excerpt
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const ArticlesPage = ({ location }) => {
  const { site, articles } = useStaticQuery(query)
  const posts = articles.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    slug: node.fields.slug,
    excerpt: node.fields.excerpt,
  }))

  return (
    <Layout location={location}>
      <Seo title={`Articles | ${site.siteMetadata.title}`} />
      <Section title="Articles">
        <Posts posts={posts} />
      </Section>
    </Layout>
  )
}

export default ArticlesPage
