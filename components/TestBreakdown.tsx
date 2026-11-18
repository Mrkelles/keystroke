'use client';

import { Award, History, RefreshCw, RotateCcw, Target } from 'lucide-react';
import type { KeyStat, TestResult } from '@/lib/types';
import { formatDuration, getWeakestKeys } from '@/lib/typing-engine';
import { WpmChart } from './WpmChart';
import KeyboardHeatmap from './KeyboardHeatmap';

interface TestBreakdownProps {
  result: TestResult;
  allTimeKeyStats: Record<string, KeyStat>;
  onNextTest: () => void;
  onRepeatTest: () => void;
  onPracticeWeakKeys: () => void;
  onOpenHistory: () => void;
}

export default function TestBreakdown({
  result,
  allTimeKeyStats,
  onNextTest,
  onRepeatTest,
  onPracticeWeakKeys,
  onOpenHistory,
}: TestBreakdownProps) {
  const sessionWeakKeys = getWeakestKeys(result.keyStats, 5);

  return (
    <div className="space-y-8">
      {/* Primary Result Summary Card */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-baseline gap-10">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Net Speed</p>
              <p className="mt-1 font-mono text-4xl sm:text-5xl font-bold tabular-nums text-sky-600 dark:text-sky-400">
                {result.wpm}{' '}
                <span className="text-lg font-medium text-slate-400 dark:text-slate-500">
                  WPM
                </span>
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
              <p className="mt-1 font-mono text-4xl sm:text-5xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {result.accuracy}%
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            {result.isPersonalBest && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200">
                <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>New Personal Best for {result.modeLabel}</span>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{result.modeLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                {formatDuration(result.durationSeconds)}
              </span>
              {result.config.punctuation && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Punctuation</span>
                </>
              )}
              {result.config.numbers && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Numbers</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Raw Speed</p>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {result.rawWpm} WPM
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Consistency</p>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {result.consistency}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Characters (C / I / E / M)
            </p>
            <p className="mt-1 font-mono text-xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {result.charCounts.correct} /{' '}
              <span className="text-rose-600 dark:text-rose-400">
                {result.charCounts.incorrect}
              </span>{' '}
              / {result.charCounts.extra} / {result.charCounts.missed}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Quote Source</p>
            <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
              {result.quoteAttributions.length > 0
                ? result.quoteAttributions.join(', ')
                : 'DummyJSON Quotes'}
            </p>
          </div>
        </div>

        {/* Interactive WPM & Accuracy Chart */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <WpmChart timeline={result.timeline} variant="detailed" />
        </div>

        {/* Action Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onNextTest}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-4 py-2 text-xs font-medium text-white dark:text-slate-950 transition-colors whitespace-nowrap"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Next Test</span>
            </button>

            <button
              type="button"
              onClick={onRepeatTest}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Repeat Same Text</span>
            </button>

            {sessionWeakKeys.length > 0 && (
              <button
                type="button"
                onClick={onPracticeWeakKeys}
                className="inline-flex items-center gap-2 rounded-lg border border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 text-xs font-medium text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition-colors whitespace-nowrap"
              >
                <Target className="h-3.5 w-3.5" />
                <span>Practice Missed Keys</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            <History className="h-3.5 w-3.5" />
            <span>View All History</span>
          </button>
        </div>
      </section>

      {/* Session Missed-Key Heatmap */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 sm:p-8">
        <KeyboardHeatmap
          allTimeKeyStats={allTimeKeyStats}
          lastTestKeyStats={result.keyStats}
          embedded
        />
      </section>
    </div>
  );
}
