import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar, FiMapPin, FiUsers, FiArrowRight } from 'react-icons/fi';
import { Project, ProjectStatus } from '@/data/projectsData';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  className = '' 
}) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'completed': return 'bg-orange-100 text-orange-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group ${className}`}>
      <div className="aspect-video relative overflow-hidden">
        <Image 
          src={project.images[0]} 
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
          ${project.budget.toLocaleString()}
        </div>
        {project.status === 'ongoing' && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white rounded-lg p-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">{project.category}</span>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FiMapPin className="w-3 h-3" />
            {project.location}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              <span>{new Date(project.startDate).getFullYear()}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="w-4 h-4" />
              <span>{project.team.length}</span>
            </div>
          </div>
          <Link href={`/projects/${project.id}`}>
            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center gap-1 transition-colors">
              Learn More
              <FiArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

