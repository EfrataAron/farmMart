import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FiArrowRight } from 'react-icons/fi';

interface ProjectCategoryCardProps {
  title: string;
  description: string;
  icon: IconType;
  projectCount: number;
  slug: string;
  gradient: string;
  className?: string;
}

const ProjectCategoryCard: React.FC<ProjectCategoryCardProps> = ({
  title,
  description,
  icon: Icon,
  projectCount,
  slug,
  gradient,
  className = ''
}) => {
  return (
    <Link href={`/projects/${slug}`}>
      <div className={`group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}>
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`} />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${gradient.replace('bg-gradient-to-br', 'bg-gradient-to-r')} text-white`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {projectCount} {projectCount === 1 ? 'project' : 'projects'}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {description}
          </p>
          
          <div className="flex items-center text-orange-600 text-sm font-medium group-hover:gap-2 transition-all duration-300">
            <span>Explore Projects</span>
            <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCategoryCard;

