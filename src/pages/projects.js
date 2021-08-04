import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Projects } from '../components/Projects'
import { Section } from '../components/Section'

const query = graphql`
  query {
    projects: allMdx(
      sort: { fields: [frontmatter___id], order: ASC }
      filter: { frontmatter: { template: { eq: "project" } } }
    ) {
      edges {
        node {
          frontmatter {
            name
            id
            repoUrl
            liveUrl
            tech
            screenshot
          }
          fields {
            excerpt
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

const ProjectsPage = ({ location }) => {
  const { site, projects, images } = useStaticQuery(query)
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
    <Layout location={location}>
      <Seo title={`Projects | ${site.siteMetadata.title}`} />
      <Section title="Projects">
        <Projects projects={code} />
      </Section>
    </Layout>
  )
}

export default ProjectsPage
