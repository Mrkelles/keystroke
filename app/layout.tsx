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
  metadataBase: new URL("https://www.typingmeter.net"),

  title: {
    default: "Typing Test - Test and Improve Your Typing Skills",
    template: "%s | TypingMeter",
  },

  description:
    "Test and improve your typing skills with our free online typing test.",

  keywords: [
    "typing examination",
    "typing test",
    "typing practice",
    "typing skills test",
    "typing speed test",
    "typewriting",
    "typing lessons",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "https://www.typingmeter.net",
    title: "Typing Test - Test and Improve Your Typing Skills",
    description:
      "Test and improve your typing skills with our free online typing test.",
    siteName: "TypingMeter",
    images: [
      {
        url: "https://i.imgur.com/liGggkA.png",
        width: 1200,
        height: 630,
        alt: "TypingMeter - Free Online Typing Test",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Typing Test - Test and Improve Your Typing Skills",
    description:
      "Test and improve your typing skills with our free online typing test.",
    images: ["https://i.imgur.com/liGggkA.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
