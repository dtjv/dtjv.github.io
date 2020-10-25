import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Projects } from '../components/Projects'

const ProjectsPage = () => {
  const { site, allMarkdownRemark } = useStaticQuery(
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
  )
  const projects = allMarkdownRemark.edges

  return (
    <Layout>
      <Helmet title={`Projects | ${site.siteMetadata.title}`} />
      <SEO />
      <Projects projects={projects} />
    </Layout>
  )
}

export default ProjectsPage
