import {
  Bell,
  Search,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  Settings as SettingsIcon,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  Command,
  Menu,
  X,
  MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, Link } from "react-router-dom";
import { useFilters } from "../../context/FilterContext";

const DashboardHeader = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout, profileImage } = useAuth();
  const { filters, updateFilters } = useFilters();
  const [localSearch, setLocalSearch] = useState(filters.search);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Dataset Uploaded",
      desc: "Sales_Data_Q1.csv was processed successfully.",
      type: "success",
      time: "5m ago",
    },
    {
      id: 2,
      title: "Security Alert",
      desc: "New login detected from Chrome on Windows.",
      type: "warning",
      time: "1h ago",
    },
    {
      id: 3,
      title: "System Update",
      desc: "InsightFlow v2.4 is now live. Explore new charts.",
      type: "info",
      time: "2h ago",
    },
  ]);

  // Theme toggle is handled by ThemeContext

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  // Sync local search with global filter and debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ search: localSearch });
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch]);

  useEffect(() => {
    setLocalSearch(filters.search);
  }, [filters.search]);

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input
            placeholder="Global search - type to filter data..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          />
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-command-palette"))
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-[10px] font-bold text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            title="Open Command Palette"
          >
            <Command size={10} /> K
          </button>
        </div>
      </div>
    </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all relative group"
          >
            <Bell size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform"></span>
            )}
          </button>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-chatbot"))}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all relative group"
            title="AI Assistant"
          >
            <MessageSquare size={18} />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-xs text-primary-600 font-bold hover:underline"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400">
                      <Bell className="mx-auto mb-2 opacity-20" size={32} />
                      <p className="text-sm">No new notifications</p>
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-4 border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                              n.type === "success"
                                ? "bg-green-100 text-green-600"
                                : n.type === "warning"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {n.type === "success" ? (
                              <CheckCircle2 size={16} />
                            ) : n.type === "warning" ? (
                              <AlertCircle size={16} />
                            ) : (
                              <Bell size={16} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                              {n.desc}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <Clock size={10} /> {n.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-3 text-center border-t border-slate-100 dark:border-slate-800">
                  <button className="text-xs font-bold text-slate-500 hover:text-primary-600">
                    View All Notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-primary-500/20 ring-2 ring-white dark:ring-slate-900 overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="uppercase">{initials}</span>
              )}
            </div>
            <div className="text-left hidden lg:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white leading-none mb-1">
                {user?.name}
              </p>
              <p className="text-[11px] text-slate-500 font-medium uppercase tracking-tighter">
                {user?.role}
              </p>
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
            />
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <p className="text-xs text-slate-500 font-medium">
                    Signed in as
                  </p>
                  <p className="text-sm font-bold truncate">{user?.email}</p>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3 transition-colors"
                >
                  <SettingsIcon size={16} /> Settings
                </Link>
                <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2"></div>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-3 transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
