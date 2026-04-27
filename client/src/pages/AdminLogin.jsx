import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, Loader2, Eye, EyeOff, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      await login(trimmedEmail, trimmedPassword);
      
      const storedUser = localStorage.getItem('userInfo');
      const userInfo = storedUser ? JSON.parse(storedUser) : null;

      if (userInfo && userInfo.role === 'admin') {
        navigate('/admin');
      } else {
        setError('You do not have permission to access the admin panel');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[340px] w-full relative z-10"
      >
        <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl flex flex-col p-5 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

        <div className="text-center mb-4 w-full">
          <div className="w-10 h-10 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-primary-500 mx-auto mb-2.5 shadow-inner">
            <ShieldCheck size={22} />
          </div>
          <h1 className="text-lg font-bold text-white tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 text-[9px] mt-0.5">Secure Access</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-[11px] font-medium mb-6 flex items-center gap-2"
            >
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors" size={18} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-2xl outline-none text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-slate-700"
              placeholder="Enter admin email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-500 transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                className="w-full pl-11 pr-12 py-3.5 bg-slate-950/50 border border-slate-800 rounded-2xl outline-none text-white text-sm focus:ring-1 focus:ring-primary-500/50 transition-all placeholder:text-slate-700"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div className="flex items-center justify-between px-2 mt-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rem-admin"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-primary-600 focus:ring-primary-500/20 cursor-pointer"
                />
                <label htmlFor="rem-admin" className="text-[10px] text-slate-500 cursor-pointer">Remember me</label>
              </div>
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-2.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Sign In"}
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800/60 w-full flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-[9px] text-slate-600 font-medium tracking-wide">
            <ShieldAlert size={10} className="text-slate-700" />
            <span>Restricted Access • Authorized Personnel Only</span>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="text-[10px] font-bold text-slate-500 hover:text-primary-500 transition-colors"
          >
            Back to User Login
          </button>
        </div>
      </div>
    </motion.div>
  </div>
  );
};

export default AdminLogin;
