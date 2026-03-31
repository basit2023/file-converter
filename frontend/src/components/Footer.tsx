import Link from "next/link";
import { CONVERSION_TYPES } from "@/constants/tools";

export function Footer() {
  const topTools = CONVERSION_TYPES.slice(0, 6);

  return (
    <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-950 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="space-y-4 md:col-span-2">
          <Link href="/" className="font-bold text-2xl text-zinc-900 dark:text-zinc-100 italic">
            Movi<span className="text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-4">File</span>
          </Link>
          <p className="text-sm text-zinc-500 max-w-sm italic">
            Your premium, all-in-one cloud solution for fast and secure file conversions. No registration required, 100% free forever for movifile.com users.
          </p>
          <div className="text-xs text-zinc-400">
            © {new Date().getFullYear()} MoviFile. All rights reserved.
          </div>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4">Quick Tools</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {topTools.map(tool => (
              <li key={tool.slug}>
                <Link href={`/tools/${tool.slug}`} className="hover:text-indigo-600 transition-colors uppercase text-xs font-semibold">{tool.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-900 dark:text-zinc-100 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><Link href="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:text-indigo-600 transition-colors">Disclaimer</Link></li>
            <li><Link href="/contact" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

