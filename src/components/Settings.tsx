import { useState, useEffect } from 'react';
import { Key, Save, AlertTriangle } from 'lucide-react';
import { getApiKey, setApiKey } from '../lib/api-keys';

export default function Settings() {
  const [githubKey, setGithubKey] = useState('');
  const [shodanKey, setShodanKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGithubKey(getApiKey('github'));
    setShodanKey(getApiKey('shodan'));
  }, []);

  const handleSave = () => {
    setApiKey('github', githubKey);
    setApiKey('shodan', shodanKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl">
      <header className="mb-8 border-b border-neutral-800/50 pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
          Configurações de APIs
        </h1>
        <p className="text-neutral-400 text-sm">
          Como este site é hospedado de forma estática (GitHub Pages), as chaves não ficam salvas em nosso servidor.
        </p>
      </header>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-5 mb-8 flex gap-4 text-amber-200 text-sm">
        <AlertTriangle className="w-6 h-6 flex-shrink-0 text-amber-500" />
        <div>
          <strong className="block text-amber-500 mb-1">Segurança em Primeiro Lugar (BYOK - Bring Your Own Key)</strong>
          Todas as chaves inseridas aqui são salvas <strong>apenas no seu navegador</strong> (via LocalStorage). Nenhuma chave é enviada para servidores de terceiros além das APIs oficiais (ex: GitHub, Shodan).
        </div>
      </div>

      <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 shadow-xl backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-6 text-neutral-200 flex items-center gap-2">
          <Key className="w-5 h-5 text-neutral-400" />
          Gerenciador de Credenciais
        </h3>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">GitHub Personal Access Token (Opcional)</label>
            <p className="text-xs text-neutral-500 mb-2">Aumenta o limite de requisições de 60/h para 5000/h nas buscas de username.</p>
            <input 
              type="password" 
              value={githubKey}
              onChange={(e) => setGithubKey(e.target.value)}
              placeholder="ghp_..."
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-neutral-200 placeholder:text-neutral-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1">Shodan API Key (Em Breve)</label>
            <p className="text-xs text-neutral-500 mb-2">Necessário para escaneamento de IPs e portas.</p>
            <input 
              type="password" 
              value={shodanKey}
              onChange={(e) => setShodanKey(e.target.value)}
              placeholder="Sua chave Shodan..."
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-neutral-200 placeholder:text-neutral-600"
            />
          </div>

          <div className="pt-4 border-t border-neutral-800/50 flex items-center justify-between">
            <button 
              onClick={handleSave}
              className="bg-neutral-100 hover:bg-white text-neutral-950 font-medium px-6 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Save className="w-4 h-4" />
              Salvar Chaves Localmente
            </button>
            {saved && <span className="text-emerald-400 text-sm animate-pulse">Chaves salvas com sucesso!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
