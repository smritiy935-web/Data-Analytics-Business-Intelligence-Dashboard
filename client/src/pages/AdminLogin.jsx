import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, Loader2, ArrowRight, Server, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      // After login, we need to check if they are actually an admin
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo.role === 'admin') {
        navigate('/admin');
      } else {
        setError('ACCESS DENIED: Standard user credentials detected.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication sequence failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden">
      {/* Abstract Background Tech Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]"></div>
        <div className="grid grid-cols-12 h-full w-full opacity-20">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-slate-800/30 h-full"></div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full p-4 relative z-10"
      >
        <div className="bg-slate-900/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl shadow-black/50">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.3)] ring-4 ring-primary-900/20">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">SYSTEM ACCESS</h2>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em]">Administrator Authentication Node</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-xs font-bold mb-8 flex items-center gap-3"
            >
              <Terminal size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Admin Identity</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-1 focus:ring-primary-500 transition-all text-white font-medium placeholder:text-slate-700"
                  placeholder="root@system.io"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl outline-none focus:ring-1 focus:ring-primary-500 transition-all text-white font-medium placeholder:text-slate-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary-900/20 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Establish Connection
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
              <Server size={12} />
              <span>ENCRYPTED NODE: 5085-CORE-ALPHA</span>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-slate-500 hover:text-primary-400 transition-colors"
            >
              Back to User Terminal
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
