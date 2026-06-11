import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileUploader } from "@/components/FileUploader";
import { ArrowRight, CheckCircle2, FileCode, FileText, Globe, Image, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CONVERSION_TYPES, CATEGORIES } from "@/constants/tools";
import { BLOG_POSTS } from "@/constants/blogs";
import Link from "next/link";

export default function Home() {
  const featuredTools = [
    "pdf-to-word",
    "pdf-to-text",
    "image-resize",
    "jpg-to-png",
    "png-to-jpg",
    "word-to-pdf",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Header />

      <main className="flex-grow">
        <section className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950">
          <div className="container mx-auto grid items-center gap-10 px-4 py-10 lg:grid-cols-[0.95fr_1.05fr] lg:py-14">
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Free, private, no sign-up
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-white md:text-6xl">
                  Convert and resize PDF, Word and image files online
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-300">
                  Upload a file, choose the format you need, and download the result in seconds. MoviFile converts PDF, DOCX, JPG, PNG, WebP, GIF, TXT and HTML &mdash; and also{" "}
                  <Link href="/tools/image-resize" className="font-semibold text-indigo-600 underline decoration-indigo-500/40 underline-offset-4 hover:text-indigo-700 dark:text-indigo-400">
                    resizes images
                  </Link>{" "}
                  to any width and height.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-3">
                {["17 conversion tools", "Files deleted after processing", "Works on mobile and desktop"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {featuredTools.map((slug) => {
                  const tool = CONVERSION_TYPES.find((item) => item.slug === slug);
                  if (!tool) return null;
                  return (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold text-zinc-700 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                    >
                      {tool.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <section id="converter" className="scroll-mt-24">
              <FileUploader />
            </section>
          </div>
        </section>

        <section id="tools" className="container mx-auto space-y-12 px-4 py-16 scroll-mt-24">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">Choose a Free Conversion Tool</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Each converter has a dedicated page with instructions, FAQs, and direct upload support.{" "}
              <Link href="/tools" className="font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Browse all tools
              </Link>.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {CATEGORIES.map((category) => (
              <div key={category} className="space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  {category} Tools
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {CONVERSION_TYPES.filter((tool) => tool.category === category).map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/tools/${tool.slug}`}
                      className="group flex min-h-16 items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-indigo-500 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 min-w-12 items-center justify-center rounded-md bg-zinc-100 px-2 text-[10px] font-black text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                          {tool.icon}
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{tool.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="container mx-auto grid gap-6 px-4 py-14 md:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Private File Handling",
                desc: "Files are sent over encrypted connections and removed after the conversion finishes.",
              },
              {
                icon: Zap,
                title: "Fast Server Conversion",
                desc: "The browser stays light while the backend handles PDF, Word and image processing.",
              },
              {
                icon: Globe,
                title: "No App Required",
                desc: "Use MoviFile from Chrome, Safari, Edge or Firefox on phones, tablets and desktops.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <item.icon className="mb-4 h-6 w-6 text-indigo-600" />
                <h3 className="mb-2 text-lg font-bold text-zinc-950 dark:text-white">{item.title}</h3>
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-4xl space-y-8 px-4 py-16">
          <div className="space-y-3 text-center">
            <Sparkles className="mx-auto h-6 w-6 text-indigo-600" />
            <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">The Best Free Online File Converter in 2026</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              MoviFile helps students, marketers, designers and office teams convert common files without installing software.
            </p>
          </div>

          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <p>
              Use MoviFile to <Link href="/tools/pdf-to-word">convert PDF to Word</Link>, <Link href="/tools/pdf-to-text">extract text from PDF</Link>, <Link href="/tools/image-resize">resize images</Link>, transform a <Link href="/tools/jpg-to-png">JPG image to PNG</Link>, or create web-friendly <Link href="/tools/png-to-webp">WebP images</Link>. The interface is built for quick repeat use: upload, select, convert, download.
            </p>
            <p>
              MoviFile requires no registration, no email address and no browser extension. The tools support everyday document and image workflows across PDF, Word, JPG, PNG, WebP, GIF, TXT and HTML.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { icon: Image, title: "Image Formats", items: ["JPG / JPEG", "PNG", "WebP", "GIF"] },
              { icon: FileText, title: "Document Formats", items: ["PDF", "Word DOCX", "Plain Text", "HTML"] },
              { icon: FileCode, title: "Key Features", items: ["No registration", "Encrypted transfer", "Auto deletion", "Mobile friendly"] },
            ].map((group) => (
              <div key={group.title} className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800">
                <div className="mb-3 flex items-center gap-2">
                  <group.icon className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-bold text-zinc-950 dark:text-white">{group.title}</h3>
                </div>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="container mx-auto max-w-5xl space-y-8 px-4 py-14">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">File Conversion Guides</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Helpful, practical articles for cleaner PDF, Word and image conversions.
                </p>
              </div>
              <Link href="/blog" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                View all guides
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {BLOG_POSTS.slice(0, 3).map((post) => (
                <article key={post.slug} className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="mb-3 text-xs font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">{post.category}</div>
                  <h3 className="text-lg font-bold leading-snug text-zinc-950 dark:text-white">
                    <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
