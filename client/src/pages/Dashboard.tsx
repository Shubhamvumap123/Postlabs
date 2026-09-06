import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../lib/api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [formData, setFormData] = useState({ company: '', position: '', status: 'Applied' });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch jobs');
      setJobs([]); // Clear jobs on error
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(j =>
    (filterStatus === 'All' || j.status === filterStatus) &&
    (j.company.toLowerCase().includes(search.toLowerCase()) || j.position.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { name: 'Applied', count: jobs.filter(j => j.status === 'Applied').length },
    { name: 'Interview', count: jobs.filter(j => j.status === 'Interview').length },
    { name: 'Offer', count: jobs.filter(j => j.status === 'Offer').length },
    { name: 'Rejected', count: jobs.filter(j => j.status === 'Rejected').length },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const res = await api.put(`/jobs/${editingJob.id || editingJob._id}`, formData);
        setJobs(jobs.map(j => (j.id === editingJob.id || j._id === editingJob._id) ? res.data : j));
        toast.success('Job updated');
      } else {
        const res = await api.post('/jobs', formData);
        setJobs([...jobs, res.data]);
        toast.success('Job added');
      }
      setShowModal(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter(j => j.id !== id && j._id !== id));
      toast.success('Job deleted');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
    }
  };

  const openEdit = (job: any) => {
    setEditingJob(job);
    setFormData({ company: job.company, position: job.position, status: job.status });
    setShowModal(true);
  };

  const openAdd = () => {
    setEditingJob(null);
    setFormData({ company: '', position: '', status: 'Applied' });
    setShowModal(true);
  };

  if (!user) return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Job Tracker SaaS</h1>
      <p className="mb-8">Please login to continue.</p>
      <button onClick={() => window.location.href = '/login'} className="px-4 py-2 bg-purple-600 rounded cursor-pointer">Login</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <Navigation />
      <div className="max-w-6xl mx-auto pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="self-center">Welcome, {user.name}</span>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700">
               <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.name} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <h3 className="text-zinc-400">{s.name}</h3>
              <p className="text-3xl font-bold mt-2">{s.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8 h-80">
          <h2 className="text-xl mb-4 font-semibold">Application Status Overview</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" allowDecimals={false} />
              <Tooltip cursor={{fill: '#27272a'}} contentStyle={{backgroundColor: '#18181b', border: 'none'}} />
              <Bar dataKey="count" fill="#9333ea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Job Applications</h2>
            <button onClick={openAdd} className="flex items-center gap-2 bg-purple-600 px-4 py-2 rounded cursor-pointer hover:bg-purple-500">
              <Plus size={16} /> Add Job
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search companies or positions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800 px-4 py-2 rounded flex-1 border border-zinc-700 focus:outline-none focus:border-purple-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-800 px-4 py-2 rounded border border-zinc-700 focus:outline-none focus:border-purple-500"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center p-8">
               <p className="text-zinc-400">Loading jobs...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
             <div className="flex justify-center p-8">
               <p className="text-zinc-400">No jobs found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="pb-3 font-medium">Company</th>
                    <th className="pb-3 font-medium">Position</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date Applied</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map(job => (
                    <tr key={job.id || job._id} className="border-b border-zinc-800/50">
                      <td className="py-4">{job.company}</td>
                      <td className="py-4">{job.position}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded text-xs ${job.status === 'Applied' ? 'bg-blue-900/50 text-blue-400' : job.status === 'Interview' ? 'bg-yellow-900/50 text-yellow-400' : job.status === 'Offer' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 text-zinc-400">{new Date(job.dateApplied).toLocaleDateString()}</td>
                      <td className="py-4 text-right">
                        <button onClick={() => openEdit(job)} className="p-2 text-zinc-400 hover:text-white cursor-pointer"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(job.id || job._id)} className="p-2 text-zinc-400 hover:text-red-400 cursor-pointer"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">{editingJob ? 'Edit Job' : 'Add Job'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Company</label>
                <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Position</label>
                <input required value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 text-white focus:outline-none focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-zinc-800 px-4 py-2 rounded border border-zinc-700 text-white focus:outline-none focus:border-purple-500">
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded hover:bg-zinc-800 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-purple-600 rounded cursor-pointer hover:bg-purple-500">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
