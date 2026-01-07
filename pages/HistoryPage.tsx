
import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const history = [
    { id: 1, title: 'Large Refrigerator 500L', date: '2024.05.20', status: 'Pending', location: '12-3 Samseong-dong, Seoul', cost: '12,000 KRW', img: 'https://picsum.photos/seed/refrigerator/200' },
    { id: 2, title: 'Wooden Desk and Chair', date: '2024.05.15', status: 'Completed', location: '12-3 Samseong-dong, Seoul', cost: '5,000 KRW', img: 'https://picsum.photos/seed/desk/200' },
    { id: 3, title: 'E-Waste (Monitor)', date: '2024.05.02', status: 'Completed', location: '12-3 Samseong-dong, Seoul', cost: 'Free (500p awarded)', img: 'https://picsum.photos/seed/monitor/200' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Discharge History</h2>
          <p className="text-gray-400 font-medium">Last 6 months records.</p>
        </div>
        <button className="p-2.5 bg-gray-50 rounded-xl text-gray-400 hover:text-pink-400 transition-colors">
          <Filter size={20} />
        </button>
      </section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-200" size={18} />
        <input 
          type="text" 
          placeholder="Search items..." 
          className="w-full pl-12 pr-4 py-3 bg-gray-50/50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all placeholder:text-gray-300"
        />
      </div>

      {/* History List */}
      <div className="flex flex-col gap-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:border-pink-100 transition-colors">
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-between py-1 grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800 leading-tight">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      item.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-pink-50 text-pink-400'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{item.date}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 font-medium">
                  <MapPin size={12} className="text-pink-200" />
                  <span className="truncate max-w-[120px]">{item.location}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-50 flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Payment</span>
              <span className="text-sm font-black text-gray-700">{item.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
