
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { getAIAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '안녕하세요! 저는 망고 시스템의 마스코트 망고봇이에요. 궁금한 분리배출 방법이나 대형 폐기물 처리 절차에 대해 물어봐주세요! 🥭' }
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
    <div className="flex flex-col h-[calc(100vh-180px)]">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          망고봇 상담 <Sparkles size={20} className="text-yellow-500 fill-yellow-500" />
        </h2>
        <p className="text-gray-500">지능형 자원 순환 어드바이저</p>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-orange-100 text-orange-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-yellow-500" />
              <span className="text-sm text-gray-400">망고봇이 생각 중...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4 relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="무엇이든 물어보세요!"
          className="w-full pl-6 pr-14 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-400 text-white rounded-xl flex items-center justify-center hover:bg-yellow-500 transition-colors disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Quick Suggestions */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
        {['스티로폼 배출법', '침대 수거 비용', '폐건전지 수거함 위치', '포인트 사용처'].map(tag => (
          <button 
            key={tag}
            onClick={() => setInput(tag)}
            className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-500 hover:border-yellow-400 transition-colors"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIChatPage;
