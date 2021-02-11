import React from 'react'

import { Project } from './Project'

const Projects = ({ projects = [] }) => {
  if (!projects.length) return null

  return (
    <ul className="divide-y divide-gray-200">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </ul>
  )
}

export { Projects }
