"use client";

import { motion } from "framer-motion";

export default function HeroAnimation() {
  const mockSkills = [
    { label: "Yaratıcı Düşünme", score: 82, color: "#10B981" },
    { label: "Teknik Derinlik", score: 45, color: "#F59E0B" },
    { label: "İnsan Bağlantısı", score: 91, color: "#10B981" },
    { label: "Uyum Yeteneği", score: 67, color: "#3B82F6" },
    { label: "Alan Uzmanlığı", score: 58, color: "#3B82F6" },
    { label: "Liderlik", score: 73, color: "#3B82F6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="max-w-md mx-auto"
    >
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-5">
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
              Yapay Zeka Kariyer Risk Skoru
            </div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              className="text-5xl font-mono font-bold text-electric"
            >
              72
            </motion.div>
            <div className="text-sm text-slate-400 mt-1">Orta Risk</div>
          </div>

          <div className="space-y-3">
            {mockSkills.map((skill, i) => (
              <div key={skill.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{skill.label}</span>
                  <span className="font-mono" style={{ color: skill.color }}>
                    {skill.score}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.score}%` }}
                    transition={{
                      delay: 1 + i * 0.15,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
