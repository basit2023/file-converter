import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUploader } from "@/components/FileUploader";
import { CONVERSION_TYPES } from "@/constants/tools";
import { notFound } from "next/navigation";
import { ShieldCheck, Zap, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { BLOG_POSTS } from "@/constants/blogs";

// Search titles are written from Search Console query data (Nov 2026).
// Keep them under ~50 characters so " | MoviFile" still fits in the result.
const SEARCH_TITLES: Record<string, string> = {
  'word-to-pdf': 'Word to PDF Converter Online Free – No Watermark',
  'pdf-to-jpg': 'PDF to JPG Converter Free – High Quality, No Email',
  'word-to-text': 'Word to Text Converter – DOCX to TXT Online Free',
  'word-to-html': 'Word to HTML Converter – Clean HTML5 Code, Free',
  'pdf-to-text': 'PDF to Text Converter Free – No Email, No Sign-Up',
  'png-to-gif': 'PNG to GIF Converter Online Free – Fast, No Sign-Up',
  'jpg-to-webp': 'JPG to WebP Converter – Smaller Images, Free Online',
  'image-resize': 'Resize Images Online Free – JPG, PNG & WebP',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = CONVERSION_TYPES.find(t => t.slug === slug);
  if (!tool) return { title: "Tool Not Found" };
  const title = SEARCH_TITLES[tool.id] ?? `${tool.label} Converter Online Free – No Sign-Up`;
  const description = tool.metaDescription;

  return {
    title,
    description,
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
  const featuredGuideSlug = tool.id === 'word-to-html'
    ? 'how-to-convert-word-to-html-for-clean-web-pages'
    : ['png-to-webp', 'webp-to-png', 'jpg-to-webp'].includes(tool.id)
      ? 'webp-vs-png-for-website-images'
      : tool.id === 'pdf-to-text'
        ? 'how-to-convert-a-scanned-pdf-to-editable-text-free'
        : tool.id === 'word-to-pdf'
    ? 'word-to-pdf-best-practices-before-sharing-a-document'
    : tool.id === 'image-resize'
      ? 'how-to-reduce-image-file-size-for-faster-website-loading'
      : tool.id === 'pdf-to-jpg'
        ? 'pdf-to-jpg-vs-pdf-to-png'
        : null;
  const featuredGuide = featuredGuideSlug
    ? BLOG_POSTS.find(post => post.slug === featuredGuideSlug)
    : null;

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
        "name": "All Tools",
        "item": "https://movifile.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.label,
        "item": `https://movifile.com/tools/${tool.slug}`
      }
    ]
  };

  const actionWord = tool.id === 'image-resize' ? 'Resize' : 'Convert';
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to ${actionWord} ${tool.label} Online`,
    "description": tool.description,
    "totalTime": "PT1M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Upload your file",
        "text": "Click or drag your file into the upload area. Files up to 50MB are supported.",
        "url": `https://movifile.com/tools/${tool.slug}#converter`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": actionWord,
        "text": `Click "Convert Now" and the server processes your ${tool.label} request in seconds.`,
        "url": `https://movifile.com/tools/${tool.slug}#converter`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Download the result",
        "text": "Your converted file is ready instantly. Click Download to save it.",
        "url": `https://movifile.com/tools/${tool.slug}#converter`
      }
    ]
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-white dark:bg-zinc-950">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <main className="container mx-auto grow space-y-14 px-4 py-8 md:py-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/tools" className="hover:text-indigo-600">{tool.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-indigo-600 font-bold">{tool.label}</span>
        </nav>

        {/* Hero Section */}
        <section className="relative mx-auto max-w-4xl space-y-5 text-center">
          <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" />
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-300">
            Free online converter
          </span>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-zinc-950 dark:text-white md:text-6xl">
            <span className="text-gradient">{tool.label}</span> Converter Online
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
            {tool.description} Use it free with no account, no email, and no software to install.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            {["No sign-up", "Files up to 50MB", "Source deleted after conversion"].map((item) => (
              <span key={item} className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Converter Section */}
        <section id="converter" className="scroll-mt-24 rounded-[2rem] bg-gradient-to-b from-indigo-50/70 to-transparent px-2 py-3 dark:from-indigo-950/20 md:px-6 md:py-6">
          <FileUploader initialType={tool.id} />
        </section>

        {/* Tool Specific Content (SEO) */}
        <article className="max-w-4xl mx-auto space-y-12">
          {/* How to Use */}
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">How to Convert {tool.label} Online for Free</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{tool.longDescription}</p>

            {tool.example && (
              <div className="not-prose space-y-4">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{tool.example.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{tool.example.intro}</p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <figure className="min-w-0 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <figcaption className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">{tool.example.inputLabel}</figcaption>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-zinc-800 dark:text-zinc-200"><code>{tool.example.input}</code></pre>
                  </figure>
                  <figure className="min-w-0 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
                    <figcaption className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{tool.example.outputLabel}</figcaption>
                    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-sm leading-6 text-zinc-800 dark:text-zinc-200"><code>{tool.example.output}</code></pre>
                  </figure>
                </div>
              </div>
            )}

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
                <p className="text-xs text-zinc-500">Transfers use HTTPS. Source uploads are deleted after conversion; converted outputs are removed after download starts or when you choose another file.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/50">
                <Zap className="h-6 w-6 text-emerald-600 mb-2" />
                <h4 className="font-bold mb-1">Lightning Fast</h4>
                <p className="text-xs text-zinc-500">Conversion runs on the server so the browser stays responsive. Processing time depends on file size, format, and service load.</p>
              </div>
            </div>

            {/* Unique long-form content */}
            {tool.sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{section.heading}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{section.body}</p>
              </div>
            ))}
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

          {featuredGuide && (
            <aside className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-cyan-50 p-7 dark:border-indigo-900 dark:from-indigo-950/50 dark:to-cyan-950/30 md:flex md:items-center md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-400">Recommended guide</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-zinc-950 dark:text-white">{featuredGuide.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{featuredGuide.description}</p>
              </div>
              <Link href={`/blog/${featuredGuide.slug}`} className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-indigo-200 md:mt-0">
                Read guide <ChevronRight className="h-4 w-4" />
              </Link>
            </aside>
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
