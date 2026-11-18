export type AppTab = 'test' | 'heatmap' | 'history';

export type ThemeMode = 'light' | 'dark';

export type TestMode = 'time' | 'words' | 'quote';

export type TimeDuration = 30 | 60 | 120 | 180 | 300 | 600;

export type WordCountOption = 10 | 25 | 50 | 100;

export interface TestConfig {
  mode: TestMode;
  duration: TimeDuration;
  wordCount: WordCountOption;
  punctuation: boolean;
  numbers: boolean;
  weakKeyFocus: boolean;
}

export interface QuotePayload {
  id: number;
  quote: string;
  author: string;
}

export interface SecondSample {
  second: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
}

export interface KeyStat {
  hits: number;
  misses: number;
  mistypedAs: Record<string, number>;
}

export interface CharCounts {
  correct: number;
  incorrect: number;
  extra: number;
  missed: number;
}

export interface TestResult {
  id: string;
  timestamp: number;
  modeKey: string;
  modeLabel: string;
  config: TestConfig;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  durationSeconds: number;
  charCounts: CharCounts;
  timeline: SecondSample[];
  keyStats: Record<string, KeyStat>;
  quoteAttributions: string[];
  source: 'dummyjson' | 'fallback';
  isPersonalBest?: boolean;
}

export interface PersonalBestRecord {
  wpm: number;
  accuracy: number;
  timestamp: number;
  testId: string;
  modeLabel: string;
}

export interface StoredAppState {
  version: number;
  theme: ThemeMode;
  config: TestConfig;
  history: TestResult[];
  personalBests: Record<string, PersonalBestRecord>;
  keyStats: Record<string, KeyStat>;
}
