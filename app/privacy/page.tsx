import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — TypingMeter',
  description:
    "Your privacy matters to us. Here's how we collect, use, and protect information when you use our typing test.",
};

const navLinks = [
  { href: '#information', label: 'Information' },
  { href: '#cookies', label: 'Cookies' },
  { href: '#usage', label: 'How We Use Data' },
  { href: '#sharing', label: 'Sharing' },
  { href: '#rights', label: 'Your Rights' },
  { href: '#contact', label: 'Contact' },
];

const sections = [
  {
    number: '02',
    title: 'Automatically Collected Information',
    id: undefined,
    content: (
      <>
        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          When you visit the Website, certain technical information may be collected
          automatically by your browser, hosting provider, security services, or other
          technologies we use.
        </p>

        <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          This may include:
        </p>

        <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device type</li>
          <li>Operating system</li>
          <li>Approximate geographic region</li>
          <li>Pages viewed</li>
          <li>Referring website</li>
          <li>Date and time of visits</li>
          <li>Technical and diagnostic information</li>
        </ul>
      </>
    ),
  },
  {
    number: '03',
    title: 'Cookies and Similar Technologies',
    id: 'cookies',
    content: (
      <>
        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We may use cookies, local storage, session storage, or similar technologies to operate
          and improve the Website.
        </p>

        <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          These technologies may be used to:
        </p>

        <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
          <li>Remember your preferences</li>
          <li>Maintain your session</li>
          <li>Store typing-test settings</li>
          <li>Improve Website functionality</li>
          <li>Understand Website usage</li>
          <li>Detect abuse or security issues</li>
        </ul>

        <p className="mt-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          You can control or disable cookies through your browser settings. However, disabling
          certain technologies may affect some Website functionality.
        </p>
      </>
    ),
  },
  {
    number: '04',
    title: 'How We Use Information',
    id: 'usage',
    content: (
      <>
        <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We may use information we collect to:
        </p>

        <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
          <li>Provide and operate the typing test</li>
          <li>Display your test results</li>
          <li>Remember preferences</li>
          <li>Improve the Website and its features</li>
          <li>Monitor Website performance</li>
          <li>Detect and prevent abuse or security incidents</li>
          <li>Respond to questions and support requests</li>
          <li>Understand general usage trends</li>
          <li>Comply with applicable legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    number: '05',
    title: 'Analytics',
    id: undefined,
    content: (
      <>
        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We may use analytics services to understand how visitors use the Website.
        </p>

        <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          Analytics services may collect information such as device information, pages visited,
          approximate location, referral information, and interactions with the Website.
        </p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Advertising',
    id: undefined,
    content: (
      <>
        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          If we display advertising on the Website, advertising providers may use cookies or
          similar technologies to provide, measure, or personalize advertisements.
        </p>

        <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          Where required by applicable law, we will provide appropriate choices or consent
          mechanisms regarding advertising technologies.
        </p>
      </>
    ),
  },
  {
    number: '07',
    title: 'How We Share Information',
    id: 'sharing',
    content: (
      <>
        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We do not sell your personal information as part of the normal operation of the Website.
        </p>

        <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We may share information with service providers that help us operate the Website, such
          as hosting, infrastructure, security, analytics, email, or technical service providers.
        </p>

        <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          We may also disclose information when reasonably necessary to:
        </p>

        <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
          <li>Comply with applicable law or legal process</li>
          <li>Protect our rights or property</li>
          <li>Protect users or the public</li>
          <li>Investigate fraud, abuse, or security incidents</li>
          <li>Enforce our Terms of Use</li>
        </ul>
      </>
    ),
  },
  {
    number: '08',
    title: 'Data Retention',
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        We retain information only for as long as reasonably necessary for the purposes described
        in this Privacy Policy, unless a longer retention period is required by law.
      </p>
    ),
  },
  {
    number: '09',
    title: 'Data Security',
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        We take reasonable technical and organizational measures to protect information from
        unauthorized access, loss, misuse, alteration, or disclosure. However, no website,
        internet connection, or electronic storage system can be guaranteed to be completely
        secure.
      </p>
    ),
  },
  {
    number: '10',
    title: 'Third-Party Websites and Services',
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        The Website may contain links to third-party websites, services, or resources. We are
        not responsible for the privacy practices, content, security, or policies of third-party
        websites.
      </p>
    ),
  },
  {
    number: '11',
    title: "Children's Privacy",
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        The Website is not intended to knowingly collect personal information from children in
        violation of applicable law. If you believe that a child has provided personal
        information to us in a manner that violates applicable law, please contact us so that we
        can review and, where appropriate, delete the information.
      </p>
    ),
  },
  {
    number: '12',
    title: 'Your Privacy Rights',
    id: 'rights',
    content: (
      <>
        <p className="mb-3 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          Depending on where you live, you may have certain rights regarding your personal
          information.
        </p>

        <ul className="list-disc pl-6 my-3 space-y-2 text-sm leading-[1.65] text-slate-600 dark:text-slate-400">
          <li>Request access to personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of certain information</li>
          <li>Object to or restrict certain processing</li>
          <li>Request a copy of certain information</li>
          <li>Withdraw consent where applicable</li>
        </ul>

        <p className="mt-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
          These rights are subject to applicable laws and exceptions.
        </p>
      </>
    ),
  },
  {
    number: '13',
    title: 'International Data Transfers',
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        If we or our service providers process information in countries other than the country
        where you live, your information may be transferred to and processed in those countries.
        Where required by applicable law, appropriate safeguards will be used.
      </p>
    ),
  },
  {
    number: '14',
    title: 'Changes to This Privacy Policy',
    id: undefined,
    content: (
      <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
        We may update this Privacy Policy from time to time. When we make changes, we may update
        the Effective Date at the top of this page. If changes are material, we may provide
        additional notice where required by applicable law.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9]">
      <Header activePath="/privacy" />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Hero */}
          <header className="px-5 sm:px-7 md:px-10 pt-10 pb-11 sm:pb-14 md:pb-16 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-4 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.5px]">
              <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
              <span>Legal</span>
            </div>

            <h1 className="mb-4 font-display text-[35px] min-[380px]:text-[40px] md:text-[clamp(42px,7vw,60px)] leading-[1.05] tracking-[-1.8px] font-semibold text-slate-900 dark:text-slate-100">
              Privacy Policy
            </h1>

            <p className="max-w-[650px] mb-5 text-base sm:text-lg leading-[1.65] text-slate-600 dark:text-slate-400">
              Your privacy matters to us. Here&apos;s how we collect, use, and protect
              information when you use our typing test.
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
              {/* 01 Information We Collect */}
              <section id="information" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    01
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Information We Collect
                  </h2>
                </div>

                <h3 className="mt-6 mb-2.5 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Information You Provide
                </h3>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  You may use the typing test without creating an account or directly providing
                  personal information.
                </p>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If we provide features that allow you to contact us or submit information, we
                  may collect your name, email address, messages, and feedback that you
                  voluntarily provide.
                </p>

                <h3 className="mt-6 mb-2.5 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                  Typing Test Information
                </h3>

                <p className="mb-4 text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  When you use our typing test, the Website may process information associated
                  with your test session, including your typing speed, WPM, accuracy, test
                  duration, score, test text, and test settings.
                </p>

                <div className="mt-6 rounded-lg border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 p-5">
                  <strong className="block mb-1.5 text-sm font-semibold text-sky-700 dark:text-sky-400">
                    Privacy by design
                  </strong>
                  <p className="text-sm leading-[1.7] text-slate-700 dark:text-slate-300">
                    Where possible, typing-test information may be processed locally in your
                    browser rather than transmitted to our servers.
                  </p>
                </div>
              </section>

              {/* Sections 02 - 14 */}
              {sections.map((section) => (
                <section key={section.number} id={section.id} className="scroll-mt-8">
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {section.number}
                    </span>
                    <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                      {section.title}
                    </h2>
                  </div>

                  {section.content}
                </section>
              ))}

              {/* 15 Contact Us */}
              <section id="contact" className="scroll-mt-8">
                <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                    15
                  </span>
                  <h2 className="font-display text-xl sm:text-[23px] font-semibold text-slate-900 dark:text-slate-100">
                    Contact Us
                  </h2>
                </div>

                <p className="text-sm leading-[1.75] text-slate-600 dark:text-slate-400">
                  If you have questions about this Privacy Policy or want to make a
                  privacy-related request, contact us using the information below.
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
