import React from 'react'
import { Link } from 'gatsby'

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
              <h2 className="text-2xl font-bold tracking-tight leading-8">
                {title}
              </h2>
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
              <div className="flex flex-row items-center justify-items-start">
                <span className="mr-1">Read article</span>
                <svg
                  className="w-6 h-6"
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
              </div>
            </Link>
          </div>
        </div>
      </article>
    </li>
  )
}

const Posts = ({ posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <ul className="divide-y divide-gray-200">{posts.map(renderPost)}</ul>
      ) : null}
    </>
  )
}
/*
const Posts = ({ posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="space-y-4">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Articles</h1>
          <div className="space-y-8">{posts.map(renderPost)}</div>
        </div>
      ) : null}
    </>
  )
}
*/

export { Posts }
