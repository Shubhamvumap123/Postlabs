import { Loader2 } from 'lucide-react';

export default function LoadingFallback() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950">
      <Loader2 className="h-8 w-8 animate-spin text-zinc-500" role="status" aria-label="Loading..." />
    </div>
  );
}
