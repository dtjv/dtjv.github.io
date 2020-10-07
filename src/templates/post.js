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
