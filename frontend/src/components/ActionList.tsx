import { useState } from 'react';
import { ActionItem, Priority, Status } from '../types';
import { isOverdue, formatDate, getPriorityColor, getStatusColor, getNextStatus } from '../utils';

interface ActionListProps {
  actions: ActionItem[];
  onStatusUpdate: (id: string, newStatus: string) => void;
  statusFilter: string;
  priorityFilter: string;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
  onResetFilters: () => void;
}

export function ActionList({ 
  actions, 
  onStatusUpdate, 
  statusFilter, 
  priorityFilter, 
  onStatusChange, 
  onPriorityChange, 
  onResetFilters 
}: ActionListProps) {
  const priorities: Priority[] = ['Low', 'Medium', 'High'];
  const statuses: Status[] = ['Open', 'In Progress', 'Completed'];
  const hasActiveFilters = statusFilter || priorityFilter;
  const [priorityPopoverOpen, setPriorityPopoverOpen] = useState(false);
  const [statusPopoverOpen, setStatusPopoverOpen] = useState(false);

  if (actions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-slate-900">No actions found</h3>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your filters or create a new action.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      <div className="px-6 py-3 flex justify-between items-center border-b border-slate-200/60">
        <span className="text-xs text-slate-500 font-medium">{actions.length} actions</span>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs text-slate-500 hover:text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md transition-colors focus:outline-none"
          >
            Reset
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50/80">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                ID
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                Client
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                Title
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                Owner
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                Due Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                <div className="relative inline-block">
                  <button
                    onClick={() => setPriorityPopoverOpen(!priorityPopoverOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    <span>Priority</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  {priorityPopoverOpen && (
                    <div className="absolute z-10 bg-white border border-slate-200 rounded-xl shadow-lg p-2 mt-1 min-w-[120px]">
                      <button
                        onClick={() => { onPriorityChange(''); setPriorityPopoverOpen(false); }}
                        className={`w-full text-left px-2 py-1 text-xs rounded-md hover:bg-slate-100 transition-colors ${!priorityFilter ? 'bg-slate-100 font-medium' : 'text-slate-600'}`}
                      >
                        All
                      </button>
                      {priorities.map((priority) => (
                        <button
                          key={priority}
                          onClick={() => { onPriorityChange(priority); setPriorityPopoverOpen(false); }}
                          className={`w-full text-left px-2 py-1 text-xs rounded-md hover:bg-slate-100 transition-colors ${priorityFilter === priority ? 'bg-slate-100 font-medium' : 'text-slate-600'}`}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                <div className="relative inline-block">
                  <button
                    onClick={() => setStatusPopoverOpen(!statusPopoverOpen)}
                    className="flex items-center gap-1 focus:outline-none"
                  >
                    <span>Status</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                  {statusPopoverOpen && (
                    <div className="absolute z-10 bg-white border border-slate-200 rounded-xl shadow-lg p-2 mt-1 min-w-[120px]">
                      <button
                        onClick={() => { onStatusChange(''); setStatusPopoverOpen(false); }}
                        className={`w-full text-left px-2 py-1 text-xs rounded-md hover:bg-slate-100 transition-colors ${!statusFilter ? 'bg-slate-100 font-medium' : 'text-slate-600'}`}
                      >
                        All
                      </button>
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => { onStatusChange(status); setStatusPopoverOpen(false); }}
                          className={`w-full text-left px-2 py-1 text-xs rounded-md hover:bg-slate-100 transition-colors ${statusFilter === status ? 'bg-slate-100 font-medium' : 'text-slate-600'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200/60">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {actions.map((action) => (
              <tr 
                key={action.id} 
                className={`hover:bg-indigo-50/40 transition-colors ${isOverdue(action) ? 'bg-red-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-slate-900">
                  {action.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-slate-900">
                  {action.client}
                </td>
                <td className="px-6 py-4 font-medium text-sm text-slate-900 max-w-xs truncate">
                  {action.title}
                  {isOverdue(action) && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      Overdue
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-slate-900">
                  {action.owner}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-sm text-slate-900">
                  {formatDate(action.dueDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center ${getPriorityColor(action.priority)}`}>
                    {action.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center ${getStatusColor(action.status)}`}>
                    {action.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-bold text-sm text-slate-900">
                  {action.status !== 'Completed' && (
                    <button
                      onClick={() => onStatusUpdate(action.id, getNextStatus(action.status))}
                      className="bg-white hover:bg-slate-100 font-bold text-xs text-slate-700 border border-slate-200 px-3 py-1 rounded-lg shadow-2xs transition-all hover:border-slate-300 flex items-center gap-1 focus:outline-none"
                    >
                      Advance →
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
