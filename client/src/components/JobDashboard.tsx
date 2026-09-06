import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Plus, Edit2, Trash2, LogOut, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import api from '../lib/api';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog } from './ui/dialog';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  salary: string;
  notes: string;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444'];
const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected'];

const JobDashboard = () => {
  const { logout, user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    salary: '',
    notes: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch {
      toast.error('Failed to fetch jobs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (job: Job | null = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        company: job.company,
        position: job.position,
        status: job.status,
        salary: job.salary || '',
        notes: job.notes || '',
      });
    } else {
      setEditingJob(null);
      setFormData({ company: '', position: '', status: 'Applied', salary: '', notes: '' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, formData);
        toast.success('Job updated');
      } else {
        await api.post('/jobs', formData);
        toast.success('Job added');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch {
      toast.error('Failed to save job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await api.delete(`/jobs/${id}`);
        toast.success('Job deleted');
        fetchJobs();
      } catch {
        toast.error('Failed to delete job');
      }
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
                         job.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const chartData = STATUSES.map(status => ({
    name: status,
    value: jobs.filter(j => j.status === status).length
  })).filter(d => d.value > 0);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-100 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
          <p className="text-zinc-400">Track your job applications</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Job
          </Button>
          <Button onClick={logout} variant="ghost" className="text-zinc-400 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded px-3 text-white outline-none"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="bg-zinc-800/50 rounded-lg border border-zinc-700 overflow-hidden">
            {isLoading ? (
              <div className="p-12 flex justify-center text-zinc-400">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="p-8 text-center text-zinc-400">No jobs found. Add one to get started!</div>
            ) : (
              <div className="divide-y divide-zinc-700">
                {filteredJobs.map(job => (
                  <div key={job._id} className="p-4 flex items-center justify-between hover:bg-zinc-800/80 transition-colors">
                    <div>
                      <h3 className="font-medium text-lg">{job.position}</h3>
                      <p className="text-zinc-400">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        job.status === 'Applied' ? 'bg-purple-900/30 text-purple-400 border-purple-800' :
                        job.status === 'Interview' ? 'bg-blue-900/30 text-blue-400 border-blue-800' :
                        job.status === 'Offer' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800' :
                        'bg-red-900/30 text-red-400 border-red-800'
                      }`}>
                        {job.status}
                      </span>
                      <button onClick={() => handleOpenModal(job)} className="text-zinc-400 hover:text-white p-1">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(job._id)} className="text-zinc-400 hover:text-red-400 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700 h-[300px]">
          <h3 className="text-lg font-medium mb-4 text-center">Application Stats</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[STATUSES.indexOf(entry.name) % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-zinc-500 text-sm">No data to display</div>
          )}
        </div>
      </div>

      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingJob ? "Edit Job" : "Add Job"} description="Fill in the details below.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-300">Company</label>
            <Input required value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="bg-zinc-900" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300">Position</label>
            <Input required value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="bg-zinc-900" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-md p-2 text-white">
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300">Salary (Optional)</label>
            <Input value={formData.salary} onChange={(e) => setFormData({...formData, salary: e.target.value})} className="bg-zinc-900" />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300">Notes (Optional)</label>
            <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full mt-1 bg-zinc-900 border border-zinc-700 rounded-md p-2 text-white min-h-[80px]" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500 min-w-[80px]" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : editingJob ? 'Update' : 'Save'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default JobDashboard;
