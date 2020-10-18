import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

//import { projects } from '../data/projects'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
//import { Projects } from '../components/Projects'
import { Section } from '../components/Section'

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={data.site.siteMetadata.title} />
      <SEO />
      <Section
        title="Hi, I'm David"
        blurb="Welcome to my personal website - where I share my thoughts on programming and projects I build."
      />
      <Section title="Articles">
        <Posts posts={posts} />
      </Section>
      {/*
      <Section title="Projects">
        <Projects projects={projects} />
      </Section>
      */}

      {/*
      <section className="px-6 mt-12 space-y-16">
        <div className="space-y-4">
          <p className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Hi, I'm David.
          </p>
          <p className="text-lg text-gray-500">
            Welcome to my personal website - where I share my thoughts on
            programming and projects I build.
          </p>
        </div>
        <Posts posts={posts} />
        <Projects projects={projects} />
      </section>
      */}
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
