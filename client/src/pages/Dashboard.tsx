import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../lib/axios';

const Dashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['jobStats'],
    queryFn: async () => {
      const { data } = await api.get('/jobs/stats');
      return data;
    },
  });

  if (isLoading) return <div className="p-8">Loading...</div>;

  const chartData = [
    { name: 'Applied', count: stats?.Applied || 0 },
    { name: 'Interview', count: stats?.Interview || 0 },
    { name: 'Offer', count: stats?.Offer || 0 },
    { name: 'Rejected', count: stats?.Rejected || 0 },
  ];

  const totalJobs = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {chartData.map((stat) => (
          <div key={stat.name} className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.name}</h3>
            <p className="mt-2 text-3xl font-bold">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm h-[400px]">
        <h2 className="mb-4 text-xl font-semibold">Applications Overview</h2>
        {totalJobs > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis allowDecimals={false} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))' }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No applications yet. Go to Jobs to add some!
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
