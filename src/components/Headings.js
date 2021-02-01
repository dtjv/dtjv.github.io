import React from 'react'

export const H1 = ({ classes, children }) => (
  <h1
    className={`${
      classes ?? ''
    } text-3xl font-extrabold tracking-tight text-gray-800 leading-9 sm:leading-10 sm:text-4xl md:text-5xl md:leading-14`}
  >
    {children}
  </h1>
)

export const H2 = ({ classes, children }) => (
  <h2
    className={`${
      classes ?? ''
    } text-2xl font-bold tracking-tight text-gray-800 leading-8`}
  >
    {children}
  </h2>
)
