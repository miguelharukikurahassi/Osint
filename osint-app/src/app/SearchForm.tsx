"use client";

import { useState } from "react";
import { Loader2, Search, Download, AlertCircle } from "lucide-react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("username");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      // Endpoint to our secure Next.js API route
      const response = await fetch(`/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, type: searchType }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setResults(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all min-w-[150px]"
        >
          <option value="username">Username</option>
          <option value="email">E-mail</option>
          <option value="domain">Domain</option>
          <option value="ip">IP Address</option>
        </select>
        
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-neutral-500" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${searchType} to investigate...`}
            className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-neutral-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Run Scan"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Results Area */}
      {results && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-neutral-200">Analysis Results</h4>
            <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1.5 bg-blue-500/10 px-3 py-1.5 rounded-md transition-colors">
              <Download className="w-4 h-4" /> Export JSON
            </button>
          </div>
          
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-1 overflow-x-auto">
            <pre className="text-sm text-green-400 p-4 font-mono">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
