import express, { Request, Response } from 'express';
import cors from 'cors';
import {
  ActionItem,
  CreateActionDTO,
  UpdateActionDTO,
  Priority,
  Status,
} from './types';
import {
  sanitizeString,
  isValidDateFormat,
  isValidPriority,
  isValidStatus,
  validateRequiredFields,
  validateTitle,
} from './validation';
import { readActions, writeActions, generateNextId } from './dataService';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET /api/actions - Get all actions with optional filtering
app.get('/api/actions', (req: Request, res: Response) => {
  try {
    const actions = readActions();
    const { status, priority } = req.query;
    
    let filteredActions = actions;
    
    if (status && typeof status === 'string') {
      filteredActions = filteredActions.filter(
        (action) => action.status === status
      );
    }
    
    if (priority && typeof priority === 'string') {
      filteredActions = filteredActions.filter(
        (action) => action.priority === priority
      );
    }
    
    res.json(filteredActions);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/actions - Create a new action
app.post('/api/actions', (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    // Validate required fields
    const requiredValidation = validateRequiredFields(data);
    if (!requiredValidation.valid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: requiredValidation.errors 
      });
    }
    
    // Sanitize string inputs
    const sanitizedData: CreateActionDTO = {
      client: sanitizeString(data.client),
      title: sanitizeString(data.title),
      owner: sanitizeString(data.owner),
      dueDate: sanitizeString(data.dueDate),
      priority: sanitizeString(data.priority) as Priority,
      status: sanitizeString(data.status) as Status,
    };
    
    // Validate title length
    const titleValidation = validateTitle(sanitizedData.title);
    if (!titleValidation.valid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: [titleValidation.error] 
      });
    }
    
    // Validate date format
    if (!isValidDateFormat(sanitizedData.dueDate)) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['dueDate must be in YYYY-MM-DD format'] 
      });
    }
    
    // Validate priority
    if (!isValidPriority(sanitizedData.priority)) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['priority must be one of: Low, Medium, High'] 
      });
    }
    
    // Validate status
    if (!isValidStatus(sanitizedData.status)) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['status must be one of: Open, In Progress, Completed'] 
      });
    }
    
    const actions = readActions();
    const newId = generateNextId(actions);
    
    const newAction: ActionItem = {
      id: newId,
      ...sanitizedData,
    };
    
    actions.push(newAction);
    writeActions(actions);
    
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/actions/:id - Update an action
app.patch('/api/actions/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const actions = readActions();
    const actionIndex = actions.findIndex((action) => action.id === id);
    
    if (actionIndex === -1) {
      return res.status(404).json({ error: 'Action not found' });
    }
    
    const updatedAction: ActionItem = { ...actions[actionIndex] };
    
    // Apply updates with validation
    if (updates.client !== undefined) {
      updatedAction.client = sanitizeString(updates.client);
    }
    if (updates.title !== undefined) {
      const sanitizedTitle = sanitizeString(updates.title);
      if (sanitizedTitle.length < 5) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: ['title must be at least 5 characters'] 
        });
      }
      updatedAction.title = sanitizedTitle;
    }
    if (updates.owner !== undefined) {
      updatedAction.owner = sanitizeString(updates.owner);
    }
    if (updates.dueDate !== undefined) {
      const sanitizedDate = sanitizeString(updates.dueDate);
      if (!isValidDateFormat(sanitizedDate)) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: ['dueDate must be in YYYY-MM-DD format'] 
        });
      }
      updatedAction.dueDate = sanitizedDate;
    }
    if (updates.priority !== undefined) {
      const sanitizedPriority = sanitizeString(updates.priority);
      if (!isValidPriority(sanitizedPriority)) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: ['priority must be one of: Low, Medium, High'] 
        });
      }
      updatedAction.priority = sanitizedPriority;
    }
    if (updates.status !== undefined) {
      const sanitizedStatus = sanitizeString(updates.status);
      if (!isValidStatus(sanitizedStatus)) {
        return res.status(400).json({ 
          error: 'Validation failed', 
          details: ['status must be one of: Open, In Progress, Completed'] 
        });
      }
      updatedAction.status = sanitizedStatus;
    }
    
    actions[actionIndex] = updatedAction;
    writeActions(actions);
    
    res.json(updatedAction);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
