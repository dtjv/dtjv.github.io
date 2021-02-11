import React from 'react'

import { Container } from './Container'
import { GitHubIcon } from './icons/GitHub'

const Footer = () => {
  return (
    <Container>
      <div className="flex items-center justify-center">
        <a href="https://github.com/dtjv">
          <GitHubIcon className="w-6 h-6 ml-3 text-color-800 hover:text-blue-400" />
        </a>
      </div>
    </Container>
  )
}
export { Footer }
