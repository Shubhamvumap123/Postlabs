import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
};

export default LoadingFallback;
