import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-zinc-950"
      role="status"
      aria-label="Loading..."
    >
      <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
    </div>
  );
};

export default LoadingFallback;
