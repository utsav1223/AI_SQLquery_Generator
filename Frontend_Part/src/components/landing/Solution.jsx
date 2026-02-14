import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Solution() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      title: "NLP Synthesis",
      desc: "Transform semantic intent into high-performance SQL structures with zero latency.",
      icon: "⚡",
      className: "md:col-span-2 md:row-span-2",
      bg: "bg-gradient-to-br from-slate-900 via-emerald-950 to-[#00ca62]/20",
      details: "Our proprietary LLM adapter translates natural language into optimized SQL. It handles nested joins, CTEs, and window functions automatically while ensuring 99.9% syntax accuracy."
    },
    {
      title: "Identity Layer",
      desc: "Unified SSO and role-based governance for teams.",
      icon: "🛡️",
      className: "md:col-span-1",
      bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/40",
      details: "Seamlessly integrate with Okta, Azure AD, and Google Workspace. Manage granular permissions down to the column level."
    },
    {
      title: "Query Vault",
      desc: "Architectural persistence for every query.",
      icon: "📁",
      className: "md:col-span-1",
      bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/40",
      details: "Version control for your SQL. Track every change, revert to previous versions, and share successful queries across your organization."
    },
    {
      title: "Audit Analytics",
      desc: "Deep-trace monitoring of compute and efficiency metrics.",
      icon: "📈",
      className: "md:col-span-2",
      bg: "bg-gradient-to-br from-slate-900 via-emerald-950 to-[#00ca62]/20",
      details: "Monitor performance bottlenecks in real-time. AISQL automatically suggests optimizations for slow-running queries to save on compute costs."
    }
  ];

  return (
    <section id="solutions" className="py-32 px-6 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00ca62] animate-pulse" />
              <span className="text-[#111827] font-bold text-[10px] uppercase tracking-[0.2em]">Core Infrastructure</span>
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-extrabold text-[#111827] tracking-tighter leading-[0.95]">
              Powerful tools, <br />
              <span className="text-[#00ca62] italic font-medium">vividly</span> executed.
            </h3>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
          {features.map((f, i) => (
            <motion.div
              key={i}
              layoutId={`card-${i}`}
              onClick={() => setSelectedFeature({ ...f, id: i })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.98 }}
              className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer border-2 border-slate-100 transition-all duration-500 shadow-sm ${f.className} ${f.bg}`}
            >
              {/* Technical Pattern Overlay */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500" 
                   style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />

              <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-2xl">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">{f.title}</h4>
                  <p className="text-white/60 text-sm font-medium">Click to expand details →</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            
            <motion.div 
              layoutId={`card-${selectedFeature.id}`}
              className={`relative w-full max-w-xl overflow-hidden rounded-[3rem] p-8 md:p-12 shadow-2xl border border-white/20 ${selectedFeature.bg}`}
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </button>

              <div className="mb-8 h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-3xl">
                {selectedFeature.icon}
              </div>

              <h4 className="text-4xl font-bold text-white mb-4 tracking-tight">{selectedFeature.title}</h4>
              <p className="text-emerald-400 font-bold mb-6 tracking-wide uppercase text-xs">{selectedFeature.desc}</p>
              <p className="text-slate-300 leading-relaxed text-lg">
                {selectedFeature.details}
              </p>
              
              <button className="mt-10 w-full py-4 bg-[#00ca62] text-white font-bold rounded-2xl hover:bg-[#00b356] transition-colors shadow-xl shadow-[#00ca62]/20">
                Documentation →
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}