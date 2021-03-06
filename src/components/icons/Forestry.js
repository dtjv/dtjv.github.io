import React from 'react'

export const ForestryIcon = ({ className, ...props }) => (
  <svg
    {...props}
    className={`text-forestry ${className}`}
    role="img"
    fill="currentColor"
    enableBackground="new 0 0 104.8 101.9"
    viewBox="0 0 104.8 101.9"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Forestry</title>
    <path d="m51 42.3-22.7-22.6-22.6 22.6-5.7-5.6 28.3-28.4 28.4 28.4z" />
    <path d="m51 64.9-22.7-22.6-22.6 22.6-5.7-5.6 28.3-28.4 28.4 28.4z" />
    <path d="m76.4 67.8-28.3-28.4 5.7-5.6 22.6 22.6 22.7-22.6 5.7 5.6z" />
    <path d="m76.4 45.2-28.3-28.4 5.7-5.6 22.6 22.6 22.7-22.6 5.7 5.6z" />
    <path d="m24.3 0h8v101.9h-8z" />
    <path d="m72.4 0h8v101.9h-8z" />
  </svg>
)
