import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import api from '../lib/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  location: string;
  dateApplied: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newJob, setNewJob] = useState({ company: '', position: '', status: 'Applied', location: '' });
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const fetchJobs = async () => {
    try {
      const res = await api.get(`/jobs?status=${statusFilter}&search=${search}`);
      setJobs(res.data);
    } catch {
      toast.error('Failed to fetch jobs');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/jobs/stats');
      const formattedStats = Object.keys(res.data).map(key => ({
        name: key,
        count: res.data[key]
      }));
      setStats(formattedStats);
    } catch {
      console.error("Failed to fetch stats");
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchStats();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, search]);

  const handleAddOrEditJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, newJob);
        toast.success('Job updated successfully');
        setEditingJob(null);
      } else {
        await api.post('/jobs', newJob);
        toast.success('Job added successfully');
      }
      setNewJob({ company: '', position: '', status: 'Applied', location: '' });
      fetchJobs();
      fetchStats();
    } catch {
      toast.error(editingJob ? 'Failed to update job' : 'Failed to add job');
    }
  };

  const handleEditClick = (job: Job) => {
    setEditingJob(job);
    setNewJob({
      company: job.company,
      position: job.position,
      status: job.status,
      location: job.location
    });
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
    setNewJob({ company: '', position: '', status: 'Applied', location: '' });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/jobs/${id}`);
      toast.success('Job deleted');
      fetchJobs();
      fetchStats();
    } catch {
      toast.error('Failed to delete job');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-card p-6 rounded-lg border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Manage your job applications here.</p>
          </div>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Application Stats</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="bg-card p-6 rounded-lg border border-border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-foreground">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleAddOrEditJob} className="space-y-4">
              <Input
                placeholder="Company"
                value={newJob.company}
                onChange={e => setNewJob({ ...newJob, company: e.target.value })}
                required
              />
              <Input
                placeholder="Position"
                value={newJob.position}
                onChange={e => setNewJob({ ...newJob, position: e.target.value })}
                required
              />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={newJob.status}
                onChange={e => setNewJob({ ...newJob, status: e.target.value })}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <Input
                placeholder="Location"
                value={newJob.location}
                onChange={e => setNewJob({ ...newJob, location: e.target.value })}
              />
              <div className="flex gap-2">
                <Button type="submit" className="w-full">{editingJob ? 'Update Job' : 'Add Job'}</Button>
                {editingJob && (
                  <Button type="button" variant="outline" className="w-full" onClick={handleCancelEdit}>Cancel</Button>
                )}
              </div>
            </form>
          </section>
        </div>

        <section className="bg-card p-6 rounded-lg border border-border shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-foreground">Your Applications</h2>
            <div className="flex gap-4 w-full sm:w-auto">
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="max-w-xs"
              />
              <select
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-3 font-medium text-foreground">Company</th>
                  <th className="p-3 font-medium text-foreground">Position</th>
                  <th className="p-3 font-medium text-foreground">Status</th>
                  <th className="p-3 font-medium text-foreground">Location</th>
                  <th className="p-3 font-medium text-foreground">Date</th>
                  <th className="p-3 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job._id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 text-foreground">{job.company}</td>
                    <td className="p-3 text-muted-foreground">{job.position}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        job.status === 'Offer' ? 'bg-green-100 text-green-800' :
                        job.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                        job.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground">{job.location}</td>
                    <td className="p-3 text-muted-foreground">{new Date(job.dateApplied).toLocaleDateString()}</td>
                    <td className="p-3 flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(job)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(job._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {jobs.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-muted-foreground">No jobs found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
