import { NextRequest, NextResponse } from 'next/server';
import type { QuotePayload } from '@/lib/types';

export const dynamic = 'force-dynamic';

const DUMMYJSON_RANDOM_QUOTE_URL = 'https://dummyjson.com/quotes/random';

const EMERGENCY_FALLBACK_QUOTES: QuotePayload[] = [
  {
    id: 9001,
    quote:
      'The quality of your focus determines the clarity of your craft, because steady deliberate practice turns hesitation into effortless rhythm.',
    author: 'TypingMeter Fallback Archive',
  },
  {
    id: 9002,
    quote:
      'Simplicity is about subtracting the obvious and adding the meaningful so every keystroke carries calm intention and measurable precision.',
    author: 'John Maeda (Adapted)',
  },
  {
    id: 9003,
    quote:
      'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away from the work in front of you.',
    author: 'Antoine de Saint-Exupery',
  },
];

function sanitizeTypeableText(input: string): string {
  return input
    .replace(/[\u2018\u2019\u201A\u201B\u2032]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchSingleRandomQuote(): Promise<QuotePayload> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(DUMMYJSON_RANDOM_QUOTE_URL, {
      cache: 'no-store',
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`DummyJSON responded with status ${res.status}`);
    }

    const data = (await res.json()) as {
      id?: number;
      quote?: string;
      author?: string;
    };

    if (!data.quote || typeof data.quote !== 'string') {
      throw new Error('Malformed quote payload from DummyJSON');
    }

    return {
      id: typeof data.id === 'number' ? data.id : Math.floor(Math.random() * 100000),
      quote: sanitizeTypeableText(data.quote),
      author: typeof data.author === 'string' && data.author.trim() ? data.author.trim() : 'Unknown',
    };
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(req: NextRequest) {
  const countParam = Number(req.nextUrl.searchParams.get('count') ?? '1');
  const count = Number.isFinite(countParam) ? Math.min(Math.max(Math.round(countParam), 1), 6) : 1;

  try {
    const settled = await Promise.allSettled(
      Array.from({ length: count }, () => fetchSingleRandomQuote())
    );

    const quotes: QuotePayload[] = [];
    const seenIds = new Set<number>();

    for (const item of settled) {
      if (item.status === 'fulfilled' && !seenIds.has(item.value.id)) {
        seenIds.add(item.value.id);
        quotes.push(item.value);
      }
    }

    if (quotes.length === 0) {
      throw new Error('Unable to fetch quotes from DummyJSON');
    }

    return NextResponse.json(
      {
        quotes,
        source: 'dummyjson',
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Quote fetch error';
    const fallbackSlice = Array.from({ length: count }, (_, idx) => {
      const base = EMERGENCY_FALLBACK_QUOTES[idx % EMERGENCY_FALLBACK_QUOTES.length];
      return {
        ...base,
        id: base.id + idx * 100,
      };
    });

    return NextResponse.json(
      {
        quotes: fallbackSlice,
        source: 'fallback',
        error: message,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}
