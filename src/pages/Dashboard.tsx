import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Plus, Search, Briefcase, Clock, CheckCircle, XCircle, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Dialog } from '../components/ui/dialog';
import JobCard from '../components/jobs/JobCard';
import JobForm from '../components/jobs/JobForm';

const Dashboard = () => {
  const [jobs, setJobs] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const { toast } = useToast();

  const fetchJobs = async () => {
    try {
      const data = await api.jobs.getAll();
      setJobs(data);
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch jobs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.jobs.delete(id);
      toast({ title: 'Success', description: 'Job deleted' });
      fetchJobs();
    } catch (error: unknown) {
      const err = error as Error;
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = String(job.company).toLowerCase().includes(search.toLowerCase()) ||
                          String(job.position).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || String(job.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: jobs.length,
    applied: jobs.filter(j => j.status === 'Applied').length,
    interview: jobs.filter(j => j.status === 'Interview').length,
    offer: jobs.filter(j => j.status === 'Offer').length,
    rejected: jobs.filter(j => j.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Job Tracker</h1>
            <p className="text-zinc-400">Manage your job search process</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}
              variant="outline"
              className="flex items-center gap-2 border-zinc-800 text-zinc-400 hover:text-white"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
            <Button
              onClick={() => { setEditingJob(null); setIsFormOpen(true); }}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Application
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Total', count: stats.total, icon: Briefcase, color: 'text-blue-400' },
            { label: 'Applied', count: stats.applied, icon: Clock, color: 'text-yellow-400' },
            { label: 'Interview', count: stats.interview, icon: Briefcase, color: 'text-purple-400' },
            { label: 'Offer', count: stats.offer, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Rejected', count: stats.rejected, icon: XCircle, color: 'text-red-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-zinc-900 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <span className="text-2xl font-bold text-white">{stat.count}</span>
            </div>
          ))}
        </div>


        {/* Charts */}
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6 h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Application Pipeline</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { name: 'Applied', count: stats.applied, color: '#eab308' },
              { name: 'Interview', count: stats.interview, color: '#a855f7' },
              { name: 'Offer', count: stats.offer, color: '#22c55e' },
              { name: 'Rejected', count: stats.rejected, color: '#ef4444' }
            ]} margin={{ top: 0, right: 0, left: -20, bottom: 20 }}>
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {
                  [
                    { name: 'Applied', count: stats.applied, color: '#eab308' },
                    { name: 'Interview', count: stats.interview, color: '#a855f7' },
                    { name: 'Offer', count: stats.offer, color: '#22c55e' },
                    { name: 'Rejected', count: stats.rejected, color: '#ef4444' }
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              placeholder="Search company or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-zinc-900 border-white/10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Jobs List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-zinc-400">Loading jobs...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-zinc-400">No jobs found.</p>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={String(job._id)}
                job={job}
                onEdit={() => { setEditingJob(job); setIsFormOpen(true); }}
                onDelete={() => handleDelete(String(job._id))}
              />
            ))
          )}
        </div>

        {/* Form Dialog */}
        <Dialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title={editingJob ? "Edit Application" : "New Application"}
        >
          <JobForm
            job={editingJob}
            onClose={() => setIsFormOpen(false)}
            onSuccess={fetchJobs}
          />
        </Dialog>
      </div>
    </div>
  );
};

export default Dashboard;
