import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, Layout, Trash2 } from 'lucide-react';
import api from '../../services/api';

const DashboardSwitcher = ({ currentId, onSwitch }) => {
  const [dashboards, setDashboards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDashboards = async () => {
    try {
      const { data } = await api.get('/dashboard/list');
      setDashboards(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  const handleCreate = async () => {
    const name = prompt("Enter dashboard name:");
    if (!name) return;
    try {
      const { data } = await api.post('/dashboard/save', { name, layout: [] });
      setDashboards([data.dashboard, ...dashboards]);
      onSwitch(data.dashboard._id);
    } catch (err) {
      console.error(err);
    }
  };

  const currentName = dashboards.find(d => d._id === currentId)?.name || 'Default Dashboard';

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-slate-200 transition-all border border-slate-200 dark:border-slate-700"
        >
          <Layout size={18} className="text-primary-500" />
          {currentName}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={handleCreate}
          className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
          title="New Dashboard"
        >
          <Plus size={20} />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 mt-2 w-56 origin-top-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-20 overflow-hidden">
            <div className="py-2">
              {dashboards.map((dash) => (
                <button
                  key={dash._id}
                  onClick={() => {
                    onSwitch(dash._id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${currentId === dash._id ? 'text-primary-600 bg-primary-50/50' : 'text-slate-600 dark:text-slate-400'}`}
                >
                  {dash.name}
                  {currentId === dash._id && <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>}
                </button>
              ))}
              {dashboards.length === 0 && (
                <div className="px-4 py-3 text-sm text-slate-400 italic">No custom dashboards</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardSwitcher;
