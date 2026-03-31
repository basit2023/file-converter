import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MoviFile",
  description: "Read MoviFile's privacy policy. Learn how we handle your files, protect your data, and ensure your privacy when using our free online file conversion tools.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-4 italic text-zinc-900 dark:text-white">Privacy Policy</h1>
        <p className="text-sm text-zinc-400 mb-8">Last Updated: March 30, 2026</p>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">1. Introduction</h2>
            <p>Welcome to MoviFile (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website movifile.com and use our free online file conversion services.</p>
            <p>By using our services, you agree to the collection and use of information in accordance with this policy. If you have any questions, please contact us at support@movifile.com.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">2.1 Files You Upload</h3>
            <p>When you use our conversion tools, you upload files (such as PDFs, Word documents, images) to our servers for processing. These files are:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processed in real-time on our secure servers</li>
              <li>Never read, analyzed, or accessed by our team</li>
              <li>Automatically and permanently deleted from our servers immediately after the conversion is complete and the result is available for download</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">2.2 Automatically Collected Information</h3>
            <p>We may automatically collect certain technical information when you visit our website, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website or source</li>
              <li>General geographic location (country/region level only)</li>
            </ul>
            <p>This information is collected through cookies and similar technologies and is used solely to improve our service, understand usage patterns, and optimize our website performance.</p>

            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">2.3 Information We Do NOT Collect</h3>
            <p>MoviFile does not require registration or personal information to use our tools. We do not collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Names, email addresses, or phone numbers (unless you voluntarily provide them via our contact form)</li>
              <li>Payment information (our services are free)</li>
              <li>Social media profiles</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">3. How We Use Your Information</h2>
            <p>Information we collect is used exclusively for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, operate, and maintain our file conversion services</li>
              <li>To improve and optimize our website and user experience</li>
              <li>To understand how our services are used through analytics</li>
              <li>To communicate with you if you reach out through our contact form</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">4. Cookies &amp; Third-Party Services</h2>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">4.1 Cookies</h3>
            <p>We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">4.2 Google AdSense</h3>
            <p>We use Google AdSense to display advertisements on our website. Google AdSense may use cookies and web beacons to display ads based on your prior visits to our website or other websites on the Internet. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google Ads Settings</a>.</p>

            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">4.3 Google Analytics</h3>
            <p>We may use Google Analytics to track and analyze web traffic. Google Analytics is a web analytics service that tracks and reports website traffic. You can learn more about Google&apos;s privacy practices at the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google Privacy &amp; Terms page</a>.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">5. Data Security</h2>
            <p>We take the security of your data seriously. All file transfers to and from our servers are encrypted using SSL/TLS protocols. We implement industry-standard security measures to protect against unauthorized access, alteration, disclosure, or destruction of your data.</p>
            <p>However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">6. Children&apos;s Privacy</h2>
            <p>Our services are not directed to anyone under the age of 13 (&quot;Children&quot;). We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and you believe your child has provided us with personal data, please contact us so we can take necessary action.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date. You are advised to review this page periodically for any changes.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:support@movifile.com" className="text-indigo-600 hover:underline">support@movifile.com</a></li>
              <li>Contact Page: <Link href="/contact" className="text-indigo-600 hover:underline">movifile.com/contact</Link></li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
