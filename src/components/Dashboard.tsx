import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  TrendingUp, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { GlassCard, GradientText } from './UI';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { data, loading } = useData();
  const { user } = useAuth();

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header section */}
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome back, <GradientText>{user?.name.split(' ')[0]}</GradientText>!
          </h2>
          <p className="text-slate-500 font-medium">Keep up the great work this semester.</p>
        </div>
          <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="pl-10 pr-4 py-2 bg-white/60 border border-white/40 backdrop-blur-md rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all w-64"
            />
          </div>
          <button className="p-2 bg-white/60 border border-white/40 backdrop-blur-md rounded-2xl text-slate-600 hover:text-emerald-600 transition-colors">
            <Bell size={22} />
          </button>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 bg-blue-100 border-none">
          <div className="flex justify-between items-start mb-4 text-blue-700">
            <div className="p-2 bg-white/50 rounded-xl">
              <TrendingUp size={24} />
            </div>
            <ArrowUpRight size={20} className="opacity-60" />
          </div>
          <p className="text-blue-600 font-medium mb-1">GPA Score</p>
          <div className="text-4xl font-extrabold mb-2 text-blue-900">3.92</div>
          <div className="text-xs font-bold text-blue-700 bg-white/40 px-2 py-1 rounded-full w-fit">
            Top 5% of class
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-pink-50 border-none">
          <div className="flex justify-between items-start mb-4 text-pink-700">
            <div className="p-2 bg-white/50 rounded-xl">
              <PlusCircle size={24} />
            </div>
          </div>
          <p className="text-pink-600 font-medium mb-1">Credits Earned</p>
          <div className="text-4xl font-extrabold mb-2 text-pink-900">48</div>
          <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: '40%' }} 
              className="bg-pink-400 h-full rounded-full"
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-emerald-50 border-none">
          <div className="flex justify-between items-start mb-4 text-emerald-700">
            <div className="p-2 bg-white/50 rounded-xl">
              <Clock size={24} />
            </div>
          </div>
          <p className="text-emerald-600 font-medium mb-1">Upcoming Class</p>
          <div className="text-xl font-bold mb-1 text-emerald-900">{data.schedule[0].subject}</div>
          <p className="text-sm text-emerald-600/70 font-medium">{data.schedule[0].time} • {data.schedule[0].room}</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Courses */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">My Courses</h3>
            <button className="text-sm font-semibold text-emerald-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {data.courses.map((course: any) => (
              <GlassCard key={course.id} className="p-5 flex items-center gap-5 hover:bg-white transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-600 border border-slate-100 shadow-sm">
                  {course.code}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{course.title}</h4>
                  <p className="text-xs text-slate-500 font-medium">{course.instructor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-tighter">Progress</p>
                    <p className="text-sm font-extrabold text-slate-800">{course.progress}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-100 flex items-center justify-center text-xs font-black text-emerald-600 bg-emerald-50">
                    {course.grade}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Schedule & Announcements */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Latest Announcements</h3>
            <button className="text-sm font-semibold text-emerald-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {data.announcements.map((ann: any) => (
              <GlassCard key={ann.id} className="p-5 hover:bg-white transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800">{ann.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ann.date}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {ann.content}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
