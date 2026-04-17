import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Radar, RadarChart, 
  PolarGrid, PolarAngleAxis, ComposedChart, Line
} from "recharts";
import { 
  TrendingUp, 
  Share2, 
  Download, 
  Target, 
  Activity, 
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { revenueData } from "../lib/mock-data";

const radarData = [
  { subject: 'Retention', A: 120, B: 110, fullMark: 150 },
  { subject: 'Conversion', A: 98, B: 130, fullMark: 150 },
  { subject: 'Satisfaction', A: 86, B: 130, fullMark: 150 },
  { subject: 'Latency', A: 99, B: 100, fullMark: 150 },
  { subject: 'Growth', A: 85, B: 90, fullMark: 150 },
  { subject: 'Profit', A: 115, B: 85, fullMark: 150 },
];

const forecastData = [
  ...revenueData.map(d => ({ ...d, forecast: null })),
  { month: 'Jun (P)', revenue: null, forecast: 95000 },
  { month: 'Jul (P)', revenue: null, forecast: 112000 },
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    const headers = ["Month", "Revenue", "Forecasted"];
    const csvContent = [
      headers.join(","),
      ...forecastData.map(row => [row.month, row.revenue || "0", row.forecast || "0"].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Analytics_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      
      {/* Compact Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Performance Intelligence</h1>
          <p className="text-sm text-slate-500 font-medium italic">Deep-dive business performance and trajectory.</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="h-9 w-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500">
             <Share2 size={16} />
           </button>
        </div>
      </div>

      {/* Compact Briefing */}
      <div className="bg-slate-900 dark:bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-primary-500/5">
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
            <Sparkles size={24} className="text-white" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-widest opacity-60">System Insight</p>
            <p className="text-sm font-medium leading-relaxed italic opacity-90">
              "Current ecosystem exhibits <span className="text-emerald-400 font-bold">14.2% acceleration</span>. Performance in 'Electronics' is driving revenue growth with forecasted stabilization."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-slate-500 flex items-center gap-2">
                <Target size={16} className="text-primary-600" /> Strategic Velocity
              </h3>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: '#fff' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={0.1} fill="#2563eb" />
                  <Line type="monotone" dataKey="forecast" stroke="#94a3b8" strokeWidth={2} strokeDasharray="6 6" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold mb-8 uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Activity size={16} className="text-amber-500" /> System Health
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#94a3b8', fontSize: 9, fontWeight: 700}} />
                <Radar name="Active" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-50 dark:border-slate-800 space-y-3">
             {['Retention', 'Conversion'].map((m) => (
               <div key={m} className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-400 uppercase">{m}</span>
                  <span className="text-slate-900 dark:text-white">+8.4%</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
