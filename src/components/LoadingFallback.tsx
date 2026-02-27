import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex items-center justify-center min-h-screen bg-zinc-950"
    >
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
};

export default LoadingFallback;
