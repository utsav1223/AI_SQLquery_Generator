import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative py-24 md:py-40 px-6 bg-[#fafafa] flex flex-col items-center overflow-hidden">
      
      {/* --- PROFESSIONAL BACKGROUND SYSTEM --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Engineering Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Dynamic Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-[#00ca62]/5 blur-[120px] rounded-full" />
        
        {/* Animated "Data Line" Ornament */}
        <motion.div 
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-0 w-40 h-[1px] bg-gradient-to-r from-transparent via-[#00ca62]/20 to-transparent"
        />
      </div>

      <div className="max-w-5xl w-full text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          {/* Status Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ca62] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ca62]"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Ready for deployment</span>
          </div>

          <h3 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-[#111827] tracking-[-0.05em] mb-8 leading-[1] md:leading-[0.9]">
            SQL simplified. <br />
            <span className="text-[#00ca62] italic font-medium drop-shadow-sm">Insights amplified.</span>
          </h3>

          <p className="text-slate-500 text-base md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed px-4">
            Ditch the syntax. Start talking to your data. Join 5,000+ engineers 
            building production-ready infrastructure with AISQL v3.0.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
            <motion.a
              whileHover={{ y: -4, shadow: "0 20px 25px -5px rgba(0, 202, 98, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              href="/register"
              className="w-full sm:w-auto px-10 py-5 bg-[#111827] text-white font-bold rounded-2xl text-sm transition-all hover:bg-black shadow-xl shadow-slate-200"
            >
              Get Started for Free
            </motion.a>
            
            <a 
              href="#pricing" 
              className="text-slate-500 hover:text-[#111827] font-bold text-sm transition-all flex items-center gap-2 group py-4"
            >
              View Enterprise Plans
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* --- RESPONSIVE STATS BAR --- */}
        <div className="mt-24 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-0 border-t border-slate-200 pt-16">
          <div className="text-center md:border-r border-slate-100 last:border-0">
            <p className="text-[#111827] text-3xl md:text-4xl font-black tracking-tighter">99.9%</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00ca62] font-black mt-2">Accuracy</p>
          </div>
          
          <div className="text-center md:border-r border-slate-100 last:border-0">
            <p className="text-[#111827] text-3xl md:text-4xl font-black tracking-tighter">24/7</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00ca62] font-black mt-2">Uptime</p>
          </div>
          
          <div className="text-center">
            <p className="text-[#111827] text-3xl md:text-4xl font-black tracking-tighter">&lt; 180ms</p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#00ca62] font-black mt-2">Latency</p>
          </div>
        </div>
      </div>
    </section>
  );
}