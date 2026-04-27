import { motion } from "framer-motion";
import { recentTransactions } from "../../lib/mock-data";

const statusStyles = {
  completed:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  failed: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

const TransactionsTable = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm"
  >
    <h3 className="text-sm font-semibold mb-0.5">Recent Transactions</h3>
    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
      Latest payments
    </p>
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-800">
            <th className="py-1.5 px-3 text-slate-500 font-medium">ID</th>
            <th className="py-1.5 px-3 text-slate-500 font-medium">Customer</th>
            <th className="py-1.5 px-3 text-right text-slate-500 font-medium">
              Amount
            </th>
            <th className="py-1.5 px-3 text-center text-slate-500 font-medium">
              Status
            </th>
            <th className="py-1.5 px-3 text-right text-slate-500 font-medium">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.slice(0, 5).map((tx) => (
            <tr
              key={tx.id}
              className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors"
            >
              <td className="py-1.5 px-3 font-mono text-xs">{tx.id}</td>
              <td className="py-1.5 px-3 font-medium text-slate-900 dark:text-white">
                {tx.customer}
              </td>
              <td className="py-1.5 px-3 text-right font-semibold text-slate-900 dark:text-white">
                ${tx.amount.toLocaleString()}
              </td>
              <td className="py-1.5 px-3 text-center">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusStyles[tx.status]}`}
                >
                  {tx.status}
                </span>
              </td>
              <td className="py-1.5 px-3 text-right text-slate-500 dark:text-slate-400">
                {tx.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </motion.div>
);

export default TransactionsTable;
