# Client Action Tracker

A production-ready full-stack web application for tracking client actions with a modern React frontend and Express TypeScript backend.

## Tech Stack

- **Backend**: Node.js with Express and TypeScript
- **Frontend**: React with TypeScript and Tailwind CSS
- **Persistence**: Local JSON file (`data.json`) for data storage
- **Testing**: Jest and Supertest for automated tests

## Features

- **Dashboard**: Summary cards showing Total Actions, Open, In Progress, and Completed counts
- **Filtering**: Server-side filtering by Status and Priority
- **Action Management**: Create, read, and update action items
- **Overdue Highlighting**: Visual indicators for overdue items
- **Quick Status Updates**: One-click status progression (Open → In Progress → Completed)
- **Input Validation**: Comprehensive client-side and server-side validation
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Data Model

Each action item contains:
- `id`: Unique auto-generated identifier (e.g., "A007")
- `client`: Client name (required)
- `title`: Action title (required, minimum 5 characters)
- `owner`: Action owner (required)
- `dueDate`: Due date in YYYY-MM-DD format (required)
- `priority`: One of "Low", "Medium", "High"
- `status`: One of "Open", "In Progress", "Completed"

## Setup and Execution

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install root dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

### Running the Application

#### Development Mode (Both Backend and Frontend)
```bash
npm run dev
```
This starts:
- Backend API on http://localhost:3001
- Frontend on http://localhost:3000

#### Backend Only
```bash
npm run dev:backend
```

#### Frontend Only
```bash
npm run dev:frontend
```

### Production Build

```bash
npm run build
```

### Running in Production

```bash
npm start
```

## API Endpoints

### GET /api/actions
Returns all action items from `data.json`. Supports optional query parameters:
- `status`: Filter by status (e.g., "Open", "In Progress", "Completed")
- `priority`: Filter by priority (e.g., "Low", "Medium", "High")

Example:
```bash
curl "http://localhost:3001/api/actions?status=Open&priority=High"
```

### POST /api/actions
Creates a new action item. Validates payload and returns HTTP 400 for invalid data.

Request body:
```json
{
  "client": "Client Name",
  "title": "Action title (min 5 chars)",
  "owner": "Owner Name",
  "dueDate": "2026-12-31",
  "priority": "High",
  "status": "Open"
}
```

### PATCH /api/actions/:id
Updates an existing action item. Returns HTTP 404 if the item ID does not exist.

Request body (all fields optional):
```json
{
  "status": "Completed",
  "priority": "Medium"
}
```

## Testing

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Test Coverage

The test suite includes:
1. **Validation Test**: Verifies that POST requests with invalid titles return HTTP 400
2. **Status Transition Test**: Verifies that PATCH requests successfully update action status

## Security & Hardening

### Input Validation
- All string inputs are sanitized to prevent basic injection/XSS payloads
- Server-side validation for all required fields
- Type checking for priority and status values
- Date format validation (YYYY-MM-DD)

### CORS Configuration
- CORS middleware enabled for frontend-backend communication

### File I/O Safety
- Synchronous file operations with error handling
- Atomic writes to prevent data corruption

## Assumptions and Known Limitations

1. **Local JSON Storage**: The application uses a local JSON file for persistence instead of a database. This is suitable for single-user scenarios and development but not for production multi-user environments.

2. **No Authentication**: The application does not include user authentication or authorization. All users have full access to all actions.

3. **No Concurrency Control**: Multiple simultaneous writes to `data.json` could lead to race conditions. This is not an issue for single-user usage but would need to be addressed for multi-user scenarios.

4. **ID Generation**: IDs are generated sequentially based on existing IDs. In a distributed system, a more robust ID generation strategy would be needed.

5. **Date Validation**: Date validation ensures format correctness but does not validate logical dates (e.g., February 30th would pass format validation).

6. **No Search Functionality**: The API only supports filtering by exact status/priority matches, not full-text search.

7. **No Pagination**: All actions are returned in a single response. For large datasets, pagination would be necessary.

## AI Use Disclosure

This project was developed with assistance from AI tools. Below is a transparent disclosure of AI usage:

### Tools Used
- **Windsurf IDE**: Primary development environment with AI-powered code completion and suggestions

### Tasks AI Assisted With
1. **Project Structure**: AI suggested the monorepo structure with separate backend and frontend directories
2. **TypeScript Type Definitions**: AI helped define the TypeScript interfaces and type guards for the data model
3. **Express API Implementation**: AI assisted with setting up Express middleware, route handlers, and validation logic
4. **React Component Structure**: AI suggested the component architecture (Dashboard, FilterBar, ActionList, CreateModal)
5. **Tailwind CSS Styling**: AI provided Tailwind class suggestions for responsive, modern UI design
6. **Test Implementation**: AI helped structure the Jest/Supertest test cases with proper assertions

### Specific AI Output Corrected

**Issue**: The AI initially suggested using `__dirname` in the backend `dataService.ts` file, which is not available in ES modules by default.

**Correction**: I corrected this by using `path.join(__dirname, '../data.json')` with proper TypeScript configuration to ensure `__dirname` is available in CommonJS mode, and updated the `tsconfig.json` to target CommonJS for the backend.

**Why**: The backend uses CommonJS modules (as specified in `tsconfig.json`), so `__dirname` is available. However, the initial AI suggestion didn't account for the module system configuration, which could cause runtime errors. I ensured the configuration was consistent between the TypeScript settings and the actual runtime environment.

### Verification Methodology

To ensure code correctness and personal understanding:

1. **Manual Code Review**: I reviewed each generated file to understand the implementation details and verify alignment with requirements
2. **Type Checking**: I verified TypeScript types were correctly defined and used throughout the codebase
3. **API Validation**: I mentally traced through the API endpoints to ensure proper validation, error handling, and response formatting
4. **Frontend State Management**: I verified the React state management pattern and component data flow
5. **Test Logic Review**: I examined the test cases to ensure they properly validate the required scenarios
6. **Security Review**: I reviewed input sanitization and validation logic to ensure basic security measures are in place

## Project Structure

```
client-action-tracker/
├── backend/
│   ├── __tests__/
│   │   └── api.test.ts          # Jest/Supertest tests
│   ├── server.ts                # Express server and API routes
│   ├── types.ts                 # TypeScript type definitions
│   ├── validation.ts            # Input validation utilities
│   ├── dataService.ts           # File I/O operations
│   └── tsconfig.json            # Backend TypeScript config
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.tsx    # Summary metrics cards
│   │   │   ├── FilterBar.tsx    # Filter controls
│   │   │   ├── ActionList.tsx   # Action items table
│   │   │   └── CreateModal.tsx  # Create action form
│   │   ├── api.ts               # API client functions
│   │   ├── utils.ts             # Utility functions
│   │   ├── types.ts             # TypeScript type definitions
│   │   ├── App.tsx              # Main application component
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Tailwind CSS imports
│   ├── index.html               # HTML template
│   ├── package.json             # Frontend dependencies
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── tsconfig.json            # Frontend TypeScript config
├── data.json                    # Data storage file
├── package.json                 # Root dependencies
├── jest.config.js               # Jest configuration
└── .gitignore                   # Git ignore rules
```

## License

ISC
