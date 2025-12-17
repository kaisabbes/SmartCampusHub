import React from 'react';
import { XMarkIcon, ArrowRightIcon, ServerIcon, GlobeAltIcon, CircleStackIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface Props {
  onClose: () => void;
}

export const ArchitectureViewer: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10 rounded-t-2xl">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Distributed System Architecture</h2>
            <p className="text-sm text-slate-500">Integration pattern: XML over SOAP bridging to REST Microservices</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
        
        <div className="p-8 space-y-10">
            {/* Visual Flow Diagram */}
            <div className="bg-slate-900 rounded-xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ServerIcon className="w-64 h-64" />
                </div>

                <h3 className="text-lg font-semibold text-indigo-300 mb-8 uppercase tracking-wider">Request Lifecycle Flow</h3>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                    
                    {/* Node 1: Client */}
                    <div className="flex flex-col items-center z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-3">
                            <GlobeAltIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold">Student Client</div>
                        <div className="text-xs text-slate-400 mt-1">Generates XML</div>
                    </div>

                    <ArrowRightIcon className="w-6 h-6 text-slate-500 hidden md:block" />
                    <div className="md:hidden text-slate-500 my-2">↓</div>

                    {/* Node 2: SOAP */}
                    <div className="flex flex-col items-center z-10 w-full md:w-auto p-4 bg-slate-800/50 rounded-xl border border-slate-700 border-dashed">
                        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/30 mb-3">
                            <DocumentTextIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold text-purple-200">SOAP Interface</div>
                        <div className="text-xs text-slate-400 mt-1">Validates XSD</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-1">JAXB Unmarshalling</div>
                    </div>

                    <ArrowRightIcon className="w-6 h-6 text-slate-500 hidden md:block" />
                    <div className="md:hidden text-slate-500 my-2">↓</div>

                    {/* Node 3: REST */}
                    <div className="flex flex-col items-center z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-3">
                            <ServerIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold">REST API</div>
                        <div className="text-xs text-slate-400 mt-1">Business Logic</div>
                    </div>

                    <ArrowRightIcon className="w-6 h-6 text-slate-500 hidden md:block" />
                    <div className="md:hidden text-slate-500 my-2">↓</div>

                    {/* Node 4: DB */}
                    <div className="flex flex-col items-center z-10 w-full md:w-auto">
                        <div className="w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-600/30 mb-3">
                            <CircleStackIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="font-bold">Database</div>
                        <div className="text-xs text-slate-400 mt-1">MySQL</div>
                    </div>
                </div>
            </div>

            {/* Explanations Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <DocumentTextIcon className="w-6 h-6 text-purple-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">Why SOAP & XML?</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mt-1">
                                We use SOAP as the <strong>Integration Gateway</strong>. In a university environment, strict data contracts are required. 
                                XML ensures that every Student Request adheres to a predefined XSD Schema. 
                                The SOAP layer handles the heavy lifting of validation and unmarshalling (converting XML to Java Objects).
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <ServerIcon className="w-6 h-6 text-emerald-700" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900">Why REST?</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mt-1">
                                Once the data is validated by SOAP, it is passed to the <strong>REST API</strong>. 
                                REST is lightweight and perfect for the web frontend (React) and mobile devices. 
                                It manages the lifecycle (CRUD) of the requests and stores them in the database.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Detail Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <h4 className="font-bold text-slate-800 mb-3">Technical Implementation Details</h4>
                <ul className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <strong>Frontend:</strong> React + Tailwind CSS (Generates XML)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <strong>Middleware:</strong> JAXB (Java Architecture for XML Binding)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <strong>Backend:</strong> Spring Boot REST Controller
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        <strong>AI Integration:</strong> Gemini API for request drafting
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};