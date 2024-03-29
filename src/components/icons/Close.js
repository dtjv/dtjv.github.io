import React from 'react'

export const CloseIcon = ({ className, ...props }) => (
  <svg
    {...props}
    className={`${className}`}
    role="img"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Close</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
)
