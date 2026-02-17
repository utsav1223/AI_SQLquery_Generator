import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import ToolSelector from "../../components/ai/ToolSelector";
import SQLInput from "../../components/ai/SQLInput";
import SQLOutput from "../../components/ai/SQLOutput";
import UpgradeBanner from "../../components/ai/UpgradeBanner";
import { apiRequest } from "../../services/api";
import { Sparkles, Terminal, ShieldCheck, Zap, Command, Layout, ArrowRight, Menu, Loader2 } from "lucide-react";

export default function Generate() {
  const { user } = useContext(AuthContext);
  const [mode, setMode] = useState("generate");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, mode, loading]);

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    try {
      setLoading(true);
      const payload = mode === "generate" ? { mode, prompt: input } : { mode, sql: input };
      const res = await apiRequest("/ai", "POST", payload);
      setResult(res.result);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isLocked = user?.plan === "free" && mode !== "generate";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans antialiased">
      {/* 🔹 NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-2 rounded-xl shadow-sm">
              <Layout size={18} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight block">SQL STUDIO</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter -mt-1">Intelligence Cloud</span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {user?.plan === "pro" ? (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <ShieldCheck size={13} /> PRO
              </div>
            ) : (
              <a href="/pricing" className="text-[11px] font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">Upgrade Plan</a>
            )}
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block" />
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 🔹 EDITOR AREA */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <ToolSelector mode={mode} setMode={setMode} />
              <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-slate-100 rounded-md text-slate-400 border border-slate-200/50">
                <Command size={10} />
                <span className="text-[9px] font-black uppercase">Enter</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.02),0_10px_20px_-5px_rgba(0,0,0,0.03)] overflow-hidden transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500/30">
              {isLocked ? (
                <div className="p-12"><UpgradeBanner /></div>
              ) : (
                <div className="flex flex-col">
                  <div className="min-h-[400px] lg:min-h-[500px]">
                    <SQLInput
                      value={input}
                      onChange={setInput}
                      mode={mode}
                      loading={loading}
                    />
                  </div>

                  <div className="p-5 bg-slate-50/50 border-t border-slate-100">
                    <button 
                      onClick={handleSubmit}
                      disabled={loading || !input.trim()}
                      className="group w-full h-12 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 font-bold text-xs uppercase tracking-widest shadow-lg shadow-slate-200/50 active:scale-[0.98]"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin text-emerald-400" />
                      ) : (
                        <>
                          <Sparkles size={16} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
                          <span>Run Intelligence</span>
                          <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </>
                      )}
                    </button>
                    <div className="mt-4 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] px-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        AI Instance: GPT-4o
                      </div>
                      <span>{input.length} Chars</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 🔹 TERMINAL OUTPUT */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#0B0F1A] border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[600px] lg:h-[700px] overflow-hidden">
              
              {/* Terminal Header */}
              <div className="px-5 py-4 border-b border-slate-800/50 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                  <div className="h-4 w-[1px] bg-slate-800" />
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-slate-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Query_Result.sql</span>
                  </div>
                </div>
                <Zap size={14} className={loading ? "text-emerald-400 animate-pulse" : "text-slate-700"} />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto custom-scrollbar p-1">
                {result ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <SQLOutput result={result} />
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 px-12 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center">
                      <Zap size={20} className="text-slate-700" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Awaiting execution</p>
                      <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                        Input your parameters to generate optimized SQL production code.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}