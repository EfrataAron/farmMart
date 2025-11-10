import React from 'react';
import { FiCheckCircle, FiPlay, FiClock } from 'react-icons/fi';
import { Project } from '@/data/projectsData';

interface ProjectStatsProps {
  projects: Project[];
  className?: string;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects, className = '' }) => {
  // Calculate statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const ongoingProjects = projects.filter(p => p.status === 'ongoing').length;
  const planningProjects = projects.filter(p => p.status === 'planning').length;
  
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const averageBudget = totalProjects > 0 ? Math.round(totalBudget / totalProjects) : 0;
  
  const totalTeamMembers = projects.reduce((sum, p) => sum + p.team.length, 0);
  
  // Calculate average progress for ongoing projects
  const ongoingProjectsWithProgress = projects.filter(p => p.status === 'ongoing');
  const averageProgress = ongoingProjectsWithProgress.length > 0 
    ? Math.round(ongoingProjectsWithProgress.reduce((sum, p) => sum + p.progress, 0) / ongoingProjectsWithProgress.length)
    : 0;

  const stats: StatItem[] = [
    {
      label: 'Total Projects',
      value: totalProjects,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Completed',
      value: completedProjects,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      label: 'In Progress',
      value: ongoingProjects,
      icon: <FiPlay className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Planning',
      value: planningProjects,
      icon: <FiClock className="w-6 h-6" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const additionalStats = [
    {
      label: 'Total Investment',
      value: `$${(totalBudget / 1000000).toFixed(1)}M`,
      description: 'Across all projects'
    },
    {
      label: 'Average Budget',
      value: `$${(averageBudget / 1000).toFixed(0)}K`,
      description: 'Per project'
    },
    {
      label: 'Team Members',
      value: totalTeamMembers.toString(),
      description: 'Total contributors'
    },
    {
      label: 'Avg. Progress',
      value: `${averageProgress}%`,
      description: 'Ongoing projects'
    }
  ];

  return (
    <div className={className}>
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {additionalStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Summary for Ongoing Projects */}
      {ongoingProjects > 0 && (
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ongoing Projects Progress</h3>
          <div className="space-y-4">
            {projects
              .filter(p => p.status === 'ongoing')
              .sort((a, b) => b.progress - a.progress)
              .slice(0, 5)
              .map((project) => (
                <div key={project.id} className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{project.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600 w-12 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectStats;

