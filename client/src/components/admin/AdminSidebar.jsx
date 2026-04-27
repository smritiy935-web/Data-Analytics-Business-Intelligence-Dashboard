import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Database, 
  Activity,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Control Center', path: '/admin', icon: ShieldCheck },
    { name: 'User Directory', path: '/admin/users', icon: Users },
    { name: 'Data Pipeline', path: '/admin/data', icon: Database },
    { name: 'System Logs', path: '/admin/logs', icon: Activity },
    { name: 'Analytics', path: '/admin/stats', icon: BarChart3 },
    { name: 'Global Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-56 h-screen bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-900/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight">ADMIN CORE</h1>
            <p className="text-[10px] text-primary-500 font-bold uppercase tracking-widest">Command Center</p>
          </div>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-primary-600/10 text-primary-400 border border-primary-900/50' 
                    : 'hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-primary-500' : 'text-slate-500 group-hover:text-slate-300'} />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && <div className="ml-auto w-1.5 h-1.5 bg-primary-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 space-y-4">
        <Link 
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition-all border border-slate-800"
        >
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Exit to App</span>
        </Link>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">System Shutdown</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
