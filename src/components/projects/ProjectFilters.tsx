import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { ProjectStatus } from '@/data/projectsData';

interface FilterState {
  status: ProjectStatus | 'all';
  sortBy: string;
}

interface StatusCount {
  all: number;
  completed: number;
  ongoing: number;
  planning: number;
  'on-hold': number;
}

interface ProjectFiltersProps {
  filters: FilterState;
  statusCounts: StatusCount;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onToggle?: () => void;
  showMobileToggle?: boolean;
  className?: string;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  statusCounts,
  onFilterChange,
  onClearFilters,
  isOpen = true,
  onToggle,
  showMobileToggle = false,
  className = ''
}) => {
  const handleStatusChange = (status: ProjectStatus | 'all') => {
    onFilterChange({ ...filters, status });
  };

  const handleSortChange = (sortBy: string) => {
    onFilterChange({ ...filters, sortBy });
  };

  const statusOptions = [
    { value: 'all', label: 'All Projects', count: statusCounts.all },
    { value: 'completed', label: 'Completed', count: statusCounts.completed },
    { value: 'ongoing', label: 'Ongoing', count: statusCounts.ongoing },
    { value: 'planning', label: 'Planning', count: statusCounts.planning },
    { value: 'on-hold', label: 'On Hold', count: statusCounts['on-hold'] },
  ];

  const sortOptions = [
    { value: 'date', label: 'Latest First' },
    { value: 'name', label: 'Name' },
    { value: 'budget-high', label: 'Budget: High to Low' },
    { value: 'budget-low', label: 'Budget: Low to High' },
  ];

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Sort Options */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Project Status</h4>
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <label
              key={status.value}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={filters.status === status.value}
                  onChange={() => handleStatusChange(status.value as ProjectStatus | 'all')}
                  className="w-4 h-4 text-orange-600 focus:ring-orange-500 focus:ring-2"
                />
                <span className="ml-3 text-sm text-gray-700">{status.label}</span>
              </div>
              <span className="text-xs text-gray-500">({status.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  if (showMobileToggle) {
    return (
      <>
        {/* Mobile Filter Toggle Button */}
        <button
          onClick={onToggle}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors lg:hidden"
        >
          <FiFilter className="w-4 h-4" />
          Filters
        </button>

        {/* Mobile Filter Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden">
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={onToggle}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <FiltersContent />
              </div>
            </div>
          </div>
        )}

        {/* Desktop Filters */}
        <div className={`hidden lg:block ${className}`}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            <FiltersContent />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      <FiltersContent />
    </div>
  );
};

export default ProjectFilters;

