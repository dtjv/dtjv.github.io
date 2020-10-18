import React from 'react'

const Section = ({ title, blurb, children }) => {
  return (
    <section className="py-8 sm:py-10">
      <div className="space-y-6">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {blurb && <p className="text-lg text-gray-500">{blurb}</p>}
      </div>
      {children && <div>{children}</div>}
    </section>
  )
}

export { Section }
