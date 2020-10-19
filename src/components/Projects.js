import React from 'react'

import { Container } from './Container'
import { H1, H2 } from './Headings'

const renderProject = (project) => {
  const { id, name, description, repoUrl, liveUrl } = project

  return (
    <li key={id} className="py-12">
      <div className="space-y-5">
        <div className="space-y-6">
          <div className="flex flex-row items-center">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="font-bold no-underline "
              aria-label={`Go to ${liveUrl}`}
            >
              <H2>{name}</H2>
            </a>
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
          </div>
          {description && (
            <p className="text-gray-500 prose max-w-none">{description}</p>
          )}
        </div>
        <div>
          <a
            href={repoUrl}
            className="text-base font-bold text-blue-400 no-underline hover:text-blue-300"
            aria-label={`Go to ${repoUrl}`}
          >
            <span className="mr-1">View source</span>
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
          </a>
        </div>
      </div>
    </li>
  )
}

const Projects = ({ projects }) => {
  return (
    <Container>
      <H1>Projects</H1>
      {projects.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {projects.map(renderProject)}
        </ul>
      ) : null}
    </Container>
  )
}

export { Projects }
