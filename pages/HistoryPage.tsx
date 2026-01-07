
import React from 'react';
import { Search, Filter, MapPin } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const history = [
    { id: 1, title: '대형 냉장고 500L', date: '2024.05.20', status: '수거 대기', location: '서울시 강남구 삼성동 12-3', cost: '12,000원', img: 'https://picsum.photos/seed/refrigerator/200' },
    { id: 2, title: '목재 책상 및 의자', date: '2024.05.15', status: '수거 완료', location: '서울시 강남구 삼성동 12-3', cost: '5,000원', img: 'https://picsum.photos/seed/desk/200' },
    { id: 3, title: '폐가전 (모니터)', date: '2024.05.02', status: '수거 완료', location: '서울시 강남구 삼성동 12-3', cost: '무료 (포인트 500p)', img: 'https://picsum.photos/seed/monitor/200' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">배출 내역</h2>
          <p className="text-gray-500">최근 6개월간의 기록입니다.</p>
        </div>
        <button className="p-2.5 bg-gray-100 rounded-xl text-gray-500">
          <Filter size={20} />
        </button>
      </section>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="신청 품목 검색..." 
          className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* History List */}
      <div className="flex flex-col gap-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group">
            <div className="flex gap-4 p-4">
              <div className="w-24 h-24 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col justify-between py-1 grow">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800 leading-tight">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                      item.status === '수거 완료' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <MapPin size={12} />
                  <span className="truncate max-w-[120px]">{item.location}</span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-50 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">결제/혜택</span>
              <span className="text-sm font-bold text-gray-700">{item.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
