import React from 'react'
import { Link } from 'gatsby'

import { H2 } from './Headings'

export const ShortPost = ({ post }) => {
  const { title, date, description, slug } = post

  return (
    <li key={slug} className="py-6">
      <article className="space-y-2">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm font-medium text-gray-500 leading-6">
            <time dateTime={Date(date)}>{date}</time>
          </dd>
        </dl>
        <Link
          to={slug}
          className="inline-block hover:underline"
          aria-label={`Read "${title}"`}
        >
          <H2>{title}</H2>
        </Link>
        <p className="text-gray-500">{description}</p>
      </article>
    </li>
  )
}

export const Post = ({ post }) => {
  const { title, date, slug, excerpt } = post

  return (
    <li key={slug} className="py-12">
      <article className="space-y-2">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium text-gray-500 leading-6">
            <time dateTime={Date(date)}>{date}</time>
          </dd>
        </dl>
        <div className="space-y-5">
          <div className="space-y-6">
            <Link to={slug} aria-label={`Read "${title}"`}>
              <H2>{title}</H2>
            </Link>
            <div
              className="text-gray-500 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            />
          </div>
          <div>
            <Link
              to={slug}
              className="text-base font-bold text-blue-600 no-underline hover:text-blue-400"
              aria-label={`Read "${title}"`}
            >
              <span className="mr-1">Read article -&gt;</span>
            </Link>
          </div>
        </div>
      </article>
    </li>
  )
}
