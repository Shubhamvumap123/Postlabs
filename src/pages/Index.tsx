import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-5xl font-bold text-white mb-6">Job Tracker Pro</h1>
      <p className="text-xl text-zinc-400 max-w-2xl mb-8">
        Manage your job search efficiently. Track applications, interviews, and offers all in one place.
      </p>

      {user ? (
        <Link to="/dashboard">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
            Go to Dashboard
          </Button>
        </Link>
      ) : (
        <div className="flex gap-4">
          <Link to="/login">
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-6 text-lg">
              Log In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Index;
