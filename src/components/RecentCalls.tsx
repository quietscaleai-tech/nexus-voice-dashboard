import { ArrowUpRight } from 'lucide-react';

export default function RecentCalls() {
  const calls = [
    { id: 'TX-9029', caller: '+90 532 765 4321', type: 'Dental Appointment', duration: '3m 12s', status: 'Converted', sentiment: 'Satisfied' },
    { id: 'TX-9028', caller: '+90 505 456 7890', type: 'Hair Transplant Inquiry', duration: '4m 50s', status: 'Converted', sentiment: 'High Value' },
    { id: 'TX-9027', caller: '+90 555 123 4567', type: 'Pricing Verification', duration: '1m 45s', status: 'Resolved', sentiment: 'Neutral' },
  ];

  return (
    <div className="bg-[#101012]/80 backdrop-blur-md border border-zinc-800/40 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
        <div>
          <h3 className="text-base font-black tracking-wide text-zinc-200">Recent Operational Log</h3>
        </div>
        <button className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 bg-zinc-900/60 px-3 py-1.5 rounded-lg border border-zinc-800/40">
          View Complete Ledger <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 text-zinc-500 text-xs tracking-wider uppercase font-mono">
              <th className="py-3.5 px-4 font-bold">Session ID</th>
              <th className="py-3.5 px-4 font-bold">Caller Channel</th>
              <th className="py-3.5 px-4 font-bold">Duration</th>
              <th className="py-3.5 px-4 font-bold">Sentiment</th>
              <th className="py-3.5 px-4 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/40 text-xs font-mono">
            {calls.map((call) => (
              <tr key={call.id} className="hover:bg-zinc-900/20 transition-colors group">
                <td className="py-4 px-4 text-zinc-500 group-hover:text-zinc-300 font-bold">{call.id}</td>
                <td className="py-4 px-4 text-zinc-200 font-medium">{call.caller}</td>
                <td className="py-4 px-4 text-zinc-500">{call.duration}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 font-bold ${
                    call.sentiment === 'High Value' ? 'text-amber-400 bg-amber-950/20' :
                    call.sentiment === 'Satisfied' ? 'text-emerald-400 bg-emerald-950/20' : 'text-zinc-400 bg-zinc-800/40'
                  }`}>{call.sentiment}</span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className={`inline-block px-2 py-0.5 rounded font-bold tracking-wide uppercase border ${
                    call.status === 'Converted' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/40' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                  }`}>{call.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}