import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Features", "Solutions", "Pricing", "Docs"];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-in-out ${
        scrolled 
        ? "border-b border-slate-200 bg-white/90 backdrop-blur-md py-3 shadow-sm" 
        : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 md:px-12">
        
        {/* LOGO - Responsive sizing */}
        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0">
          <div className="relative h-8 w-8 md:h-9 md:w-9 bg-white border border-slate-200 rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-[#00ca62]/50 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-t from-[#00ca62]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[#111827] font-black text-[9px] md:text-[10px] tracking-tighter italic z-10">SQL</span>
            <div className="absolute top-1 md:top-1.5 right-1 md:right-1.5 h-1 w-1 rounded-full bg-[#00ca62] shadow-[0_0_5px_#00ca62]" />
          </div>
          <span className="text-sm md:text-base font-bold tracking-tighter text-[#111827]">
            AISQL <span className="hidden xs:inline text-slate-400 font-medium tracking-normal ml-1 text-[10px] md:text-xs">v3.0</span>
          </span>
        </div>

        {/* CENTER LINKS - Hidden on tablet/mobile for cleaner spacing */}
        <div className="hidden xl:flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-[10px] font-bold text-slate-500 hover:text-[#00ca62] transition-colors duration-300 uppercase tracking-[0.2em] group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#00ca62] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3 md:gap-6">
          <a 
            href="/login" 
            className="hidden lg:block text-[10px] font-bold text-slate-600 hover:text-[#111827] transition-all uppercase tracking-[0.15em]"
          >
            Login
          </a>
          
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="/register"
            className="px-5 py-2.5 md:px-7 md:py-3 bg-[#111827] text-white text-[10px] md:text-[11px] font-bold rounded-full transition-all uppercase tracking-[0.15em] hover:bg-[#00ca62] shadow-lg shadow-black/5 whitespace-nowrap"
          >
            Get Started
          </motion.a>

          {/* MOBILE TOGGLE - Enhanced hitbox */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 -mr-2 text-slate-900 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span className={`h-[2px] bg-current transition-all duration-300 origin-right ${isOpen ? 'w-6 -rotate-45 -translate-y-[1px]' : 'w-6'}`} />
              <span className={`h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : 'w-4'}`} />
              <span className={`h-[2px] bg-current transition-all duration-300 origin-right ${isOpen ? 'w-6 rotate-45 translate-y-[1px]' : 'w-5'}`} />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Premium Fullscreen-ish overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden z-50"
          >
            <div className="flex flex-col p-8 sm:p-12 gap-6 sm:gap-8 bg-white h-full">
              <div className="flex flex-col gap-4">
                 <p className="text-[10px] font-bold text-[#00ca62] uppercase tracking-[0.3em]">Menu</p>
                {navLinks.map((item, i) => (
                  <motion.a 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={item} 
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl sm:text-5xl font-extrabold text-slate-900 hover:text-[#00ca62] transition-colors tracking-tighter"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
              
              <div className="mt-auto pb-20 flex flex-col gap-6">
                <hr className="border-slate-100" />
                <div className="flex flex-col gap-4">
                  <a href="/login" className="text-left font-bold text-slate-500 uppercase tracking-widest text-[10px]">Already have an account? <span className="text-[#111827]">Login</span></a>
                  <a href="/register" className="w-full py-5 bg-[#00ca62] text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#00ca62]/20">
                    Create Account Free
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}