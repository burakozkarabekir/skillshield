"use client";

import { motion } from "framer-motion";
import { SkillBreakdown } from "@/types/quiz";

interface SkillBarProps {
  skill: SkillBreakdown;
  index: number;
}

function getBarGradient(score: number): string {
  if (score >= 75) return "from-emerald-dark to-emerald-light";
  if (score >= 50) return "from-electric-dark to-electric-light";
  if (score >= 25) return "from-amber-dark to-amber-light";
  return "from-danger-dark to-danger-light";
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      className="glass rounded-xl p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm sm:text-base font-medium text-slate-200">
          {skill.label}
        </h3>
        <span
          className={`font-mono text-sm sm:text-base font-bold ${
            skill.score >= 75
              ? "text-emerald"
              : skill.score >= 50
              ? "text-electric"
              : skill.score >= 25
              ? "text-amber"
              : "text-danger"
          }`}
        >
          {skill.score}
        </span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarGradient(skill.score)}`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.score}%` }}
          transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className="text-xs sm:text-sm text-slate-400 mt-2">
        {skill.description}
      </p>
    </motion.div>
  );
}
