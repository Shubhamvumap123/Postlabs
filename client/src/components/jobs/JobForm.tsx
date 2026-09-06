import { useState } from 'react';
import { api } from '../../lib/api';
import { useToast } from '../../hooks/use-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const JobForm = ({ job, onClose, onSuccess }: { job?: Record<string, unknown>, onClose: () => void, onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    company: (job?.company as string) || '',
    position: (job?.position as string) || '',
    status: (job?.status as string) || 'Applied',
    location: (job?.location as string) || '',
    salary: (job?.salary as string) || '',
    notes: (job?.notes as string) || '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (job) {
        await api.jobs.update((job._id as string), formData);
        toast({ title: 'Success', description: 'Job updated' });
      } else {
        await api.jobs.create(formData);
        toast({ title: 'Success', description: 'Job added' });
      }
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const err = error as Error;
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Company *</label>
        <Input
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="bg-zinc-800/50 border-white/10"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Position *</label>
        <Input
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="bg-zinc-800/50 border-white/10"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full bg-zinc-800/50 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Location</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="bg-zinc-800/50 border-white/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Salary</label>
          <Input
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="e.g. $100k - $120k"
            className="bg-zinc-800/50 border-white/10"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-1">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full bg-zinc-800/50 border border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          className="text-zinc-400 hover:text-white"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500">
          {loading ? 'Saving...' : job ? 'Update' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
