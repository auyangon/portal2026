import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Attendance } from './components/Attendance';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const PortalContent: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [email, setEmail] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/60 p-10 rounded-[40px] shadow-2xl space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-600 rounded-3xl mx-auto flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-emerald-200">
              A
            </div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">AUY Portal</h1>
            <p className="text-slate-500 font-medium">Welcome to the future of learning.</p>
          </div>

          <form 
            onSubmit={(e) => { e.preventDefault(); login(email); }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Student Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sann.t@auy.edu.mm" 
                className="w-full px-5 py-4 bg-white/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-emerald-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 font-medium">
            Authorized access only. Use your university credentials.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFD]">
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 -z-10" />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10 pb-20 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'attendance' && <Attendance />}
            {activeTab !== 'dashboard' && activeTab !== 'attendance' && (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-500 rounded-full" />
                  </motion.div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} coming soon</h2>
                <p className="text-slate-500 max-w-xs">We're currently polishing the {activeTab} section for the best experience.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <PortalContent />
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              color: '#1e293b',
              fontWeight: '600'
            }
          }}
        />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
