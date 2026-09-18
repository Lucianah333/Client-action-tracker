import { Priority, Status, VALID_PRIORITIES, VALID_STATUSES } from './types';

export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

export function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  const timestamp = date.getTime();
  
  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;
  
  return dateString === date.toISOString().split('T')[0];
}

export function isValidPriority(value: string): value is Priority {
  return VALID_PRIORITIES.includes(value as Priority);
}

export function isValidStatus(value: string): value is Status {
  return VALID_STATUSES.includes(value as Status);
}

export function validateRequiredFields(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const required = ['client', 'title', 'owner', 'dueDate', 'priority', 'status'];
  
  for (const field of required) {
    if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
      errors.push(`${field} is required`);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

export function validateTitle(title: string): { valid: boolean; error?: string } {
  if (title.length < 5) {
    return { valid: false, error: 'title must be at least 5 characters' };
  }
  return { valid: true };
}
