import React from 'react'

import { Post } from './Post'

const Posts = ({ posts = [] }) => {
  if (!posts.length) return null

  return (
    <ul className="divide-y divide-gray-200">
      {posts.map((post) => (
        <Post key={post.slug} post={post} />
      ))}
    </ul>
  )
}

export { Posts }
