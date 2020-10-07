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
      <section className="px-6 py-6">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">{title}</h1>
          <p className="text-sm text-gray-700 uppercase">{date}</p>
        </div>

        <div className="mt-10">
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
