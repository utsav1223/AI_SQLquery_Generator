import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";
import { User, Mail, Lock, Eye, EyeOff, ChevronRight, Database, Code2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
export default function Register() {
  const navigate = useNavigate();

  // in this state we storing the user entered form details...
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  // this state we created for storing the errors...
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // here we are setting the validations part error in errors...
    if (errors[e.target.name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[e.target.name];
        delete newErrs.server;
        return newErrs;
      });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // this function works after we submit the form...
  const handleSubmit = async (e) => {
    e.preventDefault();
    // we just created the empty object here and storing all the errors that we encountered from the frontend validations
    const newErrors = {};

    // setting regular expressions for manually validations in frontend part
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // here we are basically testing whether all the things in correct format or not
    if (!nameRegex.test(form.name)) newErrors.name = "Name must be at least 3 characters";
    if (!emailRegex.test(form.email)) newErrors.email = "Invalid email format";
    if (!passwordRegex.test(form.password)) newErrors.password = "Requires 8+ chars (Upper, Lower, Symbol)";

    // Here iterating through keys in object anc checking the length is greater than > 0
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
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .error-text-premium { 
          animation: slide-down 0.3s ease-out;
          font-weight: 400;
        }
      `}</style>

      {/* Left Side: Branding Hero */}
      <div className="relative hidden w-1/2 lg:block p-5">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-2xl bg-slate-900 ring-1 ring-white/10">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=100&w=2000"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            alt="Coding Workspace"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-green-950/90 via-slate-900/50 to-slate-900/20" />
          <div className="absolute bottom-16 left-10 text-white z-10 pr-10">
            <div className="flex items-center gap-2 mb-4 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
              <Code2 size={14} className="text-green-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/90">Enterprise Ready</span>
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold mb-4 leading-[1.1] tracking-tight text-white">
              Scale Your <br /> <span className="text-green-400">Database</span>
            </h1>
            <p className="text-base xl:text-lg text-gray-200/90 font-light max-w-sm">
              The intelligent SQL engine designed for modern development teams.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Compact Responsive Form */}
      <div className="flex w-full flex-col lg:w-1/2 bg-white px-8 justify-center items-center h-full">
        <div className="w-full max-w-[420px] xl:max-w-md">

          {/* Logo Section */}
          <div className="mb-8 flex items-center gap-3 group">
            <div className="bg-green-700 p-2.5 rounded-xl shadow-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase leading-none">AI SQL</span>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold mt-1">Intelligent Engine</span>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <h2 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight">Create Account</h2>
            <p className="text-slate-500 font-normal">Join the next generation of database management.</p>
          </div>

          {/* Backend Server Errors Display */}
          {errors.server && (
            <div className="mb-6 p-3.5 bg-red-50 text-red-600 rounded-xl text-[12px] border border-red-100 error-text-premium flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-red-500 animate-pulse" />
              {errors.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 xl:space-y-5">
            {/* Full Name */}
            <div>
              <fieldset className={`border-2 rounded-xl px-4 pb-2 transition-all duration-300 ${errors.name ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.name ? 'text-red-500' : 'text-slate-400 focus-within:text-green-600'}`}>Full Name</legend>
                <div className="flex items-center gap-3 py-1">
                  <User size={18} className={errors.name ? 'text-red-400' : 'text-green-700'} strokeWidth={2.5} />
                  <input
                    name="name"
                    onChange={handleChange}
                    className="w-full bg-transparent outline-none text-[15px] font-medium text-slate-700 placeholder:text-slate-300"
                    placeholder="Enter your name"
                  />
                </div>
              </fieldset>
              {errors.name && <p className="error-text-premium text-[11px] text-red-500/80 mt-1 ml-1 font-normal">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div>
              <fieldset className={`border-2 rounded-xl px-4 pb-2 transition-all duration-300 ${errors.email ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
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
              {errors.email && <p className="error-text-premium text-[11px] text-red-500/80 mt-1 ml-1 font-normal">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <fieldset className={`border-2 rounded-xl px-4 pb-2 transition-all duration-300 ${errors.password ? 'animate-field-error border-red-400' : 'border-slate-100 focus-within:border-green-600'}`}>
                <legend className={`px-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${errors.password ? 'text-red-500' : 'text-slate-400 focus-within:text-green-600'}`}>Password</legend>
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
              {errors.password && <p className="error-text-premium text-[11px] text-red-500/80 mt-1 ml-1 font-normal">{errors.password}</p>}
            </div>

            <button
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3 xl:py-4 font-bold text-white shadow-lg hover:bg-green-800 active:scale-[0.98] transition-all duration-300 disabled:opacity-70 mt-2 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-base">
                {isLoading ? "Setting up..." : "Register Now"}
                {!isLoading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </span>
            </button>
          </form>

          <div className="relative flex items-center justify-center py-8">
            <div className="w-full border-t border-slate-100"></div>
            <span className="absolute bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Secure Access</span>
          </div>

          {/* <button
            onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-100 bg-white py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm group"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" className="h-4 w-4 group-hover:scale-110 transition-transform" alt="Google" />
            Sign up with Google
          </button> */}


          <button
            onClick={() =>
              (window.location.href = "http://localhost:5000/api/auth/google")
            }
            className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-100 bg-white py-2.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50"
          >
            <FcGoogle className="h-6 w-6 transition-transform group-hover:scale-110" />
            Sign up with Google
          </button>

          <p className="mt-8 text-center text-xs text-slate-500 font-medium">
            Already have an account? <Link to="/login" className="text-green-700 font-semibold hover:text-green-800 transition-colors underline-offset-2 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}