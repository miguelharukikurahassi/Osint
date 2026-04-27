import { Search, Settings as SettingsIcon, Shield, Database, History } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-800 p-6 hidden md:flex flex-col h-full z-20">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="text-blue-500 w-8 h-8" />
        <h2 className="text-xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
          OSINT<span className="text-neutral-500 text-sm ml-1">.hub</span>
        </h2>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        <button 
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
            activeTab === 'modules' 
            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
            : 'bg-transparent border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm font-medium">Módulos de Busca</span>
        </button>
        
        <button 
          className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-transparent border-transparent text-neutral-500 cursor-not-allowed text-left"
        >
          <History className="w-4 h-4" />
          <span className="text-sm font-medium">Histórico (Em Breve)</span>
        </button>

        <button 
          className="flex items-center gap-3 px-4 py-3 rounded-lg border bg-transparent border-transparent text-neutral-500 cursor-not-allowed text-left"
        >
          <Database className="w-4 h-4" />
          <span className="text-sm font-medium">Base de Dados (Local)</span>
        </button>
      </nav>

      <div className="mt-auto pt-6 border-t border-neutral-800/50">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left w-full ${
            activeTab === 'settings' 
            ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
            : 'bg-transparent border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
          }`}
        >
          <SettingsIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Configurações</span>
        </button>
      </div>
    </aside>
  );
}
