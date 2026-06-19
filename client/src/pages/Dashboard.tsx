import { useState, useEffect } from "react";
import { LogOut, Plus, Briefcase, Calendar, CheckCircle2, XCircle, Search, Edit2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';


const API_URL = import.meta.env.VITE_API_URL || '/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingJob, setEditingJob] = useState<any>(null);
  const [formData, setFormData] = useState({ company: '', position: '', status: 'Applied', workLocation: 'Remote', jobType: 'Full-time' });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      let query = `?status=${statusFilter}`;
      if (search) query += `&search=${search}`;

      const res = await fetch(`${API_URL}/jobs${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data.jobs);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data.defaultStats);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchStats();
    }
  }, [token, search, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingJob ? `${API_URL}/jobs/${editingJob._id}` : `${API_URL}/jobs`;
      const method = editingJob ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        toast({ title: editingJob ? "Job updated" : "Job created", variant: "default" });
        setIsModalOpen(false);
        setEditingJob(null);
        setFormData({ company: '', position: '', status: 'Applied', workLocation: 'Remote', jobType: 'Full-time' });
        fetchJobs();
        fetchStats();
      } else {
        toast({ title: "Error saving job", variant: "destructive" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toast({ title: "Job deleted", variant: "default" });
        fetchJobs();
        fetchStats();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEditModal = (job: any) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      position: job.position,
      status: job.status,
      workLocation: job.workLocation || 'Remote',
      jobType: job.jobType || 'Full-time'
    });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 pt-24 text-white">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Job Dashboard</h1>
          <Button variant="ghost" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/login'); }} className="text-zinc-400 hover:text-white gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Applied</p>
              <p className="text-3xl font-bold text-blue-400">{stats.Applied}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500/20" />
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Interviewing</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.Interview}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-500/20" />
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Offers</p>
              <p className="text-3xl font-bold text-green-400">{stats.Offer}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500/20" />
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm">Rejected</p>
              <p className="text-3xl font-bold text-red-400">{stats.Rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500/20" />
          </div>
        </div>


        {/* Charts */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl mt-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Application Status Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Applied', count: stats.Applied },
                { name: 'Interviewing', count: stats.Interview },
                { name: 'Offers', count: stats.Offer },
                { name: 'Rejected', count: stats.Rejected }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis allowDecimals={false} stroke="#a1a1aa" />
                <RechartsTooltip cursor={{fill: '#27272a'}} contentStyle={{ backgroundColor: '#18181b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions & Filters */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Search position or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-zinc-900 border-zinc-800"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-white rounded-md px-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <Button onClick={() => { setEditingJob(null); setFormData({ company: '', position: '', status: 'Applied', workLocation: 'Remote', jobType: 'Full-time' }); setIsModalOpen(true); }} className="bg-purple-600 hover:bg-purple-500 gap-2">
            <Plus className="w-4 h-4" /> Add Job
          </Button>
        </div>

        {/* Jobs List */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
          {isLoading ? (
             <div className="p-8 text-center text-zinc-500">Loading jobs...</div>
          ) : jobs.length === 0 ? (
             <div className="p-8 text-center text-zinc-500">No jobs found. Add one to get started!</div>
          ) : (
            <div className="divide-y divide-zinc-800">
              <AnimatePresence mode="popLayout">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {jobs.map((job: any) => (
                  <motion.div key={job._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 flex items-center justify-between hover:bg-zinc-800/30 transition-colors">
                    <div>
                      <h3 className="font-medium text-white text-lg">{job.position}</h3>
                      <p className="text-zinc-400 text-sm">{job.company} • {job.workLocation} • {job.jobType}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn("px-3 py-1 rounded-full text-xs font-medium border",
                        job.status === 'Applied' && "bg-blue-500/10 text-blue-400 border-blue-500/20",
                        job.status === 'Interview' && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                        job.status === 'Offer' && "bg-green-500/10 text-green-400 border-green-500/20",
                        job.status === 'Rejected' && "bg-red-500/10 text-red-400 border-red-500/20",
                      )}>
                        {job.status}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(job)} className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(job._id)} className="p-2 text-zinc-400 hover:text-red-400 rounded-md hover:bg-zinc-800 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingJob ? "Edit Job" : "Add New Job"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Company</label>
            <Input required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-zinc-900 border-zinc-700" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Position</label>
            <Input required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="bg-zinc-900 border-zinc-700" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Location</label>
              <select value={formData.workLocation} onChange={(e) => setFormData({...formData, workLocation: e.target.value})} className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">{editingJob ? "Save Changes" : "Add Job"}</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Dashboard;
