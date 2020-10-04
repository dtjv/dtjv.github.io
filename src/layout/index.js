import React from 'react'

import { Nav } from '../components/nav'
import { Footer } from '../components/footer'

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
