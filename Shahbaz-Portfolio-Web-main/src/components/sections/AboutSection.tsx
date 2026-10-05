'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Cpu, Lightbulb, BookOpen, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function AboutSection() {
  const pillars = [
    {
      icon: Code2,
      title: "Passion for Engineering",
      description: "Dedicated to building elegant, scalable software solutions that solve real-world problems with high performance and accessibility."
    },
    {
      icon: Cpu,
      title: "Algorithmic Problem Solving",
      description: "Deconstructing complex logical hurdles into clean, efficient algorithms and optimized data architecture."
    },
    {
      icon: Lightbulb,
      title: "Architectural Clean Code",
      description: "Emphasizing strict TypeScript safety, component reusability, clear documentation, and maintainable design patterns."
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Constantly expanding expertise across full stack frameworks, cloud microservices, and modern AI/ML technologies."
    }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Engineering Excellence &amp; Qualification
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Focused on modular system architecture, user-centric software design, and modern web application development.
          </p>
        </div>

        {/* Qualification Highlight Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 p-8 sm:p-10 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 relative overflow-hidden bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="p-4 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-lg shadow-primary/20">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-semibold text-primary dark:text-cyan-400 uppercase tracking-widest">
                  Highest Academic Qualification
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mt-1">
                  {PERSONAL_INFO.qualification}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Comprehensive background in Software Systems, OOP, Data Structures &amp; Web Architectures
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-xl text-xs font-semibold border border-emerald-500/20 self-start md:self-auto">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Degree</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800/80 space-y-4 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary dark:text-cyan-400 w-fit">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  {pillar.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
