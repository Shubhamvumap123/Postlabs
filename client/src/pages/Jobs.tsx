import { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../lib/api/axios';
import { toast } from 'sonner';
import { Plus, Trash2, Edit } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import JobModal from '../components/JobModal';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState<{ _id: string; company: string; position: string; status: string; location?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<{ _id?: string; company: string; position: string; status: string; location?: string } | null>(null);

  useEffect(() => {
    fetchJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async (job: { _id?: string; company: string; position: string; status: string; location?: string }) => {
    try {
      if (job._id) {
        await api.put(`/jobs/${job._id}`, job);
        toast.success('Job updated');
      } else {
        await api.post('/jobs', job);
        toast.success('Job added');
      }
      fetchJobs();
      setIsModalOpen(false);
      setEditingJob(null);
    } catch {
      toast.error('Failed to save job');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await api.delete(`/jobs/${id}`);
        toast.success('Job deleted');
        fetchJobs();
      } catch {
        toast.error('Failed to delete job');
      }
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.company.toLowerCase().includes(search.toLowerCase()) || job.position.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const chartData = useMemo(() => {
    const counts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(job => {
      if (counts[job.status as keyof typeof counts] !== undefined) {
        counts[job.status as keyof typeof counts]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  if (!user) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">Please log in.</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Job Tracker Dashboard</h1>
          <div className="flex gap-4 items-center">
            <span className="text-zinc-400">Welcome, {user.name}</span>
            <Button variant="outline" onClick={logout} className="border-zinc-700 hover:bg-zinc-800">Logout</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
             <h2 className="text-lg font-semibold mb-4">Analytics</h2>
             <div className="h-48">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                   <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                   <YAxis stroke="#a1a1aa" fontSize={12} allowDecimals={false} />
                   <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }} />
                   <Bar dataKey="value" fill="#9333ea" radius={[4, 4, 0, 0]} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>

          <div className="col-span-1 md:col-span-2 bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold">Applications</h2>
               <Button onClick={() => { setEditingJob(null); setIsModalOpen(true); }} className="bg-purple-600 hover:bg-purple-700">
                 <Plus className="w-4 h-4 mr-2" /> New Job
               </Button>
            </div>

            <div className="flex gap-2 mb-4">
              <Input placeholder="Search company or position..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-zinc-800 border-zinc-700 flex-1" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white outline-none">
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex-1 overflow-auto">
              {loading ? (
                <div className="text-center text-zinc-500 py-8">Loading...</div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center text-zinc-500 py-8">No jobs found.</div>
              ) : (
                <div className="space-y-2">
                  {filteredJobs.map(job => (
                    <div key={job._id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors">
                      <div>
                        <div className="font-medium">{job.company}</div>
                        <div className="text-sm text-zinc-400">{job.position}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' : job.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' : job.status === 'Offer' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {job.status}
                        </span>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingJob(job); setIsModalOpen(true); }} className="text-zinc-400 hover:text-white"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => handleDelete(job._id)} className="text-zinc-400 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <JobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveJob} job={editingJob} />
    </div>
  );
};

export default Dashboard;
