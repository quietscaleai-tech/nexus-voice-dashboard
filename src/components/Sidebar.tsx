import { LayoutDashboard, Terminal, Shield, Radio, Layers, Cpu } from 'lucide-react';

interface SidebarProps {
  currentTab: 'overview' | 'simulator';
  setCurrentTab: (tab: 'overview' | 'simulator') => void;
}

export default function Sidebar({ currentTab, setCurrentTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-zinc-800/40 bg-[#08080a]/90 backdrop-blur-xl flex flex-col justify-between p-6 relative z-20">
      <div className="space-y-10">
        <div className="flex items-center gap-3 px-2 py-4 border-b border-zinc-900">
          <div className="p-2 bg-emerald-950/40 border border-emerald-800/40 rounded-lg">
            <Radio className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="font-mono text-xs tracking-widest font-black text-zinc-200 block">YAPAY ZEKA</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block">Voice Assistant</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase font-bold tracking-[0.2em] text-zinc-600 px-3 block mb-3">Core Engines</span>
          <nav className="space-y-1">
            <button
              onClick={() => setCurrentTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all group ${
                currentTab === 'overview'
                  ? 'bg-zinc-900/80 text-white shadow-xl border border-zinc-800/60'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className={`w-4 h-4 ${currentTab === 'overview' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                <span>Overview Matrix</span>
              </div>
              {currentTab === 'overview' && <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"></span>}
            </button>
            
            <button
              onClick={() => setCurrentTab('simulator')}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all group ${
                currentTab === 'simulator'
                  ? 'bg-zinc-900/80 text-white shadow-xl border border-zinc-800/60'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <Terminal className={`w-4 h-4 ${currentTab === 'simulator' ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                <span>Agent Simulator</span>
              </div>
              {currentTab === 'simulator' && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)]"></span>}
            </button>
          </nav>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-mono uppercase font-bold tracking-[0.2em] text-zinc-600 px-3 block">Subsystems</span>
          <div className="space-y-1 px-3 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2 py-1.5"><Layers className="w-3.5 h-3.5 text-zinc-700" /> Vapi Voice WebRTC</div>
            <div className="flex items-center gap-2 py-1.5"><Cpu className="w-3.5 h-3.5 text-zinc-700" /> OpenAI GPT-4o</div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900/80 pt-4 flex items-center gap-3 px-2 text-zinc-600">
        <Shield className="w-4 h-4 text-zinc-700" />
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase font-bold text-zinc-500">TLS 1.3 ENCRYPTED</span>
      </div>
    </aside>
  );
}