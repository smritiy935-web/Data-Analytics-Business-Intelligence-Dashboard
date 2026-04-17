import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Settings, 
  Users, 
  LogOut, 
  BarChart3, 
  Database, 
  ShieldCheck 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Upload Data', path: '/upload', icon: <Upload size={20} /> },
    { name: 'Data Explorer', path: '/data', icon: <Database size={20} /> },
  ];

  if (user?.role === 'admin') {
    links.push({ name: 'Admin Panel', path: '/admin', icon: <ShieldCheck size={20} /> });
  }

  return (
    <div className="flex flex-col h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-colors">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
          I
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
          InsightFlow
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 font-medium'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`
            }
          >
            {link.icon}
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-900/10 transition-colors rounded-xl"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
