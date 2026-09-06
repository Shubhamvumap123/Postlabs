import JobDashboard from "../components/JobDashboard";

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get('/jobs');
        setJobs(data);
      } catch {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = STATUSES.map(status => ({
    name: status,
    value: jobs.filter(job => job.status === status).length
  }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 pt-24 pb-24">
      <JobDashboard />
    </div>
  );
};

export default Dashboard;
