import React from 'react'
import { Link, graphql } from 'gatsby'
import { Layout } from '../layout'
import { SEO } from '../components/seo'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date, description } = post.node.frontmatter

  return (
    <Link
      key={slug}
      to={slug}
      className="block px-3 py-4 rounded hover:bg-blue-100"
    >
      <article>
        <h2 className="text-blue-600">{title}</h2>
        <p className="text-xs text-gray-700 uppercase">{date}</p>
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
      <section className="px-3 pt-4 pb-4 mt-10">
        <h1 className="text-3xl font-extrabold md:text-5xl">Hi, I'm David</h1>
        <p className="text-xl">This is my personal website. Enjoy.</p>
      </section>
      <section className="mt-10">{renderPosts()}</section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
