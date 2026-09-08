import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Briefcase, Trash2, Edit2, LogOut, BarChart3, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { toast } from 'sonner';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Job {
  _id: string;
  title: string;
  company: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  location?: string;
  notes?: string;
}

const statusColors = {
  Applied: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  Interview: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  Offer: 'text-green-400 bg-green-400/10 border-green-400/20',
  Rejected: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function JobDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interview' | 'Offer' | 'Rejected'>('Applied');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch {
      toast.error('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const openAddModal = () => {
    setIsEditing(false);
    setTitle('');
    setCompany('');
    setStatus('Applied');
    setLocation('');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (job: Job) => {
    setIsEditing(true);
    setCurrentJobId(job._id);
    setTitle(job.title);
    setCompany(job.company);
    setStatus(job.status);
    setLocation(job.location || '');
    setNotes(job.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData = { title, company, status, location, notes };

    try {
      if (isEditing && currentJobId) {
        await api.put(`/jobs/${currentJobId}`, jobData);
        toast.success('Job updated successfully');
      } else {
        await api.post('/jobs', jobData);
        toast.success('Job added successfully');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch {
      toast.error(isEditing ? 'Failed to update job' : 'Failed to add job');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job application?')) {
      try {
        await api.delete(`/jobs/${id}`);
        toast.success('Job deleted successfully');
        fetchJobs();
      } catch {
        toast.error('Failed to delete job');
      }
    }
  };

  // PERFORMANCE: Memoize filtered jobs to prevent recalculation on unrelated state changes like form inputs
  const filteredJobs = useMemo(() => jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  }), [jobs, searchQuery, filterStatus]);

  // PERFORMANCE: Memoize analytics data generation to avoid O(n) array traversal on every render
  const analyticsData = useMemo(() => {
    const stats = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(job => {
      if (stats[job.status] !== undefined) {
        stats[job.status]++;
      }
    });
    return Object.keys(stats).map(key => ({
      name: key,
      count: stats[key as keyof typeof stats]
    }));
  }, [jobs]);

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Briefcase className="text-purple-500" /> Job Tracker
          </h1>
          <p className="text-zinc-400">Manage and track your job applications</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={openAddModal} className="bg-purple-600 hover:bg-purple-500 text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Job
          </Button>
          <Button variant="outline" onClick={handleLogout} className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="text-purple-400" /> Application Analytics
        </h2>
        {jobs.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
                <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
                <YAxis allowDecimals={false} stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
                <Tooltip
                  cursor={{ fill: '#27272a' }}
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#9333ea" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-zinc-500">
            Add jobs to see analytics
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <Input
            placeholder="Search by title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white w-full"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(statusOption => (
            <button
              key={statusOption}
              onClick={() => setFilterStatus(statusOption)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === statusOption
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
              }`}
            >
              {statusOption}
            </button>
          ))}
        </div>
      </div>

      {/* Job List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {filteredJobs.length > 0 ? (
          <div className="divide-y divide-zinc-800/50">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-zinc-800/50 transition-colors group"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">{job.title}</h3>
                    <p className="text-zinc-400 flex items-center gap-2 text-sm">
                      <span className="font-medium text-zinc-300">{job.company}</span>
                      {job.location && (
                        <>
                          <span>•</span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </p>
                    {job.notes && (
                      <p className="text-zinc-500 text-sm mt-2 line-clamp-1">{job.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs border font-medium ${statusColors[job.status]}`}>
                      {job.status}
                    </span>

                    <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" onClick={() => openEditModal(job)} className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(job._id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="p-12 text-center text-zinc-500 flex flex-col items-center">
            <Briefcase className="w-12 h-12 mb-4 opacity-20" />
            <p>No jobs found.</p>
            <p className="text-sm mt-1">Add a job to start tracking your applications.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-6">
              {isEditing ? 'Edit Job Application' : 'Add Job Application'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Job Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Applied" | "Interview" | "Offer" | "Rejected")}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Location (Optional)</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px] resize-y"
                  placeholder="Link to job posting, contact info, etc."
                />
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800/50">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white">
                  {isEditing ? 'Update Job' : 'Add Job'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
