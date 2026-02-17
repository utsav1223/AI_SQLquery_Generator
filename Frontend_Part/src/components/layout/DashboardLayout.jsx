import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans antialiased">
      {/* 🔹 FIXED SIDEBAR */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 🔹 STICKY NAVBAR */}
        <Navbar />

        {/* 🔹 SCROLLABLE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto relative custom-scrollbar">
          {/* The max-width here ensures the content doesn't get awkwardly wide 
            on ultra-wide monitors, maintaining readability.
          */}
          <div className="max-w-[1600px] mx-auto w-full min-h-full">
            <div className="p-4 md:p-8 lg:p-10">
              {/* The Outlet renders the children with a subtle fade-in 
                to make the app feel "smooth" and responsive.
              */}
              <div className="animate-in fade-in slide-in-from-bottom-1 duration-500">
                <Outlet />
              </div>
            </div>
            
            {/* 🔹 OPTIONAL: MINI FOOTER */}
            <footer className="px-10 py-8 mt-auto border-t border-slate-100 flex justify-between items-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                SQL Studio Intelligence © 2026
              </p>
              <div className="flex gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <a href="/support" className="hover:text-slate-600 transition-colors">Support</a>
                <a href="/docs" className="hover:text-slate-600 transition-colors">Documentation</a>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}