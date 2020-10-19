import React from 'react'

import { Nav } from './Nav'
import { Footer } from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="max-w-3xl px-5 mx-auto antialiased sm:px-8 md:px-12 lg:px-0">
      <nav>
        <Nav />
      </nav>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export { Layout }
