import { useEffect, useState, useContext } from "react";
import { apiRequest } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { 
  Search, 
  Filter, 
  Pin, 
  Trash2, 
  Clock, 
  Calendar, 
  ChevronRight,
  Code2,
  PinOff,
  MoreVertical,
  ArrowUpDown
} from "lucide-react";

export default function History() {
  const { user } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);
  const [filteredQueries, setFilteredQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modeFilter, setModeFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [modeFilter, search, sortOrder, queries]);

  const fetchHistory = async () => {
    try {
      const data = await apiRequest("/queries", "GET");
      setQueries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let data = [...queries];
    if (modeFilter !== "all") data = data.filter((q) => q.mode === modeFilter);
    if (search.trim()) {
      data = data.filter((q) =>
        q.prompt?.toLowerCase().includes(search.toLowerCase()) ||
        q.generatedSQL?.toLowerCase().includes(search.toLowerCase())
      );
    }
    data.sort((a, b) => {
      return sortOrder === "newest" 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });
    setFilteredQueries(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent deletion cannot be undone. Proceed?")) return;
    try {
      await apiRequest(`/query/${id}`, "DELETE");
      setQueries((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  const togglePin = async (id) => {
    try {
      await apiRequest(`/query/${id}/pin`, "PATCH");
      setQueries((prev) => prev.map(q => 
        q._id === id ? { ...q, pinned: !q.pinned } : q
      ));
    } catch (err) {
      console.error("Pinning failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-5 w-5 border-2 border-slate-900 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 🔹 HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Workbench History</h2>
          <p className="text-sm text-slate-500">Review and manage your previous AI-generated queries.</p>
        </div>
      </div>

      {/* 🔹 FILTER BAR */}
      <div className="bg-white border border-slate-200 p-2 rounded-xl flex flex-col md:flex-row items-center gap-2 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search prompt or SQL code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-transparent border-none focus:ring-0 placeholder:text-slate-400"
          />
        </div>
        
        <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <Filter size={14} className="text-slate-500" />
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-wider border-none focus:ring-0 p-0"
            >
              <option value="all">All Modes</option>
              <option value="generate">Generate</option>
              <option value="optimize">Optimize</option>
              <option value="validate">Validate</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <ArrowUpDown size={14} className="text-slate-500" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-wider border-none focus:ring-0 p-0"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🔹 LIST AREA */}
      {filteredQueries.length === 0 ? (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <Clock className="mx-auto text-slate-300 mb-3" size={32} />
          <p className="text-sm font-medium text-slate-500">No matching history found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((q) => (
            <div
              key={q._id}
              className={`group bg-white border rounded-2xl transition-all duration-200 hover:shadow-md hover:border-slate-300 overflow-hidden 
                ${q.pinned ? "border-amber-200 ring-1 ring-amber-100" : "border-slate-200"}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {q.mode}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={12} />
                      <span className="text-[11px] font-medium">{new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                    {q.pinned && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 uppercase tracking-tight">
                        <Pin size={10} fill="currentColor" /> Pinned
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {user?.plan === "pro" && (
                      <button
                        onClick={() => togglePin(q._id)}
                        className={`p-2 rounded-lg transition-colors ${q.pinned ? "bg-amber-50 text-amber-600" : "hover:bg-slate-100 text-slate-400"}`}
                      >
                        {q.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(q._id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <ChevronRight size={18} className="text-slate-300 mt-0.5 shrink-0" />
                  <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                    {q.prompt}
                  </p>
                </div>

                {/* 🔹 CODE PREVIEW */}
                <div className="relative group/code">
                  <div className="absolute top-3 right-3 opacity-0 group-hover/code:opacity-100 transition-opacity">
                    <div className="px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-[10px] text-white/70 font-mono">
                      SQL
                    </div>
                  </div>
                  <pre className="bg-slate-900 p-4 rounded-xl text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {q.generatedSQL}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}