import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Posts } from '../components/Posts'
import { Projects } from '../components/Projects'
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
    description: node.frontmatter.description,
    slug: node.fields.slug,
  }))

  return (
    <Layout>
      <Seo title={site.siteMetadata.title} />
      <Container>
        <div className="prose max-w-none">
          <p className="text-xl text-gray-500 sm:text-2xl">
            Hello! I’m David, a software developer based in Oregon. I build
            tools and applications using React, TypeScript and many other
            interesting libraries found in the JavaScript, Web, and Node.js
            ecosystem.
          </p>
          <p className="text-xl text-gray-500 sm:text-2xl">
            On this website I share my thoughts on programming - from coding
            experiences, to projects I’ve built and even a bit of computer
            science basics. I hope you find my content useful.
          </p>
          <p className="text-xl text-gray-500 sm:text-2xl">
            <p class="text-gray-900 font-bold">Update...</p>
            <p>
              I am looking for work! Contact me by{' '}
              <a href="mailto:davidtjvalles@gmail.com">email</a> or{' '}
              <a href="https://twitter/davidtjvalles">@davidtjvalles</a>.
            </p>
          </p>
        </div>
      </Container>
      <Section title="Articles" link={{ to: '/articles', text: 'View all' }}>
        <Posts posts={articles} short />
      </Section>
    </Layout>
  )
}

export default IndexPage
