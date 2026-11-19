import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Disclaimer — TypingMeter',
  description:
    'Important legal disclaimers regarding accuracy of information, external links, and limitation of liability.',
};

const navLinks = [
  { href: '#accuracy', label: 'Accuracy' },
  { href: '#external-links', label: 'External Links' },
  { href: '#liability', label: 'Liability' },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9]">
      <Header activePath="/disclaimer" />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Hero */}
          <header className="px-5 sm:px-7 md:px-10 pt-10 pb-11 sm:pb-14 md:pb-16 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-4 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.5px]">
              <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
              <span>Legal</span>
            </div>

            <h1 className="mb-4 font-display text-[35px] min-[380px]:text-[40px] md:text-[clamp(42px,7vw,60px)] leading-[1.05] tracking-[-1.8px] font-semibold text-slate-900 dark:text-slate-100">
              Disclaimer
            </h1>

            <p className="max-w-[650px] mb-5 text-base sm:text-lg leading-[1.65] text-slate-600 dark:text-slate-400">
              Important notices regarding informational accuracy, external websites, and
              limitation of liability.
            </p>

            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Effective Date:{' '}
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                November 18, 2026
              </strong>
            </div>
          </header>

          {/* Main layout */}
          <div className="grid grid-cols-1 md:grid-cols-[170px_minmax(0,1fr)] gap-9 md:gap-14 px-5 sm:px-7 md:px-10 py-10 sm:py-12 md:py-16 pb-16 sm:pb-20 md:pb-24">
            <aside className="md:sticky md:top-8 md:self-start grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-col gap-x-4 gap-y-1 pb-6 md:pb-0 border-b md:border-b-0 border-slate-200 dark:border-slate-800">
              <span className="col-span-full mb-2 md:mb-3 font-mono text-[10px] font-bold tracking-[1px] text-slate-500 dark:text-slate-400">
                On This Page
              </span>

              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-150"
                >
                  {item.label}
                </a>
              ))}
            </aside>

            <article className="min-w-0 space-y-11 sm:space-y-14">
              {/* 01 Accuracy of Information */}
              <section id="accuracy" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    01
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Accuracy of Information
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  The information provided on this website is for general informational purposes
                  only. While we strive to keep the information up to date and correct, we make
                  no representations or warranties of any kind, express or implied, about the
                  completeness, accuracy, reliability, suitability, or availability with respect
                  to the website or the information, products, services, or related graphics
                  contained on the website for any purpose. Any reliance you place on such
                  information is therefore strictly at your own risk.
                </p>
              </section>

              {/* 02 External Links */}
              <section id="external-links" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    02
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    External Links
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Through this website, you are able to link to other websites which are not
                  under our control. We have no control over the nature, content, and
                  availability of those sites. The inclusion of any links does not necessarily
                  imply a recommendation or endorse the views expressed within them.
                </p>
              </section>

              {/* 03 Limitation of Liability */}
              <section id="liability" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    03
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Limitation of Liability
                  </h2>
                </div>

                <div className="rounded-lg border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#131A26] p-5">
                  <span className="block mb-2.5 font-mono text-[10px] font-bold tracking-[1px] text-rose-600 dark:text-rose-400">
                    Notice
                  </span>
                  <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-300">
                    In no event will we be liable for any loss or damage including without
                    limitation, indirect or consequential loss or damage, or any loss or damage
                    whatsoever arising from loss of data or profits arising out of, or in
                    connection with, the use of this website.
                  </p>
                </div>
              </section>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                Last Updated: November 18, 2026
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
