import React from 'react'

export const Container = ({ children, className, ...props }) => (
  <div className={`py-8 sm:py-10 ${className}`} {...props}>
    {children}
  </div>
)
