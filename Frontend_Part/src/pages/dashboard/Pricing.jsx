import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";
import { Check, X, Zap, ShieldCheck, Sparkles, Star } from "lucide-react";

export default function Pricing() {
    const { user, login } = useContext(AuthContext);

    const handleUpgrade = async () => {
        try {
            const order = await apiRequest("/payment/create-order", "POST");
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY,
                amount: order.amount,
                currency: order.currency,
                name: "SQL Studio Pro",
                description: "Full access to Intelligence Cloud",
                order_id: order.id,
                handler: async function (response) {
                    await apiRequest("/payment/verify", "POST", response);
                    const updatedUser = await apiRequest("/auth/me", "GET");
                    login({
                        token: localStorage.getItem("token"),
                        user: updatedUser
                    });
                },
                theme: { color: "#059669" }
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment initialization failed");
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
            {/* 🔹 SECTION HEADER */}
            <div className="text-center mb-16">
                <h2 className="text-[11px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">Subscription</h2>
                <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
                    Professional Intelligence Plans
                </h3>
                <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium">
                    Upgrade to unlock advanced SQL optimization, priority processing, and historical intelligence tracking.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* 🔹 FREE PLAN */}
                <div className="group relative bg-white border border-slate-200 p-8 rounded-[32px] flex flex-col transition-all hover:shadow-xl hover:shadow-slate-100">
                    <div className="mb-8">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Foundation</h4>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold text-slate-900 tracking-tighter">₹0</span>
                            <span className="text-slate-400 font-medium">/forever</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-500 leading-relaxed font-medium italic">
                            Perfect for students and developers exploring AI-assisted query writing.
                        </p>
                    </div>

                    <ul className="space-y-4 mb-10 flex-1">
                        <FeatureItem label="20 AI Queries per day" included />
                        <FeatureItem label="Standard Text-to-SQL" included />
                        <FeatureItem label="Basic History (7 days)" included />
                        <FeatureItem label="SQL Optimization Engine" included={false} />
                        <FeatureItem label="Constraint Validator" included={false} />
                        <FeatureItem label="Advanced Data Analytics" included={false} />
                    </ul>

                    <button
                        disabled
                        className="w-full py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest bg-slate-50 text-slate-400 border border-slate-100 cursor-not-allowed"
                    >
                        {user?.plan === "free" ? "Active Plan" : "Downgrade unavailable"}
                    </button>
                </div>

                {/* 🔹 PRO PLAN */}
                <div className="relative bg-slate-950 p-8 rounded-[32px] flex flex-col shadow-2xl shadow-emerald-500/10 border border-slate-800">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Recommended for Teams
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">Pro Studio</h4>
                            <Sparkles size={20} className="text-emerald-400" />
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold text-white tracking-tighter">₹499</span>
                            <span className="text-slate-400 font-medium">/month</span>
                        </div>
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed font-medium">
                            Full access to our most powerful LLM models and production optimization tools.
                        </p>
                    </div>

                    <ul className="space-y-4 mb-10 flex-1">
                        <FeatureItem label="Unlimited Monthly Queries" included isPro />
                        <FeatureItem label="Deep SQL Optimizer" included isPro />
                        <FeatureItem label="Enterprise SQL Validator" included isPro />
                        <FeatureItem label="Explain Mode (Natural Language)" included isPro />
                        <FeatureItem label="Historical Analytics Dashboard" included isPro />
                        <FeatureItem label="Priority GPU Processing" included isPro />
                    </ul>

                    {user?.plan === "pro" ? (
                        <button
                            disabled
                            className="w-full py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest bg-slate-800 text-emerald-400 border border-slate-700"
                        >
                            Currently Active
                        </button>
                    ) : (
                        <button
                            onClick={handleUpgrade}
                            className="group relative w-full py-4 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-white transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Upgrade to Pro <Star size={14} fill="white" />
                            </span>
                        </button>
                    )}
                </div>
            </div>
            
            <p className="mt-12 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Secure payments handled via Razorpay • Cancel anytime
            </p>
        </div>
    );
}

function FeatureItem({ label, included, isPro }) {
    return (
        <li className={`flex items-center gap-3 text-sm ${included ? (isPro ? 'text-slate-300' : 'text-slate-600') : 'text-slate-300 opacity-40 line-through'}`}>
            {included ? (
                <Check size={16} className={isPro ? 'text-emerald-400' : 'text-emerald-600'} />
            ) : (
                <X size={16} className="text-slate-400" />
            )}
            <span className="font-medium tracking-tight">{label}</span>
        </li>
    );
}