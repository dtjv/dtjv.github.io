import React from 'react'
import { Link } from 'gatsby'

const PageNotFound = () => (
  <>
    <h2> Oops! </h2>
    <p>
      I'm sorry, I can't find that page. Let's start over!{' '}
      <Link to="/">Go Home</Link>.
    </p>
  </>
)

export default PageNotFound
