import React from 'react'
import { Link } from 'gatsby'

import { Container } from './Container'
import { H1, H2 } from './Headings'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date, description } = post.node.frontmatter

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
            {description && (
              <p className="text-gray-500 prose max-w-none">{description}</p>
            )}
          </div>
          <div>
            <Link
              to={slug}
              className="text-base font-bold text-blue-400 no-underline hover:text-blue-300"
              aria-label={`Read "${title}"`}
            >
              <span className="mr-1">Read article</span>
              <span>
                <svg
                  className="inline-block w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </article>
    </li>
  )
}

const Posts = ({ posts }) => {
  return (
    <Container>
      <H1>Articles</H1>
      {posts.length > 0 ? (
        <ul className="divide-y divide-gray-200">{posts.map(renderPost)}</ul>
      ) : null}
    </Container>
  )
}

export { Posts }
