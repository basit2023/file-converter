import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export const metadata: Metadata = {
  applicationName: "MoviFile",
  referrer: "origin-when-cross-origin",
  title: {
    default: "MoviFile | Free Online File Converter - PDF, Word, JPG, PNG, WebP",
    template: "%s | MoviFile",
  },
  description: "Convert files online for free with MoviFile. Transform PDF to Word, PDF to Text, JPG to PNG, PNG to WebP, Word to PDF, and more. No registration, no downloads. Fast, secure, and private file conversion.",
  authors: [{ name: "MoviFile Team", url: "https://movifile.com" }],
  creator: "MoviFile",
  publisher: "MoviFile",
  metadataBase: new URL("https://movifile.com"),
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
    images: [
      {
        url: "/og-image.png",
        alt: "MoviFile free online file converter",
      },
    ],
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  "@type": ["WebApplication", "SoftwareApplication"],
  "name": "MoviFile",
  "alternateName": "MoviFile Converter",
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
  "image": "https://movifile.com/og-image.png",
  "featureList": [
    "PDF to Word Conversion",
    "PDF to Text Extraction",
    "PDF to JPG Conversion",
    "PDF to PNG Conversion",
    "JPG to PNG Conversion",
    "Image Resize",
    "Custom Image Dimensions",
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

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MoviFile",
  "url": "https://movifile.com",
  "description": "Free online file converter for PDF, Word and image files.",
  "publisher": {
    "@type": "Organization",
    "name": "MoviFile"
  },
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://movifile.com/tools?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MoviFile",
  "url": "https://movifile.com",
  "logo": "https://movifile.com/og-image.png",
  "image": "https://movifile.com/og-image.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body suppressHydrationWarning>
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
