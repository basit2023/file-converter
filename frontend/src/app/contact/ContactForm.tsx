'use client';

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <form
      className="space-y-5 p-8 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold italic text-zinc-900 dark:text-white mb-2">Send Us a Message</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Name</label>
        <input
          type="text"
          required
          className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
        <input
          type="email"
          required
          className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
        <select className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
          <option>General Inquiry</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Business / Partnership</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
        <textarea
          rows={4}
          required
          className="w-full p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>
      <button
        type="submit"
        disabled={formState === 'sending'}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {formState === 'sending' ? (
          <>Sending...</>
        ) : formState === 'sent' ? (
          <>✓ Message Sent!</>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </button>
      {formState === 'sent' && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center italic">Thank you! We&apos;ll get back to you within 24-48 hours.</p>
      )}
    </form>
  );
}
