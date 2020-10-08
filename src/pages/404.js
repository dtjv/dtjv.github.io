import React from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const PageNotFound = () => (
  <Layout>
    <Helmet title="404" />
    <SEO />
    <section className="px-6 py-6 space-y-10">
      <h1 className="text-2xl font-extrabold">404</h1>
      <p className="text-gray-800"> That page is missing. Apologies. </p>
    </section>
  </Layout>
)

export default PageNotFound
