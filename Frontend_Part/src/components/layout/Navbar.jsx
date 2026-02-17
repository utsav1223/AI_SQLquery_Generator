import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LogOut, 
  Bell, 
  Search, 
  ChevronRight, 
  User as UserIcon,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract page name from path (e.g., /dashboard/generate -> Generate)
  const pathName = location.pathname.split("/").pop();
  const formattedPath = pathName === "dashboard" ? "Overview" : pathName;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
      
      {/* 🔹 LEFT: BREADCRUMBS */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</span>
        <ChevronRight size={14} className="text-slate-300" />
        <h1 className="text-sm font-bold text-slate-900 capitalize">
          {formattedPath}
        </h1>
      </div>

      {/* 🔹 CENTER: OPTIONAL SEARCH (Refined look) */}
      <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl w-64 group focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100 transition-all">
        <Search size={14} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Quick find..." 
          className="bg-transparent border-none focus:ring-0 text-xs w-full placeholder:text-slate-400 font-medium"
        />
      </div>

      {/* 🔹 RIGHT: USER ACTIONS */}
      <div className="flex items-center gap-3">
        
        {/* Plan Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full mr-2">
          {user?.plan === "pro" ? (
            <>
              <Zap size={12} className="text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter">Pro Instance</span>
            </>
          ) : (
            <>
              <ShieldCheck size={12} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Free Tier</span>
            </>
          )}
        </div>

        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        <div className="flex items-center gap-3 ml-1 group cursor-pointer">
          <div className="text-right hidden lg:block">
            <p className="text-[11px] font-bold text-slate-900 leading-none">{user?.name || "Member"}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1 italic">{user?.role || "User"}</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all group"
            title="Sign Out"
          >
            <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}