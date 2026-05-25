import Link from "next/link";
import { CONVERSION_TYPES } from "@/constants/tools";
import { BLOG_POSTS } from "@/constants/blogs";

export function Footer() {
  const topTools = CONVERSION_TYPES.slice(0, 6);
  const topPosts = BLOG_POSTS.slice(0, 4);

  return (
    <footer className="w-full border-t border-zinc-200/50 bg-zinc-50 py-16 dark:border-zinc-800/50 dark:bg-zinc-950">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 text-center md:grid-cols-5 md:text-left">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Movi<span className="text-indigo-600 underline decoration-2 underline-offset-4 dark:text-indigo-400">File</span>
          </Link>
          <p className="max-w-sm text-sm text-zinc-500">
            Fast and secure file conversions for PDF, Word and image formats. No registration required, free for MoviFile users.
          </p>
          <div className="text-xs text-zinc-400">
            Copyright {new Date().getFullYear()} MoviFile. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Quick Tools</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {topTools.map((tool) => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="text-xs font-semibold uppercase transition-colors hover:text-indigo-600">
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Guides</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {topPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-indigo-600">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/blog" className="transition-colors hover:text-indigo-600">Blog</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-indigo-600">About Us</Link></li>
            <li><Link href="/privacy-policy" className="transition-colors hover:text-indigo-600">Privacy Policy</Link></li>
            <li><Link href="/terms" className="transition-colors hover:text-indigo-600">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="transition-colors hover:text-indigo-600">Disclaimer</Link></li>
            <li><Link href="/contact" className="transition-colors hover:text-indigo-600">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
