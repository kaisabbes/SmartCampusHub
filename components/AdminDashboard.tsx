import React, { useState, useEffect } from 'react';
import { ServiceRequest, RequestStatus } from '../types';
import { fetchRequests, updateRequestStatus } from '../services/mockBackend';
import { LiveLogs } from './LiveLogs';
import { CodeBracketIcon, ServerIcon, ChartBarIcon, FunnelIcon } from '@heroicons/react/24/outline';

export const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  // Filter State
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const data = await fetchRequests();
    setRequests(data);
  };

  const handleAction = async (id: string, status: RequestStatus) => {
    await updateRequestStatus(id, status, comment);
    setComment('');
    setSelectedReq(null);
    loadRequests();
  };

  // Filter Logic
  const filteredRequests = requests.filter(req => {
    // Status Filter
    if (statusFilter !== 'ALL' && req.status !== statusFilter) return false;
    
    const reqDate = new Date(req.date);

    // Start Date Filter
    if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (reqDate < start) return false;
    }
    
    // End Date Filter
    if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (reqDate > end) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ServerIcon className="w-6 h-6 text-indigo-600" />
            System Administration
          </h1>
          <p className="text-sm text-slate-500 mt-1">Gateway Control Center</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Left/Main Column */}
        <div className="lg:col-span-2 flex flex-col gap-6 overflow-hidden">
            
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 gap-4 shrink-0">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
                    <div>
                        <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Queue Depth</div>
                        <div className="text-2xl font-bold text-slate-800">{requests.filter(r => r.status === RequestStatus.PENDING).length} Requests</div>
                    </div>
                    <div className="h-10 w-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <ChartBarIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
             <div className="flex-1 flex flex-col overflow-hidden">
               
               {/* Filter Bar */}
               <div className="bg-white p-4 rounded-xl border border-slate-200 mb-4 flex flex-wrap gap-4 items-end shadow-sm">
                    <div className="flex items-center gap-2 text-slate-400 mr-2 pb-2 md:pb-0">
                        <FunnelIcon className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase hidden md:inline">Filters</span>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Status</label>
                        <select 
                            value={statusFilter} 
                            onChange={e => setStatusFilter(e.target.value as any)}
                            className="w-full text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5"
                        >
                            <option value="ALL">All Statuses</option>
                            <option value={RequestStatus.PENDING}>Pending</option>
                            <option value={RequestStatus.APPROVED}>Approved</option>
                            <option value={RequestStatus.REJECTED}>Rejected</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Start Date</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className="w-full text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5"
                        />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">End Date</label>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className="w-full text-sm border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5"
                        />
                    </div>
                    {(statusFilter !== 'ALL' || startDate || endDate) && (
                        <button 
                            onClick={() => { setStatusFilter('ALL'); setStartDate(''); setEndDate(''); }}
                            className="text-xs text-indigo-600 hover:text-indigo-800 font-bold pb-2 md:ml-auto"
                        >
                            Reset
                        </button>
                    )}
               </div>

               <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                 {filteredRequests.length === 0 && (
                    <div className="text-center py-12 text-slate-400 italic bg-white rounded-xl border border-slate-200 border-dashed">
                        No requests match current filters.
                    </div>
                 )}
                 {filteredRequests.map((req) => (
                   <div key={req.id} className={`bg-white rounded-xl shadow-sm border transition-all ${
                     selectedReq === req.id ? 'ring-2 ring-indigo-500 border-transparent' : 'border-slate-200'
                   }`}>
                     <div className="p-5">
                       <div className="flex justify-between items-start">
                         <div>
                           <div className="flex items-center gap-2 mb-1">
                             <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{req.id}</span>
                             <span className="text-sm font-medium text-slate-900">{req.studentName}</span>
                           </div>
                           <h3 className="text-lg font-bold text-slate-800">{req.type}</h3>
                           <p className="text-black mt-1 text-sm font-medium">{req.details}</p>
                         </div>
                         <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                           req.status === RequestStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                           req.status === RequestStatus.REJECTED ? 'bg-rose-100 text-rose-700' :
                           'bg-amber-100 text-amber-700'
                         }`}>
                           {req.status}
                         </div>
                       </div>
       
                       {/* Expanded View */}
                       {selectedReq === req.id && (
                           <div className="mt-4 pt-4 border-t border-slate-100 animate-fadeIn">
                               <div className="grid md:grid-cols-2 gap-4 mb-4">
                                   <div className="bg-slate-900 rounded p-3">
                                       <div className="text-[10px] text-slate-400 font-mono mb-1">SOAP HEADER</div>
                                       <div className="text-[10px] text-green-400 font-mono truncate">
                                           &lt;SecurityToken&gt;eyJh...&lt;/SecurityToken&gt;
                                       </div>
                                   </div>
                                   <div className="bg-slate-900 rounded p-3">
                                       <div className="text-[10px] text-slate-400 font-mono mb-1">DB RECORD</div>
                                       <div className="text-[10px] text-blue-400 font-mono">
                                           ID: {req.id} | TS: {Date.now()}
                                       </div>
                                   </div>
                               </div>

                               {/* XML Payload */}
                               <div className="mb-4 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden">
                                    <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-slate-500 uppercase">XML Payload</span>
                                        <span className="text-[10px] font-mono text-slate-400">application/xml</span>
                                    </div>
                                    <pre className="p-3 text-[10px] text-slate-600 font-mono overflow-x-auto whitespace-pre custom-scrollbar">
                                        {req.xmlPayload || '<NoPayload />'}
                                    </pre>
                               </div>

                                {/* Admin Comments (if exists) */}
                                {req.adminComments && (
                                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mb-4">
                                        <div className="text-xs font-bold text-amber-700 uppercase mb-1">Admin Comment</div>
                                        <p className="text-sm text-slate-800 italic">"{req.adminComments}"</p>
                                    </div>
                                )}

                               {req.status === RequestStatus.PENDING ? (
                                   <div>
                                        <textarea
                                            placeholder="Reason for decision..."
                                            className="w-full text-sm p-3 border border-slate-300 rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <div className="flex gap-3 justify-end">
                                            <button 
                                                onClick={() => setSelectedReq(null)}
                                                className="text-sm text-slate-500 hover:text-slate-700 px-3 py-2"
                                            >
                                                Cancel
                                            </button>
                                            <button 
                                                onClick={() => handleAction(req.id, RequestStatus.REJECTED)}
                                                className="bg-white hover:bg-rose-50 text-rose-700 px-4 py-2 rounded-lg text-sm font-bold border border-rose-200 transition-colors"
                                            >
                                                Reject
                                            </button>
                                            <button 
                                                onClick={() => handleAction(req.id, RequestStatus.APPROVED)}
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-colors"
                                            >
                                                Approve Request
                                            </button>
                                        </div>
                                   </div>
                               ) : (
                                   <div className="flex justify-end">
                                       <button 
                                           onClick={() => setSelectedReq(null)}
                                           className="text-sm font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
                                       >
                                           Close Details
                                       </button>
                                   </div>
                               )}
                           </div>
                       )}

                       {selectedReq !== req.id && (
                           <button 
                            onClick={() => setSelectedReq(req.id)}
                            className="mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                           >
                            <CodeBracketIcon className="w-4 h-4" />
                            {req.status === RequestStatus.PENDING ? 'Review & Action' : 'View Details & XML'}
                           </button>
                       )}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
        </div>

        
      </div>
    </div>
  );
};