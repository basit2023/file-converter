import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Zap, ShieldCheck, Globe, Heart, Users, Award, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About MoviFile | Free Online File Converter",
  description: "Learn about MoviFile, the free online file converter trusted by thousands of users worldwide. Fast, secure, and private file conversions with no registration required.",
};

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-16 max-w-5xl space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold italic text-zinc-900 dark:text-white leading-tight">
            About <span className="text-indigo-600 dark:text-indigo-400">MoviFile</span>
          </h1>
          <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            MoviFile was born from a simple need: a fast, secure, and reliable way to convert files online without installing any software, signing up, or worrying about privacy. We believe that professional-grade conversion tools should be free and accessible to everyone.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Conversion Tools', value: '17+' },
            { label: 'Formats Supported', value: '10+' },
            { label: 'Max File Size', value: '10MB' },
            { label: 'Registration', value: 'None' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 italic">{stat.value}</div>
              <div className="text-sm text-zinc-500 mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Core Values */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center italic text-zinc-900 dark:text-white">Why Choose MoviFile?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all group">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="font-bold text-xl mb-3 italic text-zinc-900 dark:text-white">Lightning Speed</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">Our cloud-powered servers process your file conversions in seconds, not minutes. Whether you&apos;re converting a PDF to Word or a JPG to PNG, the result is ready almost instantly.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all group">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-xl mb-3 italic text-zinc-900 dark:text-white">Privacy First</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">We use SSL encryption for all file transfers and automatically delete uploaded files immediately after conversion. Your documents, images, and data never leave our secure pipeline.</p>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all group">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="font-bold text-xl mb-3 italic text-zinc-900 dark:text-white">Universal Access</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">No downloads, no installations, no sign-ups. MoviFile works on any device with a browser — desktop, tablet, or mobile. Convert files from anywhere in the world, anytime.</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-3xl mx-auto space-y-6 text-center">
          <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-full w-fit mx-auto">
            <Heart className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-3xl font-bold italic text-zinc-900 dark:text-white">Our Mission</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our mission is to democratize file conversion by providing the best free tools on the internet. We believe that converting a PDF to Word, compressing an image, or transforming file formats should never require expensive software or a subscription. MoviFile is built for students, professionals, freelancers, and anyone who needs quick and reliable file conversions without the hassle.
          </p>
        </section>

        {/* What We Offer */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-center italic text-zinc-900 dark:text-white">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: '🖼️', title: 'Image Conversions', desc: 'Convert between JPG, PNG, WebP, and GIF formats. Optimize images for web, social media, or print with one click.' },
              { icon: '📄', title: 'PDF Tools', desc: 'Extract text from PDFs, convert PDF to Word (.docx), or turn PDF pages into JPG/PNG images for sharing and presentations.' },
              { icon: '📝', title: 'Document Tools', desc: 'Transform Word documents to PDF for universal sharing, extract raw text, or convert to clean HTML for web publishing.' },
              { icon: '🔒', title: 'Secure Processing', desc: 'Every file is processed over encrypted connections. We never store your files permanently — they are deleted immediately after conversion.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                <div className="text-3xl flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1 italic text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-3xl font-extrabold mb-4 italic">Ready to Convert Your Files?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-xl mx-auto">Join thousands of users who trust MoviFile for fast, free, and secure file conversions every day.</p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold py-3 px-8 rounded-xl hover:bg-zinc-100 transition-colors shadow-lg"
          >
            Start Converting <ArrowRight className="h-5 w-5" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
