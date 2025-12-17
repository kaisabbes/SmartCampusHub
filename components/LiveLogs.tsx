import React, { useEffect, useRef, useState } from 'react';
import { subscribeToLogs } from '../services/mockBackend';
import { SystemLog } from '../types';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/outline';

export const LiveLogs: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToLogs((log) => {
      if (!isPaused) {
        setLogs(prev => [...prev.slice(-20), log]); // Keep last 20 logs
      }
    });
    return unsubscribe;
  }, [isPaused]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col h-full relative group">
      {/* Floating Controls - Visible on Hover */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-1.5 bg-slate-800/80 text-slate-400 hover:text-white rounded-md border border-slate-600 backdrop-blur-sm" 
            title={isPaused ? "Resume Logs" : "Pause Logs"}
        >
            {isPaused ? <PlayIcon className="w-3 h-3" /> : <PauseIcon className="w-3 h-3" />}
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-[10px] md:text-xs overflow-y-auto custom-scrollbar bg-slate-950 space-y-1.5"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3 hover:bg-white/5 p-0.5 rounded px-2 transition-colors">
            <span className="text-slate-500 shrink-0">{log.timestamp}</span>
            <span className={`shrink-0 w-24 text-right font-bold ${
                log.source === 'SOAP-GW' ? 'text-purple-400' :
                log.source === 'REST-API' ? 'text-blue-400' :
                log.source === 'AUTH' ? 'text-yellow-400' : 'text-emerald-400'
            }`}>{log.source}</span>
            <span className={`break-all ${
                log.type === 'SUCCESS' ? 'text-green-300' :
                log.type === 'WARN' ? 'text-yellow-300' : 'text-slate-300'
            }`}>
              {log.source === 'SOAP-GW' && '>> '}
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
            <div className="text-slate-600 italic">Waiting for system events...</div>
        )}
      </div>
    </div>
  );
};