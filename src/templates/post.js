import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../layout'
import { SEO } from '../components/seo'

const PostTemplate = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, date, description } = post.frontmatter

  return (
    <Layout>
      <SEO title={title} description={description} />
      <div className="px-3">
        <section className="mt-8 pt-4 pb-4">
          <header>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{title}</h1>
            <p className="text-sm text-gray-600 uppercase">{date}</p>
          </header>
        </section>
        <section className="mt-8">
          <article
            className="markdown mt-2"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </div>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
