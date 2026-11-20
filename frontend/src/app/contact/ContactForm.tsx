'use client';

import { Send } from "lucide-react";
import { useState } from "react";

export function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState('sending');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || 'We could not send your message.');
      form.reset();
      setFormState('sent');
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : 'We could not send your message.');
      setFormState('error');
    }
  };

  return (
    <form className="space-y-5 rounded-3xl border border-zinc-200 bg-white/40 p-8 shadow-xl backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-900/40" onSubmit={handleSubmit}>
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">Send Us a Message</h2>
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Name</label>
        <input id="contact-name" name="name" type="text" minLength={2} maxLength={80} required className="w-full rounded-xl border border-zinc-200 bg-white p-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800" placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
        <input id="contact-email" name="email" type="email" maxLength={254} required className="w-full rounded-xl border border-zinc-200 bg-white p-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800" placeholder="your@email.com" />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Subject</label>
        <select id="contact-subject" name="subject" required className="w-full rounded-xl border border-zinc-200 bg-white p-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800">
          <option>General Inquiry</option>
          <option>Bug Report</option>
          <option>Feature Request</option>
          <option>Business / Partnership</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Message</label>
        <textarea id="contact-message" name="message" rows={4} minLength={10} maxLength={5000} required className="w-full resize-none rounded-xl border border-zinc-200 bg-white p-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800" placeholder="Tell us how we can help..." />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" disabled={formState === 'sending'} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 active:scale-[0.98] disabled:bg-indigo-400">
        {formState === 'sending' ? 'Sending...' : formState === 'sent' ? 'Message sent' : <><Send className="h-4 w-4" />Send Message</>}
      </button>
      {formState === 'sent' && <p role="status" className="text-center text-sm text-emerald-600 dark:text-emerald-400">Thank you! Your message was delivered. We&apos;ll reply within 24-48 hours.</p>}
      {formState === 'error' && <p role="alert" className="text-center text-sm text-red-600 dark:text-red-400">{error} You can also email <a className="font-semibold underline" href="mailto:fastsitecheck@gmail.com">fastsitecheck@gmail.com</a>.</p>}
    </form>
  );
}
