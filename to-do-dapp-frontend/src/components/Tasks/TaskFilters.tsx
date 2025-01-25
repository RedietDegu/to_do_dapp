"use client";
import React from "react";

interface TaskFiltersProps {
  filterStatus: string;
  sortOrder: string;
  onFilterChange: (status: string) => void;
  onSortChange: (order: string) => void;
}

export default function TaskFilters({
  filterStatus,
  sortOrder,
  onFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Task Status
        </label>
        <select
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sort Tasks by Due Date
        </label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 
                   dark:border-gray-600 rounded-md shadow-sm text-gray-700 dark:text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Soonest Due</option>
          <option value="desc">Latest Due</option>
        </select>
      </div>
    </div>
  );
}
