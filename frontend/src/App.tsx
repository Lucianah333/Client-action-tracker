import { useState, useEffect } from 'react';
import { ActionItem, CreateActionDTO } from './types';
import { fetchActions, createAction, updateAction } from './api';
import { Dashboard } from './components/Dashboard';
import { ActionList } from './components/ActionList';
import { CreateModal } from './components/CreateModal';

function App() {
  const [filteredActions, setFilteredActions] = useState<ActionItem[]>([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadActions();
  }, [statusFilter, priorityFilter]);

  const loadActions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchActions({ 
        status: statusFilter || undefined, 
        priority: priorityFilter || undefined 
      });
      setFilteredActions(data);
    } catch (err) {
      setError('Failed to load actions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAction = async (data: CreateActionDTO) => {
    try {
      await createAction(data);
      setIsModalOpen(false);
      loadActions();
    } catch (err) {
      setError('Failed to create action. Please check your input and try again.');
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateAction(id, { status: newStatus });
      loadActions();
    } catch (err) {
      setError('Failed to update action. Please try again.');
      console.error(err);
    }
  };

  const handleResetFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Client Action Tracker</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2"
          >
            + New Action
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <Dashboard actions={filteredActions} />
            
            <ActionList 
              actions={filteredActions} 
              onStatusUpdate={handleStatusUpdate}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusChange={setStatusFilter}
              onPriorityChange={setPriorityFilter}
              onResetFilters={handleResetFilters}
            />
          </>
        )}
      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateAction}
      />
    </div>
  );
}

export default App;
