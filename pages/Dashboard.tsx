
import React from 'react';
import { Coins, Package, Award, ArrowRight, Zap, Sparkles, Heart, Stars } from 'lucide-react';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <section>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">Sweet Day, Mango! <Heart className="inline text-pink-400 fill-pink-400" size={24} /></h2>
        </div>
        <p className="text-pink-300 font-bold text-sm">Every little bit helps our lovely planet ✨</p>
      </section>

      <section className="grid grid-cols-2 gap-5">
        <StatCard 
          label="Mango Points" 
          value="12,450" 
          icon={<Coins />} 
          color="bg-pink-100/50 text-pink-400"
        />
        <StatCard 
          label="Recycle Count" 
          value="48" 
          icon={<Package />} 
          color="bg-emerald-100/50 text-emerald-400"
        />
        <StatCard 
          label="Eco Rank" 
          value="Silver" 
          icon={<Award />} 
          color="bg-blue-100/50 text-blue-400"
        />
        <StatCard 
          label="Planet Love" 
          value="12.4kg" 
          icon={<Sparkles />} 
          color="bg-purple-100/50 text-purple-400"
        />
      </section>

      <section className="bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 rounded-[2.5rem] p-8 text-white shadow-lg shadow-pink-200/40 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2 leading-tight font-cute">Bulky Waste?<br/>Just snap & chill! 📸</h3>
          <p className="text-white/90 text-sm mb-6 font-medium">AI does the hard work for you in 1 minute!</p>
          <Link to="/request" className="inline-flex items-center gap-2 bg-white text-pink-400 px-6 py-3 rounded-full font-bold text-sm shadow-md squishy-button hover:bg-pink-50 transition-colors">
            Start Now <ArrowRight size={18} />
          </Link>
        </div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
      </section>

      {/* New Fortune Entry */}
      <section className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-[2rem] p-6 border border-white shadow-md flex justify-between items-center group cursor-pointer">
        <Link to="/fortune" className="flex items-center gap-4 w-full">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-400 animate-pulse">
            <Stars size={28} />
          </div>
          <div className="flex-1">
            <h4 className="font-cute text-2xl text-purple-500 leading-none">Today's Fortune</h4>
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider">What do the stars say? ✨</p>
          </div>
          <ArrowRight className="text-purple-300 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-center mb-5 px-1">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
            Recent Magic <Sparkles size={16} className="text-yellow-400" />
          </h3>
          <Link to="/history" className="text-xs text-pink-400 font-bold uppercase tracking-widest border-b border-pink-100">See All</Link>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { id: 1, item: 'Fancy Refrigerator', date: 'May 20', status: 'Pending', color: 'text-pink-400', bg: 'bg-pink-50/30' },
            { id: 2, item: 'Cute Wooden Table', date: 'May 15', status: 'Done!', color: 'text-emerald-400', bg: 'bg-emerald-50/30' },
          ].map((item) => (
            <div key={item.id} className={`${item.bg} flex justify-between items-center p-5 rounded-[2rem] border border-white shadow-sm`}>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-300">
                  <Package size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-700 font-cute text-lg">{item.item}</p>
                  <p className="text-[10px] text-gray-400 font-bold tracking-wider">{item.date}</p>
                </div>
              </div>
              <span className={`text-xs font-black uppercase tracking-tighter ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
