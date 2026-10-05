'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '@/data/portfolioData';
import { Smartphone, Sparkles, Brain, Layers, CheckCircle2, Cpu } from 'lucide-react';

const ICON_MAP = {
  Smartphone,
  Sparkles,
  Brain,
  Layers,
  CheckCircle2,
  Cpu
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 relative bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Core Competencies
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Achievements
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Key domains of expertise mastered through hands-on project implementations and academic discipline.
          </p>
        </div>

        {/* 6 Achievements Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((achievement, idx) => {
            const IconComponent = ICON_MAP[achievement.icon as keyof typeof ICON_MAP] || Sparkles;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-md shadow-primary/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {achievement.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                  {achievement.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {achievement.description}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Mastered Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
