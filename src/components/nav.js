import React from 'react'
import { Link } from 'gatsby'
import MeImg from '../images/me.jpg'

const Nav = () => {
  return (
    <div className="flex items-center justify-between py-8 text-gray-900">
      <Link to="/" aria-label="link to home page">
        <div className="flex flex-row items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={MeImg}
            alt="pic of david"
          />
          <span className="ml-3 text-lg font-extrabold sm:text-xl">
            David Valles
          </span>
        </div>
      </Link>
      <Link
        to="/about"
        className="font-bold text-normal hover:text-gray-700"
        activeClassName="underline"
      >
        About
      </Link>
    </div>
  )
}
export { Nav }
