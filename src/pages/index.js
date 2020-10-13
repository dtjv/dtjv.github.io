import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Layout } from '../components/Layout'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />
      <SEO />
      <section className="px-6 py-6 space-y-10">
        <div className="space-y-4">
          <p className="text-2xl font-extrabold">Hello!</p>
          <p className="text-lg text-gray-800">
            I'm David. I'm an independent software developer. I've learned a lot
            from others who share their knowledge. This is my attempt to give
            back. I hope you find some value.
          </p>
        </div>

        <Posts posts={posts} />
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
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
