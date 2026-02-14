import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { Lock, Eye, EyeOff, ChevronRight, Database, Code2 } from "lucide-react";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!passwordRegex.test(password)) {
      return setError("Requires 8+ chars, uppercase, number & symbol");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setIsLoading(true);
    try {
      await apiRequest(
        `/auth/reset-password/${token}`,
        "PUT",
        { password }
      );

      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.message) setError(err.message);
      else setError("Invalid or expired token");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans antialiased">
      <style>{`
        @keyframes blink-red {
          0%, 100% { border-color: #f87171; }
          50% { border-color: #fee2e2; }
        }
        .animate-blink { animation: blink-red 1.5s infinite; }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .error-premium { 
          animation: slide-up 0.3s ease-out;
          font-weight: 400;
        }
      `}</style>

      {/* Left Side: Branding Look */}
      <div className="relative hidden w-1/2 lg:block p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=100&w=2000" 
            className="absolute inset-0 h-full w-full object-cover opacity-80" 
            alt="Security" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950 via-green-950/20 to-transparent" />
          <div className="absolute bottom-16 left-12 text-white z-10 pr-10">
            <div className="flex items-center gap-2 mb-4 bg-green-500/20 w-fit px-3 py-1 rounded-full border border-green-400/30 backdrop-blur-md">
              <Code2 size={14} className="text-green-400" />
              <span className="text-[10px] font-mono tracking-widest uppercase">Encryption Active</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
              Secure Your <br /> Credentials.
            </h1>
            <p className="text-lg opacity-90 font-light max-w-sm">
              Update your password to regain access to your intelligent workspace.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Reset Form */}
      <div className="flex w-full flex-col lg:w-1/2 overflow-y-auto bg-white">
        <div className="mx-auto w-full max-w-lg px-10 py-12 flex flex-col justify-center min-h-full">
          
          <div className="mb-10 flex items-center gap-3">
            <div className="bg-green-700 p-2.5 rounded-xl shadow-lg">
              <Database className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-2xl tracking-tighter text-gray-900 uppercase">AI SQL</span>
              <span className="text-[10px] uppercase tracking-widest text-green-600 font-bold">Intelligent Engine</span>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Set New Password</h2>
          <p className="mt-1 text-gray-500 font-medium">Please enter a strong password for your account.</p>

          {message && (
            <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-2xl text-sm border border-green-100 font-medium error-premium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* New Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">New Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${error ? 'text-red-500' : 'text-green-700'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full rounded-2xl border-2 py-4 pl-12 pr-12 outline-none transition-all font-medium text-gray-800 ${
                    error.includes("Password") || error.includes("character")
                    ? 'border-red-400 bg-red-50/30 animate-blink' 
                    : 'border-gray-100 bg-gray-50 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-50'
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-700"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${error === "Passwords do not match" ? 'text-red-500' : 'text-green-700'}`} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full rounded-2xl border-2 py-4 pl-12 pr-4 outline-none transition-all font-medium text-gray-800 ${
                    error === "Passwords do not match"
                    ? 'border-red-400 bg-red-50/30 animate-blink' 
                    : 'border-gray-100 bg-gray-50 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-50'
                  }`}
                  required
                />
              </div>
              {error && (
                <p className="text-[12px] text-red-500 mt-2 ml-1 error-premium">
                  {error}
                </p>
              )}
            </div>

            <button
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-800 py-4.5 font-bold text-white shadow-xl shadow-green-900/20 hover:bg-green-900 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-70 text-lg"
            >
              {isLoading ? "Updating..." : "Reset Password"}
              <ChevronRight size={18} strokeWidth={3} className="ml-1" />
            </button>
          </form>

          <div className="relative flex items-center justify-center py-8">
            <div className="w-full border-t border-gray-100"></div>
            <span className="absolute bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Secure Update</span>
          </div>

          <p className="text-center text-sm text-gray-500 font-medium">
            Remembered your password?{" "}
            <button onClick={() => navigate("/login")} className="text-green-700 font-bold hover:underline underline-offset-4">
              Go to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}