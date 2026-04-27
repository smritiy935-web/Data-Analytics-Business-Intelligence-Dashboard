import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { trafficData as mockTraffic } from "../../lib/mock-data";

const TrafficPieChart = ({ dynamicData }) => {
  // Aggregate dynamic data for the pie chart if it exists
  const data = dynamicData && dynamicData.length > 0 
    ? [
        { name: 'Filtered Results', value: dynamicData.length, color: '#3b82f6' },
        { name: 'Remaining', value: Math.max(0, 100 - dynamicData.length), color: '#e2e8f0' }
      ]
    : mockTraffic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
    >
      <h3 className="text-sm font-bold mb-0.5">Segment Distribution</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Category breakdown</p>
      
      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color ? entry.color.replace('hsl(var(--chart-blue))', '#3b82f6').replace('hsl(var(--chart-purple))', '#a855f7').replace('hsl(var(--chart-green))', '#10b981') : '#3b82f6'} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: "white", border: "none", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", fontSize: "12px" }}
              formatter={(value) => [`${value}%`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        {data.slice(0, 3).map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color ? item.color.replace('hsl(var(--chart-blue))', '#3b82f6').replace('hsl(var(--chart-purple))', '#a855f7').replace('hsl(var(--chart-green))', '#10b981') : '#3b82f6' }} />
              <span className="text-slate-500">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrafficPieChart;
