'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '@/data/portfolioData';
import { 
  Code2, FileCode2, Palette, Layout, Sparkles, Layers, 
  Server, Terminal, Network, ShieldCheck, Cpu, Binary, 
  Database, Table, GitBranch, Cloud, Zap, Brain, CheckCircle2 
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Code2, FileCode2, Palette, Layout, Sparkles, Layers,
  Server, Terminal, Network, ShieldCheck, Cpu, Binary,
  Database, Table, GitBranch, Cloud, Zap, Brain
};

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Programming Languages', 'Databases', 'Tools & Deployment'] as const;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter(s => s.category === activeCategory);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Experienced':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Advanced':
        return 'bg-primary/10 text-primary dark:text-cyan-400 border-primary/20';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Technical Stack &amp; Skills
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Capabilities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Technologies and frameworks utilized to build fast, scalable, and responsive digital products.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20 scale-105'
                  : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const IconComponent = ICON_MAP[skill.icon] || Code2;
              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary dark:text-cyan-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900 dark:text-white">
                          {skill.name}
                        </h3>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold font-mono border ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="flex items-center space-x-1 text-[11px] font-mono font-medium text-emerald-600 dark:text-emerald-400 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Production Skill</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
