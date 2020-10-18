import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

//import { projects } from '../data/projects'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
//import { Projects } from '../components/Projects'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />
      <SEO />
      <Container>
        <p className="text-xl text-gray-500">
          Welcome to my personal website - where I share my thoughts on
          programming and projects I build
        </p>
      </Container>
      <Container>
        <H1>Articles</H1>
        <Posts posts={posts} />
      </Container>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
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
