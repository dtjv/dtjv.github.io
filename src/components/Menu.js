import * as React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { CloseIcon } from './icons/Close'

export const Menu = ({ location, showMenu, onClick }) => {
  const MenuLink = ({ to, text }) =>
    location?.pathname === to ? (
      <Link
        to={to}
        className="font-bold text-gray-500 text-normal hover:underline"
        onClick={() => onClick((prevState) => !prevState)}
      >
        {text}
      </Link>
    ) : (
      <Link
        to={to}
        className="font-bold text-gray-500 text-normal hover:underline"
      >
        {text}
      </Link>
    )

  return (
    <div
      className={`${
        showMenu ? 'fixed' : 'hidden'
      } inset-0 z-40 h-full bg-black w-full bg-opacity-25`}
    >
      <div className="h-full px-5 mx-auto mr-32 antialiased bg-white sm:px-8 md:px-12 lg:px-0">
        <Container className="flex flex-col space-y-4">
          <MenuLink to="/articles" text="Articles" />
          <MenuLink to="/projects" text="Projects" />
        </Container>
      </div>
      <div className="absolute bottom-0 right-0 p-4 m-6 text-white bg-black rounded-full">
        <CloseIcon
          className="w-6 h-6"
          onClick={() => onClick((prevState) => !prevState)}
        />
      </div>
    </div>
  )
}
