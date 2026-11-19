import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us — TypingMeter',
  description:
    'Learn why TypingMeter was built: simple typing tests, meaningful accuracy and WPM insights, and steady progress for students, professionals, writers, and programmers.',
};

const audiences = [
  {
    number: '01',
    title: 'Students',
    text: 'Improve typing skills for essays, assignments, research, digital notes, and online learning.',
  },
  {
    number: '02',
    title: 'Professionals',
    text: 'Save time when writing emails, reports, documents, messages, and other everyday work.',
  },
  {
    number: '03',
    title: 'Job Seekers',
    text: 'Practice keyboard skills and prepare for roles where typing speed and accuracy may be assessed.',
  },
  {
    number: '04',
    title: 'Writers & Creators',
    text: 'Get ideas onto the screen faster without letting slow typing interrupt your creative flow.',
  },
  {
    number: '05',
    title: 'Programmers',
    text: 'Develop greater keyboard familiarity when writing code, commands, and technical documentation.',
  },
  {
    number: '06',
    title: 'Anyone Learning',
    text: "Whether you're just starting or already type quickly, regular testing gives you a simple way to measure progress.",
  },
];

const principles = [
  {
    icon: '01',
    title: 'Simple',
    text: 'You should be able to start testing without unnecessary complexity.',
  },
  {
    icon: '02',
    title: 'Useful',
    text: 'Your results should tell you something meaningful about your typing.',
  },
  {
    icon: '03',
    title: 'Accessible',
    text: 'Typing practice should be available to anyone who wants to improve.',
  },
  {
    icon: '04',
    title: 'Progress-Focused',
    text: 'Your score is most valuable when it helps you understand your improvement.',
  },
];

const goals = [
  'Test your typing speed',
  'Measure typing accuracy',
  'Practice regularly',
  'Track improvement',
  'Build keyboard confidence',
  'Reach a new personal best',
];

const progressSteps = [
  { num: '01', label: 'Take a test' },
  { num: '02', label: 'Practice' },
  { num: '03', label: 'Test again' },
  { num: '04', label: 'Improve' },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9]">
      <Header activePath="/about" />

      <main className="flex-1 w-full">
        <div className="mx-auto w-full max-w-[1000px]">
          {/* Hero */}
          <section className="px-5 sm:px-7 md:px-10 pt-10 pb-14 sm:pb-20 md:pb-24 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5 mb-5 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.6px]">
              <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
              <span>About Us</span>
            </div>

            <h1 className="max-w-[850px] mb-6 font-display text-[34px] min-[380px]:text-[39px] md:text-[clamp(42px,7vw,68px)] leading-[1.05] tracking-[-1.5px] md:tracking-[-2.2px] font-semibold text-slate-900 dark:text-slate-100 text-balance">
              Helping You Type Faster,
              <br />
              <em className="not-italic text-sky-600 dark:text-sky-400">
                One Test at a Time.
              </em>
            </h1>

            <p className="max-w-[680px] mb-7 text-base sm:text-[19px] leading-[1.65] text-slate-600 dark:text-slate-400">
              Typing is one of the most common skills we use when working, studying,
              communicating, and creating online. Our goal is simple: make typing practice
              easy, useful, and accessible to everyone.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-3.5 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-5 py-3 text-sm font-semibold text-white dark:text-slate-950 transition-all duration-150 hover:-translate-y-0.5"
            >
              <span>Take a Typing Test</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </section>

          {/* 01 Our Purpose */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 px-5 sm:px-7 md:px-10 py-12 sm:py-14 md:py-18 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2.5 pt-1.5 font-mono text-[11px] font-bold tracking-[1.2px] text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400">01</span>
              <span>Our Purpose</span>
            </div>

            <div>
              <h2 className="mb-5 font-display text-[27px] md:text-[32px] leading-[1.15] tracking-[-0.8px] font-semibold text-slate-900 dark:text-slate-100">
                Simple tools. Useful results.
              </h2>

              <p className="max-w-[700px] mb-4 text-[17px] md:text-[19px] leading-[1.6] text-slate-900 dark:text-slate-100">
                You don&apos;t need complicated software or a lengthy setup to improve your
                typing.
              </p>

              <p className="max-w-[700px] mb-4 leading-[1.7] text-slate-600 dark:text-slate-400">
                Take a test, type at your natural pace, and see your results. Your WPM score
                shows how quickly you type, while your accuracy score helps you understand how
                consistently you type correctly.
              </p>

              <p className="max-w-[700px] leading-[1.7] text-slate-600 dark:text-slate-400">
                Together, these measurements give you a much better picture of your real
                typing ability than speed alone.
              </p>
            </div>
          </section>

          {/* 02 Why We Built This */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 px-5 sm:px-7 md:px-10 py-12 sm:py-14 md:py-18 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2.5 pt-1.5 font-mono text-[11px] font-bold tracking-[1.2px] text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400">02</span>
              <span>Why We Built This</span>
            </div>

            <div>
              <h2 className="mb-5 font-display text-[27px] md:text-[32px] leading-[1.15] tracking-[-0.8px] font-semibold text-slate-900 dark:text-slate-100">
                Small improvements can add up.
              </h2>

              <p className="max-w-[700px] mb-4 leading-[1.7] text-slate-600 dark:text-slate-400">
                Typing skills can have a surprisingly large impact on everyday productivity.
              </p>

              <p className="max-w-[700px] leading-[1.7] text-slate-600 dark:text-slate-400">
                A few extra words per minute might not seem significant, but over hundreds of
                emails, assignments, reports, messages, and documents, those saved seconds can
                add up.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-7 border-t border-slate-200 dark:border-slate-800">
                {goals.map((goal) => (
                  <div
                    key={goal}
                    className="flex items-center gap-3 py-3.5 pr-3 border-b border-slate-200 dark:border-slate-800"
                  >
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check className="h-3 w-3 stroke-[2.5]" />
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Speed & Accuracy Feature */}
          <section className="grid grid-cols-1 md:grid-cols-[1fr_350px] gap-10 md:gap-16 items-center px-5 sm:px-7 md:px-10 py-12 sm:py-16 md:py-20 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-[#0F1520]">
            <div>
              <div className="flex items-center gap-2.5 mb-5 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.6px]">
                <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
                <span>Our Approach</span>
              </div>

              <h2 className="mb-6 font-display text-[31px] min-[380px]:text-[35px] md:text-[42px] leading-[1.08] tracking-[-1.2px] font-semibold text-slate-900 dark:text-slate-100">
                Speed is only
                <br />
                <em className="not-italic text-sky-600 dark:text-sky-400">
                  half the story.
                </em>
              </h2>

              <p className="max-w-[620px] mb-4 leading-[1.65] text-slate-600 dark:text-slate-400">
                A typing test shouldn&apos;t encourage you to type as fast as possible while
                ignoring mistakes.
              </p>

              <p className="max-w-[620px] mb-4 leading-[1.65] text-slate-600 dark:text-slate-400">
                That&apos;s why we place equal importance on{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  speed and accuracy.
                </strong>
              </p>

              <p className="max-w-[620px] leading-[1.65] text-slate-600 dark:text-slate-400">
                Someone typing 80 WPM with frequent errors isn&apos;t necessarily more effective
                than someone typing 60 WPM with excellent accuracy. In real-world situations,
                correcting mistakes takes time.
              </p>

              <div className="mt-7 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5">
                <span className="block mb-1.5 font-mono text-[11px] font-semibold tracking-[1px] text-sky-600 dark:text-sky-400">
                  The Goal
                </span>
                <strong className="block font-display text-[19px] leading-[1.4] font-semibold text-slate-900 dark:text-slate-100">
                  Type faster
                  <br />
                  without losing control.
                </strong>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5">
                <span className="block mb-1.5 font-mono text-[10px] tracking-[1px] text-slate-500 dark:text-slate-400">
                  SPEED
                </span>
                <div className="flex items-baseline">
                  <strong className="font-mono text-[40px] leading-none font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    80
                  </strong>
                  <small className="ml-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    WPM
                  </small>
                </div>
                <div className="h-[5px] my-3.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <span className="block h-full w-[80%] bg-rose-600 dark:bg-rose-400" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Fast, but with frequent errors.
                </p>
              </div>

              <div className="self-center font-mono text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500">
                VS
              </div>

              <div className="rounded-lg border border-emerald-500/70 dark:border-emerald-500/50 bg-white dark:bg-[#131A26] p-5">
                <span className="block mb-1.5 font-mono text-[10px] tracking-[1px] text-emerald-700 dark:text-emerald-400">
                  BALANCED
                </span>
                <div className="flex items-baseline">
                  <strong className="font-mono text-[40px] leading-none font-bold tabular-nums text-slate-900 dark:text-slate-100">
                    60
                  </strong>
                  <small className="ml-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    WPM
                  </small>
                </div>
                <div className="h-[5px] my-3.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <span className="block h-full w-[99%] bg-emerald-600 dark:bg-emerald-400" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Slower, but highly accurate.
                </p>
              </div>
            </div>
          </section>

          {/* 03 Who Is It For? */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 px-5 sm:px-7 md:px-10 py-12 sm:py-14 md:py-18 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2.5 pt-1.5 font-mono text-[11px] font-bold tracking-[1.2px] text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400">03</span>
              <span>Who Is It For?</span>
            </div>

            <div>
              <h2 className="mb-5 font-display text-[27px] md:text-[32px] leading-[1.15] tracking-[-0.8px] font-semibold text-slate-900 dark:text-slate-100">
                Built for anyone who uses a keyboard.
              </h2>

              <p className="max-w-[700px] mb-7 leading-[1.7] text-slate-600 dark:text-slate-400">
                Whether you&apos;re learning to type for the first time or trying to beat a
                personal record, regular testing gives you a simple way to measure progress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {audiences.map((audience) => (
                  <article
                    key={audience.number}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 transition-all duration-150 hover:border-sky-600/60 dark:hover:border-sky-400/60 hover:-translate-y-0.5"
                  >
                    <span className="block mb-5 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                      {audience.number}
                    </span>

                    <h3 className="mb-2 font-display text-[17px] font-semibold text-slate-900 dark:text-slate-100">
                      {audience.title}
                    </h3>

                    <p className="text-[13px] leading-[1.65] text-slate-600 dark:text-slate-400">
                      {audience.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 04 Improvement */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 px-5 sm:px-7 md:px-10 py-12 sm:py-14 md:py-18 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2.5 pt-1.5 font-mono text-[11px] font-bold tracking-[1.2px] text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400">04</span>
              <span>Improvement</span>
            </div>

            <div>
              <h2 className="mb-5 font-display text-[27px] md:text-[32px] leading-[1.15] tracking-[-0.8px] font-semibold text-slate-900 dark:text-slate-100">
                Your first score doesn&apos;t have to be your final score.
              </h2>

              <p className="max-w-[700px] mb-4 text-[17px] md:text-[19px] leading-[1.6] text-slate-900 dark:text-slate-100">
                Typing is a skill that develops through repetition.
              </p>

              <p className="max-w-[700px] mb-4 leading-[1.7] text-slate-600 dark:text-slate-400">
                With regular practice, proper technique, and a focus on accuracy, you can
                gradually improve your performance.
              </p>

              <p className="max-w-[700px] leading-[1.7] text-slate-600 dark:text-slate-400">
                That&apos;s why we encourage you to use your results as a{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  baseline, not a judgment.
                </strong>
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mt-9 p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26]">
                {progressSteps.map((step, index) => (
                  <div key={step.num} className="contents">
                    <div className="flex sm:block items-center gap-3 flex-1">
                      <span className="sm:block sm:mb-1.5 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                        {step.num}
                      </span>
                      <strong className="text-[13px] font-semibold text-slate-900 dark:text-slate-100">
                        {step.label}
                      </strong>
                    </div>
                    {index < progressSteps.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="hidden sm:flex items-center px-3 text-slate-400 dark:text-slate-500"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 05 Our Philosophy */}
          <section className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-12 px-5 sm:px-7 md:px-10 py-12 sm:py-14 md:py-18 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-2.5 pt-1.5 font-mono text-[11px] font-bold tracking-[1.2px] text-slate-500 dark:text-slate-400">
              <span className="text-sky-600 dark:text-sky-400">05</span>
              <span>Our Philosophy</span>
            </div>

            <div>
              <h2 className="mb-6 font-display text-[27px] md:text-[32px] leading-[1.15] tracking-[-0.8px] font-semibold text-slate-900 dark:text-slate-100">
                Good typing tools should be simple.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {principles.map((principle) => (
                  <article
                    key={principle.icon}
                    className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6"
                  >
                    <span className="block mb-6 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                      {principle.icon}
                    </span>

                    <h3 className="mb-2 font-display text-[17px] font-semibold text-slate-900 dark:text-slate-100">
                      {principle.title}
                    </h3>

                    <p className="text-[13px] leading-[1.65] text-slate-600 dark:text-slate-400">
                      {principle.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-5 sm:px-7 md:px-10 py-16 sm:py-20 md:py-24 text-center">
            <div className="mx-auto max-w-[720px]">
              <div className="flex items-center justify-center gap-2.5 mb-5 text-sky-600 dark:text-sky-400 font-mono text-[11px] font-bold tracking-[1.6px]">
                <span aria-hidden="true" className="w-6 h-px bg-sky-600 dark:bg-sky-400" />
                <span>Start Where You Are</span>
              </div>

              <h2 className="mb-5 font-display text-[34px] min-[380px]:text-[39px] md:text-[clamp(40px,6vw,58px)] leading-[1.05] tracking-[-1.5px] md:tracking-[-1.8px] font-semibold text-slate-900 dark:text-slate-100 text-balance">
                Your typing speed
                <br />
                <em className="not-italic text-sky-600 dark:text-sky-400">
                  isn&apos;t fixed.
                </em>
              </h2>

              <p className="mx-auto max-w-[550px] mb-7 leading-[1.65] text-slate-600 dark:text-slate-400">
                Whether you&apos;re at 20 WPM or 100 WPM, there&apos;s always another level to
                reach.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-3.5 mb-11 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-5 py-3 text-sm font-semibold text-white dark:text-slate-950 transition-all duration-150 hover:-translate-y-0.5"
              >
                <span>Take the Typing Test</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>

              <div className="font-mono text-[11px] font-bold tracking-[2px] text-slate-500 dark:text-slate-400">
                TYPE. <span className="text-sky-600 dark:text-sky-400">TEST.</span> IMPROVE.
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
