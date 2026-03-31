import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUploader } from "@/components/FileUploader";
import { CONVERSION_TYPES } from "@/constants/tools";
import { notFound } from "next/navigation";
import { ShieldCheck, Zap, Globe, MessageSquare, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = CONVERSION_TYPES.find(t => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  
  return {
    title: `Free ${tool.label} Converter Online | MoviFile`,
    description: `${tool.description} Convert ${tool.label.replace(' to ', ' files to ')} online for free with MoviFile. No registration, no downloads. Fast, secure, and private.`,
    keywords: [
      tool.label.toLowerCase(),
      `${tool.label.toLowerCase()} converter`,
      `free ${tool.label.toLowerCase()}`,
      `${tool.label.toLowerCase()} online`,
      `convert ${tool.label.toLowerCase().replace(' to ', ' to ')}`,
      'free file converter',
      'online converter',
      'MoviFile',
    ],
    alternates: {
      canonical: `https://movifile.com/tools/${slug}`,
    },
    openGraph: {
      title: `Free ${tool.label} Converter | MoviFile`,
      description: tool.description,
      url: `https://movifile.com/tools/${slug}`,
      siteName: 'MoviFile',
      type: 'website',
    },
  };
}

export function generateStaticParams() {
  return CONVERSION_TYPES.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = CONVERSION_TYPES.find(t => t.slug === slug);
  if (!tool) notFound();

  const relatedTools = CONVERSION_TYPES.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);
  const otherCategoryTools = CONVERSION_TYPES.filter(t => t.category !== tool.category).slice(0, 4);

  // JSON-LD for this tool page
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `MoviFile ${tool.label} Converter`,
    "url": `https://movifile.com/tools/${tool.slug}`,
    "description": tool.description,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqJsonLd = tool.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      
      <main className="grow container mx-auto px-4 py-12 space-y-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400">{tool.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-indigo-600 font-bold">{tool.label}</span>
        </nav>

        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] italic">
            Free <span className="text-indigo-600 dark:text-indigo-400">{tool.label}</span> Converter Online
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
            {tool.description} Fast, secure, and 100% free. No registration or software downloads required.
          </p>
        </section>

        {/* AdSense Space (Header) */}
        <div className="w-full max-w-4xl mx-auto h-[90px] bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs italic">
          --- Ad Space ---
        </div>

        {/* Converter Section */}
        <section className="scroll-mt-24">
          <FileUploader initialType={tool.id} />
        </section>

        {/* Tool Specific Content (SEO) */}
        <article className="max-w-4xl mx-auto space-y-12">
          {/* How to Use */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white italic">How to Convert {tool.label} Online for Free</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed italic">{tool.longDescription}</p>
            
            {/* Step by step */}
            <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">1</div>
                <h4 className="font-bold mb-1 italic text-zinc-900 dark:text-white">Upload File</h4>
                <p className="text-xs text-zinc-500 italic">Click or drag your file into the upload area above. Max 10MB.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">2</div>
                <h4 className="font-bold mb-1 italic text-zinc-900 dark:text-white">Convert</h4>
                <p className="text-xs text-zinc-500 italic">Click &quot;Convert Now&quot; and our server processes it in seconds.</p>
              </div>
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">3</div>
                <h4 className="font-bold mb-1 italic text-zinc-900 dark:text-white">Download</h4>
                <p className="text-xs text-zinc-500 italic">Your converted file is ready. Download it instantly.</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-8">
              <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50">
                <ShieldCheck className="h-6 w-6 text-indigo-600 mb-2" />
                <h4 className="font-bold mb-1 italic">Private &amp; Secure</h4>
                <p className="text-xs text-zinc-500 italic">We use SSL encryption and delete all files immediately after conversion. Your privacy is our priority.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50">
                <Zap className="h-6 w-6 text-emerald-600 mb-2" />
                <h4 className="font-bold mb-1 italic">Lightning Fast</h4>
                <p className="text-xs text-zinc-500 italic">Our global cloud network processes your files in seconds. No waiting in lines.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {tool.faqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white italic">{tool.label} — Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 gap-4">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2 italic">
                      <MessageSquare className="h-4 w-4 text-indigo-600" />
                      {faq.question}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 italic">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AdSense Space (Content) */}
          <div className="w-full h-[250px] bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 text-xs italic">
            --- Ad Space ---
          </div>

          {/* Related Tools (same category) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">Other {tool.category} Tools You May Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(t => (
                <Link 
                  key={t.slug} 
                  href={`/tools/${t.slug}`}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all bg-white dark:bg-zinc-900 text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{t.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-wide">{t.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cross-category tools */}
          {otherCategoryTools.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">More Popular Converters</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {otherCategoryTools.map(t => (
                  <Link 
                    key={t.slug} 
                    href={`/tools/${t.slug}`}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all bg-white dark:bg-zinc-900 text-center group"
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{t.icon}</div>
                    <div className="text-xs font-bold uppercase tracking-wide">{t.label}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
