import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';
import { Briefcase, Building2, MapPin, DollarSign, LogOut, Plus, Trash2, Edit2 } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  category: string;
  salary: string;
  notes: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'Applied',
    category: 'General',
    salary: '',
    notes: '',
  });

  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        toast.error('Failed to fetch jobs');
      }
    } catch {
      toast.error('Error fetching jobs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openDialog = (job?: Job) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        status: job.status,
        category: job.category,
        salary: job.salary,
        notes: job.notes,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        company: '',
        location: '',
        status: 'Applied',
        category: 'General',
        salary: '',
        notes: '',
      });
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingJob(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingJob
      ? `http://localhost:5000/api/jobs/${editingJob._id}`
      : 'http://localhost:5000/api/jobs';

    const method = editingJob ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Job ${editingJob ? 'updated' : 'added'} successfully`);
        fetchJobs();
        closeDialog();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Operation failed');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this job application?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Job deleted');
        fetchJobs();
      } else {
        toast.error('Failed to delete job');
      }
    } catch {
      toast.error('Network error');
    }
  };

  // Filtering
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Analytics Data
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalJobs = jobs.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Interview': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Offer': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Rejected': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Job Tracker</h1>
            <p className="text-zinc-400 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => openDialog()} className="bg-white text-zinc-950 hover:bg-zinc-200">
              <Plus className="w-4 h-4 mr-2" /> Add Application
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-zinc-700 hover:bg-zinc-800">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </header>

        {/* Analytics Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex flex-col justify-center">
            <p className="text-zinc-400 text-sm font-medium">Total Applications</p>
            <p className="text-4xl font-bold text-white mt-2">{totalJobs}</p>
          </div>
          {['Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
            <div key={status} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">{status}</p>
                <p className="text-2xl font-bold text-white mt-1">{statusCounts[status] || 0}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`} />
            </div>
          ))}
        </section>

        {/* Filters and Search */}
        <section className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <Input
            placeholder="Search by role or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-96 bg-zinc-950 border-zinc-800"
          />
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {['All', 'Applied', 'Interview', 'Offer', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-zinc-100 text-zinc-900 font-medium'
                    : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Job List */}
        <section>
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center p-12 bg-zinc-900 border border-zinc-800 rounded-xl">
              <Briefcase className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No applications found</h3>
              <p className="text-zinc-400">Try adjusting your search or add a new job application.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors group relative">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-white line-clamp-1">{job.title}</h3>
                      <div className="flex items-center text-zinc-400 text-sm mt-1">
                        <Building2 className="w-3 h-3 mr-1.5" />
                        {job.company}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {job.location && (
                      <div className="flex items-center text-sm text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center text-sm text-zinc-400">
                        <DollarSign className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                        {job.salary}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-zinc-800">
                    <span className="text-xs text-zinc-500">
                      Added {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openDialog(job)} className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(job._id)} className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Add/Edit Job Dialog overlay */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">{editingJob ? 'Edit Application' : 'Add Application'}</h2>
              <button onClick={closeDialog} className="text-zinc-400 hover:text-white">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Job Title *</label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required className="bg-zinc-950 border-zinc-800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Company *</label>
                <Input name="company" value={formData.company} onChange={handleInputChange} required className="bg-zinc-950 border-zinc-800" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Location</label>
                  <Input name="location" value={formData.location} onChange={handleInputChange} className="bg-zinc-950 border-zinc-800" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-300"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">Salary Range</label>
                <Input name="salary" value={formData.salary} onChange={handleInputChange} placeholder="e.g. $100k - $120k" className="bg-zinc-950 border-zinc-800" />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
                <Button type="button" variant="outline" onClick={closeDialog} className="border-zinc-700 hover:bg-zinc-800">Cancel</Button>
                <Button type="submit" className="bg-white text-black hover:bg-zinc-200">
                  {editingJob ? 'Save Changes' : 'Add Job'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
