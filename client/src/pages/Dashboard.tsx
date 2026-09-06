import JobDashboard from "./JobDashboard";

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
    <div className="min-h-screen bg-zinc-950 p-4">
      <JobDashboard />
    </div>
  );
}
