import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar, 
  Bell, 
  LogOut,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'attendance', label: 'Attendance', icon: UserCheck },
  { id: 'materials', label: 'Materials', icon: FileText },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'announcements', label: 'Announcements', icon: Bell },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white/40 backdrop-blur-2xl border-r border-white/20 p-6 flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-200">
          A
        </div>
        <div>
          <h1 className="font-bold text-slate-800 tracking-tight leading-none">AUY</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Student Portal</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group",
                isActive 
                  ? "bg-white shadow-sm text-emerald-600 border border-emerald-100/50" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={cn("font-medium", isActive && "font-bold")}>{item.label}</span>
              </div>
              {isActive && (
                <motion.div layoutId="activePill">
                  <ChevronRight size={16} />
                </motion.div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-200/50">
        <div className="flex items-center gap-3 px-2 mb-6">
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.major}</p>
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-medium"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
