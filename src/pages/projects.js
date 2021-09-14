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
            feature
            screenshots
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
    feature: node.frontmatter.feature,
    excerpt: node.fields.excerpt,
    images:
      node.frontmatter.screenshots?.map((screenshot) =>
        images.edges.find((image) => image.node.base === screenshot)
      ) ?? [],
  }))

  return (
    <Layout location={location}>
      <Seo title={`Projects | ${site.siteMetadata.title}`} />
      <Section title="Featured projects">
        <Projects projects={code} feature />
      </Section>
      <Section title="A few other projects...">
        <Projects projects={code} />
      </Section>
    </Layout>
  )
}

export default ProjectsPage
