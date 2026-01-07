
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2, Heart } from 'lucide-react';
import { getAIAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hi there! I'm MangoBot~ 🥭 Ask me anything about taking care of our planet or recycling! ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    
    setIsLoading(true);
    const response = await getAIAdvice(userMsg);
    setIsLoading(false);
    
    setMessages(prev => [...prev, { role: 'model', content: response }]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-210px)] animate-in fade-in duration-700">
      <header className="mb-6 flex justify-between items-end px-1">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-cute">MangoBot <Sparkles size={20} className="inline text-yellow-300 fill-yellow-300" /></h2>
          <p className="text-pink-300 font-bold text-sm">Your sweet recycling buddy</p>
        </div>
        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden animate-bounce-subtle">
           <svg viewBox="0 0 100 100" className="w-full h-full p-2">
             <circle cx="50" cy="50" r="45" fill="#fbcfe8" />
             <path d="M30 40 Q50 60 70 40" stroke="#f472b6" strokeWidth="6" fill="none" strokeLinecap="round" />
             <circle cx="35" cy="40" r="5" fill="#500724" />
             <circle cx="65" cy="40" r="5" fill="#500724" />
           </svg>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-1 scroll-smooth no-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in zoom-in-95 slide-in-from-bottom-2`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center shadow-sm border-2 border-white ${
                msg.role === 'user' ? 'bg-pink-100 text-pink-500' : 'bg-white text-pink-300'
              }`}>
                {msg.role === 'user' ? <User size={18} strokeWidth={2.5} /> : <Bot size={18} strokeWidth={2.5} />}
              </div>
              <div className={`p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-pink-400 text-white rounded-tr-none' 
                  : 'bg-white border border-pink-50 text-gray-700 rounded-tl-none'
              }`}>
                {msg.content}
                {msg.role === 'model' && <Heart className="inline ml-1 text-pink-200 fill-pink-200" size={14} />}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-pink-50 p-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-pink-200 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-pink-300 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
              </div>
              <span className="text-[11px] text-pink-300 font-black italic tracking-widest uppercase">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything sweet!"
          className="w-full pl-8 pr-16 py-5 bg-white rounded-[2.5rem] border border-pink-100 focus:outline-none focus:ring-4 focus:ring-pink-50 transition-all placeholder:text-pink-100 text-gray-700 font-medium shadow-xl shadow-pink-100/30"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-pink-300 text-white rounded-full flex items-center justify-center hover:bg-pink-400 transition-colors disabled:opacity-40 shadow-lg squishy-button"
        >
          <Send size={20} />
        </button>
      </div>

      <div className="flex gap-3 mt-6 overflow-x-auto pb-4 no-scrollbar">
        {['Planet care tips 🌍', 'Bed disposal 🛏️', 'Point perks 🎁', 'Say hi! 👋'].map(tag => (
          <button 
            key={tag}
            onClick={() => setInput(tag.split(' ')[0])}
            className="whitespace-nowrap px-6 py-3 bg-white border border-pink-100 rounded-full text-xs font-black text-pink-300 hover:bg-pink-50 hover:border-pink-200 transition-all shadow-sm"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIChatPage;
