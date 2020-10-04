import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../layout'
import { SEO } from '../components/seo'

const PageNotFound = () => (
  <Layout>
    <SEO title="Page Not Found" />
    <section className="px-6 py-6 mt-10">
      <h2> Sorry! </h2>
      <p>
        That page is missing. Go to{' '}
        <Link to="/" className="text-blue-600 hover:text-blue-300">
          Home Page
        </Link>
        .
      </p>
    </section>
  </Layout>
)

export default PageNotFound
