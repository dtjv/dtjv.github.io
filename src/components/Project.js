import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { H2 } from './Headings'
import { icons } from './icons'
import { RedirectIcon } from './icons/Redirect'

export const Project = ({ project }) => {
  const { name, repoUrl, liveUrl, tech, excerpt, images } = project
  const screenshots = images.map((image) => getImage(image?.node))

  return (
    <>
      <div
        className={`${
          images.length > 0 ? 'sm:w-1/2' : ''
        } flex flex-col justify-between h-full w-full`}
      >
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
                <RedirectIcon
                  className="w-5 h-5 ml-1 text-gray-500"
                  title={liveUrl}
                />
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
      {screenshots.length > 0 ? (
        <div className="hidden sm:flex sm:flex-col sm:w-1/2 space-y-4">
          {screenshots.map((screenshot) => (
            <GatsbyImage image={screenshot} alt={`screen shot of ${name}`} />
          ))}
        </div>
      ) : null}
    </>
  )
}
