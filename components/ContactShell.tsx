
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Terminal, Loader2 } from 'lucide-react';

const ContactShell: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'sending') return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setStatus('sending');

    try {
      const response = await fetch("/api/workflow-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'agent', text: data.text || 'Message received. Transmission successful.' }]);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'agent', text: 'Error in uplink. Connection reset. Please try again.' }]);
      setStatus('idle');
    }

    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  };

  return (
    <section id="contact-shell" className="space-y-12 pb-20 scroll-mt-28">
      <div className="flex flex-col items-center text-center">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2">// OPEN_FREQUENCY</h3>
        <h2 className="text-4xl font-bold uppercase">Direkte Anfrage</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-neutral-950 border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-neutral-800">
           <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-500" />
              <span className="mono text-[10px] text-neutral-400">MODERN_WORKFLOW_CONTACT_v1.0</span>
           </div>
           <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
           </div>
        </div>

        {/* Console Body */}
        <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-6 space-y-4 mono text-sm scroll-smooth"
        >
          <div className="text-neutral-500">
            [SYS] Initializing secure frequency for collaboration...<br />
            [SYS] Ready to receive your message.
          </div>

          {messages.map((m, i) => (
            <div key={i} className={`${m.role === 'user' ? 'text-neutral-300' : 'text-blue-400'}`}>
              <span className="opacity-50">{m.role === 'user' ? '> USER: ' : '> AGENT: '}</span>
              {m.text}
            </div>
          ))}

          {status === 'sending' && (
            <div className="flex items-center gap-2 text-blue-500 italic">
               <Loader2 className="w-4 h-4 animate-spin" /> Transmitting data...
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-900 bg-neutral-950">
          <div className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Schreib mir eine Nachricht..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-3 mono text-sm focus:outline-none focus:border-blue-500 transition-colors pr-12 text-white"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-blue-500 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center mono text-[9px] text-neutral-600 uppercase tracking-tighter">
             <div className="flex gap-4">
                <span>ENCRYPTION: AES-256</span>
                <span>UPLINK: ACTIVE</span>
             </div>
             <div className="text-blue-500/50">MAXIMILIAN_UNVERRICHT // DIRECT_LINK</div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactShell;
