import type { Metadata } from 'next';
import { Check, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Use — TypingMeter',
  description:
    'The rules and guidelines that apply when you access and use our typing test and related services.',
};

const rules = [
  'Attempt to interfere with the operation of the Website',
  'Attempt to gain unauthorized access to systems or data',
  'Introduce malware, viruses, or other harmful code',
  'Abuse, overload, or disrupt Website infrastructure',
  'Attempt to bypass security or access controls',
  'Scrape or reproduce substantial portions of the Website without permission',
  'Use the Website to engage in fraudulent or unlawful activity',
  'Misrepresent your identity or affiliation',
  'Use the Website in a way that violates applicable law',
];

const features = [
  'Typing speed tests',
  'Accuracy measurements',
  'WPM calculations',
  'Practice tools',
  'Typing statistics',
  'Educational information',
  'Other typing-related features',
];

const navLinks = [
  { href: '#website', label: 'The Website' },
  { href: '#acceptable-use', label: 'Acceptable Use' },
  { href: '#results', label: 'Test Results' },
  { href: '#intellectual-property', label: 'Intellectual Property' },
  { href: '#disclaimer', label: 'Disclaimer' },
  { href: '#liability', label: 'Liability' },
  { href: '#changes', label: 'Changes' },
  { href: '#contact', label: 'Contact' },
];

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9]">
      <Header activePath="/terms" />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Hero */}
          <header className="px-5 sm:px-7 md:px-10 pt-10 pb-11 sm:pb-14 md:pb-16 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-4 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.5px]">
              <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
              <span>Legal</span>
            </div>

            <h1 className="mb-4 font-display text-[35px] min-[380px]:text-[40px] md:text-[clamp(42px,7vw,60px)] leading-[1.05] tracking-[-1.8px] font-semibold text-slate-900 dark:text-slate-100">
              Terms of Use
            </h1>

            <p className="max-w-[650px] mb-5 text-base sm:text-lg leading-[1.65] text-slate-600 dark:text-slate-400">
              The rules and guidelines that apply when you access and use our typing test and
              related services.
            </p>

            <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Effective Date:{' '}
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                November 18, 2026
              </strong>
            </div>
          </header>

          {/* Main content */}
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
              {/* 01 */}
              <section id="website" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    01
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    About the Website
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  TypingMeter provides online typing tests and related tools designed to help
                  users measure and improve typing speed, accuracy, and keyboard skills.
                </p>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  The Website may provide features such as:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-5">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-3 py-3 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We may add, modify, suspend, or remove features at any time.
                </p>
              </section>

              {/* 02 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    02
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Eligibility
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  You may use the Website only if you are legally permitted to do so under the
                  laws applicable to you.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If you are under the age required to independently agree to these Terms in your
                  jurisdiction, you should use the Website with the involvement and permission of
                  a parent or legal guardian where required.
                </p>
              </section>

              {/* 03 */}
              <section id="acceptable-use" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    03
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Acceptable Use
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  You agree to use the Website only for lawful purposes.
                </p>

                <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  You must not:
                </p>

                <ul className="space-y-2 my-4">
                  {rules.map((rule) => (
                    <li
                      key={rule}
                      className="flex items-start gap-2.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-3.5 py-2.5 text-sm leading-[1.65] text-slate-600 dark:text-slate-300"
                    >
                      <X className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-600 dark:text-rose-400" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We may restrict or terminate access if we reasonably believe that these Terms
                  have been violated.
                </p>
              </section>

              {/* 04 */}
              <section id="results" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    04
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Typing Test Results
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Typing-test results are provided for informational and personal improvement
                  purposes.
                </p>

                <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Your WPM, accuracy, score, ranking, or other results may vary depending on
                  factors such as:
                </p>

                <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
                  <li>Test duration</li>
                  <li>Text difficulty</li>
                  <li>Device and keyboard</li>
                  <li>Browser performance</li>
                  <li>Typing technique</li>
                  <li>Internet or device conditions</li>
                  <li>Test configuration</li>
                </ul>

                <div className="mt-6 rounded-lg border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 p-5">
                  <strong className="block mb-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400">
                    Important
                  </strong>
                  <p className="text-sm leading-[1.7] text-slate-700 dark:text-slate-300">
                    Results should not be considered a professional certification or guarantee of
                    typing ability.
                  </p>
                </div>
              </section>

              {/* 05 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    05
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    No Guarantee of Accuracy
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Although we aim to provide reliable calculations and functionality, we do not
                  guarantee that every test result, calculation, statistic, or Website feature
                  will always be completely accurate, uninterrupted, or error-free.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  The Website may occasionally experience technical problems, maintenance, outages,
                  or unexpected errors.
                </p>
              </section>

              {/* 06 */}
              <section id="intellectual-property" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    06
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Intellectual Property
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Unless otherwise stated, the Website and its contents are owned by or licensed to
                  TypingMeter and are protected by applicable intellectual property laws.
                </p>

                <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  This may include:
                </p>

                <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
                  <li>Website design</li>
                  <li>Logos and branding</li>
                  <li>Graphics</li>
                  <li>Text</li>
                  <li>Software</li>
                  <li>User interface elements</li>
                  <li>Original educational content</li>
                </ul>

                <p className="mt-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  You may use the Website for personal and lawful purposes. You may not reproduce,
                  distribute, modify, sell, publicly display, or create derivative works from our
                  protected content without prior permission, except where permitted by applicable
                  law.
                </p>
              </section>

              {/* 07 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    07
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    User Feedback
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If you submit feedback, suggestions, ideas, or other voluntary communications
                  about the Website, you agree that we may use that feedback to improve our
                  services without owing you compensation, unless applicable law provides
                  otherwise.
                </p>
              </section>

              {/* 08 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    08
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Third-Party Services
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  The Website may use or link to third-party services, including hosting
                  providers, analytics providers, advertising networks, authentication providers, or
                  other technical services.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We do not control third-party services and are not responsible for their
                  availability, content, policies, or practices.
                </p>
              </section>

              {/* 09 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    09
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    External Links
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  The Website may contain links to websites operated by third parties. These links
                  are provided for convenience and do not necessarily mean that we endorse or are
                  affiliated with the linked website.
                </p>
              </section>

              {/* 10 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    10
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Availability of the Website
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We may modify, suspend, or discontinue all or part of the Website at any time.
                </p>

                <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We do not guarantee that the Website will always be:
                </p>

                <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
                  <li>Available</li>
                  <li>Secure</li>
                  <li>Error-free</li>
                  <li>Compatible with every device</li>
                  <li>Compatible with every browser</li>
                  <li>Free from interruptions</li>
                </ul>
              </section>

              {/* 11 */}
              <section id="disclaimer" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    11
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Disclaimer
                  </h2>
                </div>

                <div className="my-5 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-[#131A26] p-5">
                  <span className="block mb-2.5 font-mono text-[10px] font-bold tracking-[1px] text-rose-600 dark:text-rose-400">
                    Disclaimer
                  </span>
                  <p className="text-sm leading-[1.7] text-slate-600 dark:text-slate-300">
                    The Website is provided on an{' '}
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      &quot;as is&quot;
                    </strong>{' '}
                    and{' '}
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      &quot;as available&quot;
                    </strong>{' '}
                    basis to the maximum extent permitted by applicable law.
                  </p>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  To the maximum extent permitted by law, we disclaim warranties, express or
                  implied, including warranties of accuracy, reliability, fitness for a particular
                  purpose, merchantability, availability, and non-infringement.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Nothing in these Terms excludes a warranty or consumer right that cannot legally
                  be excluded under applicable law.
                </p>
              </section>

              {/* 12 */}
              <section id="liability" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    12
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Limitation of Liability
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  To the maximum extent permitted by applicable law, TypingMeter and its owners,
                  operators, employees, contractors, and service providers will not be liable for
                  indirect, incidental, special, consequential, or punitive damages arising from
                  or related to your use of the Website.
                </p>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  This may include loss of data, loss of profits, business interruption, or other
                  losses resulting from the use or inability to use the Website.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Nothing in these Terms limits liability that cannot legally be limited or
                  excluded under applicable law.
                </p>
              </section>

              {/* 13 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    13
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Indemnification
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  To the extent permitted by applicable law, you agree to defend, indemnify, and
                  hold harmless TypingMeter and its owners, operators, employees, contractors,
                  and service providers from claims, damages, liabilities, losses, and expenses
                  arising from your violation of these Terms, misuse of the Website, violation of
                  applicable law, or infringement of another person&apos;s rights.
                </p>
              </section>

              {/* 14 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    14
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Suspension and Termination
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We may suspend or terminate your access to the Website if we reasonably believe
                  that you have violated these Terms, applicable law, or our security
                  requirements.
                </p>
              </section>

              {/* 15 */}
              <section id="changes" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    15
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Changes to These Terms
                  </h2>
                </div>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  We may update these Terms from time to time. When we make changes, we may update
                  the Effective Date at the top of this page. Where required, we may provide
                  additional notice.
                </p>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  Your continued use of the Website after updated Terms become effective means
                  that you accept the revised Terms.
                </p>
              </section>

              {/* 16 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    16
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Governing Law
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  These Terms will be governed by the laws applicable in{' '}
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    the Federal Republic of Nigeria
                  </strong>
                  , without regard to conflict-of-law principles, except where applicable consumer
                  protection laws require otherwise.
                </p>
              </section>

              {/* 17 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    17
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Severability
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If any provision of these Terms is found to be invalid, unlawful, or
                  unenforceable, the remaining provisions will continue in effect to the extent
                  permitted by law.
                </p>
              </section>

              {/* 18 */}
              <section className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    18
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Entire Agreement
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  These Terms, together with any additional policies or notices expressly
                  incorporated into them, constitute the agreement between you and TypingMeter
                  concerning your use of the Website.
                </p>
              </section>

              {/* 19 */}
              <section id="contact" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    19
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Contact Us
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If you have questions about these Terms, please contact us using the information
                  below.
                </p>

                <div className="mt-6 flex flex-col gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5">
                  <strong className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    TypingMeter
                  </strong>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    Mytypingtestdotnet@gmail.com
                  </span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                    Typingmeter.net
                  </span>
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
