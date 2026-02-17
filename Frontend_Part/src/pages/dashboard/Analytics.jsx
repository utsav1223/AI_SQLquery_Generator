import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  BarChart3, 
  TrendingUp, 
  Layers, 
  Calendar, 
  Lock, 
  ArrowUpRight, 
  Loader2,
  Sparkles
} from "lucide-react";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"];

export default function Analytics() {
  const { user, loading } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user || user.plan !== "pro") return;

    const fetchAnalytics = async () => {
      try {
        const res = await apiRequest("/queries/advanced-analytics", "GET");
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (loading || (user?.plan === "pro" && isLoading)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={24} />
        <p className="text-sm font-medium tracking-wide italic">Aggregating intelligence data...</p>
      </div>
    );
  }

  // 🔹 PRO UPSELL VIEW
  if (!user || user.plan !== "pro") {
    return (
      <div className="relative overflow-hidden bg-slate-900 rounded-[32px] p-8 lg:p-16 text-center shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#10b981,transparent)]" />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-2xl mb-6">
            <Lock className="text-emerald-400" size={28} />
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Advanced Insights</h3>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Unlock usage patterns, mode efficiency, and historical trends. 
            Calibrate your workflow with data-driven intelligence.
          </p>
          <a href="/pricing" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-lg shadow-emerald-500/20">
            Upgrade to Pro <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    );
  }

  const pieData = data?.modeStats?.map((item) => ({
    name: item._id || "generate",
    value: item.count
  }));

  const lineData = data?.dailyStats?.map((item) => ({
    date: item._id,
    queries: item.count
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 🔹 HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Dashboard</h2>
          <p className="text-sm text-slate-500 font-medium">Advanced analytics for professional operations.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
          <Sparkles size={14} className="text-emerald-600" />
          <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Real-time Sync</span>
        </div>
      </div>

      {/* 🔹 KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          icon={<Layers size={20} className="text-emerald-500" />} 
          label="Cumulative Queries" 
          value={data.totalQueries} 
          trend="+12% from last month"
        />
        <StatCard 
          icon={<TrendingUp size={20} className="text-blue-500" />} 
          label="Avg. Daily Load" 
          value={Math.round(data.totalQueries / 30)} 
          trend="System stable"
        />
        <StatCard 
          icon={<Calendar size={20} className="text-amber-500" />} 
          label="Active Session Days" 
          value={data.dailyStats.length} 
          trend="Consistent usage"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🔹 LINE CHART AREA */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-50 rounded-lg"><BarChart3 size={18} className="text-slate-600" /></div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Activity Stream</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8'}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#94a3b8'}} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="queries" 
                stroke="#10b981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorQueries)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 PIE CHART AREA */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-slate-50 rounded-lg"><TrendingUp size={18} className="text-slate-600" /></div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mode Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-emerald-200 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}