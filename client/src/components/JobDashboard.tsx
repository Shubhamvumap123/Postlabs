import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../lib/AuthContext';
import { Plus, Briefcase, MapPin, Building, Calendar, Edit, Trash2, PieChart as PieChartIcon, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Job {
  _id: string;
  title: string;
  company: string;
  status: string;
  location: string;
  appliedDate: string;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444'];
const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const JobDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({ title: '', company: '', status: 'Applied', location: '' });
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { token, logout } = useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchJobs();
    fetchAnalytics();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch jobs');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/jobs/analytics`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const formattedData = STATUSES.map(status => {
        const found = res.data.find((item: any) => item._id === status);
        return { name: status, value: found ? found.count : 0 };
      });
      setAnalytics(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await axios.put(`${API_URL}/api/jobs/${editingJob._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Job updated successfully');
      } else {
        await axios.post(`${API_URL}/api/jobs`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Job added successfully');
      }
      setIsModalOpen(false);
      setEditingJob(null);
      setFormData({ title: '', company: '', status: 'Applied', location: '' });
      fetchJobs();
      fetchAnalytics();
    } catch (error) {
      toast.error('Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Job deleted successfully');
      fetchJobs();
      fetchAnalytics();
    } catch (error) {
      toast.error('Failed to delete job');
    }
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({ title: job.title, company: job.company, status: job.status, location: job.location });
    setIsModalOpen(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Briefcase className="text-purple-500" />
          Job Tracker Dashboard
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => { setEditingJob(null); setFormData({ title: '', company: '', status: 'Applied', location: '' }); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors font-medium"
          >
            <Plus size={18} /> Add Job
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500" size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500 transition-colors appearance-none"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center">
              <p className="text-zinc-400">No jobs found matching your criteria.</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <div key={job._id} className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 flex justify-between items-center hover:border-zinc-700 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                    <span className="flex items-center gap-1"><Building size={14} /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.location || 'Remote'}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(job.appliedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                    job.status === 'Interview' ? 'bg-purple-500/20 text-purple-400' :
                    job.status === 'Offer' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {job.status}
                  </span>
                  <button onClick={() => openEditModal(job)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(job._id)} className="text-zinc-500 hover:text-red-400 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 h-[400px]">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <PieChartIcon className="text-purple-500" size={20} />
            Analytics
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {analytics.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 w-full max-w-md rounded-xl p-6 border border-zinc-800">
            <h2 className="text-xl font-bold text-white mb-4">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Job Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-white outline-none focus:border-purple-500">
                  {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg">Save Job</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDashboard;
