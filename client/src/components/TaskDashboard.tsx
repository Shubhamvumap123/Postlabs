import { useState, useEffect } from "react";
import { Plus, Clock, Trash2, Shield, Zap, Paintbrush, Search, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog } from "./ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import DashboardCharts from "./DashboardCharts";

type JobStatus = 'Applied' | 'Interview' | 'Offer' | 'Rejected';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: JobStatus;
  type: string;
  createdAt: string;
}

const tabs: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

const filters = [
  { id: 'Full-time', label: 'Full-time', icon: Zap },
  { id: 'Contract', label: 'Contract', icon: Paintbrush },
  { id: 'Freelance', label: 'Freelance', icon: Shield },
];

export default function JobDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeTab, setActiveTab] = useState<JobStatus>('Applied');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isNewJobOpen, setIsNewJobOpen] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newJobType, setNewJobType] = useState("Full-time");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/jobs`, { headers: getAuthHeader() });
      setJobs(res.data);
    } catch (error: unknown) {
      if (error instanceof axios.AxiosError && error.response?.status === 401) {
        toast.error("Session expired, please login again");
        localStorage.removeItem('token');
        navigate('/auth');
      } else {
        toast.error("Failed to load jobs. Using offline mode.");
        setJobs([
          { _id: '1', company: 'Tech Corp (Offline)', position: 'Frontend Engineer', status: 'Applied', type: 'Full-time', createdAt: new Date().toISOString() }
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Allow viewing but fetch will fail, maybe redirect
      navigate('/auth');
      return;
    }
    void fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  const addJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newPosition.trim()) return;

    const payload = { company: newCompany, position: newPosition, type: newJobType, status: 'Applied' };

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/jobs`, payload, { headers: getAuthHeader() });
      setJobs([...jobs, res.data]);
      setNewCompany("");
      setNewPosition("");
      setIsNewJobOpen(false);
      toast.success("Job application saved");
    } catch {
      toast.error("Failed to add job");
    }
  };

  const deleteJob = async (id: string) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/jobs/${id}`, { headers: getAuthHeader() });
      setJobs(jobs.filter(j => j._id !== id));
      toast.success("Job removed");
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const updateStatus = async (id: string, status: JobStatus) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.put(`${API_URL}/api/jobs/${id}`, { status }, { headers: getAuthHeader() });
      setJobs(jobs.map(j => j._id === id ? res.data : j));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTab = job.status === activeTab;
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(job.type);
    const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return <div className="text-zinc-400 p-8 text-center animate-pulse">Loading dashboard...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-zinc-100 shadow-xl mt-8">

      <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Application Tracker</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-zinc-400 hover:text-white">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <DashboardCharts jobs={jobs} />

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company or role..."
            className="pl-9 bg-zinc-900 border-zinc-700 text-sm"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {filters.map(({ id, label, icon: Icon }) => {
            const isActive = activeFilters.includes(id);
            return (
              <button
                type="button"
                key={id}
                onClick={() => setActiveFilters(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap",
                  isActive
                    ? "bg-zinc-800 border-zinc-700 text-white"
                    : "bg-transparent border-zinc-800 text-zinc-400 hover:border-zinc-700"
                )}
              >
                <Icon className={cn("w-3 h-3", isActive ? "text-purple-400" : "text-current")} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div role="tablist" aria-label="Job status filters" className="flex p-1 bg-zinc-800/50 rounded-full overflow-x-auto no-scrollbar w-full sm:w-auto">
          {tabs.map((tab) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none",
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
          onClick={() => setIsNewJobOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-900/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Application</span>
        </Button>
      </div>

      <div className="min-h-[300px] bg-zinc-900/50 rounded-xl border border-zinc-800/50 overflow-hidden outline-none">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 h-[300px]">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
              <Clock className="w-8 h-8 text-zinc-500" />
            </div>
            <p className="text-zinc-400 font-medium">No applications match your criteria</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            <AnimatePresence mode='popLayout'>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">
                      {job.position} <span className="text-zinc-500">at</span> {job.company}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800/80">{job.type}</span>
                      <span>•</span>
                      <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-auto mt-2 sm:mt-0">
                    <select
                      value={job.status}
                      onChange={(e) => updateStatus(job._id, e.target.value as JobStatus)}
                      className="bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 rounded p-1.5 outline-none focus:ring-1 focus:ring-purple-500"
                    >
                      {tabs.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <button
                      onClick={() => deleteJob(job._id)}
                      className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
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

      <Dialog
        isOpen={isNewJobOpen}
        onClose={() => setIsNewJobOpen(false)}
        title="New Application"
        description="Track a new job application."
      >
        <form onSubmit={addJob} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Company</label>
            <Input
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              placeholder="e.g. Google"
              className="bg-zinc-900 border-zinc-700 text-zinc-100"
              autoFocus
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Position</label>
            <Input
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="bg-zinc-900 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Type</label>
            <div className="flex gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setNewJobType(filter.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center justify-center p-3 rounded-lg border text-xs gap-1 transition-all outline-none",
                    newJobType === filter.id
                      ? "bg-purple-900/20 border-purple-500 text-purple-200"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400"
                  )}
                >
                  <filter.icon className="w-4 h-4" />
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsNewJobOpen(false)} className="text-zinc-400">Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">Create</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
