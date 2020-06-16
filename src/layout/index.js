import React from 'react'

import { Nav } from '../components/nav'

const Layout = ({ children }) => {
  return (
    <div className="antialiased text-gray-800 px-4">
      <div className="container mx-auto h-full">
        <header>
          <Nav />
        </header>
        <main>{children}</main>
        <footer className="h-32" />
      </div>
    </div>
  )
}

export { Layout }
