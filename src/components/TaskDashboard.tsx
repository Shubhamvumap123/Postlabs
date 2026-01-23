import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Plus, Zap, Palette, Shield } from 'lucide-react';

/**
 * TaskDashboard Component
 *
 * A modern, responsive dashboard card component for managing tasks.
 * Features:
 * - Dark mode design with rounded corners
 * - Tabbed navigation with animated pill background
 * - Empty state handling
 * - Skill-based agent filtering
 */
import { cn } from '../lib/utils';

const tabs = ["All", "Scheduled", "Completed", "Archived"];
const filters = [
  { id: 'performance', label: 'Performance', icon: Zap },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function TaskDashboard() {
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-100 shadow-xl">
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex p-1 bg-zinc-800/50 rounded-full overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                activeTab === tab ? "text-white" : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-zinc-700 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-900/20 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>New</span>
        </button>
      </div>

      {/* Content Area - Empty State */}
      <div className="min-h-[300px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800 rounded-xl bg-zinc-900/50">
        <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
          <Clock className="w-8 h-8 text-zinc-600" />
        </div>
        <p className="text-zinc-500 font-medium">Scheduled tasks will show up here</p>
      </div>

      {/* Bottom Filter Chips */}
      <div className="mt-8">
        <h4 className="text-sm font-medium text-zinc-400 mb-3">Skill-based agents</h4>
        <div className="flex flex-wrap gap-3">
          {filters.map(({ id, label, icon: Icon }) => {
            const isActive = activeFilters.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggleFilter(id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-zinc-800 border-zinc-700 text-white shadow-sm"
                    : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-purple-400" : "text-current")} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
