'use client';

import { ThemeToggle } from "./ThemeToggle";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/85">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <BrandLogo />
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 text-sm font-semibold text-zinc-600 dark:text-zinc-400 lg:flex">
            <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tools</Link>
            <Link href="/tools/image-resize" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Image Resize</Link>
            <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
          </nav>
          <Link href="/tools" className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-bold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-700 sm:px-4">
            Convert file <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
