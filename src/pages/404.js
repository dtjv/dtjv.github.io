import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
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
      <Seo title={`${pageTitle} | ${site.siteMetadata.title}`} />
      <Container>
        <H1>{pageTitle}</H1>
        <p className="mt-4 text-xl text-gray-500 sm:text-2xl prose max-w-none">
          That page is missing. My apologies.
        </p>
      </Container>
    </Layout>
  )
}

export default PageNotFound
