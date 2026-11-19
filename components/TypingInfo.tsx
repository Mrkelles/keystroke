'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  Check,
  Code2,
  GraduationCap,
  Keyboard,
  Minus,
  PenTool,
  Plus,
  Rocket,
} from 'lucide-react';

const speedLevels = [
  {
    level: 'Beginner',
    speed: '20–30 WPM',
    description: 'Learning the keyboard and developing basic typing skills.',
  },
  {
    level: 'Developing',
    speed: '30–40 WPM',
    description: 'Comfortable with everyday typing but still building speed.',
  },
  {
    level: 'Average',
    speed: '40–50 WPM',
    description: 'A solid typing speed for general everyday computer use.',
  },
  {
    level: 'Good',
    speed: '50–70 WPM',
    description: 'Fast enough for many professional and academic tasks.',
  },
  {
    level: 'Very Fast',
    speed: '70–90 WPM',
    description: 'A strong typing speed with excellent keyboard familiarity.',
  },
  {
    level: 'Excellent',
    speed: '90+ WPM',
    description: 'Exceptional speed, usually achieved through extensive practice.',
  },
];

const practiceTips = [
  {
    number: '01',
    title: 'Practice Regularly',
    text: 'Spend 5–15 minutes practicing each day. Consistency matters more than long, occasional sessions.',
  },
  {
    number: '02',
    title: 'Focus on Accuracy',
    text: "Don't sacrifice accuracy just to increase your WPM. Fewer mistakes mean less time spent correcting your work.",
  },
  {
    number: '03',
    title: 'Learn Touch Typing',
    text: 'Train yourself to type without looking at the keyboard so your attention can stay focused on the screen.',
  },
  {
    number: '04',
    title: 'Build Muscle Memory',
    text: 'Using consistent finger positions helps your hands learn where each key is without conscious effort.',
  },
  {
    number: '05',
    title: 'Track Your Progress',
    text: 'Take regular tests and compare your WPM and accuracy over time to see whether your practice is working.',
  },
  {
    number: '06',
    title: 'Increase Speed Gradually',
    text: 'Once your accuracy becomes consistent, gradually push your speed higher instead of rushing from the beginning.',
  },
];

const audiences = [
  {
    icon: GraduationCap,
    title: 'Students',
    text: 'Type assignments, notes, essays, and digital coursework more efficiently.',
  },
  {
    icon: Briefcase,
    title: 'Professionals',
    text: 'Save time when writing emails, reports, documents, and messages.',
  },
  {
    icon: Rocket,
    title: 'Job Seekers',
    text: 'Prepare for roles and assessments where keyboard and data-entry skills matter.',
  },
  {
    icon: PenTool,
    title: 'Writers',
    text: 'Get ideas from your head onto the screen faster and with fewer interruptions.',
  },
  {
    icon: Code2,
    title: 'Programmers',
    text: 'Become more comfortable typing code, commands, and technical documentation.',
  },
  {
    icon: Keyboard,
    title: 'Everyone',
    text: 'Build confidence and become more comfortable using a computer every day.',
  },
];

const checklistItems = [
  'Sit comfortably and keep your wrists relaxed.',
  'Keep your eyes on the screen instead of the keyboard.',
  'Try to maintain a steady rhythm.',
  "Don't rush the first few seconds.",
  'Prioritize accuracy over speed.',
  'Avoid unnecessary backspacing.',
  'Take a short break if your hands become tired.',
  'Practice regularly instead of relying on occasional long sessions.',
];

const faqs = [
  {
    question: 'What does WPM mean?',
    answer:
      'WPM stands for words per minute. It is the standard measurement used to describe typing speed.',
  },
  {
    question: 'Is 40 WPM a good typing speed?',
    answer:
      '40 WPM is a reasonable everyday typing speed, especially for someone still developing their keyboard skills. With regular practice, you can work toward a higher speed.',
  },
  {
    question: 'Is accuracy important in a typing test?',
    answer:
      'Yes. High typing speed is much more useful when it comes with high accuracy. Making fewer mistakes means spending less time correcting your work.',
  },
  {
    question: 'How can I increase my WPM?',
    answer:
      'Practice regularly, learn touch typing, focus on accuracy, and gradually increase your speed. Consistent practice is one of the most effective ways to improve.',
  },
  {
    question: 'How long should I practice typing each day?',
    answer:
      'Even 5–15 minutes of focused practice can be useful. The key is consistency. Avoid sacrificing accuracy simply to achieve a higher score.',
  },
  {
    question: 'Can typing speed improve with practice?',
    answer:
      'Yes. Typing is a learned motor skill, and regular practice can improve both speed and accuracy over time.',
  },
  {
    question: 'What is the best way to measure typing progress?',
    answer:
      'Take typing tests regularly and compare your WPM and accuracy scores over time. Using similar test lengths and conditions makes progress easier to measure.',
  },
];

export default function TypingInfo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      aria-label="Typing speed guide and frequently asked questions"
      className="mt-16 pt-4 border-t border-slate-200 dark:border-slate-800 text-left"
    >
      <div className="mx-auto w-full max-w-[920px]">
        {/* Introduction */}
        <div className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold tracking-[1.5px] text-sky-600 dark:text-sky-400">
            <span aria-hidden="true" className="w-5 h-px bg-sky-600 dark:bg-sky-400" />
            <span>TYPING SKILLS</span>
          </div>

          <h2 className="max-w-[760px] mb-4 font-display text-[27px] sm:text-[clamp(30px,5vw,44px)] leading-[1.12] tracking-[-0.7px] sm:tracking-[-1.2px] font-semibold text-slate-900 dark:text-slate-100 text-balance">
            Improve Your Typing Speed and Accuracy
          </h2>

          <p className="max-w-[760px] mb-4 text-[17px] sm:text-xl leading-[1.6] text-slate-900 dark:text-slate-100">
            Want to type faster, make fewer mistakes, and become more confident at the
            keyboard? Our typing test gives you a simple way to measure your speed and accuracy
            while helping you track your progress over time.
          </p>

          <p className="max-w-[760px] text-sm sm:text-base leading-[1.65] text-slate-600 dark:text-slate-400">
            Whether you&apos;re a student, professional, job seeker, programmer, writer, or
            simply someone who wants to improve their keyboard skills, regular typing practice
            can make everyday computer work faster and easier.
          </p>
        </div>

        {/* 01 What Is a Typing Test? */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              01
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                What Is a Typing Test?
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                A simple measurement of speed and accuracy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-7 md:gap-12 items-start">
            <div className="space-y-4 text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
              <p>
                A typing test measures how quickly and accurately you can type a given passage of
                text. Your result is typically measured in{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  words per minute (WPM)
                </strong>{' '}
                and{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  typing accuracy
                </strong>
                .
              </p>

              <p>
                For example, if you type 50 words in one minute, your typing speed is
                approximately 50 WPM. Accuracy compares the characters you typed with the
                original text.
              </p>

              <p>
                A good typing speed isn&apos;t just about typing as fast as possible.{' '}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  Speed and accuracy work together.
                </strong>{' '}
                Typing quickly while making frequent mistakes can actually slow you down because
                you have to stop and correct errors.
              </p>
            </div>

            <div className="max-w-[500px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6">
              <div className="mb-4 font-mono text-[11px] font-semibold tracking-[1.2px] text-slate-500 dark:text-slate-400">
                KEY METRICS
              </div>

              <div className="flex items-center gap-3.5 py-3.5 border-t border-slate-200 dark:border-slate-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 dark:bg-sky-500 font-mono text-sm font-bold text-white dark:text-slate-950">
                  W
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Words Per Minute
                  </strong>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Measures typing speed
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 py-3.5 border-t border-slate-200 dark:border-slate-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 dark:bg-emerald-500 font-mono text-sm font-bold text-white dark:text-slate-950">
                  %
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Accuracy
                  </strong>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Measures typing precision
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3.5 pt-3.5 border-t border-slate-200 dark:border-slate-800">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-600 dark:bg-slate-700 font-mono text-sm font-bold text-white">
                  T
                </div>
                <div>
                  <strong className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Time
                  </strong>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">
                    Measures your test duration
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 02 What Is a Good Typing Speed? */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              02
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                What Is a Good Typing Speed?
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                Use these ranges as a general guide, not a strict target.
              </p>
            </div>
          </div>

          <p className="max-w-[760px] mb-7 text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
            There isn&apos;t one perfect typing speed for everyone. Your ideal speed depends on
            your experience, occupation, and how you use a keyboard.
          </p>

          <div className="w-full overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26]">
            <table className="w-full min-w-[600px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-[#0F1520] border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3.5 px-4.5 font-mono text-[11px] font-semibold tracking-[0.8px] text-slate-500 dark:text-slate-400">
                    Level
                  </th>
                  <th className="py-3.5 px-4.5 font-mono text-[11px] font-semibold tracking-[0.8px] text-slate-500 dark:text-slate-400">
                    Typing Speed
                  </th>
                  <th className="py-3.5 px-4.5 font-mono text-[11px] font-semibold tracking-[0.8px] text-slate-500 dark:text-slate-400">
                    What It Means
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {speedLevels.map((item) => (
                  <tr key={item.level}>
                    <td className="py-4 px-4.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.level}
                    </td>
                    <td className="py-4 px-4.5 font-mono text-sm font-bold tabular-nums text-sky-600 dark:text-sky-400 whitespace-nowrap">
                      {item.speed}
                    </td>
                    <td className="py-4 px-4.5 text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-start gap-3.5 rounded-lg border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 px-4.5 py-4">
            <span className="mt-0.5 font-mono text-[11px] font-bold text-sky-700 dark:text-sky-400 shrink-0">
              TIP
            </span>
            <p className="text-sm leading-[1.65] text-slate-700 dark:text-slate-300">
              Don&apos;t worry if your current score is low. Typing speed is a skill that can
              improve significantly with consistent practice.
            </p>
          </div>
        </div>

        {/* 03 Why Is Typing Speed Important? */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              03
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Why Is Typing Speed Important?
              </h2>
            </div>
          </div>

          <div className="relative mb-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] py-6 sm:py-7 pr-5 sm:pr-8 pl-11 sm:pl-14">
            <span
              aria-hidden="true"
              className="absolute top-3 left-4 sm:left-5 font-serif text-4xl sm:text-5xl leading-none text-sky-600 dark:text-sky-400"
            >
              &ldquo;
            </span>
            <p className="text-[17px] sm:text-xl leading-[1.55] text-slate-900 dark:text-slate-100">
              The real goal isn&apos;t simply to chase a higher WPM score. It&apos;s being able
              to communicate and work efficiently without your keyboard getting in the way.
            </p>
          </div>

          <p className="mb-4 text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Fast, accurate typing can save time every day. Tasks such as writing emails,
            completing assignments, entering information, creating documents, chatting online,
            and coding all become easier when you can type without constantly looking at the
            keyboard.
          </p>

          <p className="text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
            For professionals, stronger typing skills can improve productivity. For students,
            they can make it easier to take notes and complete digital assignments. For job
            seekers, typing speed may even be included as part of an employment skills
            assessment.
          </p>
        </div>

        {/* 04 Speed vs. Accuracy */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              04
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Speed vs. Accuracy
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                Which matters more? Both.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_50px_1fr] gap-3 md:gap-4 items-center my-7">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  PERSON A
                </span>
                <strong className="font-mono text-[22px] font-bold tabular-nums text-slate-900 dark:text-slate-100">
                  70 WPM
                </strong>
              </div>
              <div className="h-1.5 my-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <span className="block h-full w-[92%] rounded-full bg-rose-600 dark:bg-rose-400" />
              </div>
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>92% accuracy</span>
                <span className="font-medium text-rose-600 dark:text-rose-400">
                  More corrections
                </span>
              </div>
            </div>

            <div className="flex h-6 items-center justify-center font-mono text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              VS
            </div>

            <div className="rounded-xl border border-emerald-500/70 dark:border-emerald-500/50 bg-white dark:bg-[#131A26] p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                  PERSON B
                </span>
                <strong className="font-mono text-[22px] font-bold tabular-nums text-slate-900 dark:text-slate-100">
                  55 WPM
                </strong>
              </div>
              <div className="h-1.5 my-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <span className="block h-full w-[99%] rounded-full bg-emerald-600 dark:bg-emerald-400" />
              </div>
              <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>99% accuracy</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  Fewer corrections
                </span>
              </div>
            </div>
          </div>

          <p className="max-w-[750px] text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Although Person A is faster, they may spend more time correcting mistakes. Person
            B&apos;s slower but more accurate typing can be more efficient in real-world
            situations.
          </p>
        </div>

        {/* 05 How to Improve Your Typing Speed */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              05
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                How to Improve Your Typing Speed
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                Small improvements add up when you practice consistently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {practiceTips.map((tip) => (
              <article
                key={tip.number}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 sm:p-6 transition-all duration-150 hover:border-sky-600/60 dark:hover:border-sky-400/60 hover:-translate-y-0.5"
              >
                <span className="block mb-4 font-mono text-xs font-semibold text-sky-600 dark:text-sky-400">
                  {tip.number}
                </span>
                <h3 className="mb-2 font-display text-[17px] font-semibold text-slate-900 dark:text-slate-100">
                  {tip.title}
                </h3>
                <p className="text-sm leading-[1.6] text-slate-600 dark:text-slate-400">
                  {tip.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* 06 Who Should Practice Typing? */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              06
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Who Should Practice Typing?
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                Better keyboard skills can benefit almost anyone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {audiences.map((person) => {
              const Icon = person.icon;
              return (
                <article
                  key={person.title}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5"
                >
                  <Icon className="mb-4 h-6 w-6 text-sky-600 dark:text-sky-400" />
                  <h3 className="mb-1.5 font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                    {person.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-slate-600 dark:text-slate-400">
                    {person.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* 07 Tips for a Better Typing Test Score */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              07
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Tips for a Better Typing Test Score
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mb-7 border-t border-slate-200 dark:border-slate-800">
            {checklistItems.map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 py-3.5 border-b border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-3 w-3 stroke-[2.5]" />
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>

          <p className="text-sm sm:text-[15px] leading-[1.7] text-slate-600 dark:text-slate-400">
            Most importantly,{' '}
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              don&apos;t compare your score too closely
            </strong>{' '}
            with someone else&apos;s. Your biggest competition is your previous result.
          </p>
        </div>

        {/* CTA */}
        <div className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="relative overflow-hidden rounded-xl border border-sky-600/35 dark:border-sky-400/35 bg-gradient-to-br from-sky-500/10 via-white to-white dark:from-sky-500/10 dark:via-[#131A26] dark:to-[#131A26] p-7 sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-sky-600/25 dark:border-sky-400/25"
            />
            <div className="inline-flex items-center gap-2 mb-4 font-mono text-xs font-bold tracking-[1.5px] text-sky-600 dark:text-sky-400">
              <span aria-hidden="true" className="w-5 h-px bg-sky-600 dark:bg-sky-400" />
              <span>READY TO IMPROVE?</span>
            </div>

            <h2 className="max-w-[650px] mb-3 font-display text-[27px] sm:text-[clamp(28px,4vw,40px)] leading-[1.12] font-semibold text-slate-900 dark:text-slate-100">
              Put Your Typing Skills to the Test
            </h2>

            <p className="max-w-[650px] mb-6 text-sm sm:text-base leading-[1.65] text-slate-600 dark:text-slate-400">
              Take a test, see where you stand, and use your result as a starting point. Come
              back regularly and challenge yourself to beat your previous score.
            </p>

            <a
              href="#typing-test"
              className="inline-flex items-center gap-3 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-5 py-3 text-sm font-semibold text-white dark:text-slate-950 transition-all duration-150 hover:-translate-y-0.5"
            >
              <span>Start Typing Test</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* 08 FAQ */}
        <div className="py-11 sm:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3 sm:gap-4 mb-7">
            <span className="flex h-8 w-8 sm:h-[38px] sm:w-[38px] shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 font-mono text-[10px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
              08
            </span>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-xs sm:text-[15px] text-slate-500 dark:text-slate-400">
                Everything you need to know about typing tests.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-800">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="border-b border-slate-200 dark:border-slate-800"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 py-4 sm:py-5 text-left text-sm sm:text-[15px] font-semibold text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400">
                      {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-2 sm:pr-12 text-sm leading-[1.7] text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="py-14 sm:py-20 text-center">
          <h2 className="mb-3 font-display text-2xl sm:text-[30px] font-semibold text-slate-900 dark:text-slate-100">
            Your typing speed isn&apos;t fixed.
          </h2>
          <p className="mx-auto max-w-[600px] mb-5 text-sm sm:text-base leading-[1.65] text-slate-600 dark:text-slate-400">
            With regular practice, better technique, and attention to accuracy, you can become
            a faster and more confident typist.
          </p>
          <a
            href="#typing-test"
            className="group inline-flex items-center gap-2 rounded-lg border border-sky-600 dark:border-sky-400 bg-white dark:bg-[#131A26] px-5 py-2.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-600 hover:border-sky-600 hover:text-white dark:hover:bg-sky-400 dark:hover:border-sky-400 dark:hover:text-slate-950 transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400"
          >
            <span>Take the typing test</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
