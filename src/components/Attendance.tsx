import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const iconMap: Record<string, any> = {
  CheckCircle2,
  XCircle,
  Clock
};

export const Attendance: React.FC = () => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const attendanceData = data?.attendanceData || [];
  const history = data?.history || [];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">Attendance</h1>
        <p className="text-slate-500 font-medium">Keep track of your presence and participation.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendanceData.map((item: any, idx: number) => {
          const IconComponent = iconMap[item.icon] || CheckCircle2;
          return (
            <motion.div
              key={item.course}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-[32px] group hover:scale-[1.02] transition-transform"
            >
              <div className="flex justify-between items-start mb-4">
                {/* FIXED: Added backticks and proper interpolation */}
                <div className={`p-3 rounded-2xl ${item.color}`}>
                  <IconComponent size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.color}`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">{item.course}</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-slate-900">{item.attendance}</span>
                <span className="text-slate-400 font-medium mb-1">attendance</span>
              </div>
              <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: item.attendance }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${item.color.split(' ')[0].replace('bg-', 'bg-')}`}
                  style={{ backgroundColor: item.color.includes('emerald') ? '#10b981' : item.color.includes('blue') ? '#3b82f6' : item.color.includes('amber') ? '#f59e0b' : '#f43f5e' }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white/40">
          <h2 className="text-xl font-bold text-slate-800">Recent Logs</h2>
          <button className="text-emerald-600 font-bold text-sm hover:underline">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Course</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="font-semibold text-slate-700">{row.date}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 font-bold text-slate-800">{row.course}</td>
                  <td className="px-8 py-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{row.type}</span>
                  </td>
                  <td className="px-8 py-4 text-slate-500 font-medium">{row.time}</td>
                  <td className="px-8 py-4 text-right">
                    <span className={`font-bold ${
                      row.status === 'Present' ? 'text-emerald-500' : 
                      row.status === 'Late' ? 'text-amber-500' : 'text-rose-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};