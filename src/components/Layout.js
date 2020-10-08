import React from 'react'

import { Nav } from './Nav'
import { Footer } from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="mx-auto antialiased max-w-screen-md">
      <header>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export { Layout }
