'use client';

import React from 'react';

interface FilterSortProps {
  filterFields: { value: string; label: string }[];
  sortFields: { value: string; label: string }[];
  filterValues: Record<string, string[]>;
  filterBy: string;
  filterValue: string;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onFilterChange: (field: string, value: string) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
}

export default function FilterSort({
  filterFields,
  sortFields,
  filterValues,
  filterBy,
  filterValue,
  sortBy,
  sortDirection,
  onFilterChange,
  onSortChange,
}: FilterSortProps) {
  // Handle filter field selection
  const handleFilterField = (field: string) => {
    if (filterBy === field) {
      // Deselect filter
      onFilterChange('', '');
    } else {
      onFilterChange(field, '');
    }
  };

  // Handle filter value selection
  const handleFilterValue = (value: string) => {
    onFilterChange(filterBy, value);
  };

  // Handle sort field selection
  const handleSortField = (field: string) => {
    if (sortBy === field) {
      // Toggle direction
      onSortChange(field, sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'asc');
    }
  };

  // Clear all filters
  const handleClear = () => {
    onFilterChange('', '');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-gray-700 mr-2">Filter:</span>
        {filterFields.map(field => (
          <button
            key={field.value}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors
              ${filterBy === field.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
            onClick={() => handleFilterField(field.value)}
            type="button"
          >
            {field.label}
          </button>
        ))}
        {filterBy && filterValues[filterBy] && filterValues[filterBy].length > 0 && (
          <div className="flex flex-wrap gap-2 ml-4">
            {filterValues[filterBy].map(val => (
              <button
                key={val}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors
                  ${filterValue === val ? 'bg-indigo-500 text-white border-indigo-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
                onClick={() => handleFilterValue(val)}
                type="button"
              >
                {val}
              </button>
            ))}
          </div>
        )}
        {(filterBy || filterValue) && (
          <button
            className="ml-4 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300 border border-gray-300"
            onClick={handleClear}
            type="button"
          >
            Clear Filters
          </button>
        )}
      </div>
      {/* Sort Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-semibold text-gray-700 mr-2">Sort:</span>
        {sortFields.map(field => (
          <button
            key={field.value}
            className={`px-4 py-1 rounded-full border text-sm font-medium flex items-center gap-1 transition-colors
              ${sortBy === field.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-50'}`}
            onClick={() => handleSortField(field.value)}
            type="button"
          >
            {field.label}
            {sortBy === field.value && (
              <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
