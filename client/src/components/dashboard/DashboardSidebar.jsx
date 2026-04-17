import {
  BarChart3,
  LayoutDashboard,
  TrendingUp,
  Database,
  FileText,
  Settings,
  Users,
  Bell,
  LogOut,
  Zap,
  Upload,
  PanelLeftClose,
  Layout,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Upload, label: "Import Data", path: "/upload" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleToggle = () => setIsMobileOpen(!isMobileOpen);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, [isMobileOpen]);

  const items = [...navItems];
  if (user?.role === "admin") {
    items.push({ icon: Shield, label: "Administration", path: "/admin" });
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ 
          width: collapsed ? 80 : 256,
          x: isMobileOpen || window.innerWidth >= 1024 ? 0 : -256
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white dark:bg-slate-900 flex flex-col border-r border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 z-[60] lg:z-40 transition-colors ${!isMobileOpen ? 'hidden lg:flex' : 'flex'}`}
      >
      <div className="p-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 min-h-[64px]">
        <div className="bg-primary-600 p-2 rounded-lg flex-shrink-0 text-white">
          <Zap className="h-5 w-5" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent tracking-tight"
          >
            InsightBI
          </motion.span>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 font-bold border-l-2 border-primary-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              }`
            }
          >
            <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Sidebar KPI Section */}
        {!collapsed && (
          <div className="mt-8 px-3 space-y-4 animate-in fade-in slide-in-from-left duration-500">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-1">
              Quick Insights
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Revenue Goal
                  </span>
                  <span className="text-[10px] font-black text-primary-600 bg-primary-50 dark:bg-primary-900/40 px-1.5 py-0.5 rounded">
                    84%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[84%] bg-primary-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Upward Trend
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  +15.2% vs last week
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="p-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <PanelLeftClose className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span>Logout Account</span>}
        </button>
      </div>
    </motion.aside>
    </>
  );
};

export default DashboardSidebar;
