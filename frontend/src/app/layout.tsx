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
    default: "Free Online File Converter for PDF, Word & Images | MoviFile",
    template: "%s | MoviFile",
  },
  description: "Convert PDF, Word, JPG, PNG and WebP files online free. Fast 50MB uploads, no sign-up and private processing. Convert and download in seconds.",
  authors: [{ name: "MoviFile Team", url: "https://movifile.com" }],
  creator: "MoviFile",
  publisher: "MoviFile",
  metadataBase: new URL("https://movifile.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://movifile.com",
    siteName: "MoviFile",
    title: "Free Online File Converter for PDF, Word & Images",
    description: "Convert PDF, Word and image files online free. No sign-up, fast 50MB uploads and private processing.",
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
    title: "Free Online File Converter for PDF, Word & Images",
    description: "Convert PDF, Word and image files online free. No sign-up, fast 50MB uploads and private processing.",
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
  "image": "https://movifile.com/icon-512.png",
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
  "alternateName": ["movifile.com", "Movi File"],
  "url": "https://movifile.com/",
  "description": "Free online file converter for PDF, Word and image files.",
  "publisher": {
    "@type": "Organization",
    "name": "MoviFile"
  },
  "inLanguage": "en-US"
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MoviFile",
  "url": "https://movifile.com",
  "logo": "https://movifile.com/icon-512.png",
  "image": "https://movifile.com/og-image.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "fastsitecheck@gmail.com",
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
