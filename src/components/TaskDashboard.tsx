import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Plus, Zap, Palette, Shield, Trash2, CheckCircle2, Circle, Archive } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

export interface Task {
  id: string;
  title: string;
  status: 'Scheduled' | 'Completed' | 'Archived';
  category: string;
  createdAt: number;
}

/**
 * TaskDashboard Component
 *
 * A modern, responsive dashboard card component for managing tasks.
 *
 * Features:
 * - Layout: Dark-mode card with rounded corners (xl) and subtle borders.
 * - Navigation: Tabbed interface (All, Scheduled, Completed, Archived) with animated pill background.
 * - Actions: Primary "+ New" button with purple accent color.
 * - Content: Empty state handling with a clock icon and placeholder text.
 * - Filtering: Skill-based agent filters (Performance, Design, Security) with toggleable states.
 * - Tech Stack: Built with React, Tailwind CSS, Framer Motion, and Lucide-React.
 */

const tabs = ["All", "Scheduled", "Completed", "Archived"] as const;
type Tab = typeof tabs[number];

const filters = [
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("Scheduled");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("performance");

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = globalThis.localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Failed to parse tasks', e);
      }
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    globalThis.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      status: 'Scheduled',
      category: newTaskCategory,
      createdAt: Date.now(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast.success("Task created successfully");
    setIsNewTaskOpen(false);
    setNewTaskTitle("");
    setNewTaskCategory("performance");
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.info("Task deleted");
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newStatus = t.status === 'Completed' ? 'Scheduled' : 'Completed';
        return { ...t, status: newStatus };
      }
      return t;
    }));
  };

  const archiveTask = (id: string) => {
     setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: 'Archived' };
      }
      return t;
    }));
    toast.success("Task archived");
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilters.length > 0 && !activeFilters.includes(task.category)) return false;

    if (activeTab === 'All') return true;
    if (activeTab === 'Scheduled' && (task.status === 'Scheduled')) return true;
    if (activeTab === 'Completed' && task.status === 'Completed') return true;
    if (activeTab === 'Archived' && task.status === 'Archived') return true;
    return false;
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-100 shadow-xl">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div role="tablist" aria-label="Task filters" className="flex p-1 bg-zinc-800/50 rounded-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        <Button
          onClick={() => setIsNewTaskOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-900/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New</span>
        </Button>
      </div>

      {/* Content Area */}
      <div className="min-h-[300px] bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-[300px]">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
              <Clock className="w-8 h-8 text-zinc-600" aria-hidden="true" />
            </div>
            <p className="text-zinc-500 font-medium">Scheduled tasks will show up here</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            <AnimatePresence mode='popLayout'>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors group"
                >
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="flex-shrink-0 text-zinc-500 hover:text-purple-400 transition-colors"
                  >
                    {task.status === 'Completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "text-sm font-medium text-zinc-200 truncate",
                      task.status === 'Completed' && "text-zinc-500 line-through"
                    )}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                      <span className="capitalize">{task.category}</span>
                      <span>•</span>
                      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {task.status !== 'Archived' && (
                      <button
                        onClick={() => archiveTask(task.id)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-800"
                        title="Archive"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800"
                      title="Delete"
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

      {/* New Task Dialog */}
      <Dialog
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        title="Create New Task"
        description="Add a new task to your dashboard."
      >
        <form onSubmit={addTask} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-zinc-300">
              Task Title
            </label>
            <Input
              id="title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Review system performance"
              className="bg-zinc-900 border-zinc-700 text-zinc-100 focus:ring-purple-500"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">
              Category
            </label>
            <div className="flex gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setNewTaskCategory(filter.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-3 rounded-lg border text-xs gap-1 transition-all",
                    newTaskCategory === filter.id
                      ? "bg-purple-900/20 border-purple-500 text-purple-200"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  )}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
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
              Create Task
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Bottom Filter Chips */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-zinc-400 mb-3">Skill-based agents</h4>
        <div className="flex flex-wrap gap-3">
          {filters.map(({ id, label, icon: Icon }) => {
            const isActive = activeFilters.includes(id);
            return (
              <button
                type="button"
                aria-pressed={isActive}
                key={id}
                onClick={() => toggleFilter(id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-zinc-800 border-zinc-700 text-white shadow-sm"
                    : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-purple-400" : "text-current")} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
