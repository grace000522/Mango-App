
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, PlusCircle, MessageSquare, User, Leaf, Bell } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import RequestPage from './pages/RequestPage';
import HistoryPage from './pages/HistoryPage';
import AIChatPage from './pages/AIChatPage';

const Navigation = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/history', icon: ClipboardList, label: '배출내역' },
    { path: '/request', icon: PlusCircle, label: '배출하기' },
    { path: '/ai-chat', icon: MessageSquare, label: '망고봇' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-yellow-100 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-orange-500 font-bold' : 'text-gray-400'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const Header = () => (
  <header className="sticky top-0 bg-yellow-400 px-6 py-4 flex justify-between items-center shadow-md z-50">
    <div className="flex items-center gap-2">
      <div className="bg-white p-1.5 rounded-lg shadow-sm">
        <Leaf className="text-orange-500 fill-orange-500" size={24} />
      </div>
      <h1 className="text-xl font-black text-white tracking-tighter">MANGO SYSTEM</h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="text-white relative">
        <Bell size={24} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-yellow-400">2</span>
      </button>
      <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white overflow-hidden">
        <img src="https://picsum.photos/seed/user/100" alt="profile" />
      </div>
    </div>
  </header>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen pb-24 max-w-md mx-auto bg-white shadow-2xl relative">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
          </Routes>
        </main>
        <Navigation />
      </div>
    </Router>
  );
};

export default App;
