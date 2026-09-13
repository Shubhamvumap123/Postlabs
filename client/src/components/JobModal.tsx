import { useState, useEffect } from 'react';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: Record<string, unknown>) => void;
  job?: Record<string, unknown> | null;
}

const JobModal = ({ isOpen, onClose, onSave, job }: JobModalProps) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  useEffect(() => {
    if (job) {
      setCompany(job.company as string);
      setPosition(job.position as string);
      setStatus(job.status as string);
    } else {
      setCompany('');
      setPosition('');
      setStatus('Applied');
    }
  }, [job, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ _id: job?._id, company, position, status });
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={job ? 'Edit Job' : 'Add New Job'}>
      <div className="bg-zinc-900 border-zinc-800 text-zinc-100 p-4 rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm text-zinc-400">Company</label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} required className="bg-zinc-800 border-zinc-700" />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Position</label>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} required className="bg-zinc-800 border-zinc-700" />
          </div>
          <div>
            <label className="text-sm text-zinc-400">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-zinc-800 border border-zinc-700 rounded-md p-2 text-white outline-none">
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">Save</Button>
        </form>
      </div>
    </Dialog>
  );
};

export default JobModal;
