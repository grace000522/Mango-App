
import React, { useState } from 'react';
import { Stars, Sparkles, CloudSun, Heart, Utensils, Shirt, Loader2, ArrowLeft } from 'lucide-react';
import { getFortune } from '../services/geminiService';
import { Link } from 'react-router-dom';

const zodiacs = [
  { name: 'Aries', symbol: '♈' }, { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' }, { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' }, { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' }, { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' }, { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' }, { name: 'Pisces', symbol: '♓' }
];

const FortunePage: React.FC = () => {
  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [fortune, setFortune] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchFortune = async (zodiac: string) => {
    setSelectedZodiac(zodiac);
    setLoading(true);
    const result = await getFortune(zodiac);
    setFortune(result);
    setLoading(false);
  };

  const reset = () => {
    setSelectedZodiac(null);
    setFortune(null);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <header className="flex items-center gap-4">
        <Link to="/" className="p-2 bg-pink-50 rounded-full text-pink-400 squishy-button">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-gray-800 font-cute leading-none">Starry Fortune ✨</h2>
          <p className="text-pink-300 font-bold text-sm tracking-tight uppercase">Daily Magical Insights</p>
        </div>
      </header>

      {!selectedZodiac ? (
        <section className="space-y-6">
          <p className="text-center font-bold text-gray-500 italic">Select your zodiac sign to reveal your magic for today...</p>
          <div className="grid grid-cols-3 gap-4">
            {zodiacs.map((z) => (
              <button
                key={z.name}
                onClick={() => fetchFortune(z.name)}
                className="bg-white p-4 rounded-[1.5rem] border border-pink-50 shadow-sm flex flex-col items-center gap-1 squishy-button hover:bg-pink-50 transition-colors"
              >
                <span className="text-3xl">{z.symbol}</span>
                <span className="text-[10px] font-black text-pink-300 uppercase tracking-widest">{z.name}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="relative">
                <Stars className="text-pink-300 animate-spin-slow" size={60} />
                <Loader2 className="absolute inset-0 m-auto text-pink-400 animate-spin" size={30} />
              </div>
              <p className="font-cute text-2xl text-pink-400 animate-pulse">Reading the stars...</p>
            </div>
          ) : fortune ? (
            <div className="space-y-6 animate-in zoom-in-95 duration-500">
              {/* Header Info */}
              <div className="text-center py-4">
                <div className="inline-block px-6 py-2 bg-pink-50 rounded-full text-pink-400 font-black text-xs uppercase tracking-[0.2em] mb-2">
                  {selectedZodiac}
                </div>
                <p className="font-cute text-3xl text-gray-800 leading-tight">"{fortune.message}"</p>
              </div>

              {/* Main Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50/50 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-white rounded-full text-yellow-400 shadow-inner">
                    <CloudSun size={24} />
                  </div>
                  <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-wider">Weather</p>
                  <p className="font-bold text-gray-700 text-sm leading-tight">{fortune.weather}</p>
                </div>

                <div className="bg-pink-50/50 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-white rounded-full text-pink-400 shadow-inner">
                    <Heart size={24} />
                  </div>
                  <p className="text-[10px] text-pink-500 font-bold uppercase tracking-wider">Luck Rating</p>
                  <div className="flex text-pink-400">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} size={14} className={i < fortune.luckRating ? "fill-pink-400" : "opacity-20"} />
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50/50 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-white rounded-full text-purple-400 shadow-inner">
                    <Shirt size={24} />
                  </div>
                  <p className="text-[10px] text-purple-500 font-bold uppercase tracking-wider">Lucky Color</p>
                  <p className="font-bold text-gray-700 text-sm leading-tight">{fortune.luckyColor}</p>
                </div>

                <div className="bg-emerald-50/50 p-5 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-white rounded-full text-emerald-400 shadow-inner">
                    <Utensils size={24} />
                  </div>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Lucky Food</p>
                  <p className="font-bold text-gray-700 text-sm leading-tight">{fortune.luckyFood}</p>
                </div>
              </div>

              <button
                onClick={reset}
                className="w-full py-4 bg-white border-2 border-pink-100 text-pink-300 font-black rounded-full shadow-sm hover:bg-pink-50 transition-colors squishy-button"
              >
                Check another sign? 🌙
              </button>
            </div>
          ) : (
            <div className="text-center py-10 space-y-4">
              <p className="text-gray-400 font-medium">The stars are shy today...</p>
              <button onClick={reset} className="px-6 py-2 bg-pink-400 text-white rounded-full font-bold">Try Again</button>
            </div>
          )}
        </section>
      )}

      {/* Decorative CSS for animation */}
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default FortunePage;
