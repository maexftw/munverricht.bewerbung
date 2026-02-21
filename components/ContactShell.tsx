import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, Terminal, Send, Loader2 } from 'lucide-react';

const ContactShell: React.FC = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [messages, setMessages] = useState<{role: 'user' | 'sys', text: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'sending') return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setStatus('sending');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error('Connection reset. System offline.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'sys', text: data.text || 'Message received. Transmission successful.' }]);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'sys', text: 'Uplink error. Please use direct channels below.' }]);
      setStatus('idle');
    }
  };

  return (
    <section id="contact-shell" className="space-y-12 pb-20 scroll-mt-28">
      <div className="flex flex-col items-center text-center">
        <h3 className="mono text-blue-500 text-xs tracking-widest uppercase mb-2" aria-hidden="true">// OPEN_FREQUENCY</h3>
        <h2 className="text-4xl font-bold uppercase">Direkter Kontakt</h2>
      </div>

      <div className="max-w-3xl mx-auto bg-[#111111] border border-blue-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.1)]">
        {/* Terminal Header */}
        <div className="bg-neutral-900 px-4 py-2 flex justify-between items-center border-b border-neutral-800" aria-hidden="true">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-500" />
            <span className="mono text-[10px] text-neutral-400">MODERN_WORKFLOW_v2.0</span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/50" />
          </div>
        </div>

        <div className="p-6 space-y-6 mono text-sm">
          {/* Console Body */}
          <div
            ref={scrollRef}
            className="h-48 overflow-y-auto space-y-4 border-b border-neutral-800/50 pb-6 mb-4 scroll-smooth"
            role="status"
            aria-live="polite"
          >
            <div className="text-neutral-500">
              [SYS] Initializing secure frequency for collaboration...<br />
              [SYS] High-performance uplink ready.
            </div>

            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-neutral-300' : 'text-blue-400'}>
                <span className="opacity-50">{m.role === 'user' ? '> USER: ' : '> SYS: '}</span>
                {m.text}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="System-Prompt eingeben..."
              disabled={status === 'sending'}
              className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-3 pr-12 text-neutral-200 focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-neutral-700"
              aria-label="Nachricht an das System"
            />
            <button
              type="submit"
              disabled={status === 'sending' || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-blue-500 disabled:opacity-30 disabled:hover:text-neutral-500 transition-colors"
              aria-label="Senden"
            >
              {status === 'sending' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>

          <div className="grid gap-4 sm:grid-cols-2 mt-8">
            <a
              href="mailto:info@graphiks.de"
              className="bg-neutral-900 border border-neutral-800 rounded px-4 py-4 hover:border-blue-500/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-colors"
            >
              <span className="flex items-center gap-2 text-blue-400 mb-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span className="mono text-[10px] uppercase tracking-widest">E-Mail</span>
              </span>
              <span className="text-neutral-100 text-sm break-all">info@graphiks.de</span>
            </a>

            <a
              href="tel:+491633229892"
              className="bg-neutral-900 border border-neutral-800 rounded px-4 py-4 hover:border-blue-500/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-colors"
            >
              <span className="flex items-center gap-2 text-blue-400 mb-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="mono text-[10px] uppercase tracking-widest">Handynummer</span>
              </span>
              <span className="text-neutral-100 text-sm">+49 163 3229892</span>
            </a>
          </div>

          <div className="mt-4 flex justify-between items-center mono text-[9px] text-neutral-600 uppercase tracking-tighter" aria-hidden="true">
            <div className="flex gap-4">
              <span>MODERN WORKFLOW</span>
              <span>STATUS: ACTIVE</span>
            </div>
            <div className="text-blue-500/50">MAXIMILIAN_UNVERRICHT // DIRECT_LINK</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactShell;
