import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Plus, Zap, Palette, Shield } from "lucide-react";
import { cn } from "../lib/utils";

const tabs = ["All", "Scheduled", "Completed", "Archived"];

const TaskDashboard = () => {
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl text-neutral-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-neutral-800 gap-4">
            <div className="bg-neutral-800/50 p-1 rounded-lg flex space-x-1">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors z-10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500",
                            activeTab === tab ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                        )}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-neutral-700 rounded-md -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {tab}
                    </button>
                ))}
            </div>

            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                <Plus size={16} />
                New
            </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
            <div className="bg-neutral-800/50 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-neutral-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-300">No tasks found</h3>
            <p className="text-neutral-500 mt-1">Scheduled tasks will show up here</p>
        </div>

        {/* Footer / Filters */}
        <div className="p-6 border-t border-neutral-800 bg-neutral-900/50">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                Skill-based agents
            </h4>
            <div className="flex flex-wrap gap-3">
                {[
                    { id: "Performance", icon: Zap, label: "Performance" },
                    { id: "Design", icon: Palette, label: "Design" },
                    { id: "Security", icon: Shield, label: "Security" },
                ].map(({ id, icon: Icon, label }) => (
                    <button
                        key={id}
                        onClick={() => toggleFilter(id)}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                            activeFilters.includes(id)
                                ? "bg-purple-600/20 border-purple-600/50 text-purple-300"
                                : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600"
                        )}
                    >
                        <Icon size={14} />
                        {label}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
