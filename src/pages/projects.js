import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Projects } from '../components/Projects'

import { projects } from '../data/projects'

const ProjectsPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <Layout>
      <Helmet title={`Projects | ${site.siteMetadata.title}`} />
      <SEO />
      <Projects projects={projects} />
    </Layout>
  )
}

export default ProjectsPage
