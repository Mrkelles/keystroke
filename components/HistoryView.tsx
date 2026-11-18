'use client';

import { useMemo, useState } from 'react';
import { Download, Play, Trash2, X } from 'lucide-react';
import type { PersonalBestRecord, TestMode, TestResult } from '@/lib/types';
import { formatDuration } from '@/lib/typing-engine';
import { formatHistoryCsv } from '@/lib/storage';
import { TrendChart, WpmChart } from './WpmChart';

interface HistoryViewProps {
  history: TestResult[];
  personalBests: Record<string, PersonalBestRecord>;
  onDeleteEntry: (id: string) => void;
  onClearHistory: () => void;
  onStartTest: () => void;
}

const PB_DISPLAY_SLOTS: { key: string; label: string }[] = [
  { key: 'time-30', label: 'Time 30s' },
  { key: 'time-60', label: 'Time 1m' },
  { key: 'time-120', label: 'Time 2m' },
  { key: 'time-180', label: 'Time 3m' },
  { key: 'time-300', label: 'Time 5m' },
  { key: 'time-600', label: 'Time 10m' },
  { key: 'words-25', label: '25 Words' },
  { key: 'quote', label: 'Quote' },
];

export default function HistoryView({
  history,
  personalBests,
  onDeleteEntry,
  onClearHistory,
  onStartTest,
}: HistoryViewProps) {
  const [filterMode, setFilterMode] = useState<'all' | TestMode>('all');
  const [confirmClear, setConfirmClear] = useState(false);
  const [inspectedTest, setInspectedTest] = useState<TestResult | null>(null);

  const filteredHistory = useMemo(() => {
    if (filterMode === 'all') return history;
    return history.filter((item) => item.config.mode === filterMode);
  }, [history, filterMode]);

  const handleDownloadCsv = () => {
    if (history.length === 0) return;
    const csv = formatHistoryCsv(history);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `keystroke-history-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Personal Best Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            Personal Bests
          </h2>
          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
            {history.length} saved {history.length === 1 ? 'session' : 'sessions'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PB_DISPLAY_SLOTS.map((slot) => {
            const pb = personalBests[slot.key];
            return (
              <div
                key={slot.key}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">{slot.label}</p>
                {pb ? (
                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <span className="font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                      {pb.wpm}
                      <span className="ml-1 text-xs font-normal text-slate-400">WPM</span>
                    </span>
                    <span className="font-mono text-xs tabular-nums text-emerald-700 dark:text-emerald-400">
                      {pb.accuracy}%
                    </span>
                  </div>
                ) : (
                  <p className="mt-2 font-mono text-xl text-slate-300 dark:text-slate-700">—</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Trend Chart */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6">
        <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Recent Session Progression
        </h3>
        <TrendChart history={filteredHistory} />
      </section>

      {/* Session Log Table */}
      <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
          <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
            {(['all', 'time', 'words', 'quote'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterMode(mode)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize whitespace-nowrap transition-colors ${
                  filterMode === mode
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {mode === 'all' ? 'All Modes' : mode}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {history.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export CSV</span>
                </button>

                {confirmClear ? (
                  <div className="inline-flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onClearHistory();
                        setConfirmClear(false);
                        setInspectedTest(null);
                      }}
                      className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 whitespace-nowrap"
                    >
                      Confirm Clear
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors whitespace-nowrap"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear History</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-14 px-6 text-center">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              No typing tests recorded{filterMode !== 'all' ? ` for ${filterMode} mode` : ''} yet.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              Complete a session in the Typing Studio to track your WPM progression, accuracy, and
              personal bests.
            </p>
            <button
              type="button"
              onClick={onStartTest}
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-4 py-2 text-xs font-medium text-white dark:text-slate-950 transition-colors"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Start Typing Test</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-[#0F1520]">
                  <th className="py-3 px-6 font-medium">Mode</th>
                  <th className="py-3 px-4 font-medium text-right">Net WPM</th>
                  <th className="py-3 px-4 font-medium text-right">Raw</th>
                  <th className="py-3 px-4 font-medium text-right">Accuracy</th>
                  <th className="py-3 px-4 font-medium text-right">Consistency</th>
                  <th className="py-3 px-4 font-medium text-right">Duration</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                {filteredHistory.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setInspectedTest(item)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-6 text-slate-800 dark:text-slate-200 font-medium whitespace-nowrap">
                      <span>{item.modeLabel}</span>
                      {item.isPersonalBest && (
                        <span className="ml-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
                          PB
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums text-sky-600 dark:text-sky-400">
                      {item.wpm}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {item.rawWpm}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-800 dark:text-slate-200">
                      {item.accuracy}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {item.consistency}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {formatDuration(item.durationSeconds)}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button
                        type="button"
                        aria-label="Delete session"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteEntry(item.id);
                          if (inspectedTest?.id === item.id) {
                            setInspectedTest(null);
                          }
                        }}
                        className="rounded p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Inspected Session Detail Panel */}
      {inspectedTest && (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="font-display text-base font-semibold text-slate-900 dark:text-slate-100">
                Session Breakdown · {inspectedTest.modeLabel}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {new Date(inspectedTest.timestamp).toLocaleString()} · {inspectedTest.wpm} WPM ·{' '}
                {inspectedTest.accuracy}% Accuracy · {inspectedTest.consistency}% Consistency
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInspectedTest(null)}
              aria-label="Close session details"
              className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <WpmChart timeline={inspectedTest.timeline} variant="detailed" />
        </section>
      )}
    </div>
  );
}
