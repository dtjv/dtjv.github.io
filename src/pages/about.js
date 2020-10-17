import React from 'react'
import { Helmet } from 'react-helmet'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'

const About = () => (
  <Layout>
    <Helmet title="About David" />
    <SEO />
    <section className="px-6 py-6 space-y-4">
      <h1 className="text-2xl font-extrabold">Hi, I'm David.</h1>
      <p> A bit about me... </p>
    </section>
  </Layout>
)

export default About
