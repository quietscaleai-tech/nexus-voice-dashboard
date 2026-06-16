import { useState, useEffect } from 'react';
import { Terminal, Shield, RefreshCw } from 'lucide-react';

interface LogLine { id: number; time: string; type: string; message: string; }

export default function WebhookTerminal() {
  const [logs, setLogs] = useState<LogLine[]>([]);

  useEffect(() => {
    const initialLogs = [
      { id: 1, time: new Date(Date.now() - 60000).toLocaleTimeString(), type: 'SECURE', message: 'Vapi WebRTC pathways active.' },
      { id: 2, time: new Date().toLocaleTimeString(), type: 'VAPI', message: 'Awaiting client WebSocket initialization.' },
    ];
    setLogs(initialLogs);
  }, []);

  return (
    <div className="bg-[#0b0b0d]/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl h-[720px] flex flex-col justify-between">
      <div>
        <div className="bg-zinc-950/60 px-5 py-4 border-b border-zinc-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500 animate-pulse-slow" />
            <span className="font-mono text-xs text-zinc-300 font-bold tracking-widest">SYSTEM MONITOR</span>
          </div>
        </div>
        <div className="p-4 overflow-y-auto space-y-3 font-mono text-[10px] leading-relaxed">
          {logs.map((log) => (
            <div key={log.id} className="border-b border-zinc-900/30 pb-2">
              <span className="text-zinc-600 font-medium mr-2">{log.time}</span>
              <span className="text-zinc-400 tracking-wide">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}