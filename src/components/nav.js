import React from 'react'
import { Link } from 'gatsby'

import MeImg from '../images/me.jpg'
import { MenuIcon } from './icons/Menu'

const Nav = ({ onClick }) => {
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
      <MenuIcon
        className="w-6 h-6 sm:hidden"
        onClick={() => onClick((prevState) => !prevState)}
      />
      <div className="hidden sm:block space-x-4">
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
      </div>
    </div>
  )
}
export { Nav }
