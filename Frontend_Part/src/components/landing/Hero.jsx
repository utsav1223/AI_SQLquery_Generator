import { motion } from "framer-motion";

export default function Hero() {
  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const companies = [
    { name: "Stripe", color: "text-[#635BFF]" },
    { name: "Vercel", color: "text-[#000000]" },
    { name: "OpenAI", color: "text-[#10a37f]" },
    { name: "Linear", color: "text-[#5E6AD2]" },
    { name: "Airbnb", color: "text-[#FF5A5F]" },
    { name: "GitHub", color: "text-[#24292e]" },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] px-4 pt-32 pb-20">
      
      {/* --- PRO BACKGROUND GRAPHICS --- */}
      <div className="absolute inset-0 z-0">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_90%)]" />
        
        {/* Abstract "Database Nodes" - Subtle blurred circles */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00ca62]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-slate-200 bg-white shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ca62] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ca62]"></span>
          </span>
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">
            v3.0 Engine is Live
          </span>
        </motion.div>

        {/* Main Content Layout */}
        <div className="text-center mb-16">
          <motion.h1 
            {...fadeInUp}
            className="text-6xl md:text-8xl font-bold tracking-[ -0.04em] text-slate-900 mb-6 leading-[1.1]"
          >
            SQL automation <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ca62] to-[#008a43]">
              at interface speed.
            </span>
          </motion.h1>

          <motion.p 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium"
          >
            The production-grade AI layer for your database. Audit, generate, 
            and deploy complex queries with zero friction.
          </motion.p>

          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Get Started for Free
            </button>
            <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
              Watch Walkthrough
            </button>
          </motion.div>
        </div>

        {/* --- THE "GRAPHIC" (Visual Mockup of the Tool) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative w-full max-w-4xl mt-4 p-2 bg-white rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200"
        >
          <div className="bg-slate-50 rounded-lg p-4 font-mono text-sm overflow-hidden text-slate-700">
            <div className="flex gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400/20" />
              <div className="w-3 h-3 rounded-full bg-amber-400/20" />
              <div className="w-3 h-3 rounded-full bg-green-400/20" />
            </div>
            <div className="space-y-2">
              <p className="text-blue-600">-- Optimized analytical query</p>
              <p><span className="text-purple-600">SELECT</span> users.name, <span className="text-purple-600">COUNT</span>(orders.id)</p>
              <p><span className="text-purple-600">FROM</span> users</p>
              <p><span className="text-purple-600">JOIN</span> orders <span className="text-purple-600">ON</span> users.id = orders.user_id</p>
              <p><span className="text-purple-600">WHERE</span> orders.created_at &gt; <span className="text-[#00ca62]">&apos;2024-01-01&apos;</span></p>
              <p><span className="text-purple-600">GROUP BY</span> 1;</p>
            </div>
          </div>
          
          {/* Floating Performance Tag */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-6 top-1/2 bg-white border border-slate-200 p-4 rounded-xl shadow-xl hidden md:block"
          >
            <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Execution Time</div>
            <div className="text-2xl font-bold text-[#00ca62]">12ms</div>
          </motion.div>
        </motion.div>

        {/* --- REFINED LOGO CLOUD --- */}
        <div className="mt-24 w-full">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 text-center">
            Powering data infrastructure at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale">
            {companies.map((company, i) => (
              <span key={i} className={`${company.color} text-xl font-bold tracking-tighter`}>
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}