import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { apiRequest } from "../services/api";
import { Lock, KeyRound, ChevronRight, Database, ArrowLeft, RefreshCw } from "lucide-react";

export default function ResetWithOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialEmail = location.state?.email || "";

    const [form, setForm] = useState({
        email: initialEmail,
        otp: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else {
            setCanResend(true);
            if (interval) clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = async () => {
        if (!canResend) return;
        setError("");
        setMessage("");
        try {
            await apiRequest("/auth/forgot-password", "POST", { email: form.email });
            setCanResend(false);
            setTimer(30);
            setMessage("Code resent successfully.");
        } catch (err) {
            setError(err.message || "Failed to resend OTP.");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setMessage("");
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!/^[0-9]{6}$/.test(form.otp)) return setError("OTP must be 6 digits");
        if (!passwordRegex.test(form.password)) return setError("Use 8+ chars (Upper, Lower, Symbol)");
        if (form.password !== form.confirmPassword) return setError("Passwords do not match");

        setIsLoading(true);
        try {
            await apiRequest("/auth/verify-otp", "POST", {
                email: form.email,
                otp: form.otp,
                password: form.password
            });
            setMessage("Success! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(err.message || "Invalid or expired OTP.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-white font-sans antialiased overflow-hidden">
            <style>{`
                @keyframes blink-red { 0%, 100% { border-color: #f87171; } 50% { border-color: #fee2e2; } }
                .animate-blink { animation: blink-red 1.5s infinite; }
                @keyframes slide-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .error-premium { animation: slide-up 0.3s ease-out; font-weight: 400; }
            `}</style>

            {/* Left Side: Branding */}
            <div className="relative hidden w-1/2 lg:block p-5">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900">
                    <img
                        src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=100&w=2000"
                        className="absolute inset-0 h-full w-full object-cover opacity-60"
                        alt="Security"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-green-950/90 via-slate-900/40 to-slate-900/20" />
                    <div className="absolute bottom-12 left-10 text-white z-10 pr-10">
                        <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight tracking-tight text-white">
                            Verify Your <br />
                            <span className="text-green-400">Account.</span>
                        </h1>
                        <p className="text-base xl:text-lg text-slate-300 font-light max-w-sm">
                            Please verify the secure code to update your workspace.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Compact Responsive Form */}
            <div className="flex w-full flex-col lg:w-1/2 bg-white px-8 justify-center items-center h-full">
                <div className="w-full max-w-[420px] xl:max-w-md">
                    
                    {/* Logo - Compact */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="bg-green-700 p-2 rounded-lg shadow-lg">
                            <Database className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter text-slate-900 uppercase">AI SQL</span>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl xl:text-3xl font-extrabold text-slate-900 tracking-tight">Enter OTP</h2>
                        <p className="text-sm text-slate-500 font-normal mt-1">Verification code sent to your inbox.</p>
                    </div>

                    {(error || message) && (
                        <div className={`mb-5 p-3 rounded-xl text-[12px] border font-medium error-premium flex items-center gap-2 ${error ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                            <div className={`h-1 w-1 rounded-full ${error ? 'bg-red-500' : 'bg-green-600'} animate-pulse`} />
                            {error || message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* OTP Input */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verification Code</label>
                                <button
                                    type="button"
                                    disabled={!canResend}
                                    onClick={handleResend}
                                    className={`text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${canResend ? 'text-green-700 hover:text-green-800' : 'text-gray-300'}`}
                                >
                                    <RefreshCw size={10} className={!canResend ? 'animate-spin' : ''} />
                                    {canResend ? 'Resend' : `${timer}s`}
                                </button>
                            </div>
                            <div className="relative">
                                <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 ${error.includes("OTP") ? 'text-red-500' : 'text-green-700'}`} />
                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="000000"
                                    maxLength={6}
                                    value={form.otp}
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border-2 py-3 pl-11 pr-4 outline-none transition-all font-bold text-gray-800 text-base tracking-[0.5em] placeholder:tracking-normal ${error.includes("OTP") ? 'border-red-400 bg-red-50/30 animate-blink' : 'border-slate-100 bg-slate-50/50 focus:border-green-600 focus:bg-white'}`}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700" />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className="w-full rounded-xl border-2 border-slate-100 bg-slate-50/50 py-3 pl-11 outline-none focus:border-green-600 focus:bg-white transition-all font-medium text-slate-900 text-sm"
                                />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-green-700" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className={`w-full rounded-xl border-2 py-3 pl-11 outline-none focus:border-green-600 focus:bg-white transition-all font-medium text-slate-900 text-sm ${error === "Passwords do not match" ? 'border-red-400 bg-red-50/30 animate-blink' : 'border-slate-100'}`}
                                />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 font-bold text-white shadow-lg hover:bg-green-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 mt-2 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2 text-base">
                                {isLoading ? "Processing..." : "Update Password"}
                                {!isLoading && <ChevronRight size={18} strokeWidth={3} />}
                            </span>
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-green-700 transition-colors group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Return to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}