import { useState } from 'react';
import Sidebar from './components/Sidebar';
import UsernameSearch from './components/modules/UsernameSearch';
import Settings from './components/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('modules');

  return (
    <div className="flex h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full"></div>

        {activeTab === 'modules' && (
          <div className="relative z-10">
            <header className="mb-10 border-b border-neutral-800/50 pb-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                Central de Inteligência
              </h1>
              <p className="text-neutral-400 text-sm">
                Selecione um módulo abaixo para iniciar a coleta de informações públicas.
              </p>
            </header>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UsernameSearch />
              
              <div className="bg-neutral-900/30 border border-neutral-800/50 rounded-xl p-6 border-dashed flex flex-col items-center justify-center opacity-60 text-center">
                <span className="text-2xl mb-2">🌐</span>
                <p className="font-medium text-neutral-300">Análise de Domínios</p>
                <p className="text-xs text-neutral-500 mt-1">Em breve</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="relative z-10">
            <Settings />
          </div>
        )}
      </main>
    </div>
  );
}
