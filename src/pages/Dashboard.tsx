import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import JobDashboard from "../components/JobDashboard";
import { Button } from "../components/ui/button";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400">Welcome back, {user?.name}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate("/settings")}>Settings</Button>
          <Button variant="destructive" onClick={handleLogout}>Log out</Button>
        </div>
      </div>
      <JobDashboard />
    </div>
  );
};

export default Dashboard;
