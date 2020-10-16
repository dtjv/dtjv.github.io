import React from 'react'
import { Link } from 'gatsby'

const renderPost = (post) => {
  const { slug } = post.node.fields
  const { title, date } = post.node.frontmatter

  return (
    <div key={slug} className="first:mt-0">
      <Link
        to={slug}
        className="text-xl font-bold text-blue-500 no-underline hover:text-blue-400"
      >
        {title}
      </Link>
      <p className="text-sm font-medium text-gray-500">{date}</p>
    </div>
  )
}

const Posts = ({ posts }) => {
  return (
    <>
      {posts.length > 0 ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">Articles</h1>
          <div className="space-y-8">{posts.map(renderPost)}</div>
        </div>
      ) : null}
    </>
  )
}

export { Posts }
