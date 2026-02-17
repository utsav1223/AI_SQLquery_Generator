import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiRequest } from "../../services/api";
import { 
  User, 
  Lock, 
  CreditCard, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  ShieldCheck
} from "lucide-react";

export default function Settings() {
  const { user, login, logout } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const updatedUser = await apiRequest("/auth/update-profile", "PUT", { name });

      login({
        token: localStorage.getItem("token"),
        user: updatedUser
      });

      setMessage({ text: "Profile information updated", type: "success" });
    } catch (err) {
      setMessage({ text: "Failed to update profile", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) return;
    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      await apiRequest("/auth/change-password", "PUT", {
        currentPassword,
        newPassword
      });

      setCurrentPassword("");
      setNewPassword("");
      setMessage({ text: "Security credentials updated", type: "success" });
    } catch (err) {
      setMessage({ text: "Failed to update password. Check your current credentials.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("This action is permanent and will delete all your SQL history. Proceed?");
    if (!confirm) return;

    try {
      await apiRequest("/auth/delete-account", "DELETE");
      logout();
      window.location.href = "/";
    } catch (err) {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20 animate-in fade-in duration-500">
      
      {/* 🔹 PAGE HEADER */}
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Manage your identity, security, and subscription preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* LEFT COL: SECTION LABELS */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Profile</h3>
          <p className="text-xs text-slate-400 leading-relaxed">This information will be displayed on your personal dashboard.</p>
        </div>

        {/* RIGHT COL: INPUT CARDS */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl text-sm text-slate-500 cursor-not-allowed italic"
                  />
                  <ShieldCheck size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={handleProfileUpdate}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
              >
                {loading && <Loader2 size={14} className="animate-spin" />} Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 PASSWORD SECTION */}
        <div className="space-y-1 pt-6 md:pt-0">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-900">Security</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Update your password to keep your account protected.</p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-slate-400"
            />
            <input
              type="password"
              placeholder="New Secure Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none focus:border-slate-400"
            />
            <button
              onClick={handlePasswordChange}
              disabled={loading || !newPassword}
              className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* 🔹 SUBSCRIPTION SECTION */}
        <div className="space-y-1 pt-6 md:pt-0">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Billing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Current plan and billing details.</p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                <CreditCard size={20} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Current Tier</p>
                <p className="font-bold text-slate-900">{user?.plan === "pro" ? "Pro Intelligence" : "Free Plan"}</p>
              </div>
            </div>
            {user?.plan === "free" && (
              <a href="/dashboard/pricing" className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all">
                Upgrade
              </a>
            )}
          </div>
        </div>

        {/* 🔹 DANGER ZONE */}
        <div className="space-y-1 pt-6 md:pt-0">
          <h3 className="text-sm font-bold text-rose-600 uppercase tracking-wider">Danger Zone</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Actions here are permanent.</p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-rose-50/50 rounded-2xl border border-rose-100 p-6 flex items-center justify-between">
            <div className="max-w-[70%]">
              <p className="text-sm font-bold text-rose-900">Delete Account</p>
              <p className="text-xs text-rose-700/60 mt-0.5 font-medium">This will wipe your queries, schema history, and analytics data.</p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 FLOATING FEEDBACK MESSAGE */}
      {message.text && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          {message.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-400" /> : <AlertCircle size={18} className="text-rose-400" />}
          <span className="text-xs font-bold tracking-wide">{message.text}</span>
        </div>
      )}
    </div>
  );
}