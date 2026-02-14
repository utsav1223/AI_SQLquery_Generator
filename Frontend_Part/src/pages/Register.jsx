import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";
import { User, Mail, Lock, Eye, EyeOff, ChevronRight, Database, Code2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field-specific error when user types
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[e.target.name];
        delete newErrs.server; // Also clear server error when they fix things
        return newErrs;
      });
    }
  };
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Frontend regex validations
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(form.name)) newErrors.name = "Name must be at least 3 characters and contain only letters";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format";
    if (!passwordRegex.test(form.password)) newErrors.password = "Password must be 8+ characters, include uppercase, lowercase, number and special character";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("/auth/register", "POST", form);
      navigate("/login");
    } catch (err) {
      // --- RESTORED: YOUR ORIGINAL BACKEND ERROR LOGIC ---
      if (err.errors) {
        setErrors({ server: err.errors.join(", ") });
      } else if (err.message) {
        setErrors({ server: err.message });
      } else {
        setErrors({ server: "Registration failed. Please try again." });
      }
      // --------------------------------------------------
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
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
      `}</style>

      {/* Left Side: Branding */}
      <div className="relative hidden w-1/2 lg:block p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=100&w=2000" 
            className="absolute inset-0 h-full w-full object-cover" 
            alt="Coding Workspace" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-950/90 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-16 left-12 text-white z-10 pr-10">
            <div className="flex items-center gap-2 mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              <Code2 size={16} className="text-green-400" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Enterprise Ready</span>
            </div>
            <h1 className="text-6xl font-black mb-4 leading-[1.1] tracking-tight">Scale Your <br /><span className="text-green-400">Database</span></h1>
            <p className="text-xl text-gray-200/90 font-light max-w-sm">The intelligent SQL engine for modern teams.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full flex-col lg:w-1/2 overflow-y-auto">
        <div className="mx-auto w-full max-w-md px-8 py-12 flex flex-col justify-center min-h-full">
          
          <div className="mb-10 flex items-center gap-3">
            <div className="bg-green-700 p-2.5 rounded-xl shadow-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase">AI SQL</span>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold">Intelligent Engine</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          
          {/* Backend Server Errors Display */}
          {errors.server && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-[13px] border border-red-100 error-text-premium">
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            
            {/* Name */}
            <div>
              <fieldset className={`border-2 rounded-2xl px-4 pb-2 transition-all duration-300 ${errors.name ? 'animate-field-error border-red-400' : 'border-gray-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.name ? 'text-red-500' : 'text-gray-400 focus-within:text-green-600'}`}>Full Name</legend>
                <div className="flex items-center gap-3 py-1">
                  <User size={18} className={errors.name ? 'text-red-400' : 'text-green-700'} />
                  <input 
                    name="name"
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-700" 
                    placeholder="Enter your name"
                  />
                </div>
              </fieldset>
              {errors.name && <p className="error-text-premium text-[12px] text-red-500/80 mt-1.5 ml-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <fieldset className={`border-2 rounded-2xl px-4 pb-2 transition-all duration-300 ${errors.email ? 'animate-field-error border-red-400' : 'border-gray-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.email ? 'text-red-500' : 'text-gray-400 focus-within:text-green-600'}`}>Email Address</legend>
                <div className="flex items-center gap-3 py-1">
                  <Mail size={18} className={errors.email ? 'text-red-400' : 'text-green-700'} />
                  <input 
                    name="email"
                    type="email"
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-700" 
                    placeholder="name@company.com"
                  />
                </div>
              </fieldset>
              {errors.email && <p className="error-text-premium text-[12px] text-red-500/80 mt-1.5 ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <fieldset className={`border-2 rounded-2xl px-4 pb-2 transition-all duration-300 ${errors.password ? 'animate-field-error border-red-400' : 'border-gray-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.password ? 'text-red-500' : 'text-gray-400 focus-within:text-green-600'}`}>Password</legend>
                <div className="flex items-center gap-3 py-1">
                  <Lock size={18} className={errors.password ? 'text-red-400' : 'text-green-700'} />
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[15px] font-medium text-gray-700" 
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="text-gray-400 hover:text-green-700">
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </fieldset>
              {errors.password && <p className="error-text-premium text-[12px] text-red-500/80 mt-1.5 ml-1">{errors.password}</p>}
            </div>

            <button
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-800 py-4 font-bold text-white shadow-xl hover:bg-green-900 transition-all disabled:opacity-70"
            >
              {isLoading ? "Setting up..." : "Register Now"}
              <ChevronRight size={16} strokeWidth={3} />
            </button>
          </form>

          <div className="relative flex items-center justify-center py-8">
            <div className="w-full border-t border-gray-100"></div>
            <span className="absolute bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secure Access</span>
          </div>

          <button
            onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-gray-100 bg-white py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-5 w-5" alt="Google" />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-[13px] text-gray-500 font-medium">
            Already have an account? <Link to="/login" className="text-green-700 font-semibold hover:text-green-800">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}