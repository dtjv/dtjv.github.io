import React from 'react'

import { Project } from './Project'

export const Projects = ({ projects = [], feature }) => {
  if (!projects.length) return null

  const featuredProjects = projects.filter((project) => project.feature)
  const nonFeaturedProjects = projects.filter((project) => !project.feature)

  return (
    <>
      {feature ? (
        <ul className="divide-y divide-gray-200">
          {featuredProjects.map((project) => (
            <li key={project.id} className="flex py-12 space-x-6">
              <Project project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          {nonFeaturedProjects.map((project) => (
            <li key={project.id} className="p-4 border rounded-lg shadow-md">
              <Project project={{ ...project, images: [] }} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
