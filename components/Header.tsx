'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Keyboard, Menu, Moon, Sun, X } from 'lucide-react';
import type { AppTab } from '@/lib/types';
import {
  getClientAppStateSnapshot,
  getServerAppStateSnapshot,
  saveThemePreference,
  subscribeAppState,
} from '@/lib/storage';

interface HeaderProps {
  activeTab?: AppTab;
  activePath?: string;
  onSelectTab?: (tab: AppTab) => void;
}

const noopSubscribe = () => () => {};

const STUDIO_NAV_ITEMS: { id: AppTab; label: string; href: string }[] = [
  { id: 'test', label: 'Test', href: '/' },
  { id: 'heatmap', label: 'Heatmap', href: '/?tab=heatmap' },
  { id: 'history', label: 'History', href: '/?tab=history' },
];

const SECONDARY_LINKS: { href: string; label: string }[] = [
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/disclaimer', label: 'Disclaimer' },
];

export default function Header({
  activeTab,
  activePath = '/',
  onSelectTab,
}: HeaderProps) {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (appState.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [hydrated, appState.theme]);

  const handleToggleTheme = useCallback(() => {
    const nextTheme = appState.theme === 'dark' ? 'light' : 'dark';
    saveThemePreference(nextTheme);
  }, [appState.theme]);

  const handleSelectStudioTab = (tab: AppTab) => {
    setMobileMenuOpen(false);
    if (onSelectTab) {
      onSelectTab(tab);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single-line brand wordmark */}
        {onSelectTab ? (
          <button
            type="button"
            onClick={() => handleSelectStudioTab('test')}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 rounded-md"
          >
            <Keyboard className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0">
              TypingMeter
            </span>
          </button>
        ) : (
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 rounded-md"
          >
            <Keyboard className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0">
              TypingMeter
            </span>
          </Link>
        )}

        {/* Zone 2: Desktop single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {STUDIO_NAV_ITEMS.map((item) => {
            const isActive = activePath === '/' && activeTab === item.id;
            const classes = `relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 rounded-sm ${
              isActive
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`;

            if (onSelectTab) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectStudioTab(item.id)}
                  className={classes}
                >
                  {item.label}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-sky-600 dark:bg-sky-400"
                    />
                  )}
                </button>
              );
            }

            return (
              <Link key={item.id} href={item.href} className={classes}>
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/about"
            className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 rounded-sm ${
              activePath === '/about'
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            About
            {activePath === '/about' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-sky-600 dark:bg-sky-400"
              />
            )}
          </Link>

          <Link
            href="/contact"
            className={`relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400 rounded-sm ${
              activePath === '/contact'
                ? 'text-slate-900 dark:text-slate-100'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
            }`}
          >
            Contact
            {activePath === '/contact' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-sky-600 dark:bg-sky-400"
              />
            )}
          </Link>
        </nav>

        {/* Zone 3: Primary action + Mobile hamburger trigger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label={
              hydrated && appState.theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'
            }
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400"
          >
            {hydrated && appState.theme === 'dark' ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300 shrink-0" />
                <span>Dark</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-900 p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 dark:focus-visible:ring-sky-400"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F17] px-6 py-4"
        >
          <div className="flex flex-col gap-1">
            {STUDIO_NAV_ITEMS.map((item) => {
              const isActive = activePath === '/' && activeTab === item.id;
              const rowClass = `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-sky-600 dark:text-sky-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`;

              if (onSelectTab) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectStudioTab(item.id)}
                    className={rowClass}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={rowClass}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activePath === '/about'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-sky-600 dark:text-sky-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                activePath === '/contact'
                  ? 'bg-slate-100 dark:bg-slate-800/80 text-sky-600 dark:text-sky-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-x-5 gap-y-2 px-3">
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-xs font-medium transition-colors ${
                  activePath === link.href
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
