export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Open' | 'In Progress' | 'Completed';

export interface ActionItem {
  id: string;
  client: string;
  title: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: Status;
}

export interface CreateActionDTO {
  client: string;
  title: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  status: Status;
}

export interface UpdateActionDTO {
  client?: string;
  title?: string;
  owner?: string;
  dueDate?: string;
  priority?: Priority;
  status?: Status;
}

export const VALID_PRIORITIES: Priority[] = ['Low', 'Medium', 'High'];
export const VALID_STATUSES: Status[] = ['Open', 'In Progress', 'Completed'];
