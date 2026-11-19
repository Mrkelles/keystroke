import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — TypingMeter',
  description:
    'Get in touch with the TypingMeter team for questions, feedback, bug reports, or privacy inquiries.',
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9]">
      <Header activePath="/contact" />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Hero */}
          <header className="px-5 sm:px-7 md:px-10 pt-10 pb-11 sm:pb-14 md:pb-16 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-4 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.5px]">
              <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
              <span>Support</span>
            </div>

            <h1 className="mb-4 font-display text-[35px] min-[380px]:text-[40px] md:text-[clamp(42px,7vw,60px)] leading-[1.05] tracking-[-1.8px] font-semibold text-slate-900 dark:text-slate-100">
              Contact Us
            </h1>

            <p className="max-w-[650px] text-base sm:text-lg leading-[1.65] text-slate-600 dark:text-slate-400">
              Have a question, feedback, or suggestion for improving TypingMeter? Send us a
              message below and we&apos;ll respond as soon as we can.
            </p>
          </header>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] gap-10 lg:gap-12 px-5 sm:px-7 md:px-10 py-10 sm:py-12 md:py-16 pb-16 sm:pb-20 md:pb-24">
            <aside className="space-y-6">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-4">
                <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="font-mono text-[11px] font-bold tracking-[1px]">
                    DIRECT EMAIL
                  </span>
                </div>

                <div className="space-y-1">
                  <strong className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    TypingMeter
                  </strong>
                  <p className="font-mono text-xs text-slate-600 dark:text-slate-400 break-all">
                    Mytypingtestdotnet@gmail.com
                  </p>
                  <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                    Typingmeter.net
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-3">
                <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400">
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="font-mono text-[11px] font-bold tracking-[1px]">
                    HELPFUL LINKS
                  </span>
                </div>

                <p className="text-xs leading-[1.65] text-slate-600 dark:text-slate-400">
                  Looking for information about how typing metrics or your browser data are
                  handled?
                </p>

                <div className="flex flex-col gap-1.5 pt-1 text-xs">
                  <Link
                    href="/about"
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/privacy"
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    Terms of Use
                  </Link>
                  <Link
                    href="/disclaimer"
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    Disclaimer
                  </Link>
                </div>
              </div>
            </aside>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
