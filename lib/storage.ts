import type {
  KeyStat,
  PersonalBestRecord,
  StoredAppState,
  TestConfig,
  TestResult,
  ThemeMode,
} from './types';
import { mergeKeyStats } from './typing-engine';

const STORAGE_KEY = 'keystroke_studio_v1';
const MAX_HISTORY_ITEMS = 200;

export const DEFAULT_CONFIG: TestConfig = {
  mode: 'time',
  duration: 60,
  wordCount: 25,
  punctuation: true,
  numbers: false,
  weakKeyFocus: false,
};

export function createEmptyState(theme: ThemeMode = 'light'): StoredAppState {
  return {
    version: 1,
    theme,
    config: DEFAULT_CONFIG,
    history: [],
    personalBests: {},
    keyStats: {},
  };
}

const SERVER_SNAPSHOT: StoredAppState = createEmptyState('light');
let clientSnapshot: StoredAppState | null = null;
const listeners = new Set<() => void>();

export function getServerAppStateSnapshot(): StoredAppState {
  return SERVER_SNAPSHOT;
}

export function getClientAppStateSnapshot(): StoredAppState {
  if (!clientSnapshot) {
    clientSnapshot = loadAppState();
  }
  return clientSnapshot;
}

export function subscribeAppState(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setClientSnapshot(next: StoredAppState): StoredAppState {
  clientSnapshot = next;
  persistAppState(next);
  listeners.forEach((listener) => listener());
  return next;
}

export function loadAppState(): StoredAppState {
  if (typeof window === 'undefined') {
    return SERVER_SNAPSHOT;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      return createEmptyState(prefersDark ? 'dark' : 'light');
    }

    const parsed = JSON.parse(raw) as Partial<StoredAppState>;
    const validDurations = new Set([30, 60, 120, 180, 300, 600]);
    const validWordCounts = new Set([10, 25, 50, 100]);

    const config: TestConfig = {
      mode:
        parsed.config?.mode === 'time' ||
        parsed.config?.mode === 'words' ||
        parsed.config?.mode === 'quote'
          ? parsed.config.mode
          : DEFAULT_CONFIG.mode,
      duration:
        parsed.config?.duration && validDurations.has(parsed.config.duration)
          ? parsed.config.duration
          : DEFAULT_CONFIG.duration,
      wordCount:
        parsed.config?.wordCount && validWordCounts.has(parsed.config.wordCount)
          ? parsed.config.wordCount
          : DEFAULT_CONFIG.wordCount,
      punctuation:
        typeof parsed.config?.punctuation === 'boolean'
          ? parsed.config.punctuation
          : DEFAULT_CONFIG.punctuation,
      numbers:
        typeof parsed.config?.numbers === 'boolean'
          ? parsed.config.numbers
          : DEFAULT_CONFIG.numbers,
      weakKeyFocus:
        typeof parsed.config?.weakKeyFocus === 'boolean'
          ? parsed.config.weakKeyFocus
          : DEFAULT_CONFIG.weakKeyFocus,
    };

    return {
      version: 1,
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
      config,
      history: Array.isArray(parsed.history) ? parsed.history : [],
      personalBests:
        parsed.personalBests && typeof parsed.personalBests === 'object'
          ? parsed.personalBests
          : {},
      keyStats:
        parsed.keyStats && typeof parsed.keyStats === 'object' ? parsed.keyStats : {},
    };
  } catch {
    return SERVER_SNAPSHOT;
  }
}

export function persistAppState(state: StoredAppState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors gracefully
  }
}

export function saveThemePreference(theme: ThemeMode): StoredAppState {
  const current = getClientAppStateSnapshot();
  return setClientSnapshot({ ...current, theme });
}

export function saveConfigPreference(config: TestConfig): StoredAppState {
  const current = getClientAppStateSnapshot();
  return setClientSnapshot({ ...current, config });
}

export function commitTestResult(result: TestResult): {
  nextState: StoredAppState;
  savedResult: TestResult;
} {
  const current = getClientAppStateSnapshot();
  const existingPb = current.personalBests[result.modeKey];
  const isNewPb =
    !existingPb ||
    result.wpm > existingPb.wpm ||
    (result.wpm === existingPb.wpm && result.accuracy > existingPb.accuracy);

  const savedResult: TestResult = {
    ...result,
    isPersonalBest: isNewPb,
  };

  const nextPersonalBests: Record<string, PersonalBestRecord> = {
    ...current.personalBests,
  };

  if (isNewPb) {
    nextPersonalBests[result.modeKey] = {
      wpm: result.wpm,
      accuracy: result.accuracy,
      timestamp: result.timestamp,
      testId: result.id,
      modeLabel: result.modeLabel,
    };
  }

  const nextHistory = [savedResult, ...current.history].slice(0, MAX_HISTORY_ITEMS);
  const nextKeyStats = mergeKeyStats(current.keyStats, result.keyStats);

  const nextState = setClientSnapshot({
    ...current,
    history: nextHistory,
    personalBests: nextPersonalBests,
    keyStats: nextKeyStats,
  });

  return { nextState, savedResult };
}

export function removeHistoryEntry(id: string): StoredAppState {
  const current = getClientAppStateSnapshot();
  const nextHistory = current.history.filter((entry) => entry.id !== id);
  const nextPersonalBests: Record<string, PersonalBestRecord> = {};

  for (const item of nextHistory) {
    const existing = nextPersonalBests[item.modeKey];
    if (
      !existing ||
      item.wpm > existing.wpm ||
      (item.wpm === existing.wpm && item.accuracy > existing.accuracy)
    ) {
      nextPersonalBests[item.modeKey] = {
        wpm: item.wpm,
        accuracy: item.accuracy,
        timestamp: item.timestamp,
        testId: item.id,
        modeLabel: item.modeLabel,
      };
    }
  }

  return setClientSnapshot({
    ...current,
    history: nextHistory,
    personalBests: nextPersonalBests,
  });
}

export function resetKeyStats(): StoredAppState {
  const current = getClientAppStateSnapshot();
  return setClientSnapshot({
    ...current,
    keyStats: {},
  });
}

export function clearHistoryAndRecords(): StoredAppState {
  const current = getClientAppStateSnapshot();
  return setClientSnapshot({
    ...current,
    history: [],
    personalBests: {},
  });
}

export function formatHistoryCsv(history: TestResult[]): string {
  const headers = [
    'Date',
    'Mode',
    'Net WPM',
    'Raw WPM',
    'Accuracy %',
    'Consistency %',
    'Duration (s)',
    'Correct Chars',
    'Incorrect Chars',
    'Extra Chars',
    'Missed Chars',
    'Personal Best',
  ];

  const rows = history.map((item) => [
    new Date(item.timestamp).toISOString(),
    `"${item.modeLabel}"`,
    item.wpm,
    item.rawWpm,
    item.accuracy,
    item.consistency,
    item.durationSeconds,
    item.charCounts.correct,
    item.charCounts.incorrect,
    item.charCounts.extra,
    item.charCounts.missed,
    item.isPersonalBest ? 'Yes' : 'No',
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export type KeyStatMap = Record<string, KeyStat>;
