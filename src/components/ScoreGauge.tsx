"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 75) return "#10B981";
  if (score >= 50) return "#3B82F6";
  if (score >= 25) return "#F59E0B";
  return "#EF4444";
}

function getScoreGlow(score: number): string {
  if (score >= 75) return "rgba(16, 185, 129, 0.3)";
  if (score >= 50) return "rgba(59, 130, 246, 0.3)";
  if (score >= 25) return "rgba(245, 158, 11, 0.3)";
  return "rgba(239, 68, 68, 0.3)";
}

const sizes = {
  sm: { width: 120, strokeWidth: 8, fontSize: "text-2xl", labelSize: "text-xs" },
  md: { width: 200, strokeWidth: 12, fontSize: "text-5xl", labelSize: "text-sm" },
  lg: { width: 280, strokeWidth: 16, fontSize: "text-7xl", labelSize: "text-base" },
};

export default function ScoreGauge({
  score,
  size = "md",
  animated = true,
}: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);
  const motionScore = useMotionValue(0);
  const config = sizes[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = useTransform(
    motionScore,
    [0, 100],
    [circumference, circumference * (1 - score / 100)]
  );

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    const controls = animate(motionScore, score, {
      duration: 2,
      ease: [0.32, 0.72, 0, 1],
      onUpdate: (latest) => setDisplayScore(Math.round(latest)),
    });

    return controls.stop;
  }, [score, animated, motionScore]);

  const color = getScoreColor(score);
  const glow = getScoreGlow(score);

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg
        width={config.width}
        height={config.width}
        viewBox={`0 0 ${config.width} ${config.width}`}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={config.strokeWidth}
          fill="none"
        />
        {/* Score arc */}
        <motion.circle
          cx={config.width / 2}
          cy={config.width / 2}
          r={radius}
          stroke={color}
          strokeWidth={config.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          filter={`drop-shadow(0 0 8px ${glow})`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-mono ${config.fontSize} font-bold score-display`}
          style={{ color }}
        >
          {displayScore}
        </span>
        <span className={`${config.labelSize} text-slate-400 mt-1`}>
          / 100
        </span>
      </div>
    </div>
  );
}
