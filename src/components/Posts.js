import React from 'react'

import { Post, ShortPost } from './Post'

export const Posts = ({ posts = [], short }) => {
  if (!posts.length) return null

  return (
    <ul className="divide-y divide-gray-200">
      {posts.map((post) =>
        short ? (
          <ShortPost key={post.slug} post={post} />
        ) : (
          <Post key={post.slug} post={post} />
        )
      )}
    </ul>
  )
}
