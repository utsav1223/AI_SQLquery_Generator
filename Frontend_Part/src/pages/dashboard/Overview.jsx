import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";
import { 
  BarChart3, 
  Activity, 
  Calendar, 
  Wrench, 
  ArrowUpRight,
  Clock
} from "lucide-react"; // Highly recommended for a pro look

export default function Overview() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiRequest("/queries/overview", "GET");
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return <OverviewSkeleton />;

  const modeStats = stats.modeStats || [];
  const recentQueries = stats.recentQueries || [];
  const totalModeUsage = modeStats.reduce((sum, m) => sum + m.count, 0);
  const activeDays = stats.dailyStats ? stats.dailyStats.length : 0;

  const mostUsedTool = modeStats.length > 0
      ? modeStats.reduce((max, m) => (m.count > max.count ? m : max))._id
      : "N/A";

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-2">
      
      {/* 🔹 HEADER */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, <span className="text-emerald-600">{user?.name}</span>
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Your SQL workspace performance and AI usage metrics.
          </p>
        </div>
        <div className="hidden md:block text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Status</span>
            <div className="flex items-center gap-2 mt-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-slate-700">System Online</span>
            </div>
        </div>
      </header>

      {/* 🔹 KPI STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Total Queries" value={stats.totalQueries ?? 0} icon={<BarChart3 size={20}/>} />
        <Card title="Today's Queries" value={stats.todayQueries ?? 0} icon={<Activity size={20}/>} />
        <Card title="Active Days" value={activeDays} icon={<Calendar size={20}/>} />
        <Card 
          title="Top Tool" 
          value={mostUsedTool !== "N/A" ? mostUsedTool : "N/A"} 
          icon={<Wrench size={20}/>}
          isCaps
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🔹 TOOL DISTRIBUTION */}
        <section className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800">Tool Distribution</h4>
            <span className="text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-500 uppercase tracking-tighter">Usage %</span>
          </div>

          {modeStats.length === 0 ? (
            <div className="h-40 flex items-center justify-center border-2 border-dashed rounded-xl">
                <p className="text-slate-400 text-sm italic">No usage data yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {modeStats.map((mode) => {
                const percent = totalModeUsage > 0 ? ((mode.count / totalModeUsage) * 100).toFixed(0) : 0;
                return (
                  <div key={mode._id} className="group">
                    <div className="flex justify-between text-sm mb-2 font-medium">
                      <span className="capitalize text-slate-600 group-hover:text-emerald-600 transition-colors">
                        {mode._id}
                      </span>
                      <span className="text-slate-900">{percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 🔹 RECENT ACTIVITY */}
        <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold text-slate-800">Recent Activity</h4>
            <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                View All <ArrowUpRight size={14}/>
            </button>
          </div>

          {recentQueries.length === 0 ? (
            <p className="text-slate-400 text-sm">No recent activity found.</p>
          ) : (
            <div className="divide-y divide-slate-50">
              {recentQueries.map((q) => (
                <div key={q._id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 capitalize">
                      {q.mode}
                    </p>
                    <p className="text-xs text-slate-500 max-w-md line-clamp-1 font-mono bg-slate-50 px-2 py-1 rounded">
                      {q.prompt}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={12}/>
                    <span className="text-[11px] font-medium tracking-tight">
                      {new Date(q.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* 🔹 SUBSCRIPTION BLOCK */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-8 rounded-3xl shadow-xl shadow-emerald-900/10">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl"></div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold tracking-tight">
              {user?.plan === "pro" ? "🚀 Pro Account Active" : "Level Up Your Workflow"}
            </h4>
            <p className="text-slate-400 mt-2 max-w-sm">
              {user?.plan === "pro"
                ? "You have full access to all AI tools and prioritized processing."
                : "Upgrade to Pro to unlock unlimited queries and advanced schema insights."}
            </p>
          </div>

          {user?.plan === "free" && (
            <a
              href="/dashboard/pricing"
              className="w-full md:w-auto text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              Upgrade Now
            </a>
          )}
        </div>
      </div>

    </div>
  );
}

function Card({ title, value, icon, isCaps }) {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-200 transition-all duration-300">
      <div className="flex items-center justify-between text-slate-400 group-hover:text-emerald-500 transition-colors mb-4">
        <span className="text-[11px] font-bold uppercase tracking-widest">{title}</span>
        {icon}
      </div>
      <h3 className={`text-2xl font-black text-slate-900 ${isCaps ? 'capitalize' : ''}`}>
        {value}
      </h3>
    </div>
  );
}

function OverviewSkeleton() {
    return <div className="p-8 animate-pulse space-y-8">
        <div className="h-10 w-48 bg-slate-200 rounded-lg"></div>
        <div className="grid grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>)}
        </div>
        <div className="h-64 bg-slate-50 rounded-2xl"></div>
    </div>;
}