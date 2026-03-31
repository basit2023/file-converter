import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | MoviFile",
  description: "Read the Terms of Service for MoviFile. Understand the rules and guidelines for using our free online file conversion tools.",
};

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-extrabold mb-4 italic text-zinc-900 dark:text-white">Terms of Service</h1>
        <p className="text-sm text-zinc-400 mb-8">Last Updated: March 30, 2026</p>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-4">
            <p>Welcome to MoviFile. By accessing or using our website at movifile.com (&quot;the Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of the Terms, you may not access the Service.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">1. Acceptable Use</h2>
            <p>You may use MoviFile for lawful personal or commercial purposes, free of charge. By using our Service, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Upload files that contain malware, viruses, or any harmful code</li>
              <li>Upload content that is illegal, offensive, or violates any third-party rights</li>
              <li>Attempt to gain unauthorized access to our systems or interfere with the proper working of the Service</li>
              <li>Use automated systems (bots, scrapers) to access the Service without our prior written consent</li>
              <li>Use the Service for any purpose that is unlawful or prohibited by these Terms</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">2. File Handling</h2>
            <p>When you upload a file to MoviFile for conversion:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your file is processed on our secure servers and the converted output is made available for download</li>
              <li>Both the uploaded and converted files are automatically deleted from our servers after the conversion process is complete</li>
              <li>We do not retain, review, or share any files you upload</li>
              <li>You are solely responsible for ensuring you have the right to upload and convert the files you submit</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">3. Intellectual Property</h2>
            <p>The Service and its original content (excluding files you upload), features, and functionality are and will remain the exclusive property of MoviFile and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks may not be used in connection with any product or service without the prior written consent of MoviFile.</p>
            <p>You retain full ownership of the files you upload and the converted output files.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">4. Service Availability</h2>
            <p>We strive to keep MoviFile available at all times. However, we do not guarantee that the Service will be uninterrupted, timely, secure, or error-free. We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time without prior notice.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">5. Limitation of Liability</h2>
            <p>To the fullest extent permitted by applicable law, MoviFile and its affiliates, officers, employees, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use the Service</li>
              <li>Any errors, bugs, or inaccuracies in the conversion output</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of the Service</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">6. Disclaimer of Warranties</h2>
            <p>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">7. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless MoviFile and its licensors, officers, directors, employees, and agents from any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service or violation of these Terms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">8. Changes to These Terms</h2>
            <p>We reserve the right to modify or replace these Terms at any time at our sole discretion. We will make reasonable efforts to provide notice of material changes, such as by updating the &quot;Last Updated&quot; date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white italic">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
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
