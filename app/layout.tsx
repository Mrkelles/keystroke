import type { Metadata } from 'next';
import Script from 'next/script';
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TypingMeter — Precision Typing Test & Telemetry Studio',
  description:
    'Precision typing test studio with live WPM analytics, DummyJSON quote-powered timed and word modes, local personal best tracking, and an interactive missed-key keyboard heatmap.',
  openGraph: {
    title: 'TypingMeter — Precision Typing Test & Telemetry Studio',
    description:
      'Precision typing test studio with live WPM analytics, DummyJSON quote-powered timed and word modes, local personal best tracking, and an interactive missed-key keyboard heatmap.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TypingMeter — Precision Typing Test & Telemetry Studio',
    description:
      'Precision typing test studio with live WPM analytics, DummyJSON quote-powered timed and word modes, local personal best tracking, and an interactive missed-key keyboard heatmap.',
  },
};

const themeInitScript = `
(function() {
  try {
    var raw = localStorage.getItem('keystroke_studio_v1');
    var theme = raw ? JSON.parse(raw).theme : null;
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0B0F17] dark:text-[#F1F5F9] transition-colors duration-150 selection:bg-sky-500/20 selection:text-sky-900 dark:selection:text-sky-100"
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7FBZTC7B6P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7FBZTC7B6P');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
