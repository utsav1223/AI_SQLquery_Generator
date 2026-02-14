import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Platform",
      links: ["Features", "Security", "Pricing", "Query Vault"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Newsroom", "Contact"],
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Status", "Changelog"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "DPA"],
    },
  ];

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-slate-100 font-sans">
      {/* Structural Background Ornament */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ca62]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-4 flex flex-col space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-6 group cursor-pointer">
                <div className="h-9 w-9 bg-[#111827] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl shadow-black/5">
                   <div className="h-1.5 w-1.5 bg-[#00ca62] rounded-full animate-pulse" />
                </div>
                <span className="text-xl font-black tracking-[-0.05em] text-[#111827]">AISQL</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
                The intelligent interface for production databases. Accelerating data workflows for 5,000+ teams worldwide.
              </p>
            </div>

            <div className="max-w-sm">
              <h5 className="text-[#111827] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Stay synced with the protocol</h5>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-[#00ca62]/5 focus:border-[#00ca62]/30 transition-all placeholder:text-slate-400"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#111827] text-white px-4 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#00ca62] transition-colors shadow-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links Grid - Optimized for 4 columns on desktop */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10 md:gap-4">
            {sections.map((section) => (
              <div key={section.title} className="flex flex-col space-y-6">
                <h4 className="text-[#111827] font-bold text-[10px] uppercase tracking-[0.2em]">
                  {section.title}
                </h4>
                <ul className="flex flex-col space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-slate-500 hover:text-[#00ca62] transition-all text-[13px] font-medium inline-block relative group"
                      >
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00ca62] transition-all group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Utility Bar - Clean and Responsive */}
        <div className="pt-8 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              © {currentYear} AISQL Technologies Inc.
            </span>
            <div className="hidden sm:block h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100">
              <div className="h-1.5 w-1.5 rounded-full bg-[#00ca62] animate-pulse" />
              <span className="text-[#00ca62] text-[9px] font-black uppercase tracking-widest whitespace-nowrap">v3.0 Engine: Operational</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex gap-8">
               {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                 <a 
                    key={social} 
                    href="#" 
                    className="text-slate-400 hover:text-[#111827] transition-colors text-[10px] font-bold uppercase tracking-[0.1em]"
                 >
                   {social}
                 </a>
               ))}
            </div>
            <div className="text-slate-300 text-[9px] font-bold uppercase tracking-[0.3em] hidden sm:block">
              Region: <span className="text-slate-900">US-East-1</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}