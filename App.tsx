import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { UserRole } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar 
        role={role} 
        setRole={setRole} 
        onOpenArchitecture={() => setShowArchitecture(true)}
      />
      
      <main className="mt-6">
        {role === UserRole.STUDENT ? <StudentDashboard /> : <AdminDashboard />}
      </main>
      
      {/* Modal for Architecture Explanation */}
      {showArchitecture && (
        <ArchitectureViewer onClose={() => setShowArchitecture(false)} />
      )}

      {/* Footer to explain the project context */}
      <footer className="fixed bottom-0 w-full bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-400 z-40">
        Smart Campus Hub • Distributed Systems Project • XML / SOAP / REST Demo
      </footer>
    </div>
  );
};

export default App;