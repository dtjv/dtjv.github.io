import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const site = data.site
  const { title, description } = page.frontmatter

  return (
    <Layout>
      <Helmet title={`${title} | ${site.siteMetadata.title}`} />
      <SEO
        page={{
          title,
          description,
          url: `${site.siteMetadata.siteUrl}${page.fields.slug}`,
        }}
      />
      <Container>
        <article>
          <header>
            <H1>{title}</H1>
          </header>
          <div
            className="py-12 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </article>
      </Container>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
`
