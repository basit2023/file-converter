import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONVERSION_TYPES, CATEGORIES } from "@/constants/tools";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "All File Conversion Tools | MoviFile" },
  description: "Browse every free MoviFile converter for PDF, Word, and image files. Convert, resize, and extract with 17+ tools. No sign-up, files up to 50MB.",
  alternates: {
    canonical: "https://movifile.com/tools",
  },
  openGraph: {
    title: "All File Conversion Tools | MoviFile",
    description: "Browse every free MoviFile converter for PDF, Word, and image files.",
    url: "https://movifile.com/tools",
    siteName: "MoviFile",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoviFile file conversion tools",
      },
    ],
  },
};

const CATEGORY_INTROS: Record<string, string> = {
  Image: "Convert and resize JPG, PNG, WebP, and GIF images. Switch formats for smaller files, transparency, or wider compatibility, and resize to exact dimensions.",
  PDF: "Turn PDFs into editable Word documents, plain text, or high-resolution JPG and PNG images. Extract content or capture pages without a PDF reader.",
  Document: "Convert Word documents to PDF, clean HTML, or plain text. Lock your layout for sharing, prepare content for the web, or strip formatting for data work.",
};

export default function ToolsIndex() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MoviFile File Conversion Tools",
    itemListElement: CONVERSION_TYPES.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${tool.label} Converter`,
      url: `https://movifile.com/tools/${tool.slug}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://movifile.com" },
      { "@type": "ListItem", position: 2, name: "All Tools", item: "https://movifile.com/tools" },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="grow">
        <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <nav className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-indigo-600">Home</Link>
              <span>/</span>
              <span className="text-zinc-400">All Tools</span>
            </nav>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-5xl">
              All Free File Conversion Tools
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Every MoviFile converter in one place. Pick a tool to convert PDF, Word, and image files, or resize images to any size. All tools are free, need no registration, and accept files up to 50MB.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl space-y-14 px-4 py-12">
          {CATEGORIES.map((category) => (
            <div key={category} className="space-y-6">
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                  {category} Tools
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">{CATEGORY_INTROS[category]}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {CONVERSION_TYPES.filter((tool) => tool.category === category).map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <span className="flex h-10 min-w-14 items-center justify-center rounded-md bg-zinc-100 px-2 text-[11px] font-black text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {tool.icon}
                    </span>
                    <span className="space-y-1">
                      <span className="flex items-center gap-1.5 font-bold text-zinc-900 dark:text-zinc-100">
                        {tool.label}
                        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                      </span>
                      <span className="block text-sm leading-6 text-zinc-600 dark:text-zinc-400">{tool.description}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
