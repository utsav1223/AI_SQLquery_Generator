import { useState } from "react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "For individual engineers and side projects.",
      features: ["50 AI queries / mo", "Standard SQL generation", "7-day query history", "Community support"],
      button: "Get Started",
      featured: false,
    },
    {
      name: "Professional",
      price: isAnnual ? "39" : "49",
      desc: "For data teams moving at interface speed.",
      features: ["Unlimited AI queries", "Advanced Optimizer", "Infinite Query Vault", "Priority Support", "Custom schema indexing"],
      button: "Start Free Trial",
      featured: true,
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 px-4 sm:px-6 bg-[#fafafa] text-[#111827] relative overflow-hidden">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#e2e8f0 1.5px, transparent 1.5px)`, backgroundSize: '24px 24px' }} />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="mb-12 md:mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
          >
            <div className="h-2 w-2 rounded-full bg-[#00ca62] animate-pulse" />
            <span className="text-slate-600 font-bold uppercase tracking-[0.2em] text-[8px] md:text-[9px]">Flexible Licensing</span>
          </motion.div>
          
          <h3 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
            Pricing for <br className="hidden md:block" />
            <span className="text-[#00ca62] italic font-medium">modern teams.</span>
          </h3>

          {/* Billing Switch - Responsive Toggles */}
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12">
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${!isAnnual ? "text-slate-900" : "text-slate-400"}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 md:w-14 md:h-7 bg-slate-200 rounded-full relative p-1 transition-colors hover:bg-slate-300"
            >
              <motion.div 
                animate={{ x: isAnnual ? (typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 28) : 0 }}
                className="w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md"
              />
            </button>
            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${isAnnual ? "text-slate-900" : "text-slate-400"}`}>
              Annual <span className="text-[#00ca62] ml-1 text-[8px] md:text-[9px] bg-[#00ca62]/10 px-2 py-0.5 rounded-full">-20%</span>
            </span>
          </div>
        </div>

        {/* Responsive Grid: Stacks on mobile, Side-by-side on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative p-6 sm:p-8 md:p-12 rounded-[2rem] flex flex-col justify-between border transition-all duration-500 group ${
                plan.featured 
                ? "bg-white border-[#00ca62] shadow-[0_30px_60px_-15px_rgba(0,202,98,0.12)] ring-4 ring-[#00ca62]/5" 
                : "bg-white/60 backdrop-blur-sm border-slate-200"
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-8 md:mb-10">
                  <div>
                    <h4 className={`text-[10px] md:text-sm font-black uppercase tracking-[0.2em] md:tracking-[0.3em] mb-2 ${plan.featured ? "text-[#00ca62]" : "text-slate-400"}`}>
                      {plan.name}
                    </h4>
                    <p className="text-slate-500 text-[11px] md:text-xs font-medium max-w-[150px] md:max-w-[180px]">{plan.desc}</p>
                  </div>
                  {plan.featured && (
                    <div className="bg-[#00ca62] text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2 md:px-3 py-1 rounded-md shadow-sm">
                      Recommended
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-2 mb-8 md:mb-10">
                  <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-[#111827]">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">/ mo</span>
                </div>

                <div className="h-px w-full bg-slate-100 mb-8 md:mb-10" />

                <ul className="space-y-4 mb-10 md:mb-12">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 md:gap-4 text-[13px] md:text-sm font-bold text-slate-700">
                      <svg className={`w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5 ${plan.featured ? "text-[#00ca62]" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button 
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 md:py-5 rounded-xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                  plan.featured 
                  ? "bg-[#00ca62] text-white shadow-lg shadow-[#00ca62]/20" 
                  : "bg-slate-900 text-white"
                }`}
              >
                {plan.button}
                <span className="opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Callout - Fully Responsive */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 md:mt-20 text-center p-6 md:p-8 rounded-2xl md:rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto"
        >
          <p className="text-slate-500 font-bold text-[12px] md:text-sm leading-relaxed">
            Need a custom solution for 50+ engineers? <br className="sm:hidden" />
            <button className="text-[#00ca62] sm:ml-2 hover:underline">Contact Sales for Enterprise →</button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}