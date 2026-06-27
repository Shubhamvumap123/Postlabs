import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import api from '../lib/axios';

interface Job {
  _id: string;
  company: string;
  position: string;
  status: string;
  location: string;
  dateApplied: string;
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    company: '', position: '', status: 'Applied', location: ''
  });

  const queryClient = useQueryClient();

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data } = await api.get('/jobs');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: (newJob: any) => api.post('/jobs', newJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedJob: any) => api.patch(`/jobs/${updatedJob._id}`, updatedJob),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
      setIsModalOpen(false);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/jobs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobStats'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingJob) {
      updateMutation.mutate({ ...formData, _id: editingJob._id });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      company: job.company,
      position: job.position,
      status: job.status,
      location: job.location || '',
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingJob(null);
    setFormData({ company: '', position: '', status: 'Applied', location: '' });
  };

  const filteredJobs = jobs?.filter((job: Job) => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span>Add Job</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border bg-background pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Position</th>
                <th className="px-6 py-3 font-medium">Date Applied</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No jobs found.
                  </td>
                </tr>
              ) : (
                filteredJobs?.map((job: Job) => (
                  <tr key={job._id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{job.company}</td>
                    <td className="px-6 py-4">{job.position}</td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(job.dateApplied), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        job.status === 'Applied' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        job.status === 'Interview' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        job.status === 'Offer' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(job)} className="p-2 text-muted-foreground hover:text-foreground">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => deleteMutation.mutate(job._id)} className="p-2 text-red-500 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border bg-card p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">{editingJob ? 'Edit Job' : 'Add Job'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-md border bg-background px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-md border bg-background px-3 py-2"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border bg-background px-4 py-2 hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
