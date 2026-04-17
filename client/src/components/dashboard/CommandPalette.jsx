import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Layout, FileText, Settings, Moon, Sun, X, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  const actions = [
    { icon: Layout, label: "Go to Dashboard", path: "/", shortcut: "G D" },
    { icon: FileText, label: "View Analytics", path: "/analytics", shortcut: "G A" },
    { icon: Settings, label: "System Settings", path: "/settings", shortcut: "G S" },
    { icon: isDark ? Sun : Moon, label: `Toggle ${isDark ? "Light" : "Dark"} Mode`, action: toggleTheme, shortcut: "T T" },
  ];

  const dummyData = [
    { label: "Revenue Q4 Report", category: "Finance", value: "$450,200" },
    { label: "User Retention Rate", category: "Marketing", value: "68.2%" },
    { label: "Product Inventory", category: "Logistics", value: "1,240 items" },
    { label: "Customer Satisfaction", category: "Support", value: "4.8/5" },
    { label: "Electronics Sales", category: "Sales", value: "$120,400" },
    { label: "Furniture Orders", category: "Logistics", value: "85 orders" },
  ];

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredData = query.length > 0 
    ? dummyData.filter((item) => 
        item.label.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      ) 
    : [];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 backdrop-blur-sm bg-slate-900/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          {/* Search Bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <Search className="text-slate-400" size={20} />
            <input
              autoFocus
              placeholder="Search actions or pages... (Type 'Dark' or 'Settings')"
              className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-black text-slate-500 uppercase">
              <Command size={10} /> K
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {/* Actions Section */}
            {filteredActions.length > 0 && (
              <div className="mb-2">
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions & Pages</p>
                {filteredActions.map((action, idx) => (
                  <button
                    key={`action-${idx}`}
                    onClick={() => {
                      if (action.path) navigate(action.path);
                      if (action.action) action.action();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 group transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 text-slate-500 dark:text-slate-400 group-hover:text-primary-600 transition-colors">
                        <action.icon size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{action.label}</p>
                        <p className="text-xs text-slate-500">{action.path ? "Navigate to page" : "System command"}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{action.shortcut}</div>
                  </button>
                ))}
              </div>
            )}

            {/* Data Section */}
            {filteredData.length > 0 && (
              <div>
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Data & Metrics Results</p>
                {filteredData.map((item, idx) => (
                  <div
                    key={`data-${idx}`}
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/10 group transition-all text-left cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{item.label}</p>
                        <p className="text-xs text-slate-500 font-medium">Category: {item.category}</p>
                      </div>
                    </div>
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">{item.value}</div>
                  </div>
                ))}
              </div>
            )}

            {filteredActions.length === 0 && filteredData.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <Zap className="mx-auto mb-3 opacity-20" size={32} />
                <p>No matching commands or data found...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1">↑↓ Navigate</span>
              <span className="flex items-center gap-1">↵ Select</span>
              <span className="flex items-center gap-1">esc Close</span>
            </div>
            <p className="text-[10px] text-primary-500 font-black tracking-tighter italic">InsightFlow Command Palette v1.0</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CommandPalette;
