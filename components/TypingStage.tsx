'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';
import type {
  KeyStat,
  QuotePayload,
  SecondSample,
  TestConfig,
  TestResult,
} from '@/lib/types';
import {
  calculateConsistency,
  calculateWpmAndAccuracy,
  computeWordMetrics,
  formatDuration,
  getModeKey,
  getModeLabel,
  normalizeKeyId,
  transformQuotesToWords,
} from '@/lib/typing-engine';
import { WpmChart } from './WpmChart';

interface TypingStageProps {
  config: TestConfig;
  allTimeKeyStats: Record<string, KeyStat>;
  repeatPayload: { words: string[]; attributions: string[]; source: 'dummyjson' | 'fallback' } | null;
  onRequestNewQuote: () => void;
  onCompleteTest: (
    result: TestResult,
    sourceText: { words: string[]; attributions: string[]; source: 'dummyjson' | 'fallback' }
  ) => void;
}

export default function TypingStage({
  config,
  allTimeKeyStats,
  repeatPayload,
  onRequestNewQuote,
  onCompleteTest,
}: TypingStageProps) {
  const initialWords = repeatPayload?.words ?? [];
  const [targetWords, setTargetWords] = useState<string[]>(initialWords);
  const [attributions, setAttributions] = useState<string[]>(
    repeatPayload?.attributions ?? []
  );
  const [quoteSource, setQuoteSource] = useState<'dummyjson' | 'fallback'>(
    repeatPayload?.source ?? 'dummyjson'
  );
  const [isLoading, setIsLoading] = useState<boolean>(!repeatPayload);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [typedWords, setTypedWords] = useState<string[]>(() =>
    initialWords.length > 0 ? new Array(initialWords.length).fill('') : []
  );
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [isFocused, setIsFocused] = useState<boolean>(true);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(config.duration);
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);
  const [liveErrors, setLiveErrors] = useState<number>(0);
  const [timeline, setTimeline] = useState<SecondSample[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeCharRef = useRef<HTMLSpanElement | null>(null);
  const lastCharRef = useRef<HTMLSpanElement | null>(null);

  // Mutable high-frequency telemetry refs
  const startTimeRef = useRef<number | null>(null);
  const totalKeystrokesRef = useRef<number>(0);
  const correctKeystrokesRef = useRef<number>(0);
  const secondErrorsRef = useRef<number>(0);
  const totalErrorsRef = useRef<number>(0);
  const sessionKeyStatsRef = useRef<Record<string, KeyStat>>({});
  const timelineRef = useRef<SecondSample[]>([]);
  const lastSampledSecondRef = useRef<number>(0);
  const finishedRef = useRef<boolean>(false);
  const prefetchingRef = useRef<boolean>(false);
  const tabPressedAtRef = useRef<number>(0);
  const scrollOffsetRef = useRef<number>(0);

  const targetWordsRef = useRef<string[]>(targetWords);
  const typedWordsRef = useRef<string[]>(typedWords);
  const activeWordIndexRef = useRef<number>(activeWordIndex);
  const attributionsRef = useRef<string[]>(attributions);
  const quoteSourceRef = useRef<'dummyjson' | 'fallback'>(quoteSource);

  useEffect(() => {
    targetWordsRef.current = targetWords;
  }, [targetWords]);

  useEffect(() => {
    typedWordsRef.current = typedWords;
  }, [typedWords]);

  useEffect(() => {
    activeWordIndexRef.current = activeWordIndex;
  }, [activeWordIndex]);

  useEffect(() => {
    attributionsRef.current = attributions;
  }, [attributions]);

  useEffect(() => {
    quoteSourceRef.current = quoteSource;
  }, [quoteSource]);

  const resetMetricsState = useCallback(
    (wordCount: number) => {
      startTimeRef.current = null;
      totalKeystrokesRef.current = 0;
      correctKeystrokesRef.current = 0;
      secondErrorsRef.current = 0;
      totalErrorsRef.current = 0;
      sessionKeyStatsRef.current = {};
      timelineRef.current = [];
      lastSampledSecondRef.current = 0;
      finishedRef.current = false;
      scrollOffsetRef.current = 0;

      const emptyTyped = new Array(wordCount).fill('');
      typedWordsRef.current = emptyTyped;
      activeWordIndexRef.current = 0;

      setTypedWords(emptyTyped);
      setActiveWordIndex(0);
      setStatus('idle');
      setRemainingSeconds(config.duration);
      setLiveWpm(0);
      setLiveAccuracy(100);
      setLiveErrors(0);
      setTimeline([]);

      if (trackRef.current) {
        trackRef.current.style.transform = 'translateY(0px)';
      }
    },
    [config.duration]
  );

  // Initial quote fetch when mounted without repeatPayload
  useEffect(() => {
    if (repeatPayload && repeatPayload.words.length > 0) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => window.clearTimeout(timer);
    }

    const controller = new AbortController();
    const fetchCount = config.mode === 'quote' ? 1 : config.mode === 'time' ? 4 : 3;

    fetch(`/api/quotes?count=${fetchCount}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load quote text');
        return res.json() as Promise<{
          quotes: QuotePayload[];
          source: 'dummyjson' | 'fallback';
        }>;
      })
      .then((payload) => {
        const words = transformQuotesToWords(payload.quotes, config, allTimeKeyStats);
        const authors = Array.from(new Set(payload.quotes.map((q) => q.author).filter(Boolean)));
        const emptyTyped = new Array(words.length).fill('');

        targetWordsRef.current = words;
        typedWordsRef.current = emptyTyped;
        attributionsRef.current = authors;
        quoteSourceRef.current = payload.source;

        setTargetWords(words);
        setTypedWords(emptyTyped);
        setAttributions(authors);
        setQuoteSource(payload.source);
        setIsLoading(false);
        window.setTimeout(() => inputRef.current?.focus(), 20);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setFetchError('Could not fetch quote text from API. Check connection and retry.');
        setIsLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Background prefetch for Time mode (crucial for 3m, 5m, 10m runs)
  const prefetchMoreWords = useCallback(async () => {
    if (prefetchingRef.current || config.mode !== 'time') return;
    prefetchingRef.current = true;
    try {
      const res = await fetch('/api/quotes?count=3', { cache: 'no-store' });
      if (!res.ok) return;
      const payload = (await res.json()) as {
        quotes: QuotePayload[];
        source: 'dummyjson' | 'fallback';
      };
      const extraWords = transformQuotesToWords(payload.quotes, config, allTimeKeyStats);
      const extraAuthors = payload.quotes.map((q) => q.author).filter(Boolean);

      setTargetWords((prev) => [...prev, ...extraWords]);
      setTypedWords((prev) => [...prev, ...new Array(extraWords.length).fill('')]);
      setAttributions((prev) => Array.from(new Set([...prev, ...extraAuthors])));
    } catch {
      // Silent retry on next word advance
    } finally {
      prefetchingRef.current = false;
    }
  }, [config, allTimeKeyStats]);

  const finishTest = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setStatus('finished');

    const now = performance.now();
    const start = startTimeRef.current ?? now;
    const elapsedMs =
      config.mode === 'time' ? config.duration * 1000 : Math.max(1000, now - start);
    const durationSeconds = Math.max(1, Math.round(elapsedMs / 1000));

    const currentTargets = targetWordsRef.current;
    const currentTyped = typedWordsRef.current;
    const currentActiveIdx = activeWordIndexRef.current;

    const charCounts = computeWordMetrics(currentTargets, currentTyped, currentActiveIdx, true);
    const { wpm, rawWpm, accuracy } = calculateWpmAndAccuracy({
      charCounts,
      totalKeystrokes: totalKeystrokesRef.current,
      correctKeystrokes: correctKeystrokesRef.current,
      elapsedMs,
    });

    const finalTimeline = [...timelineRef.current];
    if (
      finalTimeline.length === 0 ||
      finalTimeline[finalTimeline.length - 1].second < durationSeconds
    ) {
      finalTimeline.push({
        second: durationSeconds,
        wpm,
        rawWpm,
        accuracy,
        errors: secondErrorsRef.current,
      });
    }

    const consistency = calculateConsistency(finalTimeline);

    const result: TestResult = {
      id: `test_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timestamp: Date.now(),
      modeKey: getModeKey(config),
      modeLabel: getModeLabel(config),
      config: { ...config },
      wpm,
      rawWpm,
      accuracy,
      consistency,
      durationSeconds,
      charCounts,
      timeline: finalTimeline,
      keyStats: sessionKeyStatsRef.current,
      quoteAttributions: attributionsRef.current,
      source: quoteSourceRef.current,
    };

    onCompleteTest(result, {
      words: currentTargets,
      attributions: attributionsRef.current,
      source: quoteSourceRef.current,
    });
  }, [config, onCompleteTest]);

  // Timer & per-second sampling loop
  useEffect(() => {
    if (status !== 'running') return;

    const interval = window.setInterval(() => {
      if (!startTimeRef.current || finishedRef.current) return;
      const now = performance.now();
      const elapsedMs = now - startTimeRef.current;
      const elapsedWholeSeconds = Math.floor(elapsedMs / 1000);

      const charCounts = computeWordMetrics(
        targetWordsRef.current,
        typedWordsRef.current,
        activeWordIndexRef.current,
        true
      );
      const { wpm, rawWpm, accuracy } = calculateWpmAndAccuracy({
        charCounts,
        totalKeystrokes: totalKeystrokesRef.current,
        correctKeystrokes: correctKeystrokesRef.current,
        elapsedMs,
      });

      setLiveWpm(wpm);
      setLiveAccuracy(accuracy);

      if (config.mode === 'time') {
        const rem = Math.max(0, Math.ceil((config.duration * 1000 - elapsedMs) / 1000));
        setRemainingSeconds(rem);
      }

      if (elapsedWholeSeconds > lastSampledSecondRef.current) {
        lastSampledSecondRef.current = elapsedWholeSeconds;
        const sample: SecondSample = {
          second: elapsedWholeSeconds,
          wpm,
          rawWpm,
          accuracy,
          errors: secondErrorsRef.current,
        };
        secondErrorsRef.current = 0;
        timelineRef.current = [...timelineRef.current, sample];
        setTimeline(timelineRef.current);
      }

      if (config.mode === 'time' && elapsedMs >= config.duration * 1000) {
        finishTest();
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [status, config.mode, config.duration, finishTest]);

  // Smooth caret tracking & 3-line viewport scrolling via DOM transform
  useLayoutEffect(() => {
    if (isLoading || targetWords.length === 0) return;

    const activeWordEl = wordRefs.current[activeWordIndex];
    const caretEl = caretRef.current;
    const trackEl = trackRef.current;
    if (!activeWordEl || !caretEl || !trackEl) return;

    const rowTop = activeWordEl.offsetTop;
    const nextScroll = rowTop >= 96 ? rowTop - 48 : 0;
    if (nextScroll !== scrollOffsetRef.current) {
      scrollOffsetRef.current = nextScroll;
      trackEl.style.transform = `translateY(-${nextScroll}px)`;
    }

    const currentTyped = typedWords[activeWordIndex] ?? '';
    const targetWord = targetWords[activeWordIndex] ?? '';

    let caretX = activeWordEl.offsetLeft;
    const caretY = activeWordEl.offsetTop + 9;

    if (currentTyped.length < targetWord.length && activeCharRef.current) {
      caretX = activeWordEl.offsetLeft + activeCharRef.current.offsetLeft;
    } else if (lastCharRef.current) {
      caretX =
        activeWordEl.offsetLeft +
        lastCharRef.current.offsetLeft +
        lastCharRef.current.offsetWidth;
    }

    caretEl.style.transform = `translate3d(${caretX}px, ${caretY}px, 0)`;
  }, [activeWordIndex, typedWords, targetWords, isLoading]);

  const recordKeyPress = (expectedChar: string, typedChar: string) => {
    const normExpected = normalizeKeyId(expectedChar);
    const normTyped = normalizeKeyId(typedChar);

    if (!sessionKeyStatsRef.current[normExpected]) {
      sessionKeyStatsRef.current[normExpected] = {
        hits: 0,
        misses: 0,
        mistypedAs: {},
      };
    }

    totalKeystrokesRef.current += 1;

    if (typedChar === expectedChar) {
      correctKeystrokesRef.current += 1;
      sessionKeyStatsRef.current[normExpected].hits += 1;
    } else {
      secondErrorsRef.current += 1;
      totalErrorsRef.current += 1;
      setLiveErrors(totalErrorsRef.current);
      sessionKeyStatsRef.current[normExpected].misses += 1;
      sessionKeyStatsRef.current[normExpected].mistypedAs[normTyped] =
        (sessionKeyStatsRef.current[normExpected].mistypedAs[normTyped] ?? 0) + 1;
    }
  };

  const handleRepeatSame = () => {
    resetMetricsState(targetWords.length);
    window.setTimeout(() => inputRef.current?.focus(), 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      handleRepeatSame();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      tabPressedAtRef.current = Date.now();
      return;
    }

    if (e.key === 'Enter' && Date.now() - tabPressedAtRef.current < 1200) {
      e.preventDefault();
      onRequestNewQuote();
      return;
    }

    if (status === 'finished' || isLoading || targetWords.length === 0) return;

    if (e.key === 'Backspace') {
      e.preventDefault();
      const currentVal = typedWords[activeWordIndex] ?? '';

      if (e.ctrlKey || e.metaKey || e.altKey) {
        if (currentVal.length > 0) {
          setTypedWords((prev) => {
            const copy = [...prev];
            copy[activeWordIndex] = '';
            return copy;
          });
        } else if (activeWordIndex > 0) {
          const prevIdx = activeWordIndex - 1;
          setActiveWordIndex(prevIdx);
          setTypedWords((prev) => {
            const copy = [...prev];
            copy[prevIdx] = '';
            return copy;
          });
        }
        return;
      }

      if (currentVal.length > 0) {
        setTypedWords((prev) => {
          const copy = [...prev];
          copy[activeWordIndex] = currentVal.slice(0, -1);
          return copy;
        });
      } else if (activeWordIndex > 0) {
        const prevIdx = activeWordIndex - 1;
        const prevTyped = typedWords[prevIdx] ?? '';
        const prevTarget = targetWords[prevIdx] ?? '';
        if (prevTyped !== prevTarget) {
          setActiveWordIndex(prevIdx);
        }
      }
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    e.target.value = '';

    if (!rawValue || status === 'finished' || isLoading || targetWords.length === 0) return;

    if (status === 'idle') {
      startTimeRef.current = performance.now();
      setStatus('running');
    }

    let wordIdx = activeWordIndex;
    const nextTyped = [...typedWords];
    let shouldFinishNow = false;

    for (const ch of rawValue) {
      const targetWord = targetWords[wordIdx] ?? '';
      const currentVal = nextTyped[wordIdx] ?? '';

      if (ch === ' ') {
        if (currentVal.length === 0) {
          continue;
        }
        recordKeyPress(' ', ' ');

        if (currentVal.length < targetWord.length) {
          const skippedCount = targetWord.length - currentVal.length;
          for (let s = currentVal.length; s < targetWord.length; s++) {
            const missedChar = normalizeKeyId(targetWord[s]);
            if (!sessionKeyStatsRef.current[missedChar]) {
              sessionKeyStatsRef.current[missedChar] = { hits: 0, misses: 0, mistypedAs: {} };
            }
            sessionKeyStatsRef.current[missedChar].misses += 1;
          }
          totalErrorsRef.current += skippedCount;
          secondErrorsRef.current += skippedCount;
          setLiveErrors(totalErrorsRef.current);
        }

        if (wordIdx >= targetWords.length - 1) {
          shouldFinishNow = true;
          break;
        }
        wordIdx += 1;
      } else {
        if (currentVal.length >= targetWord.length + 12) {
          continue;
        }

        const expectedChar = targetWord[currentVal.length];
        if (expectedChar !== undefined) {
          recordKeyPress(expectedChar, ch);
        } else {
          totalKeystrokesRef.current += 1;
          secondErrorsRef.current += 1;
          totalErrorsRef.current += 1;
          setLiveErrors(totalErrorsRef.current);
        }

        const updatedWord = currentVal + ch;
        nextTyped[wordIdx] = updatedWord;

        if (
          config.mode !== 'time' &&
          wordIdx === targetWords.length - 1 &&
          updatedWord === targetWord
        ) {
          shouldFinishNow = true;
          break;
        }
      }
    }

    typedWordsRef.current = nextTyped;
    activeWordIndexRef.current = wordIdx;
    setTypedWords(nextTyped);
    setActiveWordIndex(wordIdx);

    if (config.mode === 'time' && targetWords.length - wordIdx < 30) {
      void prefetchMoreWords();
    }

    if (shouldFinishNow) {
      finishTest();
    }
  };

  const progressLabel = useMemo(() => {
    if (config.mode === 'time') {
      return formatDuration(remainingSeconds);
    }
    return `${Math.min(activeWordIndex + 1, Math.max(targetWords.length, 1))} / ${targetWords.length}`;
  }, [config.mode, remainingSeconds, activeWordIndex, targetWords.length]);

  const primaryAuthor = attributions[0] ?? null;

  return (
    <div className="space-y-6">
      {/* Live Telemetry Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-baseline gap-8">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {config.mode === 'time' ? 'Remaining' : 'Words'}
            </p>
            <p className="mt-0.5 font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-sky-600 dark:text-sky-400">
              {progressLabel}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live WPM</p>
            <p className="mt-0.5 font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {status === 'idle' ? '0' : liveWpm}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Accuracy</p>
            <p className="mt-0.5 font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
              {liveAccuracy}%
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Errors</p>
            <p className="mt-0.5 font-mono text-2xl sm:text-3xl font-semibold tabular-nums text-slate-700 dark:text-slate-300">
              {liveErrors}
            </p>
          </div>
        </div>

        <WpmChart timeline={timeline} variant="sparkline" />
      </div>

      {/* Main Typing Viewport */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-6 py-8 sm:px-10 sm:py-10 cursor-text"
      >
        <input
          ref={inputRef}
          type="text"
          aria-label="Typing test input"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          className="sr-only"
        />

        {isLoading ? (
          <div className="space-y-4 py-3" aria-label="Loading quotes">
            <div className="h-6 w-11/12 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-10/12 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
            <div className="h-6 w-8/12 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <AlertCircle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            <p className="text-sm text-slate-700 dark:text-slate-300">{fetchError}</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequestNewQuote();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Fetch</span>
            </button>
          </div>
        ) : (
          <div ref={viewportRef} className="relative h-[144px] overflow-hidden select-none">
            <div
              ref={trackRef}
              className="relative flex flex-wrap gap-x-[0.6em] font-mono text-[22px] sm:text-[24px] leading-[48px] transition-transform duration-150 ease-out"
            >
              <span
                ref={caretRef}
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 h-[30px] w-[2.5px] rounded-full bg-sky-600 dark:bg-sky-400 transition-transform duration-75 ease-out ${
                  status === 'idle' ? 'animate-caret-idle' : ''
                }`}
              />

              {targetWords.map((word, wIdx) => {
                const typed = typedWords[wIdx] ?? '';
                const isCurrentWord = wIdx === activeWordIndex;
                const isPastWord = wIdx < activeWordIndex;
                const hasIncompleteError = isPastWord && typed !== word;
                const extraChars = typed.length > word.length ? typed.slice(word.length) : '';
                const activeCharIdx = typed.length;

                return (
                  <div
                    key={`${wIdx}-${word}`}
                    ref={(el) => {
                      wordRefs.current[wIdx] = el;
                    }}
                    className={`relative inline-flex whitespace-nowrap ${
                      hasIncompleteError
                        ? 'underline decoration-rose-500/70 dark:decoration-rose-400/70 decoration-2 underline-offset-[6px]'
                        : ''
                    }`}
                  >
                    {word.split('').map((char, cIdx) => {
                      const typedChar = typed[cIdx];
                      let charColorClass = 'text-slate-400 dark:text-slate-500';

                      if (typedChar !== undefined) {
                        if (typedChar === char) {
                          charColorClass = 'text-slate-900 dark:text-slate-100';
                        } else {
                          charColorClass =
                            'text-rose-600 dark:text-rose-400 underline decoration-rose-500 dark:decoration-rose-400 decoration-2 underline-offset-[6px]';
                        }
                      }

                      const isCaretTarget = isCurrentWord && cIdx === activeCharIdx;
                      const isLastTarget =
                        isCurrentWord && extraChars.length === 0 && cIdx === word.length - 1;

                      return (
                        <span
                          key={cIdx}
                          ref={(el) => {
                            if (isCaretTarget) activeCharRef.current = el;
                            if (isLastTarget) lastCharRef.current = el;
                          }}
                          className={charColorClass}
                        >
                          {char}
                        </span>
                      );
                    })}

                    {extraChars.split('').map((extra, eIdx) => {
                      const isLastExtra = isCurrentWord && eIdx === extraChars.length - 1;
                      return (
                        <span
                          key={`extra-${eIdx}`}
                          ref={(el) => {
                            if (isLastExtra) lastCharRef.current = el;
                          }}
                          className="text-rose-600/85 dark:text-rose-400/85 line-through decoration-rose-500/70"
                        >
                          {extra}
                        </span>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {!isFocused && status !== 'finished' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/85 dark:bg-[#131A26]/85 backdrop-blur-[2px]">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Click anywhere here or press any key to focus
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Action Bar & Quote Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRepeatSame}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restart Same Text</span>
          </button>

          <button
            type="button"
            onClick={onRequestNewQuote}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Load New Quote</span>
          </button>

          <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
            Shortcuts: Esc to restart · Tab then Enter for new quote
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {primaryAuthor && (
            <>
              <span>Quote by {primaryAuthor}</span>
              {attributions.length > 1 && <span>(+{attributions.length - 1} more)</span>}
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>
            {quoteSource === 'dummyjson' ? 'DummyJSON Quotes API' : 'Local Fallback Archive'}
          </span>
        </div>
      </div>
    </div>
  );
}
