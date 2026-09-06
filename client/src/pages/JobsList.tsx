import React, { useState, useEffect } from 'react';
import api from '../lib/axios';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  dateApplied: string;
}

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  // New job form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [editJobId, setEditJobId] = useState<string | null>(null);
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setJobs(data);
    } catch {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editJobId) {
        const { data } = await api.put(`/jobs/${editJobId}`, { company, position, status });
        setJobs(jobs.map(job => job._id === editJobId ? data : job));
        toast.success('Job updated successfully');
      } else {
        const { data } = await api.post('/jobs', { company, position, status });
        setJobs([data, ...jobs]);
        toast.success('Job added successfully');
      }
      setShowAddForm(false);
      setEditJobId(null);
      setCompany('');
      setPosition('');
      setStatus('Applied');
    } catch {
      toast.error(`Failed to ${editJobId ? 'update' : 'add'} job`);
    }
  };

  const handleEdit = (job: Job) => {
    setEditJobId(job._id);
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      toast.success('Job deleted');
    } catch {
      toast.error('Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
                          job.position.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || job.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">My Job Applications</h1>
        <Button onClick={() => {
          if (showAddForm) {
            setShowAddForm(false);
            setEditJobId(null);
            setCompany('');
            setPosition('');
            setStatus('Applied');
          } else {
            setShowAddForm(true);
          }
        }}>
          {showAddForm ? 'Cancel' : 'Add New Job'}
        </Button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddJob} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Company</label>
              <Input value={company} onChange={e => setCompany(e.target.value)} required className="w-full bg-zinc-800" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Position</label>
              <Input value={position} onChange={e => setPosition(e.target.value)} required className="w-full bg-zinc-800" />
            </div>
            <div>
              <label className="text-sm text-zinc-400 mb-1 block">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-md bg-zinc-800 border border-zinc-700 text-white"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <Button type="submit">{editJobId ? 'Update Job' : 'Save Job'}</Button>
        </form>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Search company or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 max-w-sm"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="h-10 px-3 rounded-md bg-zinc-900 border border-zinc-800 text-white min-w-[150px]"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {loading ? (
        <div className="text-zinc-400">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-zinc-400 text-center py-10 bg-zinc-900 rounded-xl border border-zinc-800">
          No jobs found. Start by adding one!
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredJobs.map(job => (
            <div key={job._id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">{job.position}</h3>
                <p className="text-zinc-400">{job.company}</p>
                <p className="text-xs text-zinc-500 mt-1">Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  job.status === 'Offer' ? 'bg-green-500/10 text-green-500' :
                  job.status === 'Rejected' ? 'bg-red-500/10 text-red-500' :
                  job.status === 'Interview' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {job.status}
                </span>
                <Button variant="outline" size="sm" onClick={() => handleEdit(job)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobsList;
