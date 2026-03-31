import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | MoviFile",
  description: "Read the legal disclaimer for MoviFile. Understand the limitations of our free online file conversion service.",
};

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-4 italic text-zinc-900 dark:text-white">Disclaimer</h1>
        <p className="text-sm text-zinc-400 mb-8">Last Updated: March 30, 2026</p>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">1. General Information</h2>
            <p>The information provided by MoviFile (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on movifile.com (the &quot;Site&quot;) is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">2. Conversion Accuracy</h2>
            <p>While we strive to provide accurate and high-quality file conversions, we cannot guarantee that every conversion will be 100% perfect. Complex formatting, embedded fonts, or unusual file structures may result in minor discrepancies in the output. Users are encouraged to review converted files before using them in critical applications.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">3. Use at Your Own Risk</h2>
            <p>Any reliance you place on the information or services provided on this Site is strictly at your own risk. Under no circumstances shall we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of our services.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">4. External Links</h2>
            <p>The Site may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">5. Professional Advice</h2>
            <p>The Site is not intended to provide professional advice. Information found on the Site should not be used as a substitute for consultation with appropriate professionals. If you require professional advice, please consult a qualified expert.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">6. Changes to the Website</h2>
            <p>We reserve the right to add, modify, or remove any content or features from the Site, or to suspend or discontinue the Site entirely, at any time without prior notice. We are not obligated to update any information on the Site.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">7. Contact Us</h2>
            <p>If you have any questions or concerns about this Disclaimer, please contact us:</p>
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
