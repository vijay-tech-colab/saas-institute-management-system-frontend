'use client';

import React, { useEffect, useRef } from 'react';

interface AreaChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  gradientId?: string;
  showLabels?: boolean;
  showGrid?: boolean;
  prefix?: string;
}

export function AreaChart({
  data,
  height = 200,
  color = '#2563EB',
  gradientId = 'area-chart-grad',
  showLabels = true,
  showGrid = true,
  prefix = '₹',
}: AreaChartProps) {
  const padding = { top: 20, right: 16, bottom: showLabels ? 32 : 8, left: 56 };
  const values = data.map(d => d.value);
  const max = Math.max(...values) * 1.1;
  const min = 0;
  const range = max - min;

  const chartHeight = height - padding.top - padding.bottom;

  // We use percentages for X to be responsive without distorting
  const getXPct = (i: number) => {
    // left padding as an absolute approximation, but simpler to just use 5% to 95%
    const startPct = 5;
    const endPct = 95;
    return startPct + (i / (data.length - 1)) * (endPct - startPct);
  };
  
  const getY = (v: number) => padding.top + chartHeight - ((v - min) / range) * chartHeight;

  // For paths, we need to build a string with calc() which SVG paths don't support well in raw form.
  // Instead, we can use a nested SVG or just use JS to calculate absolute pixels if we had a ResizeObserver.
  // But without ResizeObserver, the easiest way is to use SVG's vector-effect="non-scaling-stroke" 
  // and keep preserveAspectRatio="none", BUT put the text OUTSIDE the scaled SVG.
  // Actually, we can use percentages for coordinates in rect/circle/line, but polygon/polyline need absolute or we just keep it simple.
  
  // Let's just fix the viewBox to match a wide aspect ratio so it doesn't stretch as much,
  // or better, use HTML/CSS overlay for labels!
  
  // Actually, the standard way in React is to measure the container, or just accept preserveAspectRatio="none" 
  // and use vector-effect="non-scaling-stroke" for the lines, and move text to a separate unscaled SVG or HTML.
  // Since we don't want to overcomplicate, let's just make the viewBox much wider so the stretch is less noticeable on wide screens.
  const chartWidth = 800; // Assume a typical wide container to minimize stretch distortion
  const viewBoxWidth = chartWidth + 8;
  
  const getX = (i: number) => padding.left + (i / (data.length - 1)) * (chartWidth - padding.left - padding.right);

  const linePoints = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(' ');
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(fraction => ({
    y: padding.top + chartHeight - fraction * chartHeight,
    value: min + fraction * range,
  }));

  const formatValue = (v: number) => {
    if (v >= 100000) return `${prefix}${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `${prefix}${(v / 1000).toFixed(0)}K`;
    return `${prefix}${v}`;
  };

  const polyRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const el = polyRef.current;
    if (!el) return;
    const length = el.getTotalLength?.() ?? 0;
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    el.style.transition = 'none';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = 'stroke-dashoffset 1.2s ease';
        el.style.strokeDashoffset = '0';
      });
    });
  }, [data, color]);

  return (
    <div className="w-full relative" style={{ height }}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${height}`}
        className="w-full h-full absolute inset-0"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <polygon
          points={`${getX(0)},${padding.top + chartHeight} ${linePoints} ${getX(data.length - 1)},${padding.top + chartHeight}`}
          fill={`url(#${gradientId})`}
        />

        <polyline
          ref={polyRef}
          points={linePoints}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      
      {/* Grid and Labels overlaid in an unscaled SVG so they do not stretch */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        {showGrid && gridLines.map((gl, i) => (
          <g key={i}>
            <line x1="5%" y1={gl.y} x2="95%" y2={gl.y}
              stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
            <text x="4%" y={gl.y + 4} textAnchor="end"
              fontSize="11" fill="#94a3b8" fontFamily="Inter, sans-serif">
              {formatValue(gl.value)}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const xPct = 5 + (i / (data.length - 1)) * 90;
          return (
            <g key={i}>
              <circle cx={`${xPct}%`} cy={getY(d.value)} r="3" fill="white" stroke={color} strokeWidth="2" />
              {showLabels && (
                <text
                  x={`${xPct}%`}
                  y={height - 6}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#94a3b8"
                  fontFamily="Inter, sans-serif"
                >
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Bar Chart ──────────────────────────────────────────────
interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
}

export function BarChart({ data, height = 160 }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value)) * 1.1 || 1;
  const paddingY = { top: 16, bottom: 32 };
  const chartHeight = height - paddingY.top - paddingY.bottom;

  // We use percentage-based X coordinates for responsiveness
  const sectionWidth = 100 / data.length;
  // Make bars thinner when there are fewer items so they don't look awkwardly huge
  const barWidthPct = Math.min(15, sectionWidth * 0.6); 

  return (
    <svg width="100%" height={height} className="w-full overflow-visible">
      {data.map((d, i) => {
        const barH = (d.value / max) * chartHeight;
        const centerX = (i + 0.5) * sectionWidth; // center of this bar's section in %
        const xStr = `calc(${centerX}% - ${barWidthPct / 2}%)`;
        const y = paddingY.top + chartHeight - barH;
        const color = d.color || '#2563EB';
        
        return (
          <g key={i}>
            {/* Foreground Bar */}
            <rect
              x={xStr} 
              y={y} 
              width={`${barWidthPct}%`} 
              height={barH} 
              rx={4}
              fill={color} 
              opacity={0.85}
              style={{ transition: `height 0.6s ease ${i * 0.08}s, y 0.6s ease ${i * 0.08}s` }}
            />
            {/* Label */}
            <text 
              x={`${centerX}%`} 
              y={height - 8} 
              textAnchor="middle" 
              fontSize="11" 
              fontWeight="500"
              fill="#64748b" 
              fontFamily="Inter, sans-serif"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Donut Chart ────────────────────────────────────────────
interface DonutSegment { label: string; value: number; color: string }
interface DonutChartProps { data: DonutSegment[]; size?: number; thickness?: number }

export function DonutChart({ data, size = 160, thickness = 28 }: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={thickness} />
      {data.map((seg, i) => {
        const fraction = seg.value / total;
        const dashArray = fraction * circumference;
        const dashOffset = circumference - cumulative * circumference / total;
        cumulative += seg.value;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={`${dashArray} ${circumference - dashArray}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: `stroke-dasharray 0.8s ease ${i * 0.15}s` }}
          />
        );
      })}
    </svg>
  );
}
