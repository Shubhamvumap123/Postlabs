import { useState, useEffect } from 'react';
import api from '../api/axios';
import type { Job } from '../types';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Building, MapPin, Briefcase, Trash2, Edit2 } from 'lucide-react';
import { Dialog } from './ui/dialog';
import { cn } from '../lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const STATUS_COLORS = {
  Applied: '#6366f1', // Indigo
  Interview: '#eab308', // Yellow
  Offer: '#22c55e', // Green
  Rejected: '#ef4444', // Red
};

const JobDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form State
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interview' | 'Offer' | 'Rejected'>('Applied');

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
    } catch (_error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const jobData = { company, position, location, status };
      if (editingJob) {
        const response = await api.put(`/jobs/${editingJob._id}`, jobData);
        setJobs(jobs.map(j => j._id === editingJob._id ? response.data : j));
        toast.success('Job updated successfully');
      } else {
        const response = await api.post('/jobs', jobData);
        setJobs([response.data, ...jobs]);
        toast.success('Job added successfully');
      }
      handleCloseModal();
    } catch (_error) {
      toast.error('Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    if (!globalThis.confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(j => j._id !== id));
      toast.success('Job deleted');
    } catch (_error) {
      toast.error('Failed to delete job');
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setCompany(job.company);
    setPosition(job.position);
    setLocation(job.location || '');
    setStatus(job.status);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setCompany('');
    setPosition('');
    setLocation('');
    setStatus('Applied');
  };

  const filteredJobs = jobs.filter(j => {
    const matchesFilter = filter === 'All' || j.status === filter;
    const matchesSearch = j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    { name: 'Applied', value: jobs.filter(j => j.status === 'Applied').length },
    { name: 'Interview', value: jobs.filter(j => j.status === 'Interview').length },
    { name: 'Offer', value: jobs.filter(j => j.status === 'Offer').length },
    { name: 'Rejected', value: jobs.filter(j => j.status === 'Rejected').length },
  ].filter(s => s.value > 0);

  if (loading) {
    return <div className="text-zinc-400 text-center py-8">Loading jobs...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Analytics Section */}
      {jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 col-span-1 md:col-span-2 flex items-center justify-center min-h-[300px]">
             <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#e4e4e7' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <h3 className="text-zinc-400 text-sm font-medium">Total Applications</h3>
              <p className="text-4xl font-bold text-white mt-2">{jobs.length}</p>
            </div>
            {Object.entries(STATUS_COLORS).map(([stat, color]) => (
               <div key={stat} className="bg-zinc-950 p-4 rounded-lg border border-zinc-800">
                 <h4 className="text-zinc-400 text-xs font-medium">{stat}</h4>
                 <p className="text-xl font-bold mt-1" style={{ color }}>
                   {jobs.filter(j => j.status === stat).length}
                 </p>
               </div>
            ))}
          </div>
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
        <div className="w-full sm:w-1/3">
          <Input
            placeholder="Search by company or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-950 border-zinc-800 text-white w-full"
          />
        </div>
        <div className="flex gap-2 bg-zinc-950 p-1 rounded-lg overflow-x-auto w-full sm:w-auto">
          {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                filter === t ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-300"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Job
        </Button>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500">
            No jobs found.
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white truncate pr-2">{job.position}</h3>
                <span className="px-2.5 py-1 text-xs font-medium rounded-full" style={{ backgroundColor: `${STATUS_COLORS[job.status]}20`, color: STATUS_COLORS[job.status] }}>
                  {job.status}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <Building className="w-4 h-4" />
                  <span className="truncate">{job.company}</span>
                </div>
                {job.location && (
                  <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{job.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                   <Briefcase className="w-4 h-4" />
                   <span>Applied: {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(job)} className="p-2 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(job._id)} className="p-2 text-zinc-400 hover:text-red-400 bg-zinc-800 hover:bg-red-950 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog isOpen={isModalOpen} onClose={handleCloseModal} title={editingJob ? "Edit Job" : "Add New Job"} description="Enter the details of the job application.">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
            <Input required value={company} onChange={e => setCompany(e.target.value)} className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Position</label>
            <Input required value={position} onChange={e => setPosition(e.target.value)} className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Location</label>
            <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Remote, NY" className="bg-zinc-900 border-zinc-700 text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Applied' | 'Interview' | 'Offer' | 'Rejected')}
              className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-md h-10 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 mt-6">
             <Button type="button" variant="ghost" onClick={handleCloseModal} className="text-zinc-400 hover:text-white">Cancel</Button>
             <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">Save</Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default JobDashboard;
