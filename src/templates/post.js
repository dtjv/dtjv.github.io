import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const PostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { title, date } = post.frontmatter

  return (
    <Layout>
      <Helmet title={title} />
      <SEO post={post} />
      <section className="px-6 py-6 space-y-10">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">
            {date}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight">
            {title}
          </h1>
        </div>

        <div>
          <article
            className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </section>
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
