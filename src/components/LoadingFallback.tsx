import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-background"
      role="status"
      aria-label="Loading content"
    >
      <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingFallback;
