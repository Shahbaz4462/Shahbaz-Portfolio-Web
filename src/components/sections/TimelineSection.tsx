'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_ITEMS } from '@/data/portfolioData';
import { GraduationCap, Briefcase, BookOpen, GitBranch, Compass } from 'lucide-react';

const ICON_MAP = {
  education: GraduationCap,
  project: Briefcase,
  learning: BookOpen,
  opensource: GitBranch,
  goal: Compass
};

export default function TimelineSection() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Trajectory &amp; Growth
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Journey Timeline
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Key academic milestones, hands-on production builds, open-source initiatives, and continuous skill refinement.
          </p>
        </div>

        {/* Timeline Items Vertical Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-cyan-500 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_ITEMS.map((item, idx) => {
              const IconComponent = ICON_MAP[item.type] || GraduationCap;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Icon Center */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 p-2.5 rounded-full bg-slate-900 text-primary dark:text-cyan-400 border-2 border-primary shadow-lg z-10">
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Card Box */}
                  <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                    <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-primary dark:text-cyan-400 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          {item.type}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                        {item.title}
                      </h3>

                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {item.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tech badges */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
