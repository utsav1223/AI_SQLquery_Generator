











































import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { apiRequest } from "../services/api";
import { Mail, Lock, Eye, EyeOff, ChevronRight, Database, Code2 } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({}); // Changed to object for field-specific and server errors
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field-specific error when user types
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[e.target.name];
        delete newErrs.server;
        return newErrs;
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const newErrors = {};

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await apiRequest("/auth/login", "POST", form);
      login(data);
      navigate("/dashboard");
    } catch (err) {
      // --- RESTORED: YOUR ORIGINAL BACKEND ERROR LOGIC ---
      if (err.errors) {
        setErrors({ server: err.errors.join(", ") });
      } else if (err.message) {
        setErrors({ server: err.message });
      } else {
        setErrors({ server: "Login failed. Please try again." });
      }
      // --------------------------------------------------
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans antialiased">
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
        .error-text-premium { 
          animation: slide-down 0.3s ease-out;
          font-weight: 400;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Left Side: Professional Collaborative Hero */}
      <div className="relative hidden w-1/2 lg:block p-6">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900 ring-1 ring-white/10">
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-950/95 via-slate-900/60 to-slate-900/30" />
          <div className="absolute bottom-20 left-12 text-white z-10 pr-10">
            <div className="flex items-center gap-2 mb-6 bg-green-500/20 w-fit px-4 py-1.5 rounded-full border border-green-400/30 backdrop-blur-md text-green-300">
              <Code2 size={14} />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Collaborative Platform</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-white">
              Build Better <br />
              <span className="text-green-400">Together.</span>
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-md leading-relaxed">
              Join your team in the most advanced AI-powered SQL environment for high-performing developers.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full flex-col lg:w-1/2 bg-white overflow-hidden">
        <div className="flex flex-col flex-1 items-center justify-center overflow-y-auto px-6 py-12 lg:px-12 scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          
          <div className="w-full max-w-md">
            {/* Logo Section */}
            <div className="mb-12 flex items-center gap-4 group">
              <div className="bg-green-700 p-3 rounded-2xl shadow-xl shadow-green-100 transition-transform group-hover:scale-110">
                <Database className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase leading-none">AI SQL</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-green-600 font-bold mt-1">Intelligent Workspace</span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Login</h2>
              <p className="text-slate-500 font-normal">Welcome back! Sign in to your team dashboard.</p>
            </div>

            {/* Backend Server Error Display */}
            {errors.server && (
              <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-[13px] border border-red-100 error-text-premium flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                {errors.server}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              {/* Email Input with Legend */}
              <div>
                <fieldset className={`border-2 rounded-2xl px-4 pb-2 transition-all duration-300 ${errors.email ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
                  <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.email ? 'text-red-500' : 'text-slate-400 focus-within:text-green-600'}`}>Email Address</legend>
                  <div className="flex items-center gap-3 py-1">
                    <Mail size={18} className={errors.email ? 'text-red-400' : 'text-green-700'} strokeWidth={2.5} />
                    <input
                      name="email"
                      type="email"
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-300"
                      placeholder="name@company.com"
                    />
                  </div>
                </fieldset>
                {errors.email && <p className="error-text-premium text-[12px] text-red-500/80 mt-1.5 ml-1 font-normal">{errors.email}</p>}
              </div>

              {/* Password Input with Legend */}
              <div>
                <fieldset className={`border-2 rounded-2xl px-4 pb-2 transition-all duration-300 ${errors.password ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
                  <div className="flex justify-between items-center -mt-2">
                    <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.password ? 'text-red-500' : 'text-slate-400 focus-within:text-green-600'}`}>Password</legend>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <Lock size={18} className={errors.password ? 'text-red-400' : 'text-green-700'} strokeWidth={2.5} />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      className="w-full bg-transparent outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-300"
                      placeholder="••••••••"
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="text-slate-400 hover:text-green-700 transition-colors">
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>
                </fieldset>
                <div className="flex justify-between items-start mt-1.5 ml-1">
                   {errors.password ? <p className="error-text-premium text-[12px] text-red-500/80 font-normal">{errors.password}</p> : <span></span>}
                   <Link to="/forgot-password" className="text-[11px] font-bold text-green-700 hover:text-green-800 transition-colors uppercase tracking-tighter">Forgot Password?</Link>
                </div>
              </div>

              <button
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-4 font-bold text-white shadow-xl shadow-green-900/20 hover:bg-green-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 mt-4 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? "Authenticating..." : "Sign In"}
                  {!isLoading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>
            </form>

            <div className="relative flex items-center justify-center py-10">
              <div className="w-full border-t border-slate-100"></div>
              <span className="absolute bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Enterprise Login</span>
            </div>

            <button
              onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
              className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-100 bg-white py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5 group-hover:scale-110 transition-transform" alt="Google" />
              Sign in with Google
            </button>

            <p className="mt-10 text-center text-sm text-slate-500 font-medium">
              New to the workspace?{" "}
              <Link to="/register" className="text-green-700 font-semibold hover:text-green-800 transition-colors">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





















































