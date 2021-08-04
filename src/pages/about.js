import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { Layout } from '../components/Layout'
import { Seo } from '../components/Seo'
import { Section } from '../components/Section'

const AboutPage = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <Layout>
      <Seo title={`About | ${site.siteMetadata.title}`} />
      <Section title="About">
        <div className="prose">
          <p>A little about me...</p>
        </div>
      </Section>
    </Layout>
  )
}

export default AboutPage
