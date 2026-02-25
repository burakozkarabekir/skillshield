"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({
  progress,
  currentStep,
  totalSteps,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-400">
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-xs text-slate-400 font-mono">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-electric-dark to-electric-light"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
