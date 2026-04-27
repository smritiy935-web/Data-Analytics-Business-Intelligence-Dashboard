import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { weeklyActivity } from "../../lib/mock-data";

const ActivityChart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
    className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm"
  >
    <h3 className="text-sm font-semibold mb-0.5">Weekly Activity</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
      Users & sessions
    </p>
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={weeklyActivity} barGap={4}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e2e8f0"
        />
        <XAxis
          dataKey="day"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#64748b" }}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#64748b" }}
        />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "12px",
          }}
        />
        <Bar
          dataKey="users"
          fill="#0ea5e9"
          radius={[4, 4, 0, 0]}
          barSize={18}
        />
        <Bar
          dataKey="sessions"
          fill="#8b5cf6"
          radius={[4, 4, 0, 0]}
          barSize={18}
          opacity={0.6}
        />
      </BarChart>
    </ResponsiveContainer>
  </motion.div>
);

export default ActivityChart;
