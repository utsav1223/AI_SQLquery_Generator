import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import { 
  Database, 
  Save, 
  RotateCcw, 
  Clock, 
  FileCode, 
  HardDrive, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from "lucide-react";

export default function Schema() {
  const [schemaText, setSchemaText] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [size, setSize] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSchema();
  }, []);

  const fetchSchema = async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/schema", "GET");
      setSchemaText(data.schemaText || "");
      setLastUpdated(data.lastUpdated || null);
      setSize(data.size || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage({ text: "", type: "" });
      const res = await apiRequest("/schema", "POST", { schemaText });
      setLastUpdated(res.lastUpdated);
      setSize(res.size);
      setMessage({ text: "Schema context updated successfully", type: "success" });
    } catch (err) {
      setMessage({ text: "Connection error: Failed to sync schema", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Are you sure? This will remove the schema context.")) {
      setSchemaText("");
      setSize(0);
      setLastUpdated(null);
      setMessage({ text: "", type: "" });
    }
  };

  const sizeInKB = (size / 1024).toFixed(2);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
        <Loader2 className="animate-spin mb-4" size={24} />
        <p className="text-sm font-medium animate-pulse">Synchronizing schema context...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-slate-900 p-1.5 rounded">
              <Database size={16} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Database Schema</h2>
          </div>
          <p className="text-sm text-slate-500">
            Define your DDL structure to calibrate AI generation accuracy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all uppercase tracking-wider"
          >
            <RotateCcw size={14} /> Clear
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-200 text-white px-5 py-2 rounded-lg text-xs font-bold transition-all shadow-sm shadow-slate-200 uppercase tracking-widest"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? "Syncing..." : "Save & Sync"}
          </button>
        </div>
      </div>

      {/* METADATA GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <InfoCard 
          icon={<HardDrive size={16} />} 
          title="Current Payload" 
          value={`${sizeInKB} KB`} 
          subtitle="Of 20 KB limit"
        />
        <InfoCard 
          icon={<Clock size={16} />} 
          title="Last Sync" 
          value={lastUpdated ? new Date(lastUpdated).toLocaleDateString() : "Never"} 
          subtitle={lastUpdated ? new Date(lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "No data found"}
        />
        <InfoCard 
          icon={<FileCode size={16} />} 
          title="Status" 
          value={size > 0 ? "Active" : "Empty"} 
          subtitle="Schema Context"
          statusColor={size > 0 ? "text-emerald-500" : "text-slate-400"}
        />
      </div>

      {/* EDITOR SECTION */}
      <div className="relative group">
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200">
            SQL / DDL
          </span>
        </div>
        <textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          placeholder="-- Paste your DDL here (e.g. CREATE TABLE...)&#10;-- This allows the AI to understand your relationships."
          className="w-full h-[500px] bg-white border border-slate-200 rounded-2xl p-6 text-sm font-mono text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all resize-none shadow-sm"
        />
      </div>

      {/* FOOTER STATUS */}
      <div className="flex items-center justify-between">
        {message.text ? (
          <div className={`flex items-center gap-2 text-sm font-medium ${message.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        ) : (
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <AlertCircle size={14} />
            Include indexes and constraints for best performance.
          </div>
        )}
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
          Engine: V2_Schema_Processor
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value, subtitle, statusColor = "text-slate-900" }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-2 text-slate-400 mb-3">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
      </div>
      <div>
        <h3 className={`text-lg font-bold tracking-tight ${statusColor}`}>
          {value}
        </h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}