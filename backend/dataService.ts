import * as fs from 'fs';
import * as path from 'path';
import { ActionItem } from './types';

const DATA_FILE_PATH = path.join(__dirname, '../data.json');

export function readActions(): ActionItem[] {
  try {
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data.json:', error);
    return [];
  }
}

export function writeActions(actions: ActionItem[]): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(actions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to data.json:', error);
    throw error;
  }
}

export function generateNextId(actions: ActionItem[]): string {
  if (actions.length === 0) return 'A001';
  
  const maxId = actions.reduce((max, action) => {
    const num = parseInt(action.id.substring(1));
    return num > max ? num : max;
  }, 0);
  
  const nextNum = maxId + 1;
  return `A${String(nextNum).padStart(3, '0')}`;
}
