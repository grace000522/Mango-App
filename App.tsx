
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, PlusCircle, MessageSquare, Bell, Heart, Stars } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import RequestPage from './pages/RequestPage';
import HistoryPage from './pages/HistoryPage';
import AIChatPage from './pages/AIChatPage';
import FortunePage from './pages/FortunePage';

const RabbitWithMangoLogo = () => (
  <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-sm" style={{ animation: 'bounce-subtle 3s ease-in-out infinite' }}>
    <style>
      {`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}
    </style>
    {/* Rabbit Ears */}
    <ellipse cx="35" cy="22" rx="7" ry="18" fill="#fbcfe8" transform="rotate(-15 35 22)" />
    <ellipse cx="65" cy="22" rx="7" ry="18" fill="#fbcfe8" transform="rotate(15 65 22)" />
    <ellipse cx="35" cy="25" rx="3.5" ry="11" fill="#fff1f2" transform="rotate(-15 35 25)" />
    <ellipse cx="65" cy="25" rx="3.5" ry="11" fill="#fff1f2" transform="rotate(15 65 25)" />
    
    {/* Body */}
    <circle cx="50" cy="58" r="32" fill="#fbcfe8" />
    <circle cx="50" cy="58" r="28" fill="white" />
    
    {/* Blush marks */}
    <circle cx="34" cy="62" r="5" fill="#fecdd3" opacity="0.6" />
    <circle cx="66" cy="62" r="5" fill="#fecdd3" opacity="0.6" />
    
    {/* Eyes */}
    <circle cx="42" cy="55" r="2.5" fill="#500724" />
    <circle cx="58" cy="55" r="2.5" fill="#500724" />
    
    {/* Nose/Mouth */}
    <path d="M48 60 L50 62 L52 60" stroke="#f472b6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    
    {/* Mango */}
    <g transform="translate(52, 62) rotate(15)">
      <path d="M0 0 C8 -4 16 0 16 12 C16 20 8 24 0 20 C-8 16 -4 4 0 0" fill="#fbbf24" />
      <path d="M6 2 C8 0 10 2 8 4" stroke="#65a30d" strokeWidth="1.5" fill="none" />
    </g>

    {/* Tiny Sparkles */}
    <circle cx="20" cy="40" r="2" fill="#fdf2f8" style={{ animation: 'sparkle 2s infinite' }} />
    <path d="M85 30 L87 35 L92 37 L87 39 L85 44 L83 39 L78 37 L83 35 Z" fill="#fdf2f8" style={{ animation: 'sparkle 2.5s infinite 0.5s' }} />
  </svg>
);

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/history', icon: ClipboardList, label: 'History' },
    { path: '/request', icon: PlusCircle, label: 'Request' },
    { path: '/ai-chat', icon: MessageSquare, label: 'Bot' },
    { path: '/fortune', icon: Stars, label: 'Stars' },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-pink-100 px-4 py-3 flex justify-between items-center z-50 rounded-[2.5rem] shadow-xl shadow-pink-200/20">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-pink-400 scale-110' : 'text-pink-200 hover:text-pink-300'
            }`}
          >
            <div className={`p-2 rounded-full transition-colors ${isActive ? 'bg-pink-50' : ''}`}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[9px] font-bold tracking-tight uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => (
  <header className="sticky top-0 bg-white/70 backdrop-blur-lg px-6 py-4 flex justify-between items-center z-50 border-b border-pink-50">
    <div className="flex items-center gap-3">
      <RabbitWithMangoLogo />
      <div className="flex flex-col -gap-1">
        <h1 className="text-2xl font-black text-pink-400 tracking-tighter leading-none">MANGO</h1>
        <span className="text-[10px] font-bold text-pink-200 uppercase tracking-widest ml-1">Sweet System</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="relative p-2 text-pink-200 hover:text-pink-400 transition-colors squishy-button">
        <Bell size={22} />
        <span className="absolute top-1 right-1 bg-pink-400 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white font-bold">2</span>
      </button>
      <div className="w-10 h-10 rounded-full bg-pink-50 border-2 border-white overflow-hidden shadow-inner">
        <img src="https://picsum.photos/seed/user-cute/100" alt="profile" />
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen pb-32 max-w-md mx-auto bg-white shadow-2xl relative overflow-x-hidden border-x border-pink-50">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
            <Route path="/fortune" element={<FortunePage />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
