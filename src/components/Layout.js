import React from 'react'

import { Nav } from './Nav'
import { Footer } from './Footer'

const Layout = ({ children }) => {
  return (
    <div className="max-w-3xl px-4 mx-auto antialiased sm:px-6 lg:px-0">
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
