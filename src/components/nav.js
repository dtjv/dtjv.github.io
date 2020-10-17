import React from 'react'
import { Link } from 'gatsby'
import MeImg from '../images/me.jpg'

const Nav = () => {
  return (
    <nav className="px-6 py-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={MeImg}
            alt="pic of david"
          />
          <Link
            to="/"
            aria-label="link to home page"
            className="ml-3 text-xl font-extrabold"
          >
            David Valles
          </Link>
        </div>
        <Link
          to="/about"
          className="font-bold text-normal hover:text-blue-400"
          activeClassName="text-blue-500"
        >
          About
        </Link>
      </div>
    </nav>
  )
}
export { Nav }
