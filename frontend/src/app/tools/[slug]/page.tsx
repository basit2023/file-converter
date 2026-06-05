import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUploader } from "@/components/FileUploader";
import { CONVERSION_TYPES } from "@/constants/tools";
import { notFound } from "next/navigation";
import { ShieldCheck, Zap, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = CONVERSION_TYPES.find(t => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  const isImageResize = tool.id === 'image-resize';
  const title = isImageResize ? 'Free Image Resizer Online - Resize JPG, PNG, WebP' : `Free ${tool.label} Converter Online`;
  const description = isImageResize
    ? 'Resize images online for free with custom width, height, fit mode, and output format. Resize JPG, PNG, and WebP files securely with MoviFile.'
    : `${tool.description} Convert ${tool.label.replace(' to ', ' files to ')} online for free with MoviFile. No registration, no downloads. Fast, secure, and private.`;
  
  return {
    title,
    description,
    keywords: [
      tool.label.toLowerCase(),
      ...(isImageResize ? [
        'image resize',
        'image resizer',
        'resize image online',
        'resize JPG',
        'resize PNG',
        'resize WebP',
        'custom image size',
        'resize photo online',
        'free image resizer',
      ] : []),
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
      title,
      description,
      url: `https://movifile.com/tools/${slug}`,
      siteName: 'MoviFile',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `MoviFile ${tool.label} converter`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/og-image.png',
          alt: `MoviFile ${tool.label} converter`,
        },
      ],
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://movifile.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${tool.category} Tools`,
        "item": "https://movifile.com/#tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.label,
        "item": `https://movifile.com/tools/${tool.slug}`
      }
    ]
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <main className="grow container mx-auto px-4 py-10 space-y-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-400">{tool.category}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-indigo-600 font-bold">{tool.label}</span>
        </nav>

        {/* Hero Section */}
        <section className="text-center space-y-5 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            Free <span className="text-indigo-600 dark:text-indigo-400">{tool.label}</span> Converter Online
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {tool.description} Fast, secure, and 100% free. No registration or software downloads required.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            {["Upload", "Convert", "Download"].map((step) => (
              <span key={step} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 dark:border-zinc-800 dark:bg-zinc-900">
                {step}
              </span>
            ))}
          </div>
        </section>

        {/* Converter Section */}
        <section className="scroll-mt-24">
          <FileUploader initialType={tool.id} />
        </section>

        {/* Tool Specific Content (SEO) */}
        <article className="max-w-4xl mx-auto space-y-12">
          {/* How to Use */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">How to Convert {tool.label} Online for Free</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{tool.longDescription}</p>
            
            {/* Step by step */}
            <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">1</div>
                <h4 className="font-bold mb-1 text-zinc-900 dark:text-white">Upload File</h4>
                <p className="text-xs text-zinc-500">Click or drag your file into the upload area above. Max 50MB.</p>
              </div>
              <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">2</div>
                <h4 className="font-bold mb-1 text-zinc-900 dark:text-white">Convert</h4>
                <p className="text-xs text-zinc-500">Click &quot;Convert Now&quot; and our server processes it in seconds.</p>
              </div>
              <div className="p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-extrabold mx-auto mb-3">3</div>
                <h4 className="font-bold mb-1 text-zinc-900 dark:text-white">Download</h4>
                <p className="text-xs text-zinc-500">Your converted file is ready. Download it instantly.</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-8">
              <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50">
                <ShieldCheck className="h-6 w-6 text-indigo-600 mb-2" />
                <h4 className="font-bold mb-1">Private &amp; Secure</h4>
                <p className="text-xs text-zinc-500">We use SSL encryption and delete all files immediately after conversion. Your privacy is our priority.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50">
                <Zap className="h-6 w-6 text-emerald-600 mb-2" />
                <h4 className="font-bold mb-1">Lightning Fast</h4>
                <p className="text-xs text-zinc-500">Our global cloud network processes your files in seconds. No waiting in lines.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {tool.faqs.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">{tool.label} - Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 gap-4">
                {tool.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-indigo-600" />
                      {faq.question}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Tools (same category) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Other {tool.category} Tools You May Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTools.map(t => (
                <Link 
                  key={t.slug} 
                  href={`/tools/${t.slug}`}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all bg-white dark:bg-zinc-900 text-center group"
                >
                  <div className="mx-auto mb-2 flex h-8 min-w-12 items-center justify-center rounded bg-zinc-100 px-2 text-[10px] font-black text-zinc-700 transition-transform group-hover:scale-105 dark:bg-zinc-800 dark:text-zinc-200">{t.icon}</div>
                  <div className="text-xs font-bold uppercase tracking-wide">{t.label}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Cross-category tools */}
          {otherCategoryTools.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">More Popular Converters</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {otherCategoryTools.map(t => (
                  <Link 
                    key={t.slug} 
                    href={`/tools/${t.slug}`}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 transition-all bg-white dark:bg-zinc-900 text-center group"
                  >
                    <div className="mx-auto mb-2 flex h-8 min-w-12 items-center justify-center rounded bg-zinc-100 px-2 text-[10px] font-black text-zinc-700 transition-transform group-hover:scale-105 dark:bg-zinc-800 dark:text-zinc-200">{t.icon}</div>
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
