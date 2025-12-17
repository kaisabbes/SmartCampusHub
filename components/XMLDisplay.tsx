import React from 'react';

interface XMLDisplayProps {
  xml: string;
  title?: string;
}

export const XMLDisplay: React.FC<XMLDisplayProps> = ({ xml, title = "SOAP Service Payload (XML)" }) => {
  return (
    <div className="mt-4 bg-slate-900 rounded-lg overflow-hidden border border-slate-700 shadow-sm">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">{title}</span>
        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Valid XSD</span>
      </div>
      <pre className="p-4 overflow-x-auto custom-scrollbar">
        <code className="text-xs font-mono text-blue-300 whitespace-pre">
          {xml}
        </code>
      </pre>
    </div>
  );
};