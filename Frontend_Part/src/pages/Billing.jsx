import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";
import { 
  ShieldCheck, Lock, Loader2, 
  Zap, Shield, ArrowLeft, BadgeCheck,
  CreditCard, Info, LockKeyhole,
  LockIcon,
  ShieldIcon
} from "lucide-react";

export default function Billing() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const callbackUrl = `${window.location.origin}/billingsuccess`;
      const link = await apiRequest("/payment/create-payment-link", "POST", { callbackUrl });
      if (!link?.short_url) throw new Error("Invalid response");
      window.location.assign(link.short_url);
    } catch (err) {
      console.error("Payment Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-slate-900 overflow-x-hidden">
      
      {/* 🔹 MINIMAL BRAND NAVIGATION */}
      <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-6 lg:px-20 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center shadow-2xl shadow-slate-200">
            <Zap size={20} className="text-emerald-400 fill-emerald-400" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-950 uppercase">SQL Studio</span>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Return
        </button>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row w-full">
        
        {/* 🔹 LEFT COLUMN: ORDER ARCHITECTURE */}
        <div className="flex-1 p-8 md:p-16 lg:p-24 bg-white flex flex-col items-center lg:items-end animate-in fade-in slide-in-from-left-4 duration-700">
          <div className="max-w-md w-full space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-950 leading-[1.1]">
                Checkout <br /> <span className="text-emerald-500">Summary.</span>
              </h1>
              <p className="text-slate-500 font-medium text-lg leading-relaxed">
                Secure your access to the Pro intelligence tier.
              </p>
            </div>

            <div className="space-y-6">
              {/* PRIMARY PLAN CARD */}
              <div className="p-8 rounded-[40px] bg-slate-50 border border-slate-100 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform">
                    <Zap size={140} />
                </div>
                
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50">
                    <Zap className="text-emerald-500" size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Due Monthly</p>
                    <span className="text-4xl font-black text-slate-950 tracking-tighter">₹499.00</span>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <h4 className="font-black text-slate-900 text-xl tracking-tight">Intelligence Pro</h4>
                  <ul className="grid grid-cols-1 gap-4">
                    {["Unlimited Neural Queries", "Advanced SQL Optimizer", "Global Context Awareness"].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[13px] text-slate-600 font-bold">
                        <BadgeCheck size={20} className="text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ACCOUNT SNAPSHOT */}
              <div className="p-8 rounded-[32px] border border-slate-100 bg-white shadow-sm space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 flex items-center gap-2">
                   <Shield size={12} /> Verification
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">User</span>
                    <span className="font-black text-slate-900 truncate ml-8 tracking-tight">{user?.name || "Workspace Member"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Email</span>
                    <span className="font-black text-slate-900 truncate ml-8 tracking-tight">{user?.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 RIGHT COLUMN: ENCRYPTED CHECKOUT */}
        <div className="flex-1 p-8 md:p-16 lg:p-24 bg-slate-50/50 flex flex-col items-center lg:items-start lg:border-l lg:border-slate-100 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="max-w-md w-full space-y-10">
            <header className="space-y-2">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Payment Protocol</h3>
              <div className="h-1 w-12 bg-emerald-500 rounded-full" />
            </header>
            
            <div className="bg-white border border-slate-200 rounded-[44px] shadow-2xl shadow-slate-200/40 overflow-hidden">
              {/* NETWORK STRIP - REMOVED BROKEN SVGS FOR CLEANER UI */}
              <div className="px-10 py-6 border-b border-slate-50 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-slate-400" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Accepted Networks</span>
                </div>
                <div className="flex gap-2">
                   <div className="px-2 py-1 rounded bg-slate-100 text-[8px] font-black uppercase text-slate-500 tracking-tighter">Visa</div>
                   <div className="px-2 py-1 rounded bg-slate-100 text-[8px] font-black uppercase text-slate-500 tracking-tighter">Mastercard</div>
                   <div className="px-2 py-1 rounded bg-slate-100 text-[8px] font-black uppercase text-slate-500 tracking-tighter">UPI</div>
                </div>
              </div>

              <div className="p-10 md:p-12 text-center space-y-10">
                <div className="flex items-start gap-4 bg-emerald-50/50 p-5 rounded-3xl border border-emerald-100/50">
                  <Info className="text-emerald-600 shrink-0 mt-0.5" size={18} />
                  <p className="text-xs text-emerald-900 text-left font-bold leading-relaxed">
                    Activation is immediate. You will be redirected to Razorpay's PCI-compliant environment to complete the handshake.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-slate-950 hover:bg-black text-white h-16 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/30 active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <LockKeyhole size={16} className="text-emerald-400" />
                      Finalize Purchase
                    </>
                  )}
                </button>

                <div className="pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 opacity-40 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" className="h-4" alt="Razorpay" />
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    Enterprise-Grade Encryption • 256-bit SSL
                  </p>
                </div>
              </div>
            </div>

            {/* SECURITY TRUST GRID */}
            <div className="grid grid-cols-2 gap-4">
              <TrustBadge icon={<ShieldCheck size={18}/>} title="Secure Checkout" />
              <TrustBadge icon={<LockIcon size={18}/>} title="PCI Compliant" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* --- REUSABLE SUB-COMPONENTS --- */

function TrustBadge({ icon, title }) {
  return (
    <div className="flex items-center gap-3 p-5 rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="text-emerald-500">{icon}</div>
        <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-none">{title}</span>
    </div>
  );
}
