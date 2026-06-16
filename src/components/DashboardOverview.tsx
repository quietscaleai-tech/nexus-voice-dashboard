import { Phone, Clock, Activity, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

export default function DashboardOverview() {
  const twilioNumber = import.meta.env.VITE_TWILIO_NUMBER || "+1234567890";

  const metrics = [
    { title: 'Total Handled Calls', value: '1,429', icon: Phone, change: '+14.2%', up: true, trend: [20, 35, 45, 30, 65, 80, 95] },
    { title: 'Avg Session Duration', value: '1m 58s', icon: Clock, change: '-11.4%', up: false, trend: [90, 80, 70, 75, 60, 55, 48] },
    { title: 'System Success Rate', value: '99.8%', icon: Activity, change: '+0.4%', up: true, trend: [98, 99, 99.2, 99.5, 99.6, 99.7, 99.8] },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-zinc-900/60 via-[#121215]/40 to-transparent border border-zinc-800/60 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl shadow-inner">
            <Globe className="w-6 h-6 text-zinc-400" />
          </div>
          <div>
            <h2 className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-bold">Active Inbound Telecom Endpoint</h2>
            <p className="text-2xl font-mono text-white mt-1 tracking-wider font-black">{twilioNumber}</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-3 py-1.5 bg-emerald-950/30 border border-emerald-900/50 rounded-lg text-[10px] font-mono text-emerald-400 font-bold tracking-wider uppercase">
            Voice Bridge Active
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, index) => (
          <div key={index} className="bg-[#101012]/80 backdrop-blur-md border border-zinc-800/40 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-[10px] font-mono font-bold text-zinc-500 tracking-widest uppercase">{m.title}</p>
                <p className="text-3xl font-black font-mono mt-2 tracking-tighter text-white">{m.value}</p>
              </div>
              <div className="p-2.5 bg-zinc-900/90 rounded-xl border border-zinc-800/80 text-zinc-400 group-hover:text-white transition-all shadow-lg shadow-black/40">
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="h-10 mt-6 flex items-end gap-1 w-full opacity-60 group-hover:opacity-100 transition-opacity">
              {m.trend.map((val, i) => (
                <div key={i} className={`w-full rounded-t transition-all duration-500 ${m.up ? 'bg-emerald-500/40 group-hover:bg-emerald-500' : 'bg-rose-500/40 group-hover:bg-rose-500'}`} style={{ height: `${val}%` }}></div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-900/60 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-600">vs historical baseline</span>
              <div className={`flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded ${m.up ? 'text-emerald-400 bg-emerald-950/20' : 'text-rose-400 bg-rose-950/20'}`}>
                {m.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <span>{m.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}