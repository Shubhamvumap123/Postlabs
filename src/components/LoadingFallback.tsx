import { Loader2 } from "lucide-react";

export const LoadingFallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-muted-foreground">
      <Loader2 className="h-8 w-8 animate-spin" role="status" aria-label="Loading..." />
    </div>
  );
};
