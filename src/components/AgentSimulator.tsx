import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Terminal, CornerDownLeft, Disc } from 'lucide-react';
import Vapi from '@vapi-ai/web';

interface Message {
  role: 'user' | 'assistant' | 'system';
  text: string;
  time: string;
}

export default function AgentSimulator() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', text: 'Vapi WebRTC Audio Bridge Offline. Awaiting connection.', time: new Date().toLocaleTimeString() }
  ]);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  
  const vapiRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, aiSpeaking, isConnecting]);

  useEffect(() => {
    // Initialize Vapi Instance
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      setMessages([{ role: 'system', text: 'ERROR: VITE_VAPI_PUBLIC_KEY missing in .env', time: new Date().toLocaleTimeString() }]);
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setIsConnecting(false);
      setIsCallActive(true);
      setMessages([{ role: 'system', text: 'Secure WebRTC tunnel established. Hardware mic active.', time: new Date().toLocaleTimeString() }]);
    });

    vapi.on('call-end', () => {
      setIsCallActive(false);
      setIsConnecting(false);
      setAiSpeaking(false);
      setMessages((prev) => [...prev, { role: 'system', text: 'Session terminated gracefully.', time: new Date().toLocaleTimeString() }]);
    });

    vapi.on('speech-start', () => setAiSpeaking(true));
    vapi.on('speech-end', () => setAiSpeaking(false));

    vapi.on('message', (message: any) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setMessages((prev) => [...prev, {
          role: message.role,
          text: message.transcript,
          time: new Date().toLocaleTimeString()
        }]);
      }
    });

    vapi.on('error', (e: any) => {
      setIsConnecting(false);
      setMessages((prev) => [...prev, { role: 'system', text: `Pipeline Exception: ${e.message}`, time: new Date().toLocaleTimeString() }]);
    });

    return () => {
      vapi.stop();
    };
  }, []);

  const toggleCall = () => {
    if (isCallActive) {
      vapiRef.current?.stop();
    } else {
      const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;
      if (!assistantId) {
        setMessages((prev) => [...prev, { role: 'system', text: 'ERROR: VITE_VAPI_ASSISTANT_ID missing in .env', time: new Date().toLocaleTimeString() }]);
        return;
      }
      setIsConnecting(true);
      setMessages((prev) => [...prev, { role: 'system', text: 'Negotiating connection to Vapi edge node...', time: new Date().toLocaleTimeString() }]);
      vapiRef.current?.start(assistantId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col h-[560px] bg-[#101012]/80 backdrop-blur-md border border-zinc-800/40 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-zinc-950/60 px-5 py-3.5 border-b border-zinc-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <span className="font-mono text-xs text-zinc-400 font-bold tracking-wider">Live Voice Emulation Matrix</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 uppercase bg-zinc-900/60 px-2 py-1 rounded border border-zinc-800/40">
              <Disc className={`w-3 h-3 ${isConnecting ? 'text-amber-400 animate-spin' : isCallActive ? 'text-emerald-400 animate-pulse' : 'text-zinc-600'}`} />
              <span className={isCallActive ? 'text-emerald-400 font-bold' : ''}>
                {isConnecting ? 'Handshaking' : isCallActive ? 'Channel Open' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Live Transcript Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 font-mono text-xs">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${
                msg.role === 'system' ? 'items-center max-w-full my-4' : 
                msg.role === 'user' ? 'ml-auto items-end max-w-[85%]' : 'mr-auto items-start max-w-[85%]'
              }`}>
                {msg.role === 'system' ? (
                   <span className="text-[10px] text-zinc-500 tracking-wider bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800/50 uppercase font-bold">{msg.text}</span>
                ) : (
                  <>
                    <div className={`px-4 py-3 rounded-xl tracking-wide leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-zinc-800/80 text-zinc-100 rounded-br-none border border-zinc-700/30 shadow-xl' 
                        : 'bg-[#161619] text-emerald-50 rounded-bl-none border border-emerald-900/30 shadow-xl relative'
                    }`}>
                      <p>{msg.text}</p>
                    </div>
                    <span className="text-[9px] text-zinc-600 mt-1 px-1">{msg.time}</span>
                  </>
                )}
              </div>
            ))}
            
            {aiSpeaking && (
              <div className="flex items-center gap-4 py-2 text-xs text-zinc-500 bg-zinc-900/20 p-3 rounded-xl border border-zinc-900/40 max-w-[85%]">
                <div className="flex items-center gap-0.5 h-6 w-8 shrink-0">
                  <div className="w-1 bg-emerald-500 rounded-full animate-wave-1"></div>
                  <div className="w-1 bg-emerald-400 rounded-full animate-wave-2"></div>
                  <div className="w-1 bg-emerald-500 rounded-full animate-wave-3"></div>
                  <div className="w-1 bg-emerald-400 rounded-full animate-wave-4"></div>
                </div>
                <span className="font-mono text-[10px] text-emerald-500/70 tracking-widest uppercase">Receiving Audio Packet...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Huge Action Button Area */}
          <div className="p-6 border-t border-zinc-900/80 bg-[#08080a] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
             {isCallActive && !aiSpeaking && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/10 rounded-full animate-ping pointer-events-none"></div>
             )}
             
             <button
              onClick={toggleCall}
              disabled={isConnecting}
              className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                isCallActive
                  ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
                  : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
              } ${isConnecting ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-105 active:scale-95'}`}
            >
              {isConnecting ? (
                <Disc className="w-6 h-6 animate-spin" />
              ) : isCallActive ? (
                <Square className="w-6 h-6 fill-current" />
              ) : (
                <Mic className="w-7 h-7" />
              )}
            </button>

            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-zinc-500 relative z-10">
              {isConnecting ? 'Establishing WebRTC Tunnel...' : isCallActive ? 'Session Active - Tap to Terminate' : 'Initialize Voice Uplink'}
            </span>
          </div>
        </div>

        {/* Emulation Spec Sheet Sidebar Panel */}
        <div className="bg-[#101012]/80 backdrop-blur-md border border-zinc-800/40 rounded-2xl p-6 flex flex-col justify-between h-[560px] shadow-xl">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase font-black">Emulation Specification</h4>
              <p className="text-xs text-zinc-600 mt-1 font-mono leading-relaxed">Direct hardware WebRTC emulation layer. Replaces REST payloads with sub-500ms audio streaming.</p>
            </div>

            <div className="space-y-4 border-t border-zinc-900 pt-4 font-mono text-[11px]">
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                <span className="text-zinc-600 uppercase tracking-wider block text-[9px] font-bold">SDK Engine</span>
                <span className="text-zinc-300 mt-0.5 block font-bold tracking-widest">@vapi-ai/web</span>
              </div>
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                <span className="text-zinc-600 uppercase tracking-wider block text-[9px] font-bold">Payload Strategy</span>
                <span className="text-zinc-400 mt-0.5 block">Bi-directional WebSockets</span>
              </div>
              <div className="bg-zinc-900/40 p-3 rounded-xl border border-zinc-900">
                <span className="text-zinc-600 uppercase tracking-wider block text-[9px] font-bold">Audio Codec</span>
                <span className="text-emerald-500 mt-0.5 block font-bold tracking-wider">Opus (48kHz)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/30 border border-zinc-800/60 rounded-xl flex items-start gap-3 shadow-inner">
            <CornerDownLeft className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <p className="text-[10px] font-mono text-zinc-500 leading-relaxed">
              Vapi intercepts the microphone stream, handles VAD (Voice Activity Detection), processes the LLM response, and streams audio directly back to the browser buffer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}