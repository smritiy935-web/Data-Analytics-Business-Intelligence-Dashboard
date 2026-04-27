import { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Users, 
  Database, 
  ShieldAlert, 
  Trash2, 
  UserPlus, 
  Search, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  Shield,
  Settings,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    announcement: '',
    siteName: 'InsightFlow'
  });
  const [updatingSettings, setUpdatingSettings] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, analyticsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/analytics'),
      ]);
      setUsers(usersRes.data);
      setAnalytics(analyticsRes.data);
      if (analyticsRes.data.settings) {
        setSettings(analyticsRes.data.settings);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('CRITICAL ACTION: Are you sure you want to permanently remove this system user?')) {
      try {
        await api.delete(`/admin/user/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Delete operation failed');
      }
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await api.put(`/admin/user/${userId}/role`, { role: newRole });
      fetchData();
    } catch (error) {
      alert('Failed to update role');
    }
  };

  const handleToggleMaintenance = async () => {
    try {
      setUpdatingSettings(true);
      const newMode = !settings.maintenanceMode;
      const res = await api.put('/admin/settings', { maintenanceMode: newMode });
      setSettings(res.data);
    } catch (error) {
      alert('Failed to update settings');
    } finally {
      setUpdatingSettings(false);
    }
  };

  const handleUpdateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      setUpdatingSettings(true);
      const res = await api.put('/admin/settings', { announcement: settings.announcement });
      setSettings(res.data);
      alert('Announcement updated successfully');
    } catch (error) {
      alert('Failed to update announcement');
    } finally {
      setUpdatingSettings(false);
    }
  };

  if (loading && !analytics) return (
    <div className="flex flex-col items-center justify-center p-24 gap-4">
      <div className="w-12 h-12 border-2 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
      <p className="text-slate-500 font-mono text-sm tracking-widest animate-pulse">SYNCHRONIZING SYSTEM DATA...</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">System-wide administrative control and management console.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-2 text-xs font-mono">
            <Activity size={14} className={settings.maintenanceMode ? "text-amber-500" : "text-emerald-500"} />
            <span className="text-slate-400">STATUS:</span>
            <span className={`${settings.maintenanceMode ? "text-amber-500" : "text-emerald-500"} font-bold uppercase tracking-widest`}>
              {settings.maintenanceMode ? "Maintenance Mode" : "Operational"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: analytics?.totalUsers || 0, icon: Users, color: 'blue', change: '+4.2%' },
          { title: 'Data Ingestion', value: analytics?.totalDataPoints || 0, icon: Database, color: 'indigo', change: '+12.5%' },
          { title: 'System Security', value: 'Level 4', icon: ShieldAlert, color: 'emerald', change: 'Stable' },
          { title: 'API Response', value: '142ms', icon: Activity, color: 'purple', change: '-12ms' },
        ].map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.title} 
            className="bg-slate-900/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 bg-primary-500/10 rounded-xl text-primary-500`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-black text-slate-500 bg-slate-800/50 px-2 py-1 rounded-md">{stat.change}</span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
            <h3 className="text-3xl font-black text-white mt-1 tracking-tight group-hover:text-primary-500 transition-colors">
              {stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Table - 2/3 width */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/20">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Access Directory</h3>
              <p className="text-xs text-slate-500">Managing {users.length} authenticated identities</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-800/50">
                  <th className="px-6 py-4">Identity</th>
                  <th className="px-6 py-4">Auth Level</th>
                  <th className="px-6 py-4">Role Management</th>
                  <th className="px-6 py-4 text-right">Termination</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-800/20 transition-all group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-primary-600/20 group-hover:text-primary-500 transition-colors">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-200 text-sm tracking-tight">{u.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono tracking-tighter">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                        u.role === 'admin' 
                          ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-400 py-1 px-2 focus:ring-1 focus:ring-primary-500 outline-none"
                      >
                        <option value="user">USER</option>
                        <option value="admin">ADMIN</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                        disabled={u.role === 'admin' && users.filter(usr => usr.role === 'admin').length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Settings - 1/3 width */}
        <div className="space-y-6">
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-800 flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/20">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Settings size={18} className="text-primary-500" />
                Global Controls
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <div>
                  <p className="text-sm font-bold text-white">Maintenance Mode</p>
                  <p className="text-[10px] text-slate-500">Throttles data ingestion & user access</p>
                </div>
                <button 
                  onClick={handleToggleMaintenance}
                  disabled={updatingSettings}
                  className={`w-12 h-6 rounded-full relative transition-all ${settings.maintenanceMode ? 'bg-primary-600' : 'bg-slate-800'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.maintenanceMode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <form onSubmit={handleUpdateAnnouncement} className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">System Announcement</label>
                <textarea 
                  value={settings.announcement}
                  onChange={(e) => setSettings({...settings, announcement: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-white focus:ring-1 focus:ring-primary-500 outline-none min-h-[100px] resize-none"
                  placeholder="Enter message for all users..."
                />
                <button 
                  type="submit"
                  disabled={updatingSettings}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Bell size={14} />
                  Push Announcement
                </button>
              </form>
            </div>
          </div>

          <div className="bg-primary-600/5 border border-primary-500/20 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-primary-500" />
              <h4 className="text-sm font-bold text-white uppercase tracking-tight">Security Protocol</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              You are currently logged into the <span className="text-primary-500 font-bold">Root Node</span>. 
              All administrative actions are logged and encrypted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
