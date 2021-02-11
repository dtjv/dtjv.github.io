import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Section } from '../components/Section'

const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(format: HTML)
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

const ArticlesPage = () => {
  const { site, allMarkdownRemark } = useStaticQuery(query)
  const posts = allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    excerpt: node.excerpt,
    slug: node.fields.slug,
  }))

  return (
    <Layout>
      <Helmet title={`Articles | ${site.siteMetadata.title}`} />
      <SEO />
      <Section title="Articles">
        <Posts posts={posts} />
      </Section>
    </Layout>
  )
}

export default ArticlesPage
