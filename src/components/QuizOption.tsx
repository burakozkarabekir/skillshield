"use client";

import { motion } from "framer-motion";

interface QuizOptionProps {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  index: number;
}

export default function QuizOption({
  label,
  value,
  selected,
  onSelect,
  index,
}: QuizOptionProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
      onClick={() => onSelect(value)}
      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? "border-electric bg-electric/10 text-white shadow-lg shadow-electric/10"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
      }`}
      role="radio"
      aria-checked={selected}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
            selected ? "border-electric" : "border-white/20"
          }`}
        >
          {selected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2.5 h-2.5 rounded-full bg-electric"
            />
          )}
        </div>
        <span className="text-sm sm:text-base">{label}</span>
      </div>
    </motion.button>
  );
}
