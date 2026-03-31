import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUploader } from "@/components/FileUploader";
import { ShieldCheck, Zap, Globe, Lock, ArrowRight, CheckCircle2, FileText, Image, FileCode } from "lucide-react";
import { CONVERSION_TYPES, CATEGORIES } from "@/constants/tools";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Blobs */}
      <div className="bg-blob top-[-100px] left-[-100px] opacity-70"></div>
      <div className="bg-blob bottom-[-100px] right-[-100px] delay-2000 opacity-50 bg-indigo-400/20"></div>
      <div className="bg-blob top-[40%] left-[20%] delay-4000 opacity-30 bg-purple-400/20"></div>

      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 space-y-24 relative z-10">
        
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Zap className="h-3 w-3" />
            Fast &amp; Free Forever
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] italic">
            Free Online <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">File Converter</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
            Convert PDF, Word, JPG, PNG, WebP, and GIF files instantly. No registration, no software downloads — just upload, convert, and download. 100% free and secure.
          </p>
        </section>

        {/* AdSense Space (Header) */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs italic">
          --- Ad Space ---
        </div>

        {/* Converter Section */}
        <section id="converter" className="scroll-mt-24">
          <FileUploader />
        </section>

        {/* How It Works */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold italic text-zinc-900 dark:text-white">How to Convert Files Online with MoviFile</h2>
            <p className="text-zinc-500 italic text-sm max-w-xl mx-auto">Converting files has never been easier. Follow these three simple steps to transform any document or image format in seconds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload Your File', desc: 'Click the upload area or drag and drop your file. We support PDF, Word (.docx), JPG, PNG, WebP, and GIF formats up to 10MB.' },
              { step: '2', title: 'Choose Output Format', desc: 'Select your desired conversion type from our 17+ conversion options. Pick from image, PDF, or document categories.' },
              { step: '3', title: 'Download Result', desc: 'Click "Convert Now" and your file will be processed in seconds. Download the converted file instantly — no waiting, no email required.' },
            ].map((item) => (
              <div key={item.step} className="relative p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all group text-center">
                <div className="bg-indigo-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-extrabold mx-auto mb-4 group-hover:scale-110 transition-transform">{item.step}</div>
                <h3 className="text-xl font-bold mb-2 italic text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed italic">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* All Tools Grid (SEO Internal Linking) */}
        <section id="tools" className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold italic text-zinc-900 dark:text-white">All Free Conversion Tools</h2>
            <p className="text-zinc-500 italic text-sm max-w-xl mx-auto">Explore our complete collection of file conversion tools. Each tool has its own dedicated page with detailed instructions and FAQs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {CATEGORIES.map(category => (
              <div key={category} className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 pl-2 border-l-4 border-indigo-600 italic">{category} Tools</h3>
                <div className="grid grid-cols-1 gap-3">
                  {CONVERSION_TYPES.filter(t => t.category === category).map(tool => (
                    <Link 
                      key={tool.slug} 
                      href={`/tools/${tool.slug}`}
                      className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all hover:shadow-lg hover:shadow-indigo-500/5"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                        <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">{tool.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold italic text-zinc-900 dark:text-white">Why Thousands Trust MoviFile</h2>
            <p className="text-zinc-500 italic text-sm max-w-xl mx-auto">We built MoviFile with the core principles of privacy, speed, and accessibility. Here is what sets us apart from other online converters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all group">
              <div className="bg-indigo-600/10 p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Lock className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 italic">100% Private &amp; Secure</h3>
              <p className="text-zinc-500 text-sm leading-relaxed italic">Your files are encrypted during transfer and automatically deleted from our servers after conversion. We never read, share, or store your documents.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all group">
              <div className="bg-emerald-600/10 p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Zap className="text-emerald-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 italic">Cloud-Powered Speed</h3>
              <p className="text-zinc-500 text-sm leading-relaxed italic">High-speed dedicated servers process your conversions in milliseconds, even for the largest files. No waiting queues, no delays.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all group">
              <div className="bg-orange-600/10 p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Globe className="text-orange-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 italic">Works Everywhere</h3>
              <p className="text-zinc-500 text-sm leading-relaxed italic">Convert anywhere, anytime, on any device. Fully responsive design works seamlessly on mobile phones, tablets, and desktop computers.</p>
            </div>
          </div>
        </section>

        {/* Organic Content / SEO Block */}
        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold italic text-zinc-900 dark:text-white text-center">The Best Free Online File Converter in 2026</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-600 dark:text-zinc-400">
            <p className="leading-relaxed">
              MoviFile is a comprehensive, cloud-based file conversion platform that allows you to convert documents, images, and PDFs between multiple formats without installing any software. Whether you need to <Link href="/tools/pdf-to-word" className="text-indigo-600 hover:underline font-semibold">convert a PDF to Word</Link>, transform a <Link href="/tools/jpg-to-png" className="text-indigo-600 hover:underline font-semibold">JPG image to PNG</Link>, or extract text from a document — MoviFile handles it all in seconds.
            </p>
            <p className="leading-relaxed">
              Unlike many online converters, MoviFile requires no registration, no email, and no payment. We believe that essential file conversion tools should be free and accessible to everyone — students, professionals, freelancers, and businesses alike. All file processing is done securely over encrypted connections, and your files are permanently deleted from our servers immediately after conversion.
            </p>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white italic">Supported File Formats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <Image className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-bold text-zinc-900 dark:text-white">Image Formats</h4>
                </div>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> JPG / JPEG</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> PNG</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> WebP</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> GIF</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-bold text-zinc-900 dark:text-white">Document Formats</h4>
                </div>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> PDF</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Word (.docx)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Plain Text (.txt)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> HTML</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <FileCode className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-bold text-zinc-900 dark:text-white">Key Features</h4>
                </div>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> No Registration</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> SSL Encrypted</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Auto File Deletion</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-emerald-500" /> Mobile Friendly</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white italic">Frequently Asked Questions</h3>
          </div>
          
          {/* Homepage FAQs for SEO */}
          <div className="grid grid-cols-1 gap-4">
            {[
              { q: 'Is MoviFile really free?', a: 'Yes, MoviFile is 100% free to use. There are no hidden charges, premium tiers, or usage limits. All 17+ conversion tools are available to everyone without registration.' },
              { q: 'Is it safe to upload my files to MoviFile?', a: 'Absolutely. All file transfers are encrypted using SSL/TLS. Your uploaded files are processed in real-time and permanently deleted from our servers immediately after conversion. We never store, read, or share your documents.' },
              { q: 'What file formats does MoviFile support?', a: 'MoviFile supports a wide range of formats including JPG, PNG, WebP, GIF, PDF, Word (DOCX), Plain Text (TXT), and HTML. We offer 17+ conversion combinations across image, PDF, and document categories.' },
              { q: 'Do I need to install anything?', a: 'No. MoviFile is a browser-based tool that works on any device — desktop, laptop, tablet, or smartphone. No downloads or software installations are required.' },
              { q: 'What is the maximum file size?', a: 'Currently, MoviFile supports files up to 10MB in size. This covers most documents, images, and PDFs for standard use.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <h4 className="font-bold text-zinc-900 dark:text-white mb-2 italic">{faq.q}</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AdSense Space (Footer) */}
        <div className="w-full h-[250px] bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs italic">
          --- Ad Space ---
        </div>

      </main>

      <Footer />
    </div>
  );
}
