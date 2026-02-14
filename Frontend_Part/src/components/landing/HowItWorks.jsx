import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smoothly animate a progress bar across the screen on scroll
  const pathWidth = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "100%"]);

  const steps = [
    {
      title: "Data Integration",
      desc: "Securely bridge your SQL dialects via encrypted tunnels or edge-ready API keys.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Semantic Input",
      desc: "Describe complex business logic in natural language—no syntax knowledge required.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "Neural Synthesis",
      desc: "Our v3.0 engine validates schemas and compiles high-performance, production SQL.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Insight Delivery",
      desc: "Execute queries instantly with live visual output and seamless export options.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    }
  ];

  return (
    <section ref={containerRef} id="how" className="relative py-32 bg-[#fafafa] overflow-hidden">
      
      {/* Background: Digital Grid + Floating Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ca62]/3 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-[1px] w-8 bg-[#00ca62]" />
              <span className="text-[#00ca62] font-bold text-[10px] uppercase tracking-[0.4em]">The Protocol</span>
            </motion.div>
            <h3 className="text-5xl md:text-7xl font-extrabold text-[#111827] tracking-tighter leading-[0.9]">
              How AI simplifies <br />
              <span className="text-[#00ca62] italic font-medium">everything.</span>
            </h3>
          </div>
          <p className="text-slate-400 text-sm max-w-[260px] leading-relaxed border-l-2 border-slate-200 pl-8 font-medium">
            Bridging the gap between natural language and production-grade SQL infrastructure.
          </p>
        </div>

        {/* Process Timeline Container */}
        <div className="relative">
          
          {/* Desktop Progress Line (Animated on Scroll) */}
          <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[2px] bg-slate-200 overflow-hidden">
            <motion.div 
              style={{ width: pathWidth }} 
              className="h-full bg-[#00ca62] shadow-[0_0_10px_#00ca62]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative">
            {steps.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Step Node */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="relative mb-8 z-10">
                    <div className="h-14 w-14 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-[#00ca62] group-hover:bg-[#00ca62] transition-all duration-500 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_30px_-5px_rgba(0,202,98,0.3)] transform group-hover:rotate-6">
                      {s.icon}
                    </div>
                    {/* Mobile Line Accent */}
                    <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-slate-200 to-transparent" />
                  </div>

                  {/* Text Content */}
                  <div className="text-center md:text-left px-2">
                    <div className="inline-block px-2 py-0.5 rounded-md bg-slate-100 mb-4 transition-colors group-hover:bg-[#00ca62]/10">
                       <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#00ca62] uppercase tracking-widest font-mono">0{i + 1}</span>
                    </div>
                    <h4 className="text-xl font-bold text-[#111827] mb-3 tracking-tight">
                      {s.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium transition-colors group-hover:text-slate-600">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Metadata Footer */}
        <div className="mt-40 pt-10 border-t border-slate-200 flex flex-wrap justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Architecture</span>
                  <span className="text-xs text-slate-900 font-mono font-bold">Encrypted Tunneling</span>
                </div>
                <div className="h-6 w-[1px] bg-slate-200" />
                <div className="flex flex-col">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">Latency</span>
                  <span className="text-xs text-[#00ca62] font-mono font-bold">&lt; 180ms avg</span>
                </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg shadow-xl">
               <div className="h-1.5 w-1.5 rounded-full bg-[#00ca62] animate-pulse" />
               <span className="text-[10px] text-slate-300 font-mono tracking-tighter">System Status: <span className="text-white font-bold uppercase">Optimal</span></span>
            </div>
        </div>
      </div>
    </section>
  );
}