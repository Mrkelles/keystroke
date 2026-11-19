import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-[#0B0F17]">
      <div className="mx-auto flex max-w-[1140px] flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-mono text-center sm:text-left">
          TypingMeter · Type. Test. Improve.
        </span>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-2.5 text-center"
        >
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Typing Test
          </Link>
          <Link
            href="/about"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
          <Link
            href="/terms"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Terms of Use
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Privacy Policy
          </Link>
          <Link
            href="/disclaimer"
            className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            Disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
