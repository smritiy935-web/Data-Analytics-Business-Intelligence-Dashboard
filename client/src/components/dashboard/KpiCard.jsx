import { motion } from "framer-motion";

const KpiCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient,
  delay = 0,
}) => {
  const changeColor =
    changeType === "positive"
      ? "text-emerald-500"
      : changeType === "negative"
        ? "text-rose-500"
        : "text-slate-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 shadow-sm"
    >
      <div
        className={`absolute top-0 right-0 w-24 h-24 ${gradient} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`}
      />
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
          <p className={`text-xs font-medium ${changeColor}`}>{change}</p>
        </div>
        <div
          className={`${gradient} p-2.5 rounded-lg text-white shadow-lg shadow-indigo-200/20`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

export default KpiCard;
