import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Minus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          id: 1, 
          text: `Greetings ${user?.name || "User"}! Welcome to InsightFlow AI Analysis Hub. How can I help you today?`, 
          sender: "bot" 
        }
      ]);
    }
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let response = "I'm processing your request. Your analytics looks great today!";
      const q = input.toLowerCase();
      if (q.includes("sales")) response = "Sales are up by 12% this week!";
      if (q.includes("hi") || q.includes("hello")) response = "Greetings! How can I assist you with your dashboard?";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden ring-1 ring-black/5"
          >
            <div className="p-6 bg-gradient-to-r from-primary-600 to-indigo-600 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-tight text-white/90">InsightBot AI</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Active Now</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              >
                <Minus size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"} items-end gap-2`}>
                  {msg.sender === "bot" && (
                     <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                        <Bot size={14} className="text-primary-600" />
                     </div>
                  )}
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[80%] shadow-sm ${
                    msg.sender === "bot" 
                      ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none" 
                      : "bg-primary-600 text-white rounded-br-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-800">
               <div className="flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." className="flex-1 h-10 px-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm" />
                  <button type="submit" className="bg-primary-600 text-white p-2 rounded-xl"><Send size={18} /></button>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
