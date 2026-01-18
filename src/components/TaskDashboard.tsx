import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Plus,
  Zap,
  Palette,
  Shield,
} from "lucide-react";
import { cn } from "../lib/utils";

const tabs = ["All", "Scheduled", "Completed", "Archived"];

const filters = [
  { id: "performance", label: "Performance", icon: Zap },
  { id: "design", label: "Design", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
];

const TaskDashboard = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-4xl bg-neutral-900/50 backdrop-blur-xl rounded-xl border border-neutral-800 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <h1 className="text-xl font-semibold tracking-tight whitespace-nowrap">Tasks</h1>
            <div className="h-6 w-px bg-neutral-800 hidden md:block" />

            {/* Tabs */}
            <div className="flex bg-neutral-900/50 p-1 rounded-lg border border-neutral-800/50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors z-10 whitespace-nowrap",
                    activeTab === tab
                      ? "text-white"
                      : "text-neutral-400 hover:text-neutral-200"
                  )}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-neutral-800 rounded-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
             {/* Primary Action */}
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-900/20 whitespace-nowrap cursor-pointer">
              <Plus size={16} />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] p-6 relative">
          <AnimatePresence mode="wait">
             <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col items-center justify-center text-center py-20"
             >
                {/* Empty State */}
                <div className="w-16 h-16 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4 border border-neutral-800">
                    <Clock className="text-neutral-500" size={32} />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No tasks found</h3>
                <p className="text-neutral-400 text-sm">Scheduled tasks will show up here</p>
             </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="p-4 bg-neutral-900/80 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
             <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider whitespace-nowrap">Skill-based agents</span>
             <div className="flex items-center gap-2 flex-wrap">
                {filters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilters.includes(filter.id);
                    return (
                        <button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer",
                                isActive
                                    ? "bg-neutral-800 border-neutral-700 text-white"
                                    : "bg-transparent border-neutral-800 text-neutral-400 hover:border-neutral-700"
                            )}
                        >
                            <Icon size={14} className={cn(isActive ? "text-purple-400" : "text-neutral-500")} />
                            {filter.label}
                        </button>
                    )
                })}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
