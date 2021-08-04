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
      limit: 3
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
    projects: allMdx(
      sort: { fields: [frontmatter___id], order: ASC }
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          fields {
            excerpt
          }
          frontmatter {
            name
            id
            repoUrl
            liveUrl
            tech
            screenshot
          }
        }
      }
    }
    images: allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }) {
      edges {
        node {
          base
          childImageSharp {
            gatsbyImageData
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
  const { site, posts, projects, images } = useStaticQuery(query)
  const articles = posts.edges.map(({ node }) => ({
    title: node.frontmatter.title,
    date: node.frontmatter.date,
    description: node.frontmatter.description,
    slug: node.fields.slug,
  }))
  const code = projects.edges.map(({ node }) => ({
    id: node.frontmatter.id,
    name: node.frontmatter.name,
    repoUrl: node.frontmatter.repoUrl,
    liveUrl: node.frontmatter.liveUrl,
    tech: node.frontmatter.tech,
    excerpt: node.fields.excerpt,
    image: images.edges.find(
      (image) => image.node.base === node.frontmatter.screenshot
    ),
  }))

  return (
    <Layout>
      <Seo title={site.siteMetadata.title} />
      <Container>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          Hello! I’m David, a software developer based in Oregon. I build tools
          and applications using React, TypeScript and many other interesting
          libraries found in the JavaScript, Web, and Node.js ecosystem.
        </p>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          On this website I share my thoughts on programming - from coding
          experiences, to projects I’ve built and even a bit of computer science
          basics. I hope you find my content useful.
        </p>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          <span class="font-semibold">Update:</span> I am looking for work! Feel
          free to contact me by{' '}
          <a href="mailto:davidtjvalles@gmail.com">email</a> or{' '}
          <a href="https://twitter/davidtjvalles">@davidtjvalles</a>.
        </p>
      </Container>
      <Section title="Articles" link={{ to: '/articles', text: 'View all' }}>
        <Posts posts={articles} short />
      </Section>
      <Section
        id="projects"
        title="Projects"
        link={{ to: '/projects', text: 'View all' }}
      >
        <Projects projects={code} />
      </Section>
    </Layout>
  )
}

export default IndexPage
