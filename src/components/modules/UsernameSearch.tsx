import { useState } from 'react';
import { User, AlertCircle, Loader2 } from 'lucide-react';
import { getApiKey } from '../../lib/api-keys';

export default function UsernameSearch() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const githubKey = getApiKey('github');
      
      const headers: HeadersInit = {
        'Accept': 'application/vnd.github.v3+json'
      };

      if (githubKey) {
        headers['Authorization'] = `Bearer ${githubKey}`;
      } else {
        console.warn('Aviso: Buscando sem API Key. Limites de requisição serão aplicados.');
      }

      // Consulta direta via Frontend (Client-side)
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers
      });
      
      const data = await res.json();

      if (res.status === 403 && data.message.includes('API rate limit')) {
        throw new Error('Limite de requisições excedido. Configure uma API Key do GitHub nas Configurações.');
      }

      if (res.status === 404) {
         throw new Error('Alvo não encontrado.');
      }
      if (!res.ok) throw new Error(data.message || 'Falha na API externa');
      
      // Sanitização básica no client
      setResult({
        module: 'GitHub OSINT',
        target: data.login,
        name: data.name,
        company: data.company,
        location: data.location,
        public_repos: data.public_repos,
        followers: data.followers,
        created_at: new Date(data.created_at).toLocaleDateString('pt-BR'),
        avatar: data.avatar_url,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-6 shadow-xl transition-all hover:border-blue-500/30 relative overflow-hidden group backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
        <span className="bg-blue-500/10 p-2 rounded-md border border-blue-500/20">
          <User className="w-4 h-4 text-blue-400" />
        </span>
        Investigação de Username (GitHub)
      </h3>
      
      <form onSubmit={handleSearch} className="flex gap-3 mb-4">
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Ex: defcon"
          className="flex-1 bg-neutral-950/80 border border-neutral-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-neutral-200 placeholder:text-neutral-600 shadow-inner"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600/90 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-lg text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Rastreando...' : 'Buscar'}
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-2 text-red-400/90 text-sm mt-3 bg-red-950/20 p-3 rounded-lg border border-red-900/30">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 flex gap-4">
          <div className="flex-shrink-0">
             <img src={result.avatar} alt="Avatar" className="w-16 h-16 rounded-lg border border-neutral-700 shadow-lg object-cover" />
          </div>
          <div className="flex-1 bg-neutral-950/80 p-4 rounded-lg text-xs font-mono overflow-x-auto text-emerald-400 border border-neutral-800/80 shadow-inner">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
