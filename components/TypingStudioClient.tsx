'use client';

import { useCallback, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { AppTab, TestConfig, TestResult } from '@/lib/types';
import {
  clearHistoryAndRecords,
  commitTestResult,
  getClientAppStateSnapshot,
  getServerAppStateSnapshot,
  removeHistoryEntry,
  resetKeyStats,
  saveConfigPreference,
  subscribeAppState,
} from '@/lib/storage';
import { getModeKey, getWeakestKeys } from '@/lib/typing-engine';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModeToolbar from '@/components/ModeToolbar';
import TypingStage from '@/components/TypingStage';
import TestBreakdown from '@/components/TestBreakdown';
import KeyboardHeatmap from '@/components/KeyboardHeatmap';
import HistoryView from '@/components/HistoryView';
import TypingInfo from '@/components/TypingInfo';

const noopSubscribe = () => () => {};

interface TypingStudioClientProps {
  initialTab?: AppTab;
}

export default function TypingStudioClient({
  initialTab = 'test',
}: TypingStudioClientProps) {
  const appState = useSyncExternalStore(
    subscribeAppState,
    getClientAppStateSnapshot,
    getServerAppStateSnapshot
  );
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  const [activeTab, setActiveTab] = useState<AppTab>(initialTab);
  const [lastResult, setLastResult] = useState<TestResult | null>(null);
  const [lastSourceText, setLastSourceText] = useState<{
    words: string[];
    attributions: string[];
    source: 'dummyjson' | 'fallback';
  } | null>(null);
  const [repeatPayload, setRepeatPayload] = useState<{
    words: string[];
    attributions: string[];
    source: 'dummyjson' | 'fallback';
  } | null>(null);
  const [refreshNonce, setRefreshNonce] = useState<number>(0);

  const handleChangeConfig = useCallback((nextConfig: TestConfig) => {
    setRepeatPayload(null);
    setLastResult(null);
    saveConfigPreference(nextConfig);
    setRefreshNonce((n) => n + 1);
  }, []);

  const handleRefreshQuote = useCallback(() => {
    setRepeatPayload(null);
    setLastResult(null);
    setRefreshNonce((n) => n + 1);
  }, []);

  const handleCompleteTest = useCallback(
    (
      result: TestResult,
      sourceText: { words: string[]; attributions: string[]; source: 'dummyjson' | 'fallback' }
    ) => {
      setLastSourceText(sourceText);
      setRepeatPayload(null);
      const { savedResult } = commitTestResult(result);
      setLastResult(savedResult);
    },
    []
  );

  const handleNextTest = useCallback(() => {
    setRepeatPayload(null);
    setLastResult(null);
    setRefreshNonce((n) => n + 1);
  }, []);

  const handleRepeatTest = useCallback(() => {
    if (lastSourceText) {
      setRepeatPayload(lastSourceText);
    }
    setLastResult(null);
    setRefreshNonce((n) => n + 1);
  }, [lastSourceText]);

  const handlePracticeWeakKeys = useCallback(() => {
    setRepeatPayload(null);
    setLastResult(null);
    setActiveTab('test');
    const nextConfig: TestConfig = {
      ...appState.config,
      mode: appState.config.mode === 'quote' ? 'words' : appState.config.mode,
      weakKeyFocus: true,
    };
    saveConfigPreference(nextConfig);
    setRefreshNonce((n) => n + 1);
  }, [appState.config]);

  const hasWeakKeyData = getWeakestKeys(appState.keyStats, 1).length > 0;
  const stageKey = `${getModeKey(appState.config)}-${appState.config.punctuation}-${appState.config.numbers}-${appState.config.weakKeyFocus}-${refreshNonce}-${repeatPayload ? 'repeat' : 'live'}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeTab={activeTab}
        activePath="/"
        onSelectTab={setActiveTab}
      />

      <main className="mx-auto w-full max-w-[1140px] flex-1 px-6 py-8 sm:py-10">
        {!hydrated ? (
          <div className="space-y-6">
            <div className="h-12 w-full rounded-xl bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
            <div className="h-56 w-full rounded-xl bg-slate-200/70 dark:bg-slate-800/60 animate-pulse" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'test' && (
              <motion.div
                id="typing-test"
                key="tab-test"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 scroll-mt-6"
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
                      Precision Typing Practice
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Test your typing speed and accuracy with our free online typing test.
                      Practice regularly, track your progress, and improve your typing skills.
                    </p>
                  </div>

                  {appState.config.weakKeyFocus && hasWeakKeyData && (
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      Weak-Key Focus Active
                    </span>
                  )}
                </div>

                <ModeToolbar
                  config={appState.config}
                  onChangeConfig={handleChangeConfig}
                  onRefreshQuote={handleRefreshQuote}
                  hasWeakKeyData={hasWeakKeyData}
                />

                {lastResult ? (
                  <TestBreakdown
                    result={lastResult}
                    allTimeKeyStats={appState.keyStats}
                    onNextTest={handleNextTest}
                    onRepeatTest={handleRepeatTest}
                    onPracticeWeakKeys={handlePracticeWeakKeys}
                    onOpenHistory={() => setActiveTab('history')}
                  />
                ) : (
                  <TypingStage
                    key={stageKey}
                    config={appState.config}
                    allTimeKeyStats={appState.keyStats}
                    repeatPayload={repeatPayload}
                    onRequestNewQuote={handleRefreshQuote}
                    onCompleteTest={handleCompleteTest}
                  />
                )}

                <TypingInfo />
              </motion.div>
            )}

            {activeTab === 'heatmap' && (
              <motion.div
                key="tab-heatmap"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <KeyboardHeatmap
                  allTimeKeyStats={appState.keyStats}
                  lastTestKeyStats={lastResult?.keyStats ?? appState.history[0]?.keyStats}
                  onPracticeWeakKeys={handlePracticeWeakKeys}
                  onResetKeyStats={() => resetKeyStats()}
                />
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="tab-history"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <HistoryView
                  history={appState.history}
                  personalBests={appState.personalBests}
                  onDeleteEntry={(id) => removeHistoryEntry(id)}
                  onClearHistory={() => clearHistoryAndRecords()}
                  onStartTest={() => {
                    setLastResult(null);
                    setActiveTab('test');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
}
