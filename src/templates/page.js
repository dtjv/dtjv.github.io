import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const PageTemplate = ({ data }) => {
  const page = data.markdownRemark
  const site = data.site

  // TODO: what do i pass to SEO?
  return (
    <Layout>
      <Helmet
        title={`${page.frontmatter.title} | ${site.siteMetadata.title}`}
      />
      <SEO />
      <section className="px-6 mt-12">
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold leading-tight">
            {page.frontmatter.title}
          </h1>
          <article
            className="prose prose-lg"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </div>
      </section>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
