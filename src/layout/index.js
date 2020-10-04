import React from 'react'

import { Nav } from '../components/nav'

const Layout = ({ children }) => {
  return (
    <div className="px-4 antialiased text-gray-800">
      <div className="mx-auto max-w-screen-md">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
        <footer />
      </div>
    </div>
  )
}

export { Layout }
