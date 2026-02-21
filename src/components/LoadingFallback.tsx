import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
};

export default LoadingFallback;
