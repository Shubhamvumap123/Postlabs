import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, Trash2, CheckCircle2, Circle, Search, Edit2, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Task {
  _id: string;
  position: string;
  company: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  createdAt: string;
}

const tabs = ["All", "Applied", "Interview", "Offer", "Rejected"] as const;
type Tab = typeof tabs[number];



export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Applied");
  const [searchQuery, setSearchQuery] = useState("");

  const [tasks, setTasks] = useState<Task[]>([]);

  const { token, logout } = useAuth();

  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCompany, setNewTaskCompany] = useState("");
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 401) {
          logout();
          return;
        }
        const data = await res.json();
        setTasks(data);
      } catch {
        toast.error('Failed to fetch jobs');
      }
    };
    if (token) fetchJobs();
  }, [token, logout]);



  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !newTaskCompany.trim()) return;

    try {
      if (editingJobId) {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs/${editingJobId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ position: newTaskTitle, company: newTaskCompany })
        });
        const updatedJob = await res.json();
        setTasks(prev => prev.map(t => t._id === editingJobId ? updatedJob : t));
        toast.success("Job application updated");
      } else {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ position: newTaskTitle, company: newTaskCompany, status: 'Applied' })
        });

        const newJob = await res.json();
        setTasks(prev => [newJob, ...prev]);
        toast.success("Job application created");
      }
      setIsNewTaskOpen(false);
      setNewTaskTitle("");
      setNewTaskCompany("");
      setEditingJobId(null);
    } catch {
      toast.error(editingJobId ? 'Failed to update job' : 'Failed to create job');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.filter(t => t._id !== id));
      toast.info("Job application deleted");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const startEdit = (task: Task) => {
    setEditingJobId(task._id);
    setNewTaskTitle(task.position);
    setNewTaskCompany(task.company);
    setIsNewTaskOpen(true);
  };

  const toggleTaskStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Applied' ? 'Interview' :
                       currentStatus === 'Interview' ? 'Offer' :
                       currentStatus === 'Offer' ? 'Rejected' : 'Applied';
    try {
      await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      setTasks(prev => prev.map(t => {
        if (t._id === id) return { ...t, status: nextStatus as Task['status'] };
        return t;
      }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (activeTab === 'All') return true;
      return task.status === activeTab;
    });
  }, [tasks, activeTab]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-100 shadow-xl">
      {/* Analytics Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-zinc-100">{tasks.length}</span>
          <span className="text-xs text-zinc-400 mt-1 flex items-center gap-1"><BarChart2 className="w-3 h-3"/> Total</span>
        </div>
        <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-purple-400">{tasks.filter(t => t.status === 'Applied').length}</span>
          <span className="text-xs text-zinc-400 mt-1">Applied</span>
        </div>
        <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-blue-400">{tasks.filter(t => t.status === 'Interview').length}</span>
          <span className="text-xs text-zinc-400 mt-1">Interviewing</span>
        </div>
         <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === 'Offer').length}</span>
          <span className="text-xs text-zinc-400 mt-1">Offers</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div role="tablist" aria-label="Task filters" className="flex p-1 bg-zinc-800/50 rounded-full overflow-x-auto no-scrollbar">
          {tabs.map((tab, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tabpanel-${tab}`}
              id={`tab-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              key={tab}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => {
                let newIndex = index;
                if (e.key === 'ArrowRight') {
                  newIndex = index === tabs.length - 1 ? 0 : index + 1;
                } else if (e.key === 'ArrowLeft') {
                  newIndex = index === 0 ? tabs.length - 1 : index - 1;
                }
                if (newIndex !== index) {
                  e.preventDefault();
                  setActiveTab(tabs[newIndex]);
                  const nextTab = document.getElementById(`tab-${tabs[newIndex]}`);
                  nextTab?.focus();
                }
              }}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                activeTab === tab ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-zinc-700 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-800/50 border-zinc-700 text-sm h-9"
          />
        </div>

        <Button
          onClick={() => {
            setEditingJobId(null);
            setNewTaskTitle("");
            setNewTaskCompany("");
            setIsNewTaskOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-900/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New</span>
        </Button>
      </div>

      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        className="min-h-[300px] bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-[300px]">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
              <Clock className="w-8 h-8 text-zinc-400" aria-hidden="true" />
            </div>
            <p className="text-zinc-400 font-medium">No job applications found</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <motion.div
                  key={task._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors group"
                >
                  <button
                    role="checkbox"
                    aria-checked={(task.status === 'Offer' || task.status === 'Rejected')}
                    onClick={() => toggleTaskStatus(task._id, task.status)}
                    className="flex-shrink-0 text-zinc-400 hover:text-purple-400 transition-colors rounded-full outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    aria-label={`Complete task: ${task.position}`}
                  >
                    {(task.status === 'Offer' || task.status === 'Rejected') ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium text-zinc-200 truncate",
                      (task.status === 'Offer' || task.status === 'Rejected') && "text-zinc-400 line-through"
                    )}>
                      {task.position}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="capitalize">{task.company}</span>
                      <span>•</span>
                      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(task)}
                      className="p-1.5 text-zinc-400 hover:text-blue-400 rounded hover:bg-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      title="Edit"
                      aria-label={`Edit task: ${task.position}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task._id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                      title="Delete"
                      aria-label={`Delete task: ${task.position}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Dialog
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        title={editingJobId ? "Edit Job Application" : "Create New Job"}
        description="Add a new task to your dashboard."
      >
        <form onSubmit={addTask} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-300">
              Position Title
            </label>
            <Input
              id="title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-purple-500"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-medium text-zinc-300">
              Company Name
            </label>
            <Input
              id="company"
              value={newTaskCompany}
              onChange={(e) => setNewTaskCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsNewTaskOpen(false)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white"
            >
              {editingJobId ? "Save Changes" : "Create Job"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
