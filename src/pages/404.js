import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const PageNotFound = () => {
  const pageTitle = 'Page Not Found'
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
      <Helmet title={`${pageTitle} | ${site.siteMetadata.title}`} />
      <SEO />
      <Container>
        <H1>{pageTitle}</H1>
        <p className="text-xl text-gray-500 sm:text-2xl prose max-w-none">
          That page is missing. My apologies.
        </p>
      </Container>
    </Layout>
  )
}

export default PageNotFound
