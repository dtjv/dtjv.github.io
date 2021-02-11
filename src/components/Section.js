import React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { H1 } from './Headings'

export const Section = ({ title, link, children, ...props }) => (
  <Container {...props}>
    <div className="flex items-baseline justify-between">
      <H1>{title}</H1>
      {link?.to && (
        <Link
          to={link.to}
          className="text-xl font-bold text-blue-600 no-underline sm:text-2xl hover:text-blue-400"
          aria-label={`link to ${link.to}`}
        >
          <span>{link.text} -&gt;</span>
        </Link>
      )}
    </div>
    {children}
  </Container>
)
