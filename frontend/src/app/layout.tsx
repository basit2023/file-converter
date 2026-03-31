import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "MoviFile | Free Online File Converter — PDF, Word, JPG, PNG, WebP",
    template: "%s | MoviFile",
  },
  description: "Convert files online for free with MoviFile. Transform PDF to Word, PDF to Text, JPG to PNG, PNG to WebP, Word to PDF, and more. No registration, no downloads. Fast, secure, and private file conversion.",
  keywords: [
    "free file converter",
    "online file converter",
    "PDF to Word",
    "PDF to Text",
    "JPG to PNG",
    "PNG to JPG",
    "PNG to WebP",
    "JPG to WebP",
    "Word to PDF",
    "convert files online",
    "free PDF converter",
    "image converter",
    "document converter",
    "MoviFile",
    "movifile.com",
    "WebP converter",
    "GIF converter",
    "Word to HTML",
    "PDF to JPG",
    "PDF to PNG",
  ],
  authors: [{ name: "MoviFile Team", url: "https://movifile.com" }],
  creator: "MoviFile",
  publisher: "MoviFile",
  metadataBase: new URL("https://movifile.com"),
  alternates: {
    canonical: "https://movifile.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://movifile.com",
    siteName: "MoviFile",
    title: "MoviFile | Free Online File Converter",
    description: "Convert PDF, Word, JPG, PNG, WebP, and GIF files online for free. No registration required. Fast, secure, and private.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MoviFile - Free Online File Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MoviFile | Free Online File Converter",
    description: "Convert PDF, Word, JPG, PNG, WebP, and GIF files online for free. Fast, secure, and private.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
  category: 'technology',
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MoviFile",
  "url": "https://movifile.com",
  "description": "Free online file converter for PDF, Word, JPG, PNG, WebP, and GIF. No registration required.",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "MoviFile",
    "url": "https://movifile.com"
  },
  "featureList": [
    "PDF to Word Conversion",
    "PDF to Text Extraction",
    "PDF to JPG Conversion",
    "PDF to PNG Conversion",
    "JPG to PNG Conversion",
    "PNG to JPG Conversion",
    "JPG to WebP Conversion",
    "PNG to WebP Conversion",
    "WebP to JPG Conversion",
    "WebP to PNG Conversion",
    "JPG to GIF Conversion",
    "PNG to GIF Conversion",
    "GIF to JPG Conversion",
    "GIF to PNG Conversion",
    "Word to PDF Conversion",
    "Word to Text Extraction",
    "Word to HTML Conversion"
  ]
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MoviFile",
  "url": "https://movifile.com",
  "logo": "https://movifile.com/favicon.ico",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@movifile.com",
    "contactType": "customer support"
  },
  "sameAs": []
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://movifile.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
