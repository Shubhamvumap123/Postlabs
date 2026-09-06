import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Briefcase, CheckCircle, Clock, XCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import api from '../api';

interface JobStats {
  _id: string;
  count: number;
}

const COLORS: Record<string, string> = {
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444'
};

const STAT_ICONS: Record<string, LucideIcon> = {
  Applied: Briefcase,
  Interview: Clock,
  Offer: CheckCircle,
  Rejected: XCircle
};

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<JobStats[]>({
    queryKey: ['jobStats'],
    queryFn: async () => {
      const response = await api.get('/jobs/stats');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading analytics...</div>;
  }

  const defaultStats = [
    { _id: 'Applied', count: 0 },
    { _id: 'Interview', count: 0 },
    { _id: 'Offer', count: 0 },
    { _id: 'Rejected', count: 0 }
  ];

  const mergedStats = defaultStats.map(ds => {
    const found = stats?.find(s => s._id === ds._id);
    return found || ds;
  });

  const totalJobs = mergedStats.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mergedStats.map((stat) => {
          const Icon = STAT_ICONS[stat._id] || Briefcase;
          return (
            <div key={stat._id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat._id}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.count}</p>
              </div>
              <div className="p-3 rounded-full bg-opacity-20" style={{ backgroundColor: `${COLORS[stat._id]}33`, color: COLORS[stat._id] }}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Application Status Breakdown</h3>
        {totalJobs === 0 ? (
          <div className="text-center py-12 text-gray-500">No job applications yet. Start tracking!</div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mergedStats} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="_id" axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {mergedStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry._id] || '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
