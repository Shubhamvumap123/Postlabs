import { Loader2 } from "lucide-react";

export default function LoadingFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background"
      role="status"
      aria-label="Loading"
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
