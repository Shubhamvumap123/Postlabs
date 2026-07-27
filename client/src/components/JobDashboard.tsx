import { useState, useEffect, useContext } from 'react';
import type { FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../lib/api/axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Trash2, LogOut } from 'lucide-react';

interface Job { _id: string; company: string; position: string; status: 'Applied' | 'Interview' | 'Offer' | 'Rejected'; location: string; jobType: string; }

const STATUS_COLORS = { Applied: '#3b82f6', Interview: '#f59e0b', Offer: '#10b981', Rejected: '#ef4444' };

export default function JobDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState<'Applied' | 'Interview' | 'Offer' | 'Rejected'>('Applied');
  const authContext = useContext(AuthContext);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAddJob = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/jobs', { company, position, status });
      fetchJobs();
      setCompany(''); setPosition(''); setStatus('Applied');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredJobs = jobs.filter(job => job.company.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase()));

  const statusData = ['Applied', 'Interview', 'Offer', 'Rejected'].map(s => ({
    name: s,
    value: jobs.filter(j => j.status === s).length
  })).filter(d => d.value > 0);

  return (
    <div className="max-w-6xl w-full mx-auto space-y-8">
      <div className="flex justify-between items-center bg-zinc-900 p-6 rounded-xl border border-white/10">
        <h1 className="text-2xl font-bold text-white">Job Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">Welcome, {authContext?.user?.name}</span>
          <Button onClick={authContext?.logout} variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Add New Job</h2>
            <form onSubmit={handleAddJob} className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required className="bg-zinc-800/50 border-white/10 text-white" />
              </div>
              <div className="flex-1 space-y-2">
                <Input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} required className="bg-zinc-800/50 border-white/10 text-white" />
              </div>
              <div className="w-32 space-y-2">
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="w-full h-10 px-3 rounded-md bg-zinc-800/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white shrink-0">
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </form>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Applications</h2>
              <Input placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64 bg-zinc-800/50 border-white/10 text-white" />
            </div>
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <p className="text-center text-zinc-500 py-8">No jobs found.</p>
              ) : (
                filteredJobs.map(job => (
                  <div key={job._id} className="flex justify-between items-center p-4 rounded-lg bg-zinc-800/30 border border-white/5 hover:border-white/10 transition-colors">
                    <div>
                      <h3 className="text-white font-medium">{job.position}</h3>
                      <p className="text-sm text-zinc-400">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${STATUS_COLORS[job.status]}20`, color: STATUS_COLORS[job.status] }}>
                        {job.status}
                      </span>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(job._id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 w-8">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 h-[400px]">
          <h2 className="text-xl font-semibold text-white mb-6">Analytics</h2>
          {jobs.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="45%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-zinc-500">Add jobs to see analytics</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
