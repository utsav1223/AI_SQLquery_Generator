import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { 
  LayoutGrid, 
  Code2, 
  Database, 
  History, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Zap, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
      isActive
        ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
    }`;

  return (
    <div className="w-72 bg-white border-r border-slate-100 h-screen flex flex-col p-6 sticky top-0">
      
      {/* 🔹 BRAND LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="bg-slate-950 p-2 rounded-lg shadow-xl shadow-emerald-500/10">
          <Code2 size={20} className="text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-black tracking-tighter text-slate-900 uppercase">SQL Studio</h2>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">v2.0 Beta</span>
        </div>
      </div>

      {/* 🔹 NAVIGATION GROUP */}
      <div className="flex-1 space-y-8">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Workbench</p>
          <nav className="space-y-1">
            <SidebarLink to="/dashboard" icon={<LayoutGrid size={18} />} label="Overview" linkClass={linkClass} />
            <SidebarLink to="/dashboard/generate" icon={<Zap size={18} />} label="Intelligence" linkClass={linkClass} />
            <SidebarLink to="/dashboard/schema" icon={<Database size={18} />} label="Schema Context" linkClass={linkClass} />
            <SidebarLink to="/dashboard/history" icon={<History size={18} />} label="Query History" linkClass={linkClass} />
          </nav>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Account & Insights</p>
          <nav className="space-y-1">
            {user.plan === "pro" ? (
              <SidebarLink to="/dashboard/analytics" icon={<BarChart3 size={18} />} label="Analytics" linkClass={linkClass} />
            ) : (
              <div className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-slate-300 cursor-not-allowed italic">
                <div className="flex items-center gap-3">
                  <BarChart3 size={18} />
                  <span>Analytics</span>
                </div>
                <ShieldCheck size={14} className="text-slate-200" />
              </div>
            )}
            <SidebarLink to="/dashboard/pricing" icon={<CreditCard size={18} />} label="Billing" linkClass={linkClass} />
            <SidebarLink to="/dashboard/settings" icon={<Settings size={18} />} label="Settings" linkClass={linkClass} />
          </nav>
        </div>
      </div>

      {/* 🔹 USER FOOTER */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-inner">
              {user.name?.charAt(0) || "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user.name || "User"}</p>
              <div className="flex items-center gap-1">
                {user.plan === "pro" ? (
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter">Pro Member</span>
                ) : (
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Free Plan</span>
                )}
              </div>
            </div>
          </div>
          <ChevronRight size={14} className="text-slate-300" />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, linkClass }) {
  return (
    <NavLink to={to} end className={linkClass}>
      <span className="shrink-0">{icon}</span>
      <span className="flex-1">{label}</span>
    </NavLink>
  );
}