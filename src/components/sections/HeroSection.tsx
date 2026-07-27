'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, Terminal, Code, CheckCircle, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import ResumeModal from '@/components/modals/ResumeModal';

export default function HeroSection() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glass-panel border border-primary/20 dark:border-cyan-500/30 text-xs font-semibold text-primary dark:text-cyan-400 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full Stack &amp; Software Engineering Roles</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white"
              >
                Hi, I'm <br />
                <span className="gradient-text">{PERSONAL_INFO.name}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-3 text-xl sm:text-2xl font-mono font-bold text-slate-700 dark:text-slate-300"
              >
                <Terminal className="w-6 h-6 text-primary" />
                <span>{PERSONAL_INFO.title}</span>
              </motion.div>
            </div>

            {/* Intro Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal"
            >
              {PERSONAL_INFO.heroBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm shadow-xl shadow-primary/25 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl glass-panel text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-300/80 dark:border-slate-700/80 hover:border-primary dark:hover:border-cyan-400 hover:text-primary dark:hover:text-cyan-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-500" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="flex items-center space-x-2 px-5 py-3.5 rounded-2xl glass-panel text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80"
            >
              {PERSONAL_INFO.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                    {metric.value}
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 relative"
          >
            {/* Glass Dashboard Mockup Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800/80 shadow-2xl space-y-6">
              {/* Code IDE Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-400">shahbaz.config.ts</span>
              </div>

              {/* Code snippet block */}
              <div className="space-y-3 font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-900 text-slate-100 p-5 rounded-2xl shadow-inner overflow-x-auto">
                <p><span className="text-purple-400">const</span> engineer = {'{'}</p>
                <p className="pl-4"><span className="text-blue-400">name</span>: <span className="text-emerald-400">'{PERSONAL_INFO.name}'</span>,</p>
                <p className="pl-4"><span className="text-blue-400">role</span>: <span className="text-emerald-400">'{PERSONAL_INFO.title}'</span>,</p>
                <p className="pl-4"><span className="text-blue-400">degree</span>: <span className="text-emerald-400">'{PERSONAL_INFO.qualification}'</span>,</p>
                <p className="pl-4"><span className="text-blue-400">skills</span>: [<span className="text-cyan-300">'React'</span>, <span className="text-cyan-300">'Next.js'</span>, <span className="text-cyan-300">'TypeScript'</span>, <span className="text-cyan-300">'Python'</span>, <span className="text-cyan-300">'ML'</span>],</p>
                <p className="pl-4"><span className="text-blue-400">passion</span>: <span className="text-emerald-400">'Building scalable &amp; clean web apps'</span></p>
                <p>{'};'}</p>
              </div>

              {/* Verified Badges */}
              <div className="space-y-2.5">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/50">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Highest Qualification: {PERSONAL_INFO.qualification}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/50">
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Proven Production Projects Deployed on Vercel
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Resume Modal Trigger */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
