import { useState, useEffect } from "react";
import { DollarSign, Users, TrendingUp, ShoppingCart, ArrowUpRight, Download } from "lucide-react";
import KpiCard from "../components/dashboard/KpiCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import TrafficPieChart from "../components/dashboard/TrafficPieChart";
import ActivityChart from "../components/dashboard/ActivityChart";
import TransactionsTable from "../components/dashboard/TransactionsTable";
import FilterBar from "../components/dashboard/FilterBar";
import { useFilters } from "../context/FilterContext";
import api from "../services/api";

const kpis = [
  {
    id: "revenue",
    title: "Total Revenue",
    value: "$816,000",
    change: "+23.5% from last month",
    changeType: "positive",
    icon: DollarSign,
    gradient: "gradient-primary",
  },
  {
    id: "users",
    title: "Active Users",
    value: "12,480",
    change: "+12.2% from last month",
    changeType: "positive",
    icon: Users,
    gradient: "gradient-accent",
  },
  {
    id: "conversion",
    title: "Conversion Rate",
    value: "7.84%",
    change: "+2.1% from last month",
    changeType: "positive",
    icon: TrendingUp,
    gradient: "gradient-warm",
  },
  {
    id: "orders",
    title: "Total Orders",
    value: "3,241",
    change: "-1.4% from last month",
    changeType: "negative",
    icon: ShoppingCart,
    gradient: "gradient-primary",
  },
];

const Dashboard = () => {
  const { filters } = useFilters();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maintenance, setMaintenance] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setMaintenance(null);
    try {
      const { data: response } = await api.get("/data", { params: filters });
      setData(response.data || []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      if (err.response?.status === 503) {
        setMaintenance(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filters]);

  const handleExport = () => {
    if (!data || data.length === 0) return;
    const headers = ["Category", "Label", "Value", "Date"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => [row.category, `"${row.label}"`, row.value, row.date].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `Data_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header Info */}
      {/* Compact Briefing Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Executive Summary
            <ArrowUpRight className="text-primary-500" size={20} />
          </h1>
          <p className="text-xs text-slate-500 font-medium tracking-tight">
            Real-time performance metrics and business analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-2 ${maintenance ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100/50 dark:border-amber-500/10' : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-500/10'} rounded-xl text-[10px] font-bold uppercase tracking-widest border`}>
            <div className={`w-1.5 h-1.5 rounded-full ${maintenance ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div>
            Status: {maintenance ? 'MAINTENANCE' : 'LIVE'}
          </div>
        </div>
      </div>

      {maintenance && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl flex items-center gap-4"
        >
          <div className="p-2 bg-amber-500 rounded-lg text-white">
            <AlertCircle size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest">System Maintenance Active</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{maintenance}</p>
          </div>
        </motion.div>
      )}

      <FilterBar />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? [1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse rounded-2xl"
              ></div>
            ))
          : data.length > 0
            ? kpis.map((kpi, i) => {
                const total = data.reduce(
                  (acc, curr) => acc + (curr.value || 0),
                  0,
                );
                const value =
                  kpi.id === "revenue"
                    ? `$${(total * 12).toLocaleString()}`
                    : total.toLocaleString();
                return (
                  <KpiCard
                    key={kpi.title}
                    {...kpi}
                    value={value}
                    change="+12.5% from filtered"
                    changeType="positive"
                    delay={i * 0.1}
                  />
                );
              })
            : filters.search || filters.category || filters.startDate
              ? // If user HAS filtered but no data found
                kpis.map((kpi, i) => (
                  <KpiCard
                    key={kpi.title}
                    {...kpi}
                    value="0"
                    change="No results found"
                    changeType="neutral"
                    delay={i * 0.1}
                  />
                ))
              : // Default initial mock view
                kpis.map((kpi, i) => (
                  <KpiCard key={kpi.title} {...kpi} delay={i * 0.1} />
                ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart
            dynamicData={data}
            isFiltered={filters.search || filters.category || filters.startDate}
          />
        </div>
        <TrafficPieChart
          dynamicData={data}
          isFiltered={filters.search || filters.category || filters.startDate}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ActivityChart />
        <div className="lg:col-span-2">
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
