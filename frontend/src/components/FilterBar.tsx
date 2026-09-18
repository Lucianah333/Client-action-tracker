import React from 'react';
import { Priority, Status } from '../types';

interface FilterBarProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onReset: () => void;
}

export function FilterBar({ 
  statusFilter, 
  priorityFilter, 
  onStatusChange, 
  onPriorityChange, 
  onReset 
}: FilterBarProps) {
  const statuses: Status[] = ['Open', 'In Progress', 'Completed'];
  const priorities: Priority[] = ['Low', 'Medium', 'High'];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="status-filter" className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 focus:outline-none"
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="priority-filter" className="block text-sm font-medium text-slate-700 mb-1">
            Priority
          </label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-700 focus:outline-none"
          >
            <option value="">All Priorities</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 font-medium"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
