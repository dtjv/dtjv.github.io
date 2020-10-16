import React from 'react'
import { Link } from 'gatsby'

const renderProjects = (project) => {
  const { id, name, description, repositoryUrl, deploymentUrl } = project

  return (
    <div key={id}>
      <div className="flex flex-row items-center justify-between">
        <div className="pr-8">
          <Link
            to={deploymentUrl}
            className="text-xl font-bold text-blue-500 no-underline hover:text-blue-400"
          >
            {name}
          </Link>
          <p className="font-medium text-gray-700">{description}</p>
        </div>
        <div>
          <a
            href={repositoryUrl}
            className="flex flex-no-wrap items-center justify-center px-4 py-2 bg-gray-900 focus:outline-none focus:shadow-outline-gray hover:bg-gray-700 rounded-md"
          >
            <span className="text-sm font-medium text-white leading-5">
              Source
            </span>
          </a>
        </div>
      </div>
      <hr className="my-8 border-gray-400" />
    </div>
  )
}

const Projects = ({ projects }) => {
  return (
    <>
      {projects.length > 0 ? (
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold">Projects</h1>
          <div> {projects.map(renderProjects)} </div>
        </div>
      ) : null}
    </>
  )
}

export { Projects }
