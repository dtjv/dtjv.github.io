import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date, description } = post.node.frontmatter

  return (
    <div key={slug} className="first:mt-0">
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
      <Helmet title={data.site.siteMetadata.title} />
      <SEO />
      <section className="px-6 py-6 space-y-10">
        <div>
          <h1 className="text-2xl font-extrabold">Hi, I'm David</h1>
          <p className="text-gray-800">
            My plan for this site is to share - my thoughts, my projects, and my
            life. Let's see how it goes. I hope you find some value.
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">Articles</h1>
          <div className="space-y-8">{renderPosts()}</div>
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
    site {
      siteMetadata {
        title
      }
    }
  }
`
