import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface JobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (job: any) => void;
  job?: any;
}

const JobModal = ({ isOpen, onClose, onSave, job }: JobModalProps) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('Applied');

  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setPosition(job.position);
      setStatus(job.status);
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle>{job ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};

export default JobModal;
