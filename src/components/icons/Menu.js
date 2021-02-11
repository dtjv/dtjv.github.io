import React from 'react'

export const MenuIcon = ({ className, ...props }) => (
  <svg
    {...props}
    className={`${className}`}
    role="img"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Menu</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 8h16M4 16h16"
    ></path>
  </svg>
)
