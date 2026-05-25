import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BLOG_POSTS } from "@/constants/blogs";
import { BookOpen, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "File Conversion Blog | PDF, Word and Image Guides",
  description: "Human-written guides for PDF, Word, JPG, PNG, WebP and everyday file conversion tasks. Learn how to convert files cleanly and safely.",
  alternates: {
    canonical: "https://movifile.com/blog",
  },
  openGraph: {
    title: "MoviFile Blog",
    description: "Practical file conversion guides for PDF, Word and image files.",
    url: "https://movifile.com/blog",
    siteName: "MoviFile",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoviFile file conversion guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoviFile Blog",
    description: "Practical file conversion guides for PDF, Word and image files.",
    images: [
      {
        url: "/og-image.png",
        alt: "MoviFile file conversion guides",
      },
    ],
  },
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />

      <main className="grow">
        <section className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:border-indigo-900 dark:bg-zinc-950 dark:text-indigo-300">
                <BookOpen className="h-3.5 w-3.5" />
                File conversion guides
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white md:text-5xl">
                PDF, Word and image conversion help
              </h1>
              <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                Practical guides for cleaner formatting, safer uploads, smaller images and faster everyday document work.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto grid max-w-5xl grid-cols-1 gap-5 px-4 py-12 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-bold leading-snug text-zinc-950 dark:text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex text-sm font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                Read guide
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
