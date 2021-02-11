import React from 'react'
import Img from 'gatsby-image'

import { H2 } from './Headings'

const Project = ({ project }) => {
  const { name, id, repoUrl, liveUrl, excerpt, image } = project

  return (
    <li key={id} className="flex py-12 space-x-6">
      <div className={`${image && 'sm:w-1/2'} w-full space-y-5`}>
        <div className="space-y-6">
          <div className="flex items-center">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline "
                aria-label={`Go to ${liveUrl}`}
              >
                <H2>{name}</H2>
              </a>
            ) : (
              <H2>{name}</H2>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Follow external link to ${liveUrl}`}
              >
                <svg
                  className="w-5 h-5 ml-1 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
            )}
          </div>
          <div
            className="text-gray-500 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
        {repoUrl && (
          <div>
            <a
              href={repoUrl}
              className="text-base font-bold text-blue-600 no-underline hover:text-blue-400"
              aria-label={`Go to ${repoUrl}`}
            >
              <span className="mr-1">View source -&gt;</span>
            </a>
          </div>
        )}
      </div>
      {!image ? null : (
        <div className="hidden sm:block sm:w-1/2">
          <Img
            fluid={image.node.childImageSharp.fluid}
            alt={`screen shot of ${name}`}
          />
        </div>
      )}
    </li>
  )
}

export { Project }
