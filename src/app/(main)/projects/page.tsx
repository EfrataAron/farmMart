'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function ProjectsPage() {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full px-4 bg-gray-50 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">

      {/* Hero Section */}
      <div className="bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 py-12 sm:py-16 lg:py-20 xl:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Our Agricultural Projects
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              Discover innovative agricultural initiatives that are transforming farming practices and building sustainable food systems
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <div className="bg-green-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{projects.length}</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Total Projects</div>
              </div>
              <div className="bg-blue-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                  {projects.filter(p => p.status === 'ongoing').length}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Active Projects</div>
              </div>
              <div className="bg-yellow-50 px-4 sm:px-6 py-3 sm:py-4 rounded-lg">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        <div className="w-full">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {projects.map((project) => (
              <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-full">
                <div className="aspect-video relative overflow-hidden flex-shrink-0">
                  <Image 
                    src={project.images[0]} 
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-green-600">
                    ${project.budget.toLocaleString()}
                  </div>
                  {project.status === 'ongoing' && (
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                      <div className="bg-white rounded-lg p-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 lg:p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3 text-xs sm:text-sm">
                    <span className="text-gray-500 truncate flex-shrink-0">{project.category}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1 text-gray-500 truncate min-w-0">
                      <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors line-clamp-2 flex-shrink-0">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3 flex-grow">{project.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(project.startDate).getFullYear()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{project.team.length}</span>
                      </div>
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <button className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm flex items-center gap-1 transition-colors whitespace-nowrap">
                        Learn More
                        <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}
