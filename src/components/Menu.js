import * as React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { CloseIcon } from './icons/Close'

export const Menu = ({ showMenu, onClick }) => {
  return (
    <div
      className={`${
        showMenu ? 'fixed' : 'hidden'
      } inset-0 z-40 h-screen bg-black w-full bg-opacity-25`}
    >
      <div className="h-full px-5 mx-auto mr-32 antialiased bg-white sm:px-8 md:px-12 lg:px-0">
        <Container className="flex flex-col space-y-4">
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
