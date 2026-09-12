import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  location: string;
}

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ company: '', position: '', status: 'Applied', location: '' });

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      setJobs(data);
    } catch (err: unknown) {
      console.error(err);
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        (err as Record<string, unknown>).response &&
        ((err as Record<string, unknown>).response as Record<string, unknown>).status === 401
      ) {
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/jobs/${editId}`, formData);
        toast.success('Job updated');
      } else {
        await api.post('/jobs', formData);
        toast.success('Job added');
      }
      fetchJobs();
      setShowForm(false);
      setFormData({ company: '', position: '', status: 'Applied', location: '' });
      setEditId(null);
    } catch (err: unknown) {
      toast.error('Operation failed'); console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await api.delete(`/jobs/${id}`);
      toast.success('Job deleted');
      fetchJobs();
    } catch (err: unknown) {
      toast.error('Delete failed'); console.error(err);
    }
  };

  const handleEdit = (job: Job) => {
    setFormData({ company: job.company, position: job.position, status: job.status, location: job.location || '' });
    setEditId(job._id);
    setShowForm(true);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics data
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = [
    { name: 'Applied', count: statusCounts['Applied'] || 0, color: '#3b82f6' },
    { name: 'Interview', count: statusCounts['Interview'] || 0, color: '#eab308' },
    { name: 'Offer', count: statusCounts['Offer'] || 0, color: '#22c55e' },
    { name: 'Rejected', count: statusCounts['Rejected'] || 0, color: '#ef4444' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400">Welcome, {userInfo.name}</p>
        </div>
        <button onClick={handleLogout} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors">Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 col-span-1 md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                <RechartsTooltip cursor={{fill: '#27272a'}} contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '4px'}} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Job Applications</h2>
            <button onClick={() => { setShowForm(true); setEditId(null); setFormData({ company: '', position: '', status: 'Applied', location: '' }); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colors">
              + New Job
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-zinc-800 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="p-3">Company</th>
                  <th className="p-3">Position</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Location</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length === 0 ? (
                  <tr><td colSpan={5} className="p-4 text-center text-zinc-500">No jobs found.</td></tr>
                ) : (
                  filteredJobs.map(job => (
                    <tr key={job._id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="p-3 font-medium">{job.company}</td>
                      <td className="p-3">{job.position}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium
                          ${job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${job.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                          ${job.status === 'Offer' ? 'bg-green-500/20 text-green-400' : ''}
                          ${job.status === 'Rejected' ? 'bg-red-500/20 text-red-400' : ''}
                        `}>
                          {job.status}
                        </span>
                      </td>
                      <td className="p-3">{job.location || '-'}</td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => handleEdit(job)} className="px-2 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm transition-colors">Edit</button>
                        <button onClick={() => handleDelete(job._id)} className="px-2 py-1 bg-red-900/50 hover:bg-red-900 rounded text-sm text-red-200 transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-md border border-zinc-800">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Job' : 'Add Job'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input required type="text" value={formData.position} onChange={e => setFormData({...formData, position: e.target.value})} className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 bg-zinc-800 rounded border border-zinc-700">
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full p-2 bg-zinc-800 rounded border border-zinc-700" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
