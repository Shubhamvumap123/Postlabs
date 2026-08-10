import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444']; // purple, blue, green, red

export default function DashboardCharts({ jobs }: { jobs: { status: string; type: string }[] }) {
  const statusData = useMemo(() => {
    const counts = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 };
    jobs.forEach(job => { if (counts[job.status as keyof typeof counts] !== undefined) counts[job.status as keyof typeof counts]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  const typeData = useMemo(() => {
    const counts = { 'Full-time': 0, Contract: 0, Freelance: 0 };
    jobs.forEach(job => { if (counts[job.type as keyof typeof counts] !== undefined) counts[job.type as keyof typeof counts]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  if (jobs.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full">
      <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 h-72 flex flex-col items-center">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Application Status</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {statusData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} itemStyle={{ color: '#e4e4e7' }} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 h-72 flex flex-col items-center">
        <h3 className="text-sm font-medium text-zinc-300 mb-2">Job Types</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={typeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
            <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip cursor={{ fill: '#27272a', opacity: 0.4 }} contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
