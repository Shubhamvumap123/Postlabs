import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Plus, Trash2, LogOut, Edit2 } from 'lucide-react';
import { Dialog } from '../components/ui/dialog';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  location: string;
  notes: string;
  createdAt: string;
}

const COLORS = {
  Applied: '#3b82f6', // blue
  Interview: '#eab308', // yellow
  Offer: '#22c55e', // green
  Rejected: '#ef4444', // red
};

const JobDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    status: 'Applied',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchJobs();
  }, [user, navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs');
      setJobs(response.data);
    } catch {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleOpenModal = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        company: job.company,
        position: job.position,
        status: job.status,
        location: job.location || '',
        notes: job.notes || '',
      });
    } else {
      setEditingJob(null);
      setFormData({
        company: '',
        position: '',
        status: 'Applied',
        location: '',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await axios.put(`/api/jobs/${editingJob._id}`, formData);
        toast.success('Job updated successfully');
      } else {
        await axios.post('/api/jobs', formData);
        toast.success('Job added successfully');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error(axios.isAxiosError(error) ? error.response?.data?.message : 'Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      toast.success('Job deleted successfully');
      fetchJobs();
    } catch {
      toast.error('Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Analytics Data
  const getAnalyticsData = () => {
    const statusCounts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(job => {
      if (statusCounts[job.status] !== undefined) {
        statusCounts[job.status]++;
      }
    });
    return Object.keys(statusCounts).map(key => ({
      name: key,
      value: statusCounts[key as keyof typeof statusCounts]
    })).filter(item => item.value > 0);
  };

  const pieData = getAnalyticsData();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold text-white">Job Tracker Dashboard</h1>
            <p className="text-zinc-400">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => handleOpenModal()} className="bg-purple-600 hover:bg-purple-500">
              <Plus className="w-4 h-4 mr-2" /> Add Job
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-zinc-700 hover:bg-zinc-800">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Search company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-zinc-900 border-zinc-800 focus:ring-purple-500 flex-1"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Jobs List */}
            <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
              {filteredJobs.length === 0 ? (
                <div className="p-8 text-center text-zinc-400">No jobs found.</div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {filteredJobs.map((job) => (
                    <div key={job._id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-zinc-800/50 transition-colors">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{job.position}</h3>
                        <p className="text-zinc-400">{job.company} {job.location && `• ${job.location}`}</p>
                        <p className="text-xs text-zinc-500 mt-1">Applied: {new Date(job.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border
                          ${job.status === 'Applied' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                          ${job.status === 'Interview' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : ''}
                          ${job.status === 'Offer' ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
                          ${job.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
                        `}>
                          {job.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => handleOpenModal(job)} className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-700 transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(job._id)} className="p-2 text-zinc-400 hover:text-red-400 rounded-md hover:bg-zinc-700 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Analytics */}
          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h3 className="text-lg font-semibold mb-4 text-white">Application Stats</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-white">{jobs.length}</p>
                  <p className="text-xs text-zinc-400 mt-1">Total Apps</p>
                </div>
                <div className="bg-zinc-800/50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-400">{jobs.filter(j => j.status === 'Offer').length}</p>
                  <p className="text-xs text-zinc-400 mt-1">Offers</p>
                </div>
              </div>

              {pieData.length > 0 ? (
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-zinc-500">
                  Not enough data
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Job Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingJob ? "Edit Job Application" : "Add Job Application"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Company *</label>
              <Input
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Position *</label>
              <Input
                required
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                className="bg-zinc-900 border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as Job['status']})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="bg-zinc-900 border-zinc-700"
                placeholder="e.g. Remote, New York, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                placeholder="Any additional notes..."
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-500">
              {editingJob ? 'Update Job' : 'Add Job'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default JobDashboard;
