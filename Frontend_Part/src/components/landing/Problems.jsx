import { motion } from "framer-motion";

export default function Problems() {
  const problems = [
    {
      title: "Syntax Fatigue",
      desc: "Writing complex JOINs and subqueries is time-consuming and prone to human error.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "The Tech Gap",
      desc: "Non-technical stakeholders are blocked by SQL barriers, slowing down decisions.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Redundant Work",
      desc: "Re-creating the same analytical queries wastes hundreds of engineering hours.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    },
    {
      title: "Zero Visibility",
      desc: "Lack of tracking makes it impossible to audit or optimize your data flow.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-[#fafafa] overflow-hidden font-sans">
      {/* Structural Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 justify-center md:justify-start mb-4"
          >
            <div className="h-[2px] w-10 bg-[#00ca62]" />
            <span className="text-[#00ca62] font-bold uppercase tracking-[0.4em] text-[10px]">
              Critical Hurdles
            </span>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-[#111827] tracking-tighter"
          >
            Why SQL is still <span className="text-[#00ca62] italic font-serif">hard.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative h-[500px] overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-200 transition-all duration-500 hover:shadow-2xl hover:border-[#00ca62]/40"
            >
              {/* Image with fall-back background color */}
              <div className="absolute inset-0 z-0 bg-slate-800">
                <motion.img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110" 
                  loading="lazy"
                />
                {/* Advanced Overlay System */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
              </div>

              {/* Professional UI Accents */}
              <div className="relative z-20 h-full p-10 flex flex-col">
                {/* Simulated "Console" Header */}
                <div className="flex items-center gap-2 opacity-50 mb-auto">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="ml-2 text-[10px] font-mono text-white/60 tracking-widest uppercase">Error_Log_{i+1}</span>
                </div>

                <div className="transform transition-all duration-500 group-hover:-translate-y-4">
                  <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {p.title}
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Interactive Shimmer Accent */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00ca62] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}