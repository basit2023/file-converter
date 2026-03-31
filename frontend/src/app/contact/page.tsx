'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, Clock, Send, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('sent'), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 italic text-zinc-900 dark:text-white">Contact Us</h1>
        <p className="text-lg text-zinc-500 mb-12 max-w-2xl">We&apos;re here to help. Whether you have a question about our file conversion tools, need technical support, or want to share feedback — our team is ready to assist you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white italic">Email Us</h3>
                  <p className="text-sm text-zinc-500">support@movifile.com</p>
                  <p className="text-xs text-zinc-400 mt-1">For general inquiries and support</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                  <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white italic">Response Time</h3>
                  <p className="text-sm text-zinc-500">We typically respond within 24-48 hours.</p>
                  <p className="text-xs text-zinc-400 mt-1">Monday to Friday, 9 AM - 6 PM (UTC)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                  <MapPin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white italic">Location</h3>
                  <p className="text-sm text-zinc-500">Serving users worldwide</p>
                  <p className="text-xs text-zinc-400 mt-1">100% online service — no office visits</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/50">
              <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2 italic">💡 Before You Write</h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300">Check our FAQ sections on individual tool pages — your question may already be answered there! Each tool page has dedicated frequently asked questions.</p>
            </div>
          </div>

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
        </div>
      </main>
      <Footer />
    </div>
  );
}
