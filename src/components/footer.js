import React from 'react'

import { Container } from './Container'
import { EmailIcon } from './icons/Email'

export const Footer = () => {
  return (
    <Container>
      <div className="flex items-center justify-center">
        <a href="mailto:davidtjvalles@gmail.com">
          <EmailIcon className="w-6 h-6 ml-3 text-color-800 hover:text-blue-400" />
        </a>
      </div>
    </Container>
  )
}
