"use client";

import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  category: "low" | "moderate" | "high" | "critical";
  size?: number;
}

const CATEGORY_COLORS = {
  low: "#22c55e",
  moderate: "#6366f1",
  high: "#f59e0b",
  critical: "#ef4444",
};

export default function ScoreGauge({ score, category, size = 200 }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = CATEGORY_COLORS[category];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    // Animate the number counting up
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="transform -rotate-90" style={{ width: size, height: size }}>
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#2a2a3a"
          strokeWidth="8"
        />
        {/* Score arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-gauge"
          style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {displayScore}
        </span>
        <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">
          / 100
        </span>
      </div>
    </div>
  );
}
