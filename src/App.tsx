import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import RecentCalls from './components/RecentCalls';
import AgentSimulator from './components/AgentSimulator';
import WebhookTerminal from './components/WebhookTerminal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'overview' | 'simulator'>('simulator');

  return (
    <div className="flex min-h-screen bg-[#050507] text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-zinc-700/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative z-10 flex flex-col justify-between">
        <div className="space-y-8 flex-1">
          <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800/80 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-emerald-500 font-bold uppercase bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-900/40">v3.0 Voice-Native Prototype</span>
              </div>
              <h1 className="text-3xl font-black tracking-widest text-zinc-400 mt-2">
                NEXUS <span className="text-white font-light">COMMAND</span>
              </h1>
              <p className="text-xs text-zinc-500 tracking-wider mt-0.5 uppercase font-mono">Enterprise Cognitive Architecture</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 px-4 py-2.5 rounded-xl shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-zinc-300 tracking-widest uppercase font-bold">NODE_STREAM_LIVE</span>
              </div>
            </div>
          </header>

          {currentTab === 'overview' ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2 space-y-8">
                <DashboardOverview />
                <RecentCalls />
              </div>
              <div className="xl:col-span-1">
                <WebhookTerminal />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2">
                <AgentSimulator />
              </div>
              <div className="xl:col-span-1">
                <WebhookTerminal />
              </div>
            </div>
          )}
        </div>

        <footer className="mt-12 pt-6 border-t border-zinc-900 text-center sm:text-left flex flex-col sm:flex-row justify-between text-[11px] font-mono text-zinc-600 gap-2">
          <span>&copy; 2026 NEXUS TELECOM LABS. ALL RIGHTS RESERVED.</span>
          <span className="tracking-widest">SYSTEM SECURE // WEBRTC LATENCY: ~400MS</span>
        </footer>
      </main>
    </div>
  );
}