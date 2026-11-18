'use client';

import { useMemo, useState } from 'react';
import { RotateCcw, Target } from 'lucide-react';
import type { KeyStat } from '@/lib/types';
import { getWeakestKeys } from '@/lib/typing-engine';

interface KeyboardHeatmapProps {
  allTimeKeyStats: Record<string, KeyStat>;
  lastTestKeyStats?: Record<string, KeyStat>;
  embedded?: boolean;
  onPracticeWeakKeys?: () => void;
  onResetKeyStats?: () => void;
}

const KEYBOARD_ROWS: { key: string; label: string; widthClass?: string }[][] = [
  [
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: '3', label: '3' },
    { key: '4', label: '4' },
    { key: '5', label: '5' },
    { key: '6', label: '6' },
    { key: '7', label: '7' },
    { key: '8', label: '8' },
    { key: '9', label: '9' },
    { key: '0', label: '0' },
    { key: '-', label: '-' },
    { key: '=', label: '=' },
  ],
  [
    { key: 'q', label: 'Q' },
    { key: 'w', label: 'W' },
    { key: 'e', label: 'E' },
    { key: 'r', label: 'R' },
    { key: 't', label: 'T' },
    { key: 'y', label: 'Y' },
    { key: 'u', label: 'U' },
    { key: 'i', label: 'I' },
    { key: 'o', label: 'O' },
    { key: 'p', label: 'P' },
    { key: '[', label: '[' },
    { key: ']', label: ']' },
  ],
  [
    { key: 'a', label: 'A' },
    { key: 's', label: 'S' },
    { key: 'd', label: 'D' },
    { key: 'f', label: 'F' },
    { key: 'g', label: 'G' },
    { key: 'h', label: 'H' },
    { key: 'j', label: 'J' },
    { key: 'k', label: 'K' },
    { key: 'l', label: 'L' },
    { key: ';', label: ';' },
    { key: "'", label: "'" },
  ],
  [
    { key: 'z', label: 'Z' },
    { key: 'x', label: 'X' },
    { key: 'c', label: 'C' },
    { key: 'v', label: 'V' },
    { key: 'b', label: 'B' },
    { key: 'n', label: 'N' },
    { key: 'm', label: 'M' },
    { key: ',', label: ',' },
    { key: '.', label: '.' },
    { key: '/', label: '/' },
  ],
  [{ key: 'Space', label: 'Space', widthClass: 'w-56 sm:w-72' }],
];

function getHeatStyle(stat?: KeyStat): {
  surfaceClass: string;
  missRate: number;
  accuracy: number;
  total: number;
} {
  if (!stat || stat.hits + stat.misses === 0) {
    return {
      surfaceClass:
        'bg-white dark:bg-[#131A26] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400',
      missRate: 0,
      accuracy: 100,
      total: 0,
    };
  }

  const total = stat.hits + stat.misses;
  const missRate = (stat.misses / total) * 100;
  const accuracy = Math.round((stat.hits / total) * 100);

  if (stat.misses === 0) {
    return {
      surfaceClass:
        'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/70 text-emerald-900 dark:text-emerald-200',
      missRate: 0,
      accuracy: 100,
      total,
    };
  }

  if (missRate < 8) {
    return {
      surfaceClass:
        'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/80 text-amber-900 dark:text-amber-200',
      missRate,
      accuracy,
      total,
    };
  }

  if (missRate < 18) {
    return {
      surfaceClass:
        'bg-orange-100 dark:bg-orange-950/55 border-orange-300 dark:border-orange-700 text-orange-950 dark:text-orange-100',
      missRate,
      accuracy,
      total,
    };
  }

  return {
    surfaceClass:
      'bg-rose-100 dark:bg-rose-950/70 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-100',
    missRate,
    accuracy,
    total,
  };
}

export default function KeyboardHeatmap({
  allTimeKeyStats,
  lastTestKeyStats,
  embedded = false,
  onPracticeWeakKeys,
  onResetKeyStats,
}: KeyboardHeatmapProps) {
  const [scope, setScope] = useState<'all' | 'last'>(
    embedded && lastTestKeyStats ? 'last' : 'all'
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const activeStats = useMemo(() => {
    if (scope === 'last' && lastTestKeyStats) return lastTestKeyStats;
    return allTimeKeyStats;
  }, [scope, lastTestKeyStats, allTimeKeyStats]);

  const weakestKeys = useMemo(() => getWeakestKeys(activeStats, 5), [activeStats]);
  const effectiveSelectedKey = selectedKey ?? weakestKeys[0]?.key ?? 'e';
  const inspectedStat = activeStats[effectiveSelectedKey];
  const inspectedTotal = inspectedStat ? inspectedStat.hits + inspectedStat.misses : 0;
  const inspectedAccuracy =
    inspectedTotal > 0 && inspectedStat
      ? Math.round((inspectedStat.hits / inspectedTotal) * 100)
      : 100;

  const topSubstitutions = useMemo(() => {
    if (!inspectedStat) return [];
    return Object.entries(inspectedStat.mistypedAs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);
  }, [inspectedStat]);

  const hasAnyData = Object.keys(activeStats).length > 0;

  return (
    <div className="space-y-6">
      {/* Header / Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-slate-100">
            {embedded ? 'Session Key Heatmap' : 'Interactive Keyboard Heatmap'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Click any keycap to inspect hit accuracy and frequent mistyped substitutions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!embedded && lastTestKeyStats && (
            <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
              <button
                type="button"
                onClick={() => setScope('all')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  scope === 'all'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                All-Time
              </button>
              <button
                type="button"
                onClick={() => setScope('last')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${
                  scope === 'last'
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Last Test
              </button>
            </div>
          )}

          {onPracticeWeakKeys && weakestKeys.length > 0 && (
            <button
              type="button"
              onClick={onPracticeWeakKeys}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-400 px-3.5 py-2 text-xs font-medium text-white dark:text-slate-950 transition-colors whitespace-nowrap shrink-0"
            >
              <Target className="h-3.5 w-3.5" />
              <span>Practice Weak Keys</span>
            </button>
          )}

          {!embedded && onResetKeyStats && hasAnyData && (
            <>
              {confirmReset ? (
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      onResetKeyStats();
                      setConfirmReset(false);
                    }}
                    className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white hover:bg-rose-700 whitespace-nowrap"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Key Stats</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-5 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131A26]" />
          <span>Untested</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-xs border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40" />
          <span>0% Misses</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-xs border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40" />
          <span>&lt;8% Miss Rate</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-xs border border-orange-300 dark:border-orange-700 bg-orange-100 dark:bg-orange-950/55" />
          <span>8–18% Miss Rate</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-xs border border-rose-400 dark:border-rose-700 bg-rose-100 dark:bg-rose-950/70" />
          <span>&ge;18% Miss Rate</span>
        </span>
      </div>

      {/* Keyboard Matrix + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0F1520] p-4 sm:p-6">
          <div className="flex flex-col items-center gap-2 min-w-[560px]">
            {KEYBOARD_ROWS.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex items-center justify-center gap-1.5"
                style={{
                  paddingLeft:
                    rowIdx === 1 ? '18px' : rowIdx === 2 ? '30px' : rowIdx === 3 ? '46px' : '0px',
                }}
              >
                {row.map((k) => {
                  const stat = activeStats[k.key];
                  const heat = getHeatStyle(stat);
                  const isSelected = effectiveSelectedKey === k.key;

                  return (
                    <button
                      key={k.key}
                      type="button"
                      onClick={() => setSelectedKey(k.key)}
                      aria-label={`Key ${k.label}, ${heat.accuracy}% accuracy, ${stat?.misses ?? 0} misses`}
                      className={`relative flex flex-col items-center justify-center rounded-lg border transition-transform duration-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 ${
                        k.widthClass ?? 'w-10 sm:w-11'
                      } h-11 sm:h-12 ${heat.surfaceClass} ${
                        isSelected
                          ? 'ring-2 ring-sky-600 dark:ring-sky-400 ring-offset-1 ring-offset-slate-50 dark:ring-offset-[#0F1520]'
                          : ''
                      }`}
                    >
                      <span className="font-mono text-xs sm:text-sm font-semibold leading-none">
                        {k.label}
                      </span>
                      {stat && stat.misses > 0 && (
                        <span className="mt-1 font-mono text-[10px] leading-none tabular-nums opacity-85">
                          {Math.round(heat.missRate)}%
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Key Inspector Panel */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Selected Key</p>
              <p className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-slate-100">
                {effectiveSelectedKey === 'Space' ? 'Space' : effectiveSelectedKey.toUpperCase()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Key Accuracy</p>
              <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-100">
                {inspectedTotal > 0 ? `${inspectedAccuracy}%` : '—'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Correct Hits</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
                {inspectedStat?.hits ?? 0}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Missed Presses</p>
              <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-rose-600 dark:text-rose-400">
                {inspectedStat?.misses ?? 0}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Common Mistyped Keys
            </p>
            {topSubstitutions.length > 0 ? (
              <div className="mt-2.5 space-y-2">
                {topSubstitutions.map(([wrongKey, count]) => (
                  <div
                    key={wrongKey}
                    className="flex items-center justify-between text-xs font-mono tabular-nums text-slate-700 dark:text-slate-300"
                  >
                    <span>
                      Pressed{' '}
                      <strong className="rounded border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 text-slate-900 dark:text-slate-100">
                        {wrongKey === 'Space' ? 'Space' : wrongKey.toUpperCase()}
                      </strong>
                    </span>
                    <span className="text-rose-600 dark:text-rose-400">{count}x</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                {inspectedTotal > 0
                  ? 'No substitutions recorded on this key.'
                  : 'Type a test to collect telemetry for this key.'}
              </p>
            )}
          </div>

          {/* Weakest Keys Summary */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Highest Miss-Rate Keys
            </p>
            {weakestKeys.length > 0 ? (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {weakestKeys.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setSelectedKey(item.key)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-2.5 py-1 font-mono text-xs tabular-nums text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <span className="font-semibold">{item.key.toUpperCase()}</span>
                    <span className="text-rose-600 dark:text-rose-400">
                      {Math.round(item.missRate)}%
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                No missed keys recorded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
