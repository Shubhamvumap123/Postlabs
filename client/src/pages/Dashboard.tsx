import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { toast } from "sonner";
import { Plus, Building, Trash2, Edit2, LogOut, Loader2, Search, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  createdAt: string;
}

interface JobStats {
  Applied: number;
  Interview: number;
  Offer: number;
  Rejected: number;
}

const STATUS_COLORS: Record<string, string> = {
  Applied: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  Interview: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  Offer: "bg-green-500/20 text-green-400 border-green-500/50",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/50",
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats>({ Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Form State
  const [formData, setFormData] = useState({ company: "", position: "", status: "Applied" });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "All") params.append("status", statusFilter);

      const [jobsRes, statsRes] = await Promise.all([
        api.get(`/jobs?${params.toString()}`),
        api.get("/jobs/stats")
      ]);
      setJobs(jobsRes.data);
      setStats(statsRes.data);
    } catch (error: unknown) {
      toast.error("Failed to fetch data");
      if (typeof error === 'object' && error !== null && 'response' in error) {
        if ((error as { response?: { status?: number } }).response?.status === 401) logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Adding debounce to search would be better, but we'll fetch on change for now
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/jobs/${editingId}`, formData);
        toast.success("Job updated!");
      } else {
        await api.post("/jobs", formData);
        toast.success("Job added!");
      }
      setIsModalOpen(false);
      resetForm();
      fetchData();
    } catch {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      toast.success("Job deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const openEditModal = (job: Job) => {
    setFormData({ company: job.company, position: job.position, status: job.status });
    setEditingId(job._id);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ company: "", position: "", status: "Applied" });
    setEditingId(null);
  };

  const StatCard = ({ title, value, color }: { title: string, value: number, color: string }) => (
    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
      <h3 className="text-muted-foreground text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );

  const chartData = [
    { name: 'Applied', value: stats.Applied, color: '#3b82f6' },
    { name: 'Interview', value: stats.Interview, color: '#eab308' },
    { name: 'Offer', value: stats.Offer, color: '#22c55e' },
    { name: 'Rejected', value: stats.Rejected, color: '#ef4444' },
  ].filter(entry => entry.value > 0);

  return (
    <div className="min-h-screen bg-background font-['Inter_Tight',Verdana,sans-serif]">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">JobTracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user?.name}</span>
            <button
              onClick={logout}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <StatCard title="Total Applications" value={jobs.length} color="text-foreground" />
            <StatCard title="Interviews" value={stats.Interview} color="text-yellow-500" />
            <StatCard title="Offers" value={stats.Offer} color="text-green-500" />
            <StatCard title="Rejected" value={stats.Rejected} color="text-red-500" />
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center min-h-[250px]">
            <h3 className="text-foreground font-semibold mb-4 self-start">Application Status</h3>
            {chartData.length > 0 ? (
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center">No data to display yet.</p>
            )}
          </div>
        </div>

        {/* Action Bar and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Your Applications</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-9 pr-8 py-2 rounded-lg border border-input bg-background text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer w-full sm:w-auto"
              >
                <option value="All">All Statuses</option>
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No job applications yet. Click "Add Job" to get started!
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-xl hidden sm:block">
                        <Building className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{job.position}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4 sm:hidden" />
                            {job.company}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[job.status]}`}>
                        {job.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4 text-foreground">
              {editingId ? "Edit Job Application" : "Add Job Application"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Google"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Position</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Frontend Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  {editingId ? "Save Changes" : "Add Job"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
