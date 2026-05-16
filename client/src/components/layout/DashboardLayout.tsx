import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, PlusCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">JobTracker Pro</span>
        </div>

        <nav className="p-4 space-y-1">
          <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link to="/jobs" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <Briefcase className="h-5 w-5 mr-3" />
            All Jobs
          </Link>
          <Link to="/add-job" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md">
            <PlusCircle className="h-5 w-5 mr-3" />
            Add Job
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Welcome, {user?.name}</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-red-600"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
