import { useState, useRef } from "react";
import api from "../services/api";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Database,
  Table as TableIcon,
  Cloud,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFile = (selected) => {
    if (
      selected &&
      (selected.name.endsWith(".csv") || selected.name.endsWith(".xlsx"))
    ) {
      setFile(selected);
      setStatus(null);

      // Parse CSV preview locally
      if (selected.name.endsWith(".csv")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          const lines = text.split("\n").slice(0, 6);
          const rows = lines.map((line) => line.split(","));
          setPreviewData(rows);
        };
        reader.readAsText(selected);
      }
    } else {
      setStatus("error");
      setMessage("Invalid format. Please use CSV or XLSX.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setStatus(null);
    try {
      const { data } = await api.post("/data/upload", formData);
      setStatus("success");
      setMessage(data.message || "Data successfully ingested into the engine.");
      setFile(null);
      setPreviewData([]);
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            Data Intake Center <Database className="text-primary-600" />
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
            Power your dashboard by ingesting raw business intelligence.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-600 uppercase tracking-widest">
          <ShieldCheck size={14} /> Secure Encryption Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Terminal */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative group bg-white dark:bg-slate-900 border-2 border-dashed ${dragActive ? "border-primary-500 bg-primary-50/10" : "border-slate-200 dark:border-slate-800"} rounded-[2.5rem] p-12 text-center transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8`}
          >
            {!file ? (
              <div className="py-10">
                <div className="w-20 h-20 bg-primary-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/40 group-hover:scale-110 transition-transform duration-500">
                  <UploadIcon size={32} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white">
                  Push to Insight Engine
                </h3>
                <p className="text-slate-400 font-medium mb-8">
                  Drag and drop your spreadsheet or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv, .xlsx"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black hover:bg-primary-600 dark:hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-slate-200 dark:shadow-none"
                >
                  Choose Source File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/20 animate-bounce">
                  <TableIcon size={32} />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  {file.name}
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-500 font-bold uppercase tracking-widest mb-10">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <span>•</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    Validated Format
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    disabled={uploading}
                    onClick={handleUpload}
                    className="px-12 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all flex items-center gap-3 shadow-2xl shadow-primary-500/30 disabled:opacity-50"
                  >
                    {uploading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Commit to Database <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                  <button
                    disabled={uploading}
                    onClick={() => {
                      setFile(null);
                      setPreviewData([]);
                    }}
                    className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-black rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Discard
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Data Preview Section */}
          {previewData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                  <Layers size={20} className="text-primary-500" /> Source Data
                  Preview
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Showing first 5 records
                </span>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      {previewData[0].map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 font-black text-slate-500 uppercase tracking-tighter"
                        >
                          {header.replace(/\"|'|\r/g, "")}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(1).map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-t border-slate-100 dark:border-slate-800"
                      >
                        {row.map((cell, i) => (
                          <td
                            key={i}
                            className="px-4 py-3 text-slate-600 dark:text-slate-400 font-medium italic"
                          >
                            {cell.replace(/\"|'|\r/g, "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {/* Side Integrations & Stats */}
        <div className="space-y-6">
          {/* Notification Hub */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-[2rem] border-2 flex flex-col gap-4 ${
                  status === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/20"
                    : "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-500/10 dark:border-rose-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {status === "success" ? (
                    <CheckCircle2 size={32} />
                  ) : (
                    <AlertCircle size={32} />
                  )}
                  <p className="font-black text-lg tracking-tight">
                    {status === "success"
                      ? "Intake Successful"
                      : "Intake Failed"}
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="ml-auto opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="text-sm font-medium opacity-80">{message}</p>
                {status === "success" && (
                  <button
                    onClick={() => navigate("/")}
                    className="mt-2 w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
                  >
                    Back to Insights
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connect Sources */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <h3 className="text-lg font-black mb-6 tracking-tight">
              External Adapters
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Google Drive", icon: Cloud, color: "text-blue-500" },
                { name: "OneDrive", icon: Cloud, color: "text-blue-600" },
                { name: "AWS S3", icon: Database, color: "text-orange-500" },
                {
                  name: "Data Pipeline",
                  icon: Layers,
                  color: "text-primary-500",
                },
              ].map((hub, i) => (
                <button
                  key={i}
                  className="p-4 flex flex-col items-center justify-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  <hub.icon className={hub.color} size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {hub.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
