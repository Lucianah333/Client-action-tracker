import { ActionItem, Status } from './types';

export function isOverdue(action: ActionItem): boolean {
  if (action.status === 'Completed') return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const dueDate = new Date(action.dueDate);
  dueDate.setHours(0, 0, 0, 0);
  
  return dueDate < today;
}

export function getNextStatus(currentStatus: Status): Status {
  const statusFlow: Status[] = ['Open', 'In Progress', 'Completed'];
  const currentIndex = statusFlow.indexOf(currentStatus);
  if (currentIndex < statusFlow.length - 1) {
    return statusFlow[currentIndex + 1];
  }
  return currentStatus;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High':
      return 'bg-rose-50 text-rose-700 border border-rose-200/80 font-bold px-2.5 py-0.5 rounded-full text-xs';
    case 'Medium':
      return 'bg-amber-50 text-amber-800 border border-amber-200/80 font-bold px-2.5 py-0.5 rounded-full text-xs';
    case 'Low':
      return 'bg-sky-50 text-sky-700 border border-sky-200/80 font-bold px-2.5 py-0.5 rounded-full text-xs';
    default:
      return 'bg-sky-50 text-sky-700 border border-sky-200/80 font-bold px-2.5 py-0.5 rounded-full text-xs';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Open':
      return 'bg-blue-50 text-blue-700 border border-blue-200/80 font-bold px-3 py-1 rounded-lg text-xs';
    case 'In Progress':
      return 'bg-violet-50 text-violet-700 border border-violet-200/80 font-bold px-3 py-1 rounded-lg text-xs';
    case 'Completed':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-bold px-3 py-1 rounded-lg text-xs';
    default:
      return 'bg-blue-50 text-blue-700 border border-blue-200/80 font-bold px-3 py-1 rounded-lg text-xs';
  }
}
