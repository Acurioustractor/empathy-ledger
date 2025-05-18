'use client';

import FilterSort from '@/components/common/FilterSort';
import Pagination from '@/components/common/Pagination';
import StoryDisplayToggle from '@/components/stories/StoryDisplayToggle';
import React, { useState, useMemo } from 'react';
import { StoryWithDetails } from '@/lib/airtable-wrappers';

export default function StoriesClientPage({
  stories,
  filterFields,
  sortFields,
  filterValues,
}: {
  stories: StoryWithDetails[];
  filterFields: { value: string; label: string }[];
  sortFields: { value: string; label: string }[];
  filterValues: Record<string, string[]>;
}) {
  const [filterBy, setFilterBy] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filtering
  const filteredStories = useMemo(() => {
    let result = stories;
    if (filterBy && filterValue) {
      result = result.filter(story => {
        if (filterBy === 'Shifts') return story.displayShiftName === filterValue;
        if (filterBy === 'Status') return story.Status === filterValue;
        if (filterBy === 'Location')
          return Array.isArray(story['Location (from Media)']) && story['Location (from Media)'].includes(filterValue);
        if (filterBy === 'Month') {
          const created = story.Created || story.createdTime;
          if (!created) return false;
          const date = new Date(created);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          return month === filterValue;
        }
        return true;
      });
    }
    return result;
  }, [stories, filterBy, filterValue]);

  // Sorting
  const sortedStories = useMemo(() => {
    const result = [...filteredStories];
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = a[sortBy as keyof StoryWithDetails];
        const bValue = b[sortBy as keyof StoryWithDetails];
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
    }
    return result;
  }, [filteredStories, sortBy, sortDirection]);

  // Pagination
  const totalCount = sortedStories.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginatedStories = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedStories.slice(start, start + pageSize);
  }, [sortedStories, page, pageSize]);

  // Handlers
  const handleFilterChange = (field: string, value: string) => {
    setFilterBy(field);
    setFilterValue(value);
    setPage(1); // Reset to first page on filter change
  };
  const handleSortChange = (field: string, direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDirection(direction);
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Stories</h1>
      <FilterSort
        filterFields={filterFields}
        sortFields={sortFields}
        filterValues={filterValues}
        filterBy={filterBy}
        filterValue={filterValue}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <StoryDisplayToggle stories={paginatedStories} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
