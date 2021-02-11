import React from 'react'
import Img from 'gatsby-image'

import { H2 } from './Headings'
import { icons } from './icons'
import { RedirectIcon } from './icons/Redirect'

const Project = ({ project }) => {
  const { name, id, repoUrl, liveUrl, tech, excerpt, image } = project

  return (
    <li key={id} className="flex py-12 space-x-6">
      <div className={`${image && 'sm:w-1/2'} w-full`}>
        <div>
          <div className="flex items-center">
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:underline"
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
                <RedirectIcon className="w-5 h-5 ml-1 text-gray-500" />
              </a>
            )}
          </div>

          {tech && tech.length > 0 && (
            <div className="mt-6">
              <ul className="flex items-center space-x-2">
                {tech.map((techName, idx) => {
                  const Icon = icons[techName]
                  return <Icon key={idx} className="w-6 h-6" />
                })}
              </ul>
            </div>
          )}

          <div
            className="mt-6 text-gray-500 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
        {repoUrl && (
          <div className="mt-8">
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
