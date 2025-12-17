import React, { useState, useEffect } from 'react';
import { ServiceType, ServiceRequest, RequestStatus } from '../types';
import { fetchRequests, createRequest, generateXML } from '../services/mockBackend';
import { improveRequestDescription } from '../services/geminiService';
import { XMLDisplay } from './XMLDisplay';
import { PlusIcon, SparklesIcon, DocumentCheckIcon, ClockIcon, AcademicCapIcon, KeyIcon, UserGroupIcon, ComputerDesktopIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const StudentDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    type: ServiceType.CERTIFICATE,
    details: '',
    studentId: 'S2024001',
    studentName: 'Mohamed Amine'
  });

  const [previewXML, setPreviewXML] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setPreviewXML(generateXML(formData));
  }, [formData]);

  const loadData = async () => {
    const data = await fetchRequests();
    setRequests(data);
  };

  const handleAiAssist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.details) return;
    
    setIsAiLoading(true);
    const improved = await improveRequestDescription(formData.details, formData.type);
    setFormData(prev => ({ ...prev, details: improved }));
    setIsAiLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await createRequest(formData);
    await loadData();
    setIsLoading(false);
    setIsCreating(false);
    setFormData(prev => ({ ...prev, details: '' }));
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case RequestStatus.APPROVED: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case RequestStatus.REJECTED: return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
        case ServiceType.CERTIFICATE: return <AcademicCapIcon className="w-6 h-6" />;
        case ServiceType.ROOM_BOOKING: return <KeyIcon className="w-6 h-6" />;
        case ServiceType.EVENT_APPROVAL: return <UserGroupIcon className="w-6 h-6" />;
        case ServiceType.EQUIPMENT_LOAN: return <ComputerDesktopIcon className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Student Portal</h1>
          <p className="text-slate-500 mt-1">Access university services via the distributed hub.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95"
          >
            <PlusIcon className="w-5 h-5" />
            New Service Request
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="animate-slideIn">
            <button 
                onClick={() => setIsCreating(false)}
                className="mb-4 text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
                ← Back to Dashboard
            </button>
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Service Selection & Form */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                        <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                        <div className="p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6">1. Select Service Category</h2>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                {Object.values(ServiceType).map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData({...formData, type: t})}
                                        className={`p-4 rounded-xl border-2 text-left transition-all flex flex-col gap-2 ${
                                            formData.type === t 
                                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md scale-[1.02]' 
                                            : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-white'
                                        }`}
                                    >
                                        <div className={`${formData.type === t ? 'text-indigo-600' : 'text-slate-400'}`}>
                                            {getServiceIcon(t)}
                                        </div>
                                        <span className="font-semibold text-sm">{t}</span>
                                    </button>
                                ))}
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 mb-4">2. Request Details</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative group">
                                    <textarea 
                                        className="w-full rounded-xl border-slate-300 border-2 p-4 h-40 focus:ring-0 focus:border-indigo-500 transition-colors resize-none bg-slate-50 focus:bg-white text-black placeholder:text-slate-400"
                                        value={formData.details}
                                        onChange={(e) => setFormData({...formData, details: e.target.value})}
                                        placeholder="Describe your request requirement in detail..."
                                    />
                                    <div className="absolute bottom-3 right-3 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleAiAssist}
                                            disabled={isAiLoading || !formData.details}
                                            className="flex items-center gap-1.5 text-xs font-bold text-purple-600 bg-white hover:bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200 shadow-sm transition-all disabled:opacity-50"
                                        >
                                            {isAiLoading ? (
                                            <div className="w-3 h-3 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                            <SparklesIcon className="w-3 h-3" />
                                            )}
                                            AI Enhance
                                        </button>
                                    </div>
                                </div>

                                <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white p-4 rounded-xl font-bold shadow-lg shadow-indigo-200 flex justify-center items-center gap-2 transition-all active:scale-[0.98]"
                                >
                                {isLoading ? (
                                    <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Handshaking with SOAP Gateway...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Request</span>
                                        <ChevronRightIcon className="w-5 h-5" />
                                    </>
                                )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Technical Preview */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 sticky top-24">
                         <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <DocumentCheckIcon className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live SOAP Envelope</span>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-900/50">
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                                <strong className="text-slate-300">Architecture Note:</strong> The form data is real-time serialized into XML. Upon submission, this payload travels via SOAP to the middleware which performs validation before hitting the database.
                            </p>
                            <pre className="font-mono text-[10px] md:text-xs text-blue-300 overflow-x-auto custom-scrollbar p-4 bg-slate-950 rounded-lg border border-slate-800">
                                {previewXML}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {requests.map((req) => (
            <div key={req.id} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    {getServiceIcon(req.type)}
                </div>
                
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">{req.id}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <ClockIcon className="w-3 h-3" />
                    {new Date(req.date).toLocaleDateString()}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}>
                    {req.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-700 transition-colors">{req.type}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">{req.details}</p>
              
              {req.adminComments && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mt-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Administrator Response</span>
                  <p className="text-sm text-slate-700 italic">"{req.adminComments}"</p>
                </div>
              )}
            </div>
          ))}
          {requests.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <AcademicCapIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">No active service requests.</p>
              <button onClick={() => setIsCreating(true)} className="text-indigo-600 font-bold hover:underline mt-2">Create your first request</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};