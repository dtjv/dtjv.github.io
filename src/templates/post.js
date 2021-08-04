import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Container } from '../components/Container'
import { H1 } from '../components/Headings'

const PostTemplate = ({ data }) => {
  const post = data.mdx
  const site = data.site
  const { title, date, description } = post.frontmatter

  return (
    <Layout>
      <Seo
        title={`${title} | ${site.siteMetadata.title}`}
        description={description}
        url={`${site.siteMetadata.siteUrl}${post.fields.slug}`}
        isPost
      />
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
              {description && (
                <p className="text-2xl tracking-tight text-gray-500 pt-14">
                  {description}
                </p>
              )}
            </div>
          </header>
          <div
            className={`${
              description ? 'pt-8 pb-12' : 'py-12'
            } prose max-w-none`}
          >
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </article>
      </Container>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostTemplateQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
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
