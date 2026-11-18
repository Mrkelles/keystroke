'use client';

import { useMemo, useState } from 'react';
import type { SecondSample, TestResult } from '@/lib/types';
import { formatDuration } from '@/lib/typing-engine';

interface WpmChartProps {
  timeline: SecondSample[];
  variant?: 'sparkline' | 'detailed';
  height?: number;
}

function downsampleTimeline(timeline: SecondSample[], maxPoints = 90): SecondSample[] {
  if (timeline.length <= maxPoints) return timeline;

  const bucketSize = Math.ceil(timeline.length / maxPoints);
  const buckets: SecondSample[] = [];

  for (let i = 0; i < timeline.length; i += bucketSize) {
    const slice = timeline.slice(i, i + bucketSize);
    const len = slice.length;
    const last = slice[len - 1];
    const avgWpm = Math.round(slice.reduce((acc, s) => acc + s.wpm, 0) / len);
    const avgRaw = Math.round(slice.reduce((acc, s) => acc + s.rawWpm, 0) / len);
    const avgAcc = Math.round(slice.reduce((acc, s) => acc + s.accuracy, 0) / len);
    const totalErrors = slice.reduce((acc, s) => acc + s.errors, 0);

    buckets.push({
      second: last.second,
      wpm: avgWpm,
      rawWpm: avgRaw,
      accuracy: avgAcc,
      errors: totalErrors,
    });
  }

  return buckets;
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = ((prev.x + curr.x) / 2).toFixed(2);
    path += ` Q ${prev.x.toFixed(2)} ${prev.y.toFixed(2)}, ${midX} ${((prev.y + curr.y) / 2).toFixed(2)}`;
  }
  const last = points[points.length - 1];
  path += ` T ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
  return path;
}

export function WpmChart({ timeline, variant = 'detailed', height = 220 }: WpmChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = useMemo(
    () => downsampleTimeline(timeline, variant === 'sparkline' ? 50 : 90),
    [timeline, variant]
  );

  if (variant === 'sparkline') {
    const w = 220;
    const h = 42;
    const pad = 4;

    if (data.length < 2) {
      return (
        <div className="flex h-[42px] w-[180px] sm:w-[220px] items-center justify-end text-xs font-mono text-slate-400 dark:text-slate-500">
          <span>WPM curve active on start</span>
        </div>
      );
    }

    const maxVal = Math.max(40, ...data.map((d) => d.wpm));
    const points = data.map((d, idx) => ({
      x: pad + (idx / Math.max(data.length - 1, 1)) * (w - pad * 2),
      y: h - pad - (d.wpm / maxVal) * (h - pad * 2),
    }));

    const pathD = buildSmoothPath(points);

    return (
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-[42px] w-[180px] sm:w-[220px] overflow-visible"
        aria-label="Live WPM sparkline"
      >
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-sky-600 dark:text-sky-400"
        />
      </svg>
    );
  }

  // Detailed interactive chart
  const width = 760;
  const padLeft = 44;
  const padRight = 44;
  const padTop = 18;
  const padBottom = 32;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  if (data.length === 0) {
    return (
      <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
        No per-second telemetry recorded for this test.
      </div>
    );
  }

  const maxWpm = Math.max(40, ...data.map((d) => Math.max(d.wpm, d.rawWpm)));
  const niceMax = Math.ceil(maxWpm / 20) * 20;

  const getX = (index: number) =>
    data.length === 1 ? padLeft + innerW / 2 : padLeft + (index / (data.length - 1)) * innerW;

  const getY = (val: number) => padTop + innerH - (val / niceMax) * innerH;
  const getAccY = (acc: number) => padTop + innerH - (acc / 100) * innerH;

  const wpmPoints = data.map((d, idx) => ({ x: getX(idx), y: getY(d.wpm) }));
  const rawPoints = data.map((d, idx) => ({ x: getX(idx), y: getY(d.rawWpm) }));
  const accPoints = data.map((d, idx) => ({ x: getX(idx), y: getAccY(d.accuracy) }));

  const wpmPath = buildSmoothPath(wpmPoints);
  const rawPath = buildSmoothPath(rawPoints);
  const accPath = buildSmoothPath(accPoints);

  const areaPath =
    wpmPoints.length > 1
      ? `${wpmPath} L ${wpmPoints[wpmPoints.length - 1].x.toFixed(2)} ${(padTop + innerH).toFixed(2)} L ${wpmPoints[0].x.toFixed(2)} ${(padTop + innerH).toFixed(2)} Z`
      : '';

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(t * niceMax));
  const xTickIndices = Array.from(
    new Set([
      0,
      Math.floor((data.length - 1) * 0.25),
      Math.floor((data.length - 1) * 0.5),
      Math.floor((data.length - 1) * 0.75),
      data.length - 1,
    ])
  );

  const activePoint = hoverIndex !== null ? data[hoverIndex] : null;
  const activeX = hoverIndex !== null ? getX(hoverIndex) : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-sky-600 dark:bg-sky-400 inline-block" />
            <span>Net WPM</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 border-t border-dashed border-slate-400 dark:border-slate-500 inline-block" />
            <span>Raw WPM</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-emerald-600 dark:bg-emerald-400 inline-block" />
            <span>Accuracy %</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-xs bg-rose-600 dark:bg-rose-400 inline-block" />
            <span>Errors</span>
          </span>
        </div>

        <div className="min-h-[20px] font-mono text-xs tabular-nums text-slate-700 dark:text-slate-300">
          {activePoint ? (
            <span>
              {formatDuration(activePoint.second)} · {activePoint.wpm} WPM · {activePoint.rawWpm}{' '}
              Raw · {activePoint.accuracy}% Acc · {activePoint.errors}{' '}
              {activePoint.errors === 1 ? 'error' : 'errors'}
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              Hover chart to inspect second-by-second breakdown
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          role="img"
          aria-label="WPM and accuracy breakdown chart"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="wpmFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines & Y axis labels */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-slate-200 dark:text-slate-800"
                />
                <text
                  x={padLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Right Y axis accuracy markers (0% / 50% / 100%) */}
          {[0, 50, 100].map((accTick) => {
            const y = getAccY(accTick);
            return (
              <text
                key={accTick}
                x={width - padRight + 8}
                y={y + 4}
                textAnchor="start"
                className="fill-emerald-600/80 dark:fill-emerald-400/80 font-mono text-[10px]"
              >
                {accTick}%
              </text>
            );
          })}

          {/* X axis labels */}
          {xTickIndices.map((idx) => (
            <text
              key={idx}
              x={getX(idx)}
              y={height - 8}
              textAnchor="middle"
              className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px]"
            >
              {formatDuration(data[idx].second)}
            </text>
          ))}

          {/* Net WPM area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#wpmFill)" className="text-sky-600 dark:text-sky-400" />
          )}

          {/* Raw WPM dashed curve */}
          {rawPath && (
            <path
              d={rawPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="text-slate-400 dark:text-slate-500"
            />
          )}

          {/* Accuracy curve */}
          {accPath && (
            <path
              d={accPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.8"
              className="text-emerald-600 dark:text-emerald-400"
            />
          )}

          {/* Net WPM curve */}
          {wpmPath && (
            <path
              d={wpmPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-sky-600 dark:text-sky-400"
            />
          )}

          {/* Error markers */}
          {data.map((d, idx) => {
            if (d.errors <= 0) return null;
            const cx = getX(idx);
            const cy = getY(d.wpm);
            return (
              <g key={`err-${d.second}`}>
                <line
                  x1={cx}
                  y1={padTop}
                  x2={cx}
                  y2={padTop + innerH}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.22"
                  className="text-rose-500"
                />
                <rect
                  x={cx - 3}
                  y={cy - 3}
                  width="6"
                  height="6"
                  rx="1"
                  className="fill-rose-600 dark:fill-rose-400"
                />
              </g>
            );
          })}

          {/* Hover crosshair & focus dot */}
          {hoverIndex !== null && activePoint && (
            <g>
              <line
                x1={activeX}
                y1={padTop}
                x2={activeX}
                y2={padTop + innerH}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400 dark:text-slate-500"
              />
              <circle
                cx={activeX}
                cy={getY(activePoint.wpm)}
                r="4.5"
                className="fill-sky-600 dark:fill-sky-400 stroke-white dark:stroke-[#131A26]"
                strokeWidth="2"
              />
              <circle
                cx={activeX}
                cy={getAccY(activePoint.accuracy)}
                r="3.5"
                className="fill-emerald-600 dark:fill-emerald-400 stroke-white dark:stroke-[#131A26]"
                strokeWidth="1.5"
              />
            </g>
          )}

          {/* Invisible hover columns */}
          {data.map((d, idx) => {
            const colWidth = data.length > 1 ? innerW / (data.length - 1) : innerW;
            const x = getX(idx) - colWidth / 2;
            return (
              <rect
                key={`hit-${d.second}`}
                x={Math.max(padLeft, x)}
                y={padTop}
                width={colWidth}
                height={innerH}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(idx)}
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}

interface TrendChartProps {
  history: TestResult[];
}

export function TrendChart({ history }: TrendChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const ordered = useMemo(() => [...history].slice(0, 30).reverse(), [history]);

  if (ordered.length < 2) {
    return (
      <div className="flex h-[160px] items-center justify-center rounded-lg border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
        Complete at least 2 tests to visualize your WPM and accuracy progression.
      </div>
    );
  }

  const width = 760;
  const height = 175;
  const padLeft = 40;
  const padRight = 40;
  const padTop = 16;
  const padBottom = 26;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;

  const maxWpm = Math.max(40, ...ordered.map((r) => r.wpm));
  const niceMax = Math.ceil(maxWpm / 20) * 20;

  const getX = (idx: number) => padLeft + (idx / (ordered.length - 1)) * innerW;
  const getY = (val: number) => padTop + innerH - (val / niceMax) * innerH;
  const getAccY = (acc: number) => padTop + innerH - (acc / 100) * innerH;

  const wpmPath = buildSmoothPath(ordered.map((r, i) => ({ x: getX(i), y: getY(r.wpm) })));
  const accPath = buildSmoothPath(
    ordered.map((r, i) => ({ x: getX(i), y: getAccY(r.accuracy) }))
  );

  const active = hoverIdx !== null ? ordered[hoverIdx] : null;

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-sky-600 dark:bg-sky-400 inline-block" />
            <span>WPM (last {ordered.length} tests)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-0.5 w-4 bg-emerald-600 dark:bg-emerald-400 inline-block" />
            <span>Accuracy %</span>
          </span>
        </div>
        <div className="font-mono tabular-nums text-slate-600 dark:text-slate-300">
          {active ? (
            <span>
              {active.modeLabel} · {active.wpm} WPM · {active.accuracy}% Acc
            </span>
          ) : (
            <span className="text-slate-400 dark:text-slate-500">
              Hover points for session details
            </span>
          )}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {[0, 0.5, 1].map((t) => {
          const val = Math.round(t * niceMax);
          const y = getY(val);
          return (
            <g key={val}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-200 dark:text-slate-800"
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-400 dark:fill-slate-500 font-mono text-[10px]"
              >
                {val}
              </text>
            </g>
          );
        })}

        <path
          d={accPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.7"
          className="text-emerald-600 dark:text-emerald-400"
        />
        <path
          d={wpmPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-sky-600 dark:text-sky-400"
        />

        {ordered.map((r, i) => (
          <g key={r.id}>
            <circle
              cx={getX(i)}
              cy={getY(r.wpm)}
              r={hoverIdx === i ? 5 : 3}
              className="fill-sky-600 dark:fill-sky-400 stroke-white dark:stroke-[#131A26]"
              strokeWidth="1.5"
            />
            <rect
              x={getX(i) - innerW / Math.max(ordered.length, 2) / 2}
              y={padTop}
              width={innerW / Math.max(ordered.length - 1, 1)}
              height={innerH}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(i)}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
