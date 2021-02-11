import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Posts } from '../components/Posts'
import { Projects } from '../components/Projects'
import { Section } from '../components/Section'
import { Container } from '../components/Container'

const query = graphql`
  query {
    posts: allMarkdownRemark(
      limit: 3
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
    projects: allMarkdownRemark(
      sort: { fields: [frontmatter___id], order: ASC }
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          excerpt(format: HTML)
          frontmatter {
            name
            id
            repoUrl
            liveUrl
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
            fluid(quality: 75) {
              ...GatsbyImageSharpFluid
            }
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
    excerpt: node.excerpt,
    slug: node.fields.slug,
  }))
  const code = projects.edges.map(({ node }) => ({
    id: node.frontmatter.id,
    name: node.frontmatter.name,
    repoUrl: node.frontmatter.repoUrl,
    liveUrl: node.frontmatter.liveUrl,
    excerpt: node.excerpt,
    image: images.edges.find(
      (image) => image.node.base === node.frontmatter.screenshot
    ),
  }))

  return (
    <Layout>
      <Helmet title={site.siteMetadata.title} />
      <SEO />
      <Container>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          Hello! I'm David, a software developer based in Oregon. On this
          website I share my thoughts about programming and a few side{' '}
          <Link to="#projects">projects</Link> I've built.
        </p>
      </Container>
      <Section
        title="Latest Articles"
        link={{ to: '/articles', text: 'View all' }}
      >
        <Posts posts={articles} />
      </Section>
      <Section id="projects" title="Projects">
        <Projects projects={code} />
      </Section>
    </Layout>
  )
}

export default IndexPage
