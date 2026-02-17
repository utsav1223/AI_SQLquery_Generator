import { useState } from "react";
import { apiRequest } from "../services/api";
import { Mail, ChevronRight, Database, Code2, ArrowLeft } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email || errors.server) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (!emailRegex.test(email)) {
      return setErrors({ email: "Please enter a valid business email" });
    }

    setIsLoading(true);

    try {
      await apiRequest(
        "/auth/forgot-password",
        "POST",
        { email }
      );

      // 🔐 OTP flow — preserved logic
      setMessage("OTP sent to your email. Redirecting...");

      // Pass email to next page using state
      setTimeout(() => {
        navigate("/reset-with-otp", {
          state: { email }
        });
      }, 1500);

    } catch (err) {
      if (err.message) {
        setErrors({ server: err.message });
      } else {
        setErrors({ server: "Something went wrong. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans antialiased overflow-hidden">
      <style>{`
        @keyframes soft-pulse {
          0%, 100% { border-color: #f87171; }
          50% { border-color: #fee2e2; }
        }
        .animate-field-error { animation: soft-pulse 2s infinite; }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .text-premium { 
          animation: slide-down 0.3s ease-out;
          font-weight: 400;
        }
      `}</style>

      {/* Left Side: Branding Hero */}
      <div className="relative hidden w-1/2 lg:block p-5">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900 ring-1 ring-white/10">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center opacity-70"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-950/90 via-slate-900/50 to-slate-900/20" />
          <div className="absolute bottom-16 left-10 text-white z-10 pr-10">
            <div className="flex items-center gap-2 mb-4 bg-green-500/20 w-fit px-4 py-1.5 rounded-full border border-green-400/30 backdrop-blur-md text-green-300">
              <Code2 size={14} />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Security Engine</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold mb-4 leading-[1.1] tracking-tight text-white">
              Protect Your <br />
              <span className="text-green-400">Workspace.</span>
            </h1>
            <p className="text-base xl:text-lg text-slate-300 font-light max-w-sm">
              Recover your access with our encrypted identity verification system.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Responsive Form */}
      <div className="flex w-full flex-col lg:w-1/2 bg-white px-8 justify-center items-center h-full">
        <div className="w-full max-w-[420px] xl:max-w-md">
          
          {/* Logo Section */}
          <div className="mb-8 flex items-center gap-3 group">
            <div className="bg-green-700 p-2.5 rounded-xl shadow-lg shadow-green-100 transition-transform group-hover:scale-110">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase leading-none">AI SQL</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-green-600 font-bold mt-1">Intelligent Workspace</span>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">Reset Password</h2>
            <p className="text-slate-500 font-normal">Enter your email and we'll verify your credentials.</p>
          </div>

          {/* Error/Success Notifications */}
          {errors.server && (
            <div className="mb-6 p-3.5 bg-red-50 text-red-600 rounded-xl text-[12px] border border-red-100 text-premium flex items-center gap-2 font-medium">
              <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
              {errors.server}
            </div>
          )}

          {message && (
            <div className="mb-6 p-3.5 bg-green-50 text-green-700 rounded-xl text-[12px] border border-green-100 text-premium flex items-center gap-2 font-medium">
              <div className="h-1 w-1 rounded-full bg-green-600 animate-pulse" />
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 xl:space-y-8">
            {/* Email Input with Legend */}
            <div>
              <fieldset className={`border-2 rounded-xl px-4 pb-2 transition-all duration-300 ${errors.email ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.email ? 'text-red-500' : 'text-slate-400 focus-within:text-green-600'}`}>Recovery Email</legend>
                <div className="flex items-center gap-4 py-1">
                  <Mail size={18} className={errors.email ? 'text-red-400' : 'text-green-700'} strokeWidth={2.5} />
                  <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full bg-transparent outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </fieldset>
              {errors.email && <p className="text-premium text-[11px] text-red-500/80 mt-1.5 ml-1 font-normal">{errors.email}</p>}
            </div>

            <button
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-green-700 py-3 xl:py-4 font-bold text-white shadow-lg hover:bg-green-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 mt-4 overflow-hidden"
              style={{ padding: '1rem' }}
            >
              <span className="relative z-10 flex items-center gap-2 text-base">
                {isLoading ? "Verifying..." : "Send Reset Link"}
                {!isLoading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />}
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <Link to="/login" className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-green-700 transition-colors group uppercase tracking-tight">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}