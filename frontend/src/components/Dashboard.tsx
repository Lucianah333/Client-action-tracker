import React from 'react';
import { ActionItem } from '../types';

interface DashboardProps {
  actions: ActionItem[];
}

export function Dashboard({ actions }: DashboardProps) {
  const total = actions.length;
  const open = actions.filter(a => a.status === 'Open').length;
  const inProgress = actions.filter(a => a.status === 'In Progress').length;
  const completed = actions.filter(a => a.status === 'Completed').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Actions</h3>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">{total}</p>
      </div>
      
      <div className="border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Open</h3>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">{open}</p>
      </div>
      
      <div className="border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Progress</h3>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">{inProgress}</p>
      </div>
      
      <div className="border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed</h3>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">{completed}</p>
      </div>
    </div>
  );
}
