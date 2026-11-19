'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

const TOPIC_SUGGESTIONS = [
  'General Question',
  'Bug Report',
  'Feature Request',
  'Privacy or Legal Inquiry',
];

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Question');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const payload = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !payload.success) {
        setErrorMsg(payload.error || 'Could not send message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setSubject('General Question');
      setMessage('');
    } catch {
      setErrorMsg('Network error while sending message. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-[#131A26] p-7 sm:p-9 space-y-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
        </div>

        <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-slate-100">
          Message sent
        </h2>

        <p className="text-sm leading-[1.7] text-slate-600 dark:text-slate-400">
          Thank you for reaching out. We&apos;ve received your message and will get back to you as
          soon as possible.
        </p>

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 sm:p-8 space-y-5"
    >
      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 p-4 text-xs leading-[1.6] text-rose-700 dark:text-rose-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block mb-2 text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            minLength={2}
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-600 dark:focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-600/20 dark:focus:ring-sky-400/20 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block mb-2 text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            maxLength={200}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-600 dark:focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-600/20 dark:focus:ring-sky-400/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="block mb-2 text-xs font-medium text-slate-700 dark:text-slate-300"
        >
          Subject
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          {TOPIC_SUGGESTIONS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => setSubject(topic)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                subject === topic
                  ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
        <input
          id="contact-subject"
          type="text"
          required
          minLength={2}
          maxLength={160}
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="How can we help?"
          className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-600 dark:focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-600/20 dark:focus:ring-sky-400/20 transition-colors"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="contact-message"
            className="text-xs font-medium text-slate-700 dark:text-slate-300"
          >
            Message
          </label>
          <span className="font-mono text-[11px] tabular-nums text-slate-400 dark:text-slate-500">
            {message.length} / 5000
          </span>
        </div>
        <textarea
          id="contact-message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your feedback, question, or issue..."
          className="w-full resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-600 dark:focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-600/20 dark:focus:ring-sky-400/20 transition-colors"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your message will be delivered directly to our support inbox.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 text-sm font-semibold text-white dark:text-slate-950 transition-colors whitespace-nowrap"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
