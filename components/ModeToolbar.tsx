'use client';

import { RefreshCw, Target } from 'lucide-react';
import type { TestConfig, TestMode, TimeDuration, WordCountOption } from '@/lib/types';
import { TIME_PRESETS, WORD_PRESETS } from '@/lib/typing-engine';

interface ModeToolbarProps {
  config: TestConfig;
  onChangeConfig: (next: TestConfig) => void;
  onRefreshQuote: () => void;
  hasWeakKeyData: boolean;
  disabled?: boolean;
}

const MODE_OPTIONS: { id: TestMode; label: string }[] = [
  { id: 'time', label: 'Time' },
  { id: 'words', label: 'Words' },
  { id: 'quote', label: 'Quote' },
];

export default function ModeToolbar({
  config,
  onChangeConfig,
  onRefreshQuote,
  hasWeakKeyData,
  disabled = false,
}: ModeToolbarProps) {
  const updateMode = (mode: TestMode) => {
    onChangeConfig({ ...config, mode });
  };

  const updateDuration = (duration: TimeDuration) => {
    onChangeConfig({ ...config, mode: 'time', duration });
  };

  const updateWordCount = (wordCount: WordCountOption) => {
    onChangeConfig({ ...config, mode: 'words', wordCount });
  };

  return (
    <section
      aria-label="Test configuration"
      className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-4 py-2.5"
    >
      <div className="flex flex-wrap items-center gap-3">
        {/* Mode selector */}
        <div
          role="group"
          aria-label="Test mode"
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-900/90 p-1"
        >
          {MODE_OPTIONS.map((item) => {
            const active = config.mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={disabled}
                onClick={() => updateMode(item.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active
                    ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-slate-100 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <span
          aria-hidden="true"
          className="hidden sm:inline-block h-5 w-px bg-slate-200 dark:bg-slate-800"
        />

        {/* Sub-options per mode */}
        {config.mode === 'time' && (
          <div
            role="group"
            aria-label="Time duration presets"
            className="flex flex-wrap items-center gap-1"
          >
            {TIME_PRESETS.map((preset) => {
              const active = config.duration === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateDuration(preset.value)}
                  className={`rounded-md px-2.5 py-1.5 font-mono text-xs font-medium tabular-nums whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        )}

        {config.mode === 'words' && (
          <div
            role="group"
            aria-label="Word count presets"
            className="flex flex-wrap items-center gap-1"
          >
            {WORD_PRESETS.map((preset) => {
              const active = config.wordCount === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateWordCount(preset.value)}
                  className={`rounded-md px-2.5 py-1.5 font-mono text-xs font-medium tabular-nums whitespace-nowrap shrink-0 transition-colors duration-150 ${
                    active
                      ? 'bg-sky-600 text-white dark:bg-sky-500 dark:text-slate-950'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        )}

        {config.mode === 'quote' && (
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="whitespace-nowrap">Random Quote Stream</span>
            <button
              type="button"
              onClick={onRefreshQuote}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
            >
              <RefreshCw className="h-3 w-3" />
              <span>New Quote</span>
            </button>
          </div>
        )}
      </div>

      {/* Text Modifiers */}
      {config.mode !== 'quote' && (
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onChangeConfig({ ...config, punctuation: !config.punctuation })}
            aria-pressed={config.punctuation}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
              config.punctuation
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            Punctuation
          </button>

          <button
            type="button"
            disabled={disabled}
            onClick={() => onChangeConfig({ ...config, numbers: !config.numbers })}
            aria-pressed={config.numbers}
            className={`rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
              config.numbers
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            Numbers
          </button>

          <button
            type="button"
            disabled={disabled || !hasWeakKeyData}
            title={
              hasWeakKeyData
                ? 'Prioritize words containing your most frequently missed keys'
                : 'Complete at least one test with missed keys to enable weak-key focus'
            }
            onClick={() => onChangeConfig({ ...config, weakKeyFocus: !config.weakKeyFocus })}
            aria-pressed={config.weakKeyFocus}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 ${
              !hasWeakKeyData
                ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed'
                : config.weakKeyFocus
                  ? 'bg-amber-600 text-white dark:bg-amber-500 dark:text-slate-950'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80'
            }`}
          >
            <Target className="h-3.5 w-3.5 shrink-0" />
            <span>Weak Keys</span>
          </button>
        </div>
      )}
    </section>
  );
}
