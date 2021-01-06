import React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { H1, H2 } from './Headings'

const renderPost = (post) => {
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
            <Link
              to={slug}
              className="text-base font-bold no-underline"
              aria-label={`Read "${title}"`}
            >
              <H2 classes="inline-block">{title}</H2>
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
              <span className="mr-1">Read article --{'>'}</span>
            </Link>
          </div>
        </div>
      </article>
    </li>
  )
}

const Posts = ({ posts = [] }) => {
  if (!posts.length) return null

  return (
    <Container>
      <H1>Articles</H1>
      <ul className="divide-y divide-gray-200">{posts.map(renderPost)}</ul>
    </Container>
  )
}

export { Posts }
