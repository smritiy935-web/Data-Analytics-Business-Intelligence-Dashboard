import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon,
  Globe,
  Palette,
  Database,
  Shield,
  Zap,
  Smartphone,
  HardDrive,
  Share2,
  Users,
  Save,
  CheckCircle2,
  Sun,
  Moon,
  Layout,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showToast, setShowToast] = useState(false);
  const { isDark, toggleTheme, accent, setAccent } = useTheme();
  const [compactMode, setCompactMode] = useState(false);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "data", label: "Data Management", icon: Database },
    { id: "integrations", label: "Integrations", icon: Share2 },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-10 animate-in fade-in duration-700">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700"
          >
            <CheckCircle2 className="text-emerald-400" size={18} />
            <span className="text-sm font-bold">
              Settings updated successfully!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md pt-6 pb-6 -mx-6 px-6 lg:-mx-8 lg:px-8 border-b border-slate-200 dark:border-slate-800 transition-all flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
              <SettingsIcon className="text-primary-600" size={32} /> System
              Settings
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Configure your workspace, preferences, and data handling.
            </p>
          </div>
          <button
            onClick={triggerToast}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-bold hover:bg-primary-700 transition-all active:scale-95 shadow-md"
          >
            <Save size={16} /> Save Changes
          </button>
        </div>

        {/* Mobile Navigation (Inside Sticky Top Bar) */}
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 pt-4 overflow-x-auto flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center shrink-0 gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "text-primary-600 bg-primary-50 dark:bg-primary-500/10 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Executive Settings Control Box - Hard Fixed */}
        <div className="lg:w-60 shrink-0 relative z-20">
          <div className="hidden lg:block lg:fixed lg:w-60 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
            <div className="px-5 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/40 backdrop-blur-sm">
              <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <SettingsIcon size={14} className="text-primary-600" />
                Settings Hub
              </h2>
            </div>
            <nav className="p-2 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all relative group ${
                    activeTab === tab.id
                      ? "text-primary-600 bg-primary-50/60 dark:bg-primary-500/10 shadow-sm shadow-primary-500/5"
                      : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <tab.icon size={16} className={`${activeTab === tab.id ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
                  <span className="flex-1 text-left">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area - Fixed Offset */}
        <div className="flex-1 lg:pl-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[600px]">
            <AnimatePresence mode="wait">
              {activeTab === "general" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">
                      Workspace Configuration
                    </h3>
                    <p className="text-sm text-slate-500">
                      Manage basic settings for your BI environment.
                    </p>
                  </div>

                  <div className="space-y-6 max-w-2xl">
                    <div className="grid gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Workspace Name
                      </label>
                      <input
                        defaultValue="InsightFlow Production"
                        className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                      />
                    </div>

                    <div className="grid gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                        Timezone Preference
                      </label>
                      <select className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer">
                        <option>Pacific Time (PT) - US & Canada</option>
                        <option>Eastern Time (ET) - US & Canada</option>
                        <option>Greenwich Mean Time (GMT) - Europe</option>
                        <option>Indian Standard Time (IST) - Asia</option>
                      </select>
                    </div>

                    <div className="grid gap-2 pt-4">
                      <h4 className="font-bold">Feature Flags</h4>
                      <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                        <div>
                          <p className="font-bold text-sm">
                            Beta Analytics Model
                          </p>
                          <p className="text-xs text-slate-500">
                            Enable the next-gen AI processing engine for deeper
                            insights.
                          </p>
                        </div>
                        <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer p-1">
                          <div className="absolute right-1 w-4 h-4 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "data" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Database className="text-primary-600" /> Data Management
                    </h3>
                    <p className="text-sm text-slate-500">
                      Configure how data is stored, retained, and purged.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                      <HardDrive className="text-primary-500 mb-4" size={32} />
                      <h4 className="font-bold mb-1">Data Retention Period</h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Set how long automated datasets are kept.
                      </p>
                      <select className="w-full p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold outline-none cursor-pointer">
                        <option>12 Months (Default)</option>
                        <option>24 Months</option>
                        <option>Indefinite (Requires Pro)</option>
                      </select>
                    </div>

                    <div className="p-6 rounded-2xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 hover:border-red-500/50 transition-colors cursor-pointer group">
                      <Shield className="text-red-500 mb-4" size={32} />
                      <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">
                        Purge Workspace
                      </h4>
                      <p className="text-xs text-red-600/70 dark:text-red-400/70 mb-4">
                        Permanently delete all analytics data and metrics.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold active:scale-95 transition-all">
                        Format Data
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "appearance" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-10"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Palette className="text-primary-600" /> Theme &
                      Appearance
                    </h3>
                    <p className="text-sm text-slate-500">
                      Customize the look and feel of your dashboard.
                    </p>
                  </div>

                  <div className="space-y-4 max-w-3xl">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">
                      Base Theme
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Light Mode Selector */}
                      <div
                        onClick={() => isDark && toggleTheme()}
                        className={`p-5 border-2 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group ${!isDark ? "border-primary-600 bg-primary-50/50 dark:bg-white" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-primary-300"}`}
                      >
                        {!isDark && (
                          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center animate-in fade-in zoom-in">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-2 rounded-lg ${!isDark ? "bg-primary-100 text-primary-600" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                          >
                            <Sun size={20} />
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-base ${!isDark ? "text-primary-900" : "text-slate-900 dark:text-white"}`}
                            >
                              Light Mode
                            </h4>
                          </div>
                        </div>
                      </div>

                      {/* Dark Mode Selector */}
                      <div
                        onClick={() => !isDark && toggleTheme()}
                        className={`p-5 border-2 rounded-2xl cursor-pointer relative overflow-hidden transition-all duration-300 group ${isDark ? "border-primary-600 bg-slate-900 shadow-xl" : "border-slate-200 dark:border-slate-800 bg-slate-50 hover:border-slate-300"}`}
                      >
                        {isDark && (
                          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center animate-in fade-in zoom-in">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`p-2 rounded-lg ${isDark ? "bg-primary-500/20 text-primary-400" : "bg-slate-200 text-slate-500"}`}
                          >
                            <Moon size={20} />
                          </div>
                          <div>
                            <h4
                              className={`font-bold text-base ${isDark ? "text-white" : "text-slate-900"}`}
                            >
                              Dark Mode
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accent Colors */}
                  <div className="space-y-4 max-w-3xl pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">
                      Accent Color
                    </h4>
                    <div className="flex flex-wrap items-center gap-4">
                      {[
                        {
                          name: "Blue",
                          color: "bg-blue-600",
                          ring: "ring-blue-600/30",
                        },
                        {
                          name: "Purple",
                          color: "bg-purple-600",
                          ring: "ring-purple-600/30",
                        },
                        {
                          name: "Emerald",
                          color: "bg-emerald-600",
                          ring: "ring-emerald-600/30",
                        },
                        {
                          name: "Rose",
                          color: "bg-rose-600",
                          ring: "ring-rose-600/30",
                        },
                        {
                          name: "Amber",
                          color: "bg-amber-500",
                          ring: "ring-amber-500/30",
                        },
                      ].map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setAccent(c.name)}
                          className={`w-10 h-10 rounded-full ${c.color} flex items-center justify-center hover:scale-110 transition-transform ${accent === c.name ? `ring-4 ${c.ring}` : ""}`}
                          title={c.name}
                        >
                          {accent === c.name && (
                            <CheckCircle2 size={16} className="text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 max-w-3xl pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-bold text-slate-700 dark:text-slate-300">
                      Layout Preferences
                    </h4>
                    <div className="flex items-center justify-between p-5 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                          <Layout size={20} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Compact View</p>
                          <p className="text-xs text-slate-500 max-w-sm mt-1">
                            Reduce spacing and padding to fit more data on the
                            screen simultaneously.
                          </p>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-6 rounded-full relative cursor-pointer p-1 transition-colors ${compactMode ? "bg-primary-600" : "bg-slate-300 dark:bg-slate-700"}`}
                        onClick={() => setCompactMode(!compactMode)}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-all shadow-sm ${compactMode ? "ml-6" : "ml-0"}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "integrations" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 flex flex-col items-center justify-center text-center h-[400px]"
                >
                  <div className="w-20 h-20 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-primary-500 mb-2">
                    <Zap size={40} />
                  </div>
                  <h3 className="text-2xl font-bold">
                    Third-Party Integrations
                  </h3>
                  <p className="text-slate-500 max-w-md">
                    Connect InsightFlow with Salesforce, Google Analytics, and
                    AWS Redshift.
                  </p>
                  <button className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-bold mt-4 hover:bg-primary-700 transition-colors">
                    Browse Plugins
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
