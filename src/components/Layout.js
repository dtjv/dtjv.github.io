import * as React from 'react'

import { Nav } from './Nav'
import { Footer } from './Footer'
import { Menu } from './Menu'

const Layout = ({ children }) => {
  const [showMenu, setShowMenu] = React.useState(false)

  return (
    <div className="relative">
      <Menu showMenu={showMenu} onClick={setShowMenu} />
      <div
        className={`max-w-3xl px-5 mx-auto antialiased sm:px-8 md:px-12 lg:px-0 ${
          showMenu ? 'fixed' : ''
        }`}
      >
        <nav>
          <Nav onClick={setShowMenu} />
        </nav>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  )
}

export { Layout }
