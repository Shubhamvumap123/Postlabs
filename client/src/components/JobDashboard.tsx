import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Plus, Search, LogOut, Edit2, Trash2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Job {
  _id?: string;
  title: string;
  company: string;
  status: string;
}

export default function JobDashboard() {
  const { token, logout, login, signup, loading: authLoading, error: authError } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [isAuthMode, setIsAuthMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobForm, setJobForm] = useState<Job>({ title: "", company: "", status: "Applied" });

  const statuses = ["All", "Applied", "Interview", "Offer", "Rejected"];
  const formStatuses = ["Applied", "Interview", "Offer", "Rejected"];

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if(Array.isArray(data)) setJobs(data);
    } catch (e) {
      console.error(e);
      setError("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isAuthMode) {
        await login(email, password);
      } else {
        await signup(email, password);
        await login(email, password);
      }
    } catch (err) {
      // Error is handled in context
    }
  };

  const openModal = (job: Job | null = null) => {
    if (job) {
      setEditingJob(job);
      setJobForm({ title: job.title, company: job.company, status: job.status });
    } else {
      setEditingJob(null);
      setJobForm({ title: "", company: "", status: "Applied" });
    }
    setIsModalOpen(true);
  };

  const saveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        const res = await fetch(`${API_URL}/jobs/${editingJob._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(jobForm)
        });
        if (!res.ok) throw new Error("Failed to update job");
      } else {
        const res = await fetch(`${API_URL}/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(jobForm)
        });
        if (!res.ok) throw new Error("Failed to create job");
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteJob = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete job");
      fetchJobs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
        <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">{isAuthMode ? 'Login' : 'Sign Up'}</h2>
          {authError && <p className="text-red-500 mb-4">{authError}</p>}
          <form onSubmit={handleAuth} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
              value={email} onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white"
              value={password} onChange={e => setPassword(e.target.value)}
            />
            <button disabled={authLoading} type="submit" className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-500">
              {authLoading ? 'Loading...' : (isAuthMode ? 'Login' : 'Sign Up')}
            </button>
          </form>
          <button onClick={() => setIsAuthMode(!isAuthMode)} className="w-full text-zinc-400 mt-4 hover:text-white">
            {isAuthMode ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    );
  }


  const chartData = statuses.slice(1).map(s => ({
    name: s,
    value: jobs.filter(j => j.status === s).length
  })).filter(d => d.value > 0);

  const COLORS = ['#3b82f6', '#eab308', '#22c55e', '#ef4444'];

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "All" || j.status === filter)
  );

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Job Dashboard</h1>
        <button onClick={logout} className="p-2 bg-red-600 hover:bg-red-500 rounded flex items-center gap-2"><LogOut size={16}/> Logout</button>
      </div>

      {error && <div className="bg-red-500/20 text-red-400 p-4 rounded mb-4">{error}</div>}


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statuses.slice(1).map(s => (
          <div key={s} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
            <p className="text-zinc-400">{s}</p>
            <p className="text-2xl font-bold">{jobs.filter(j => j.status === s).length}</p>
          </div>
        ))}
      </div>

      {jobs.length > 0 && (
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 mb-8 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}


      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-zinc-500 w-4 h-4" />
          <input
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={() => openModal()} className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg flex items-center justify-center gap-2">
          <Plus size={16} /> New Job
        </button>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-x-auto">
        {loading ? (
          <p className="p-8 text-center text-zinc-500">Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p className="p-8 text-center text-zinc-500">No jobs found.</p>
        ) : (
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-zinc-800">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Company</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map(job => (
                <tr key={job._id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                  <td className="p-4 font-medium">{job.title}</td>
                  <td className="p-4 text-zinc-400">{job.company}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      job.status === 'Applied' ? 'bg-blue-500/20 text-blue-400' :
                      job.status === 'Interview' ? 'bg-yellow-500/20 text-yellow-400' :
                      job.status === 'Offer' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-3">
                    <button onClick={() => openModal(job)} className="text-zinc-400 hover:text-purple-400"><Edit2 size={18}/></button>
                    <button onClick={() => deleteJob(job._id)} className="text-zinc-400 hover:text-red-400"><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingJob ? 'Edit Job' : 'New Job'}</h2>
            <form onSubmit={saveJob} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Job Title</label>
                <input required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" value={jobForm.title} onChange={e => setJobForm({...jobForm, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Company</label>
                <input required className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" value={jobForm.company} onChange={e => setJobForm({...jobForm, company: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Status</label>
                <select className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white" value={jobForm.status} onChange={e => setJobForm({...jobForm, status: e.target.value})}>
                  {formStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 p-2 rounded">Cancel</button>
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-500 p-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
