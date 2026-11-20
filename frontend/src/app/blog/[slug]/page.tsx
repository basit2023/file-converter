import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BLOG_POSTS } from "@/constants/blogs";
import { CONVERSION_TYPES } from "@/constants/tools";
import { CalendarDays, ChevronRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://movifile.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://movifile.com/blog/${post.slug}`,
      siteName: "MoviFile",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [
        {
          url: "/og-image.png",
          alt: post.title,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedTools = post.toolSlugs
    ? post.toolSlugs.flatMap(slug => CONVERSION_TYPES.filter(tool => tool.slug === slug))
    : CONVERSION_TYPES.filter((tool) => {
    const haystack = `${post.title} ${post.description} ${post.keywords.join(" ")}`.toLowerCase();
    return haystack.includes(tool.label.toLowerCase().split(" ")[0]) || haystack.includes(tool.category.toLowerCase());
  }).slice(0, 4);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Organization",
      name: "MoviFile",
    },
    publisher: {
      "@type": "Organization",
      name: "MoviFile",
      logo: {
        "@type": "ImageObject",
        url: "https://movifile.com/icon-512.png",
      },
    },
    mainEntityOfPage: `https://movifile.com/blog/${post.slug}`,
    image: "https://movifile.com/og-image.png",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://movifile.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://movifile.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://movifile.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      )}

      <main className="grow">
        <article className="container mx-auto max-w-3xl px-4 py-10">
          <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-zinc-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-indigo-600">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-400">{post.category}</span>
          </nav>

          <header className="space-y-5 border-b border-zinc-200 pb-8 dark:border-zinc-800">
            <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {post.updatedAt ? "Updated " : "Published "}
                {new Date(`${post.updatedAt ?? post.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-950 dark:text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">{post.description}</p>
          </header>

          {post.quickAnswer && (
            <aside className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
              <h2 className="text-lg font-bold">Quick answer</h2>
              <p className="mt-3 leading-7 text-zinc-700 dark:text-zinc-300">{post.quickAnswer}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedTools.map(tool => (
                  <Link key={tool.slug} href={`/tools/${tool.slug}`} className="font-semibold text-indigo-700 underline underline-offset-4 dark:text-indigo-300">{tool.label}</Link>
                ))}
              </div>
            </aside>
          )}

          {post.comparison && (
            <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-sm">
                <caption className="p-4 text-left text-lg font-bold">WebP and PNG at a glance</caption>
                <thead className="bg-zinc-100 dark:bg-zinc-900"><tr>{["Feature", "WebP", "PNG"].map(label => <th key={label} scope="col" className="p-4">{label}</th>)}</tr></thead>
                <tbody>{post.comparison.map(row => <tr key={row.label} className="border-t border-zinc-200 dark:border-zinc-800"><th scope="row" className="p-4">{row.label}</th><td className="p-4">{row.webp}</td><td className="p-4">{row.png}</td></tr>)}</tbody>
              </table>
            </div>
          )}

          <div className="mt-8 space-y-9">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-8 text-zinc-700 dark:text-zinc-300">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
              {post.faqs.map((faq) => (
                <div key={faq.question} className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
                  <h3 className="font-bold text-zinc-950 dark:text-white">{faq.question}</h3>
                  <p className="mt-2 leading-7 text-zinc-700 dark:text-zinc-300">{faq.answer}</p>
                </div>
              ))}
            </section>
          )}

          {relatedTools.length > 0 && (
            <aside className="mt-10 rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
              <h2 className="text-lg font-bold text-zinc-950 dark:text-white">Related converters</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {relatedTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-bold text-zinc-900 transition hover:border-indigo-500 hover:text-indigo-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                  >
                    {tool.label}
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
