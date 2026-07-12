import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, MapPin, DollarSign, Building, Trash2, Edit2, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import api from '../lib/api/axios';
import { useAuth } from '../context/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  location?: string;
  salary?: string;
  notes?: string;
  appliedDate: string;
  createdAt: string;
}

const tabs = ["All", "Applied", "Interview", "Offer", "Rejected"] as const;
type Tab = typeof tabs[number];

export default function JobDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<any>({});

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState<Job['status']>("Applied");

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/api/jobs');
      setJobs(res.data);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/jobs/stats');
      setStats(res.data);
    } catch (error) {
      console.error('Failed to fetch stats');
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;

    try {
      const payload = { company, position, location, salary, status };

      if (editingJobId) {
        const res = await api.put(`/api/jobs/${editingJobId}`, payload);
        setJobs(prev => prev.map(j => j._id === editingJobId ? res.data : j));
        toast.success("Job updated successfully");
      } else {
        const res = await api.post('/api/jobs', payload);
        setJobs(prev => [res.data, ...prev]);
        toast.success("Job added successfully");
      }

      setIsJobModalOpen(false);
      resetForm();
      fetchStats();
    } catch (error) {
      toast.error(editingJobId ? "Failed to update job" : "Failed to add job");
    }
  };

  const openEditModal = (job: Job) => {
    setEditingJobId(job._id);
    setCompany(job.company);
    setPosition(job.position);
    setLocation(job.location || "");
    setSalary(job.salary || "");
    setStatus(job.status);
    setIsJobModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsJobModalOpen(true);
  };

  const resetForm = () => {
    setEditingJobId(null);
    setCompany("");
    setPosition("");
    setLocation("");
    setSalary("");
    setStatus("Applied");
  };

  const deleteJob = async (id: string) => {
    try {
      await api.delete(`/api/jobs/${id}`);
      setJobs(prev => prev.filter(j => j._id !== id));
      toast.info("Job deleted");
      fetchStats();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const updateJobStatus = async (id: string, newStatus: Job['status']) => {
    try {
      const res = await api.put(`/api/jobs/${id}`, { status: newStatus });
      setJobs(prev => prev.map(j => j._id === id ? res.data : j));
      toast.success("Job status updated");
      fetchStats();
    } catch (error) {
      toast.error("Failed to update job status");
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.position.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeTab === 'All') return true;
      return job.status === activeTab;
    });
  }, [jobs, activeTab, searchQuery]);

  const chartData = [
    { name: 'Applied', count: stats.Applied || 0 },
    { name: 'Interview', count: stats.Interview || 0 },
    { name: 'Offer', count: stats.Offer || 0 },
    { name: 'Rejected', count: stats.Rejected || 0 },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 bg-zinc-950 min-h-screen text-zinc-100">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Job Tracker
          </h1>
          <p className="text-zinc-400 mt-1">Welcome back, {user?.name}</p>
        </div>
        <Button variant="outline" onClick={logout} className="border-zinc-700 text-zinc-300 hover:text-white">
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg">
          <p className="text-sm text-zinc-400">Total Applications</p>
          <p className="text-3xl font-bold text-white mt-1">{jobs.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg">
          <p className="text-sm text-blue-400">Interviews</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.Interview || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg">
          <p className="text-sm text-green-400">Offers</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.Offer || 0}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl shadow-lg">
          <p className="text-sm text-red-400">Rejected</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.Rejected || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div role="tablist" className="flex p-1 bg-zinc-800/50 rounded-full overflow-x-auto no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none",
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
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search by company or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-950 border-zinc-800"
            />
          </div>

          <div className="min-h-[300px] bg-zinc-950/50 rounded-xl border border-zinc-800/50 overflow-hidden">
            {loading ? (
               <div className="flex justify-center items-center h-[300px]">
                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
               </div>
            ) : filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 h-[300px]">
                <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-zinc-400" />
                </div>
                <p className="text-zinc-400 font-medium">No job applications found here</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/50">
                <AnimatePresence mode='popLayout'>
                  {filteredJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 hover:bg-zinc-800/30 transition-colors group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-zinc-100 truncate">{job.position}</h3>
                          <span className={cn(
                            "px-2 py-0.5 text-xs rounded-full font-medium border",
                            job.status === 'Applied' && "bg-zinc-800/50 text-zinc-300 border-zinc-700",
                            job.status === 'Interview' && "bg-blue-900/20 text-blue-400 border-blue-900/50",
                            job.status === 'Offer' && "bg-green-900/20 text-green-400 border-green-900/50",
                            job.status === 'Rejected' && "bg-red-900/20 text-red-400 border-red-900/50"
                          )}>
                            {job.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-zinc-400">
                          <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5"/> {job.company}</span>
                          {job.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {job.location}</span>}
                          {job.salary && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5"/> {job.salary}</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                         <select
                           value={job.status}
                           onChange={(e) => updateJobStatus(job._id, e.target.value as Job['status'])}
                           className="bg-zinc-800 border border-zinc-700 text-sm rounded px-2 py-1 outline-none text-zinc-200"
                         >
                           <option value="Applied">Applied</option>
                           <option value="Interview">Interview</option>
                           <option value="Offer">Offer</option>
                           <option value="Rejected">Rejected</option>
                         </select>
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-zinc-400 hover:text-blue-400 rounded hover:bg-zinc-800 transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteJob(job._id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
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
        </div>

        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl p-4 sm:p-6 h-[450px]">
          <h3 className="text-lg font-medium text-zinc-200 mb-6">Application Stats</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{fill: '#27272a', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                itemStyle={{ color: '#d4d4d8' }}
              />
              <Bar dataKey="count" fill="#9333ea" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Dialog
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        title={editingJobId ? "Edit Job Application" : "Add Job Application"}
        description="Track a job opportunity."
      >
        <form onSubmit={handleSubmitJob} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Company</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="bg-zinc-900 border-zinc-700"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Position</label>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className="bg-zinc-900 border-zinc-700"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Location (Optional)</label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote"
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Salary (Optional)</label>
              <Input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. $120k"
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Job['status'])}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-sm text-zinc-100 outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsJobModalOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">
              {editingJobId ? "Save Changes" : "Add Job"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
