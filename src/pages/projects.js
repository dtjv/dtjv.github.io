import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Projects } from '../components/Projects'
import { Section } from '../components/Section'

const ProjectsPage = () => {
  const {
    site,
    allMarkdownRemark,
    allFile: { edges: images },
  } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
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
        site {
          siteMetadata {
            title
          }
        }
        allFile(filter: { extension: { regex: "/(jpg)|(png)|(jpeg)/" } }) {
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
      }
    `
  )
  const projects = allMarkdownRemark.edges.map(({ node }) => ({
    id: node.frontmatter.id,
    name: node.frontmatter.name,
    repoUrl: node.frontmatter.repoUrl,
    liveUrl: node.frontmatter.liveUrl,
    excerpt: node.excerpt,
    image: images.find(
      (image) => image.node.base === node.frontmatter.screenshot
    ),
  }))

  return (
    <Layout>
      <SEO title={`Projects | ${site.siteMetadata.title}`} />
      <Section title="Projects">
        <Projects projects={projects} />
      </Section>
    </Layout>
  )
}

export default ProjectsPage
