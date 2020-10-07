import React from 'react'
import { Link, graphql } from 'gatsby'
import { Layout } from '../layout'
import { SEO } from '../components/seo'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date, description } = post.node.frontmatter

  return (
    <div key={slug} className="mt-8 first:mt-0">
      <Link
        to={slug}
        className="text-lg font-bold text-blue-500 no-underline hover:text-blue-400"
      >
        {title}
      </Link>
      <p className="text-xs text-gray-700 uppercase">{date}</p>
      <p
        className="mt-1 text-gray-800"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const renderPosts = () => posts.map(renderPost)

  return (
    <Layout>
      <SEO />
      <section className="px-6 py-6">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Hi, I'm David
          </h1>
          <p className="text-lg text-gray-800">
            My plan for this site is to share - my thoughts, my projects, and my
            life. Let's see how it goes. I hope you find some value.
          </p>
        </div>

        <div className="mt-10">
          <h1 className="text-2xl font-extrabold">Articles</h1>
          <div className="mt-4">{renderPosts()}</div>
        </div>
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
