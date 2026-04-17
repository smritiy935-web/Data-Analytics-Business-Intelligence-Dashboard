import { motion } from "framer-motion";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueData as mockRevenue } from "../../lib/mock-data";

const RevenueChart = ({ dynamicData, isFiltered }) => {
  const [timeframe, setTimeframe] = useState("Month");

  // logic: 
  const rawData = (dynamicData && dynamicData.length > 0) 
    ? dynamicData.map(d => ({ month: d.label, revenue: d.value, profit: d.value * 0.7 })) 
    : isFiltered 
      ? [{ month: 'No Data', revenue: 0, profit: 0 }] 
      : mockRevenue;

  // Mock scaling for different timeframes to show visual change
  const data = rawData.map(item => ({
    ...item,
    revenue: timeframe === "Year" ? item.revenue * 12 : timeframe === "Week" ? item.revenue / 4 : timeframe === "Day" ? item.revenue / 30 : item.revenue,
    profit: timeframe === "Year" ? item.profit * 12 : timeframe === "Week" ? item.profit / 4 : timeframe === "Day" ? item.profit / 30 : item.profit,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Intelligence</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isFiltered ? "Filtered view" : `Aggregated performance by ${timeframe}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {["Day", "Week", "Month", "Year"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                  timeframe === tf 
                    ? "bg-white dark:bg-slate-700 text-primary-600 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          <div className="flex gap-4 text-[10px] font-black uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Profit</span>
          </div>
        </div>
      </div>
      <div className="h-[300px]">
        {isFiltered && dynamicData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 font-medium italic">
            No results match your current filters.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} dy={10} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ background: "#fff", border: "none", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", fontSize: "12px" }}
                formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#gRevenue)" strokeWidth={3} />
              <Area type="monotone" dataKey="profit" stroke="#10b981" fill="url(#gProfit)" strokeWidth={3} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default RevenueChart;
