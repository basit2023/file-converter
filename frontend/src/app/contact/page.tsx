import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Clock, MapPin } from "lucide-react";
import { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact MoviFile",
  description: "Contact the MoviFile team for support, feedback, or partnership questions about our free online file conversion tools. We reply within 24-48 hours.",
  alternates: {
    canonical: "https://movifile.com/contact",
  },
};

export default function Contact() {
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

          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
