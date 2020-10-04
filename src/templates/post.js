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
        <section className="pt-4 pb-4 mt-10">
          <h1 className="text-3xl font-extrabold leading-tight text-blue-600 md:text-5xl">
            {title}
          </h1>
          <p className="text-sm text-gray-700 uppercase">{date}</p>
        </section>
        <section className="mt-10">
          <article dangerouslySetInnerHTML={{ __html: post.html }} />
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
