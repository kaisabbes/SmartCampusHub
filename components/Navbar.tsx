import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { BuildingLibraryIcon, UserCircleIcon, AcademicCapIcon, MapIcon, SignalIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  onOpenArchitecture: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, setRole, onOpenArchitecture }) => {
  const [latency, setLatency] = useState(24);

  // Simulate fluctuating network latency
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(12, Math.min(150, prev + (Math.random() * 20 - 10))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl border-b border-slate-800 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/30">
              <BuildingLibraryIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight">Smart Campus Hub</span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">v2.4.0 • Distributed</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Architecture Info Button */}
            <button 
              onClick={onOpenArchitecture}
              className="hidden md:flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-700 transition-colors"
            >
              <MapIcon className="w-4 h-4" />
              <span className="hidden lg:inline">System Architecture</span>
            </button>
            
            {/* Network Widget */}
            <div className="hidden lg:flex flex-col items-end mr-4">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${latency < 50 ? 'bg-emerald-500' : 'bg-yellow-500'} animate-pulse`}></div>
                <span className="text-xs font-mono text-slate-400">{Math.floor(latency)}ms</span>
              </div>
              <span className="text-[9px] text-slate-600 font-bold uppercase">US-EAST-1</span>
            </div>

            <div className="flex items-center bg-slate-800 rounded-lg p-1 ml-2 border border-slate-700">
              <button
                onClick={() => setRole(UserRole.STUDENT)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  role === UserRole.STUDENT 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1">
                  <UserCircleIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Student</span>
                </div>
              </button>
              <button
                onClick={() => setRole(UserRole.ADMIN)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  role === UserRole.ADMIN 
                    ? 'bg-indigo-500 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1">
                  <AcademicCapIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};