import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const site = data.site
  const { title, date } = post.frontmatter

  return (
    <Layout>
      <Helmet title={`${title} | ${site.siteMetadata.title}`} />
      <SEO article={post} />
      <Container>
        <article>
          <header className="space-y-2">
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium text-gray-500 leading-6">
                <time dateTime={Date(date)}>{date}</time>
              </dd>
            </dl>
            <div>
              <H1>{title}</H1>
            </div>
          </header>
          <div
            className="py-12 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </Container>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostTemplateQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
