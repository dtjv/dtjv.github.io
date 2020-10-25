import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Container } from '../components/Container'

const IndexPage = () => {
  const { site, allMarkdownRemark } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            frontmatter: { template: { eq: "post" }, draft: { ne: true } }
          }
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
  )
  const posts = allMarkdownRemark.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    excerpt: node.excerpt,
    slug: node.fields.slug,
  }))

  return (
    <Layout>
      <Helmet title={site.siteMetadata.title} />
      <SEO />
      <Container>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          Hello! I'm David, a software developer based in Oregon. On this
          website I share my thoughts about programming and a few side{' '}
          <Link to="/projects">projects</Link> I've built.
        </p>
      </Container>
      <Posts posts={posts} />
    </Layout>
  )
}

export default IndexPage
