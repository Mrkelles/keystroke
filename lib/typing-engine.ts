import type {
  CharCounts,
  KeyStat,
  QuotePayload,
  SecondSample,
  TestConfig,
  TimeDuration,
} from './types';

export const TIME_PRESETS: { value: TimeDuration; label: string }[] = [
  { value: 30, label: '30s' },
  { value: 60, label: '1m' },
  { value: 120, label: '2m' },
  { value: 180, label: '3m' },
  { value: 300, label: '5m' },
  { value: 600, label: '10m' },
];

export const WORD_PRESETS: { value: 10 | 25 | 50 | 100; label: string }[] = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export function formatDuration(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimePresetLabel(seconds: TimeDuration): string {
  if (seconds < 60) return `${seconds}s`;
  return `${seconds / 60}m`;
}

export function getModeKey(config: TestConfig): string {
  if (config.mode === 'time') return `time-${config.duration}`;
  if (config.mode === 'words') return `words-${config.wordCount}`;
  return 'quote';
}

export function getModeLabel(config: TestConfig): string {
  if (config.mode === 'time') return `Time ${formatTimePresetLabel(config.duration)}`;
  if (config.mode === 'words') return `${config.wordCount} Words`;
  return 'Quote';
}

export function normalizeKeyId(char: string): string {
  if (char === ' ') return 'Space';
  if (char.length === 1) return char.toLowerCase();
  return char;
}

export function getWeakestKeys(
  keyStats: Record<string, KeyStat>,
  limit = 5
): { key: string; missRate: number; misses: number; hits: number }[] {
  return Object.entries(keyStats)
    .filter(([key, stat]) => key !== 'Space' && key.length === 1 && stat.misses > 0)
    .map(([key, stat]) => {
      const total = stat.hits + stat.misses;
      return {
        key,
        missRate: total > 0 ? (stat.misses / total) * 100 : 0,
        misses: stat.misses,
        hits: stat.hits,
      };
    })
    .sort((a, b) => {
      if (b.missRate !== a.missRate) return b.missRate - a.missRate;
      return b.misses - a.misses;
    })
    .slice(0, limit);
}

export function transformQuotesToWords(
  quotes: QuotePayload[],
  config: TestConfig,
  allTimeKeyStats?: Record<string, KeyStat>
): string[] {
  const rawWords = quotes
    .flatMap((q) => q.quote.split(/\s+/))
    .map((w) => w.trim())
    .filter(Boolean);

  const shouldPreservePunctuation = config.mode === 'quote' || config.punctuation;

  let processed = rawWords
    .map((word) => {
      if (shouldPreservePunctuation) {
        return word;
      }
      return word.replace(/^[^\w]+|[^\w]+$/g, '').replace(/[^\w'-]/g, '').toLowerCase();
    })
    .filter(Boolean);

  if (config.mode !== 'quote' && config.numbers) {
    const withNumbers: string[] = [];
    processed.forEach((word, index) => {
      withNumbers.push(word);
      if ((index + 1) % 7 === 0) {
        const sampleNum = ((index * 37 + 14) % 990) + 10;
        withNumbers.push(String(sampleNum));
      }
    });
    processed = withNumbers;
  }

  if (config.weakKeyFocus && allTimeKeyStats) {
    const weakest = new Set(getWeakestKeys(allTimeKeyStats, 6).map((item) => item.key));
    if (weakest.size > 0 && config.mode !== 'quote') {
      const prioritized: string[] = [];
      const secondary: string[] = [];
      for (const word of processed) {
        const lower = word.toLowerCase();
        const hasWeakKey = Array.from(weakest).some((k) => lower.includes(k));
        if (hasWeakKey) {
          prioritized.push(word);
        } else {
          secondary.push(word);
        }
      }
      if (prioritized.length > 0) {
        processed = [...prioritized, ...secondary];
      }
    }
  }

  if (config.mode === 'words') {
    if (processed.length >= config.wordCount) {
      return processed.slice(0, config.wordCount);
    }
    const expanded = [...processed];
    let guard = 0;
    while (expanded.length < config.wordCount && processed.length > 0 && guard < 10) {
      expanded.push(...processed);
      guard++;
    }
    return expanded.slice(0, config.wordCount);
  }

  return processed;
}

export function computeWordMetrics(
  targetWords: string[],
  typedWords: string[],
  activeWordIndex: number,
  includePartialActiveWord = true
): CharCounts {
  let correct = 0;
  let incorrect = 0;
  let extra = 0;
  let missed = 0;

  const limit = includePartialActiveWord
    ? Math.min(typedWords.length, targetWords.length)
    : Math.min(activeWordIndex, targetWords.length);

  for (let w = 0; w < limit; w++) {
    const target = targetWords[w] ?? '';
    const typed = typedWords[w] ?? '';
    const isCompletedWord = w < activeWordIndex;

    // Skip untouched words beyond active position
    if (!isCompletedWord && typed.length === 0 && w > activeWordIndex) {
      continue;
    }

    const minLen = Math.min(target.length, typed.length);
    for (let c = 0; c < minLen; c++) {
      if (typed[c] === target[c]) {
        correct++;
      } else {
        incorrect++;
      }
    }

    if (typed.length > target.length) {
      extra += typed.length - target.length;
    } else if (isCompletedWord && typed.length < target.length) {
      missed += target.length - typed.length;
    }

    // Completed word space contributes 1 correct character
    if (isCompletedWord && typed.length > 0) {
      correct++;
    }
  }

  return { correct, incorrect, extra, missed };
}

export function calculateWpmAndAccuracy(params: {
  charCounts: CharCounts;
  totalKeystrokes: number;
  correctKeystrokes: number;
  elapsedMs: number;
}): { wpm: number; rawWpm: number; accuracy: number } {
  const { charCounts, totalKeystrokes, correctKeystrokes, elapsedMs } = params;
  const minutes = Math.max(elapsedMs / 60000, 1 / 60); // floor at 1s to avoid early spike infinity

  const wpm = Math.max(0, Math.round(charCounts.correct / 5 / minutes));
  const rawWpm = Math.max(0, Math.round(totalKeystrokes / 5 / minutes));
  const accuracy =
    totalKeystrokes > 0
      ? Math.min(100, Math.max(0, Math.round((correctKeystrokes / totalKeystrokes) * 100)))
      : 100;

  return { wpm, rawWpm, accuracy };
}

export function calculateConsistency(timeline: SecondSample[]): number {
  if (timeline.length < 2) return 100;
  const values = timeline.map((s) => s.rawWpm).filter((v) => v > 0);
  if (values.length < 2) return 100;

  const mean = values.reduce((acc, v) => acc + v, 0) / values.length;
  if (mean === 0) return 100;

  const variance = values.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  const cv = (stdDev / mean) * 100;
  return Math.max(0, Math.min(100, Math.round(100 - cv)));
}

export function mergeKeyStats(
  base: Record<string, KeyStat>,
  delta: Record<string, KeyStat>
): Record<string, KeyStat> {
  const next: Record<string, KeyStat> = {};

  for (const [k, stat] of Object.entries(base)) {
    next[k] = {
      hits: stat.hits,
      misses: stat.misses,
      mistypedAs: { ...stat.mistypedAs },
    };
  }

  for (const [k, stat] of Object.entries(delta)) {
    if (!next[k]) {
      next[k] = {
        hits: stat.hits,
        misses: stat.misses,
        mistypedAs: { ...stat.mistypedAs },
      };
    } else {
      next[k].hits += stat.hits;
      next[k].misses += stat.misses;
      for (const [wrongKey, count] of Object.entries(stat.mistypedAs)) {
        next[k].mistypedAs[wrongKey] = (next[k].mistypedAs[wrongKey] ?? 0) + count;
      }
    }
  }

  return next;
}
