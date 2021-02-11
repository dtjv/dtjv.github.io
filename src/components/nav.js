import React from 'react'
import { Link } from 'gatsby'
import MeImg from '../images/me.jpg'

const Nav = () => {
  return (
    <div className="flex items-center justify-between py-8 text-gray-800">
      <Link to="/" aria-label="link to home page">
        <div className="flex flex-row items-center">
          <img
            className="block w-10 h-10 mr-3 rounded-full"
            src={MeImg}
            alt="pic of david"
          />
          <span className="text-xl font-extrabold">David Valles</span>
        </div>
      </Link>
      <div className="space-x-4">
        <Link
          to="/articles"
          className="font-bold text-gray-500 text-normal hover:underline"
        >
          Articles
        </Link>
        <Link
          to="/projects"
          className="font-bold text-gray-500 text-normal hover:underline"
        >
          Projects
        </Link>
        <Link
          to="/about"
          className="font-bold text-gray-500 text-normal hover:underline"
        >
          About
        </Link>
      </div>
    </div>
  )
}
export { Nav }
