import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Projects } from '../components/Projects'
import { projects } from '../data/projects'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />
      <SEO />
      <section className="px-6 py-6 space-y-10">
        <div className="space-y-4">
          <p className="text-2xl font-extrabold">Hi, I'm David.</p>
          <p className="text-lg">
            This website is my "show-and-tell" for articles I write and projects
            I build. I hope you find some value.
          </p>
        </div>

        <Posts posts={posts} />
        <Projects projects={projects} />
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
