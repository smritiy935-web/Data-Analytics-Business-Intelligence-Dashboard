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
    <div className="fixed bottom-4 right-4 z-[100] max-w-[calc(100vw-32px)]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-16 right-0 w-[280px] h-[380px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-3 bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[11px] tracking-tight">Insight AI</h4>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-none">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"} items-end gap-1.5`}>
                  <div className={`p-3 rounded-xl text-[12px] leading-snug max-w-[85%] shadow-sm ${
                    msg.sender === "bot" 
                      ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none" 
                      : "bg-primary-600 text-white rounded-br-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
               <div className="flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 h-9 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 border-none outline-none text-[12px]" />
                  <button type="submit" className="bg-primary-600 text-white p-1.5 rounded-lg"><Send size={14} /></button>
               </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
