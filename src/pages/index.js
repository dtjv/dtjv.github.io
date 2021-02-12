import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
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
      <SEO title={site.siteMetadata.title} />
      <Container>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          Hello! I'm David, a software developer based in Oregon. On this
          website I share my <Link to="/articles">thoughts</Link> about
          programming and a few side <Link to="/projects">projects</Link> I've
          built.
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
