import { ActionItem, CreateActionDTO } from './types';

const API_BASE = '/api/actions';

export async function fetchActions(filters?: { status?: string; priority?: string }): Promise<ActionItem[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.priority) params.append('priority', filters.priority);
  
  const response = await fetch(`${API_BASE}${params.toString() ? '?' + params.toString() : ''}`);
  if (!response.ok) {
    throw new Error('Failed to fetch actions');
  }
  return response.json();
}

export async function createAction(data: CreateActionDTO): Promise<ActionItem> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create action');
  }
  
  return response.json();
}

export async function updateAction(id: string, updates: Partial<ActionItem>): Promise<ActionItem> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update action');
  }
  
  return response.json();
}
