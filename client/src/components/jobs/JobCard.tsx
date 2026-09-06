import { MapPin, DollarSign, Calendar, Edit2, Trash2 } from 'lucide-react';

const statusColors = {
  Applied: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Interview: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Offer: 'bg-green-500/20 text-green-400 border-green-500/30',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const JobCard = ({ job, onEdit, onDelete }: { job: Record<string, unknown>, onEdit: () => void, onDelete: () => void }) => {
  return (
    <div className="bg-zinc-900 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{String(job.position)}</h3>
          <p className="text-zinc-400 font-medium">{String(job.company)}</p>
        </div>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColors[String(job.status)]}`}>
          {String(job.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {String(job.location) && (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <MapPin className="w-4 h-4" />
            <span>{String(job.location)}</span>
          </div>
        )}
        {String(job.salary) && (
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <DollarSign className="w-4 h-4" />
            <span>{String(job.salary)}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date(String(job.dateApplied)).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800 hover:bg-zinc-700 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-zinc-400 hover:text-red-400 rounded bg-zinc-800 hover:bg-red-900/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
