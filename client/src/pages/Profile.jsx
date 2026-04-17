import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { 
  User, Mail, Shield, Calendar, MapPin, Camera, 
  Edit3, CheckCircle, Bell, Key, Globe, Layout, 
  Clock, ArrowUpRight, Lock, Fingerprint, Loader2, Save, AlertCircle
} from "lucide-react";

const Profile = () => {
  const { user, profileImage, setProfileImage } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isUploading, setIsUploading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [bioActive, setBioActive] = useState(false);
  const [twoFAActive, setTwoFAActive] = useState(false);

  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    weekly: false
  });

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    triggerToast(`Preference updated!`);
  };

  const notificationsList = [
    { id: 1, title: "Data Ingestion Complete", message: "Your file 'Market_Trends_2024.csv' has been fully processed.", type: "success", date: "Oct 24, 2024" },
    { id: 2, title: "New Login Detected", message: "A new login was recorded from a device in Mumbai, India.", type: "warning", date: "Oct 23, 2024" },
    { id: 3, title: "Monthly Report Ready", message: "Your analytics summary for September is now available for download.", type: "info", date: "Oct 20, 2024" },
  ];

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setIsUploading(true);
        const reader = new FileReader();
        reader.onload = () => {
          setTimeout(() => {
            setProfileImage(reader.result);
            setIsUploading(false);
            triggerToast("Profile picture updated successfully!");
          }, 1500);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Layout },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-in fade-in duration-700">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700"
          >
            <CheckCircle className="text-emerald-400" size={18} />
            <span className="text-sm font-bold">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-64 rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 opacity-30 bg-grid-white/[0.1]"></div>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row gap-8 -mt-32 relative z-10">
          
          <div className="lg:w-80 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-xl">
              <div className="relative mb-6">
                <div className="w-full aspect-square rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-6xl font-black text-primary-600 shadow-inner overflow-hidden relative group">
                   {isUploading ? (
                     <Loader2 className="animate-spin text-primary-400" size={48} />
                   ) : profileImage ? (
                     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                     <span className="uppercase">{user?.name?.charAt(0)}</span>
                   )}
                </div>
                <button 
                  onClick={handlePhotoUpload}
                  disabled={isUploading}
                  className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-800 text-primary-600 rounded-2xl shadow-xl hover:scale-110 transition-all border border-slate-100 dark:border-slate-700 active:scale-95"
                >
                  <Camera size={20} />
                </button>
              </div>

              <div className="text-center space-y-1 mb-6">
                <h2 className="text-2xl font-bold capitalize">{user?.name}</h2>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{user?.role}</p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <Mail size={16} className="text-primary-500" />
                  <span className="truncate font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span className="font-bold text-emerald-600">Verified User</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit backdrop-blur-sm border border-slate-200 dark:border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                    activeTab === tab.id ? "text-primary-600" : "text-slate-500"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div layoutId="activeTabP" className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-md" />
                  )}
                  <tab.icon size={18} className="relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Full Name</label>
                                <input defaultValue={user?.name} className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Location</label>
                                <input placeholder="e.g. Mumbai, India" className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Email</label>
                                <input defaultValue={user?.email} disabled className="w-full mt-1 p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold opacity-70" />
                            </div>
                            <button onClick={() => triggerToast("Changes saved successfully!")} className="w-full mt-7 p-3 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 transition-all active:scale-95 shadow-lg shadow-primary-200 dark:shadow-none">
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Security & Authentication</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={`p-6 rounded-[1.5rem] border transition-all cursor-pointer ${bioActive ? 'border-primary-500 bg-primary-50/10' : 'border-slate-100 dark:border-slate-800 hover:border-primary-500/50'}`} onClick={() => { setBioActive(!bioActive); triggerToast(bioActive ? "Biometric Auth Disabled" : "Biometric Auth Enabled!"); }}>
                         <Fingerprint className={`${bioActive ? 'text-primary-500' : 'text-primary-600'} mb-4`} size={32} />
                         <h4 className="font-bold text-lg mb-2">Biometric Login</h4>
                         <p className="text-sm text-slate-500 mb-6">Current Status: <span className={bioActive ? "text-primary-600 font-bold" : "font-bold text-slate-400"}>{bioActive ? "Active" : "Inactive"}</span></p>
                         <button className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${bioActive ? 'bg-primary-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}`}>
                           {bioActive ? "Revoke Access" : "Enable Now"}
                         </button>
                      </div>
                      <div className={`p-6 rounded-[1.5rem] border transition-all cursor-pointer ${twoFAActive ? 'border-primary-500 bg-primary-50/10' : 'border-slate-100 dark:border-slate-800 hover:border-primary-500/50'}`} onClick={() => { setTwoFAActive(!twoFAActive); triggerToast(twoFAActive ? "2FA Disabled" : "2FA Activated via SMS!"); }}>
                         <Key className={`${twoFAActive ? 'text-primary-500' : 'text-primary-600'} mb-4`} size={32} />
                         <h4 className="font-bold text-lg mb-2">Two-Factor (2FA)</h4>
                         <p className="text-sm text-slate-500 mb-6">Current Status: <span className={twoFAActive ? "text-primary-600 font-bold" : "font-bold text-slate-400"}>{twoFAActive ? "Secured" : "Unsecured"}</span></p>
                         <button className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${twoFAActive ? 'bg-primary-500 text-white' : 'bg-primary-600 text-white'}`}>
                           {twoFAActive ? "Manage keys" : "Setup 2FA"}
                         </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Change Password</h3>
                    <div className="space-y-4 max-w-md">
                       <div>
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Current Password</label>
                           <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20" />
                       </div>
                       <div>
                           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">New Password</label>
                           <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl font-bold outline-none focus:ring-2 focus:ring-primary-500/20" />
                       </div>
                       <button onClick={() => triggerToast("Password updated successfully!")} className="w-full mt-2 p-3 bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all active:scale-95 shadow-lg shadow-red-200 dark:shadow-none">
                           <Lock size={18} /> Update Password
                       </button>
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/10 rounded-[2rem] p-8 border border-red-200 dark:border-red-900/50 shadow-sm">
                    <h3 className="text-xl font-bold text-red-600 dark:text-red-500 mb-2">Danger Zone</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Permanently delete your account and all associated dashboard metadata. This action cannot be undone.</p>
                    <button onClick={() => {
                        if(window.confirm("Are you absolutely sure you want to delete your account? All data will be lost.")) {
                            triggerToast("Account deletion initiated!");
                        }
                    }} className="px-6 py-3 bg-white dark:bg-slate-900 text-red-600 dark:text-red-500 border-2 border-red-200 dark:border-red-900/50 rounded-xl font-bold text-sm tracking-wide hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white dark:hover:border-red-600 transition-all active:scale-[0.98]">
                      Delete My Account
                    </button>
                  </div>
                </motion.div>
              )}
              {activeTab === "notifications" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Recent Notifications</h3>
                    <div className="space-y-4">
                      {notificationsList.map((n) => (
                        <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 flex gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            n.type === 'success' ? 'bg-green-100 text-green-600' : n.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {n.type === 'success' ? <CheckCircle size={18} /> : n.type === 'warning' ? <AlertCircle size={18} /> : <Bell size={18} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-slate-900 dark:text-white">{n.title}</h4>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{n.date}</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{n.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                       {[
                         { id: 'email', label: "Email Notifications", desc: "Receive reports and alerts on your email." },
                         { id: 'push', label: "Push Notifications", desc: "Get instant alerts on your desktop." },
                         { id: 'weekly', label: "Weekly Summary", desc: "Receive a weekly performance overview." }
                       ].map((item) => (
                         <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                           <div>
                             <p className="text-sm font-bold">{item.label}</p>
                             <p className="text-xs text-slate-500">{item.desc}</p>
                           </div>
                           <div 
                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1 ${prefs[item.id] ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`} 
                            onClick={() => togglePref(item.id)}
                           >
                             <div className={`w-4 h-4 bg-white rounded-full transition-all shadow-sm ${prefs[item.id] ? 'ml-6' : 'ml-0'}`}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
