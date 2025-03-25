import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Bell, User as UserIcon, LogOut, Home, Calendar, FileText, Pill as Pills, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { useUserStore } from '../lib/store';

export default function Layout() {
  const navigate = useNavigate();
  const [user, clearUser] = useUserStore((state) => [state.user, state.clearUser]);

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (user?.role) {
      case 'patient':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { icon: Calendar, label: 'Appointments', path: '/appointments' },
          { icon: FileText, label: 'Records', path: '/records' },
          { icon: Pills, label: 'Medications', path: '/medications' },
        ];
      case 'doctor':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { icon: Calendar, label: 'Schedule', path: '/schedule' },
          { icon: FileText, label: 'Patients', path: '/patients' },
          { icon: Pills, label: 'Prescriptions', path: '/prescriptions' },
        ];
      case 'chemist':
        return [
          { icon: Home, label: 'Dashboard', path: '/' },
          { icon: Pills, label: 'Inventory', path: '/inventory' },
          { icon: FileText, label: 'Orders', path: '/orders' },
          { icon: Calendar, label: 'Reports', path: '/reports' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold text-blue-600">Svastha</span>
        </div>
        <nav className="p-4 space-y-2">
          {getNavLinks().map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <header className="h-16 bg-white shadow-sm flex items-center justify-end px-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">{user?.name}</p>
                  <p className="text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}