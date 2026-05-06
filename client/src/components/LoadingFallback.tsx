import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingFallback;
