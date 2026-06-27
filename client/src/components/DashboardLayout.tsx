import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">Job Tracker</h1>
        </div>
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="mb-4 text-sm font-medium px-2">{user?.name}</div>
          <button
            onClick={logout}
            className="flex w-full items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
