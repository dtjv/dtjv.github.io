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
            className="ml-5 text-xl font-extrabold"
          >
            David Valles
          </Link>
        </div>
        {/* in the future, put site links here */}
      </div>
      <div className="flex items-center justify-around text-xs font-medium text-gray-700 uppercase">
        <Link
          to="/articles"
          className="hover:text-blue-400"
          activeClassName="text-blue-500"
        >
          Articles
        </Link>
        <Link
          to="/projects"
          className="hover:text-blue-400"
          activeClassName="text-blue-500"
        >
          Projects
        </Link>
        <Link
          to="/about"
          className="hover:text-blue-400"
          activeClassName="text-blue-500"
        >
          About
        </Link>
      </div>
    </nav>
  )
}
export { Nav }
