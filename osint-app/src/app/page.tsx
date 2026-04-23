import { Search, User, Mail, Globe, Monitor, Shield, Activity, Database } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-500/30">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">OSINT<span className="text-blue-500">Core</span></h1>
          </div>
          <div className="flex items-center gap-4 text-sm text-neutral-400">
            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-green-500" /> System Online</span>
            <span className="flex items-center gap-1.5"><Database className="w-4 h-4 text-blue-500" /> Connected</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Central Intelligence Dashboard</h2>
          <p className="text-neutral-400">Unified interface for public data collection and analysis.</p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ModuleCard title="Username Search" icon={<User className="w-6 h-6" />} color="bg-blue-500/10 text-blue-500" borderColor="border-blue-500/20" description="Check social media profiles and forums." />
          <ModuleCard title="Email Analysis" icon={<Mail className="w-6 h-6" />} color="bg-purple-500/10 text-purple-500" borderColor="border-purple-500/20" description="HIBP breaches and domain reputation." />
          <ModuleCard title="Domain Info" icon={<Globe className="w-6 h-6" />} color="bg-emerald-500/10 text-emerald-500" borderColor="border-emerald-500/20" description="WHOIS, DNS records, and subdomains." />
          <ModuleCard title="IP Intel" icon={<Monitor className="w-6 h-6" />} color="bg-orange-500/10 text-orange-500" borderColor="border-orange-500/20" description="Geolocation, ASN, and Shodan data." />
        </div>

        {/* Search Interface area */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-neutral-800">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Search className="w-5 h-5 text-neutral-400" /> Active Reconnaissance
            </h3>
          </div>
          
          <div className="p-6">
            <SearchForm />
          </div>
        </div>
      </main>
    </div>
  );
}

function ModuleCard({ title, icon, color, borderColor, description }: { title: string, icon: React.ReactNode, color: string, borderColor: string, description: string }) {
  return (
    <div className={`p-5 rounded-xl border ${borderColor} bg-neutral-900/50 hover:bg-neutral-800 transition-all cursor-pointer group`}>
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg text-neutral-200 mb-1">{title}</h3>
      <p className="text-sm text-neutral-500">{description}</p>
    </div>
  );
}

// Client component for the interactive search part
import SearchForm from "./SearchForm";
