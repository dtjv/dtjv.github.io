import React from 'react'
import { Link, graphql } from 'gatsby'

import { Layout } from '../layout'
import { SEO } from '../components/seo'
import { Hero } from '../components/hero'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date, description } = post.node.frontmatter

  return (
    <Link
      key={slug}
      to={slug}
      className="block rounded rounded-md px-3 py-4 hover:bg-gray-200"
    >
      <article>
        <h3>{title}</h3>
        <p className="text-xs text-gray-600 uppercase">{date}</p>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </article>
    </Link>
  )
}

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const renderPosts = () => posts.map(renderPost)

  return (
    <Layout>
      <SEO />
      <Hero />
      <section className="mt-8">
        <div className="mt-2">{renderPosts()}</div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
