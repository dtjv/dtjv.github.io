import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date } = post.node.frontmatter

  return (
    <div key={slug} className="first:mt-0">
      <Link
        to={slug}
        className="text-lg font-bold text-blue-500 no-underline hover:text-blue-400"
      >
        {title}
      </Link>
      <p className="text-xs font-semibold text-gray-500 uppercase">{date}</p>
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
        <div className="space-y-4">
          <p className="text-2xl font-extrabold">Hi! I'm David.</p>
          <p className="text-lg text-gray-800">
            I'm an independent software developer. I've learned a lot from
            others' who share their knowledge. This is my attempt to give back.
            I hope you find some value.
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
