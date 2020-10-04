import React from 'react'
import MeImg from '../images/me.jpg'

const Nav = () => {
  return (
    <nav className="px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-row">
          <img
            className="w-8 h-8 rounded-full"
            src={MeImg}
            alt="pic of david"
          />
          <a href="/" className="ml-4 text-xl font-bold">
            David Valles
          </a>
        </div>
        {/* in the future, put site links here */}
      </div>
    </nav>
  )
}
export { Nav }
