
import React from 'react';
import { Coins, Package, Award, ArrowRight, Zap } from 'lucide-react';
import StatCard from '../components/StatCard.tsx';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <section>
        <h2 className="text-2xl font-bold text-gray-800">안녕하세요, 김망고님! 👋</h2>
        <p className="text-gray-500">오늘도 지구를 위한 배출, 감사합니다.</p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <StatCard 
          label="나의 망고 포인트" 
          value="12,450 P" 
          icon={<Coins className="text-amber-600" />} 
          color="bg-amber-50"
        />
        <StatCard 
          label="누적 배출 횟수" 
          value="48 회" 
          icon={<Package className="text-emerald-600" />} 
          color="bg-emerald-50"
        />
        <StatCard 
          label="에코 등급" 
          value="Silver" 
          icon={<Award className="text-blue-600" />} 
          color="bg-blue-50"
        />
        <StatCard 
          label="탄소 절감량" 
          value="12.4kg" 
          icon={<Zap className="text-orange-600" />} 
          color="bg-orange-50"
        />
      </section>

      <section className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">대형 폐기물 배출,<br/>AI로 간편하게 찍으세요</h3>
          <p className="text-yellow-100 text-sm mb-4">분류부터 수거 신청까지 1분이면 끝!</p>
          <Link to="/request" className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-full font-bold text-sm shadow-sm hover:scale-105 transition-transform">
            배출 신청하기 <ArrowRight size={16} />
          </Link>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">최근 배출 현황</h3>
          <Link to="/history" className="text-sm text-gray-400">전체보기</Link>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { id: 1, item: '냉장고 (대형)', date: '2024.05.20', status: '수거 대기', color: 'text-amber-500' },
            { id: 2, item: '목재 테이블', date: '2024.05.15', status: '수거 완료', color: 'text-emerald-500' },
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div>
                <p className="font-bold text-gray-700">{item.item}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
