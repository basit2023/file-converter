import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="MoviFile home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <Image
        src="/brand/movifile-mark.png"
        alt="MoviFile logo"
        width={40}
        height={40}
        priority
        className="h-9 w-9 object-contain transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105"
      />
      {!compact && (
        <span className="text-xl font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white">
          Movi<span className="text-indigo-600 dark:text-indigo-400">File</span>
        </span>
      )}
    </Link>
  );
}
