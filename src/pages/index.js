import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Posts } from '../components/Posts'
import { Section } from '../components/Section'
import { Container } from '../components/Container'

const query = graphql`
  query {
    posts: allMdx(
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
            date(formatString: "MMM DD")
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

const IndexPage = () => {
  const { site, posts } = useStaticQuery(query)
  const articles = posts.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    slug: node.fields.slug,
    excerpt: node.fields.excerpt,
    description: node.frontmatter.description,
  }))

  return (
    <Layout>
      <Seo title={site.siteMetadata.title} />
      <Container>
        <div className="prose max-w-none">
          <p className="text-xl text-gray-500 sm:text-2xl">
            Hello! I’m David. I build full-stack web applications using
            TypeScript, React, and many other interesting libraries in the
            JavaScript and Node.js ecosystem.
          </p>
          <p className="text-xl text-gray-500 sm:text-2xl">
            On this website I share my thoughts on programming - from coding
            experiences, to projects I’ve built and even a bit of computer
            science basics. I hope you find my content useful.
          </p>
          <div className="text-xl text-gray-500 sm:text-2xl">
            <div>
              Thanks for visiting! You can reach me at{' '}
              <a href="mailto:davidtjvalles@gmail.com">email</a>.
            </div>
          </div>
        </div>
      </Container>
      <Section title="Articles">
        <Posts posts={articles} />
      </Section>
    </Layout>
  )
}

export default IndexPage
