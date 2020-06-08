import React from 'react'
import { Link } from 'gatsby'

import { Layout } from '../layout'
import { SEO } from '../components/seo'

const PageNotFound = () => (
  <Layout>
    <SEO title="Page Not Found" />
    <section className="mt-8 pt-4 pb-4 px-3">
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
