import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { Layout } from '../layout'

const PostTemplate = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, date, description } = post.frontmatter

  return (
    <Layout>
      <Helmet titleTemplate="IDK">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="px-3">
        <section className="mt-8 pt-4 pb-4">
          <header>
            <h1 className="text-5xl font-extrabold">{title}</h1>
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
