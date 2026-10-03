'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, GraduationCap, Briefcase, Code, Award } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary dark:text-cyan-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Muhammad Shahbaz — Resume Overview
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Software Engineer • Full Stack &amp; Machine Learning Solutions
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="/resume.pdf"
                download="Muhammad_Shahbaz_Software_Engineer_Resume.pdf"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300">
            {/* Header info box */}
            <div className="p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{PERSONAL_INFO.name}</h4>
                <p className="text-sm font-semibold text-primary dark:text-cyan-400 mt-0.5">{PERSONAL_INFO.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{PERSONAL_INFO.availability}</p>
              </div>
              <div className="text-xs space-y-1 font-mono text-slate-600 dark:text-slate-400">
                <p>📍 Location: {PERSONAL_INFO.location}</p>
                <p>🔗 GitHub: @{PERSONAL_INFO.githubUsername}</p>
                <p>🎓 Highest Degree: {PERSONAL_INFO.qualification}</p>
              </div>
            </div>

            {/* Education */}
            <div>
              <h5 className="flex items-center space-x-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Highest Qualification</span>
              </h5>
              <div className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start">
                  <h6 className="font-semibold text-slate-900 dark:text-white">{PERSONAL_INFO.qualification}</h6>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-primary/10 text-primary font-bold">Graduated</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Specialized in Software Architecture, Web Application Development, Database Systems, Object-Oriented Design, Algorithm Design &amp; Data Structures.
                </p>
              </div>
            </div>

            {/* Key Accomplishments */}
            <div>
              <h5 className="flex items-center space-x-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <Briefcase className="w-5 h-5 text-accent" />
                <span>Featured Engineering Projects</span>
              </h5>
              <div className="space-y-3">
                <div className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">E-Blood Bank Management Platform</span>
                    <span className="text-xs text-slate-400">Full Stack</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Architected emergency blood donation dispatching, real-time stock inventory logs, and role-based access control using React, TypeScript, Node.js &amp; MongoDB.
                  </p>
                </div>

                <div className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">Sargodha Sweets POS &amp; Billing System</span>
                    <span className="text-xs text-slate-400">Web App / POS</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Built a high-performance bakery checkout POS with fast keyboard shortcut triggers, offline cart persistence, thermal receipt printing, and sales reporting.
                  </p>
                </div>

                <div className="p-4 rounded-xl glass-card border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">Machine Learning Credit Scoring System</span>
                    <span className="text-xs text-slate-400">AI / ML</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Trained ensemble classification models (SMOTE balanced) to compute applicant risk metrics and generate interactive risk analytics visualizations.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Competencies */}
            <div>
              <h5 className="flex items-center space-x-2 text-base font-bold text-slate-900 dark:text-white mb-3">
                <Code className="w-5 h-5 text-blue-500" />
                <span>Technical Skills Summary</span>
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                {['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js & Express', 'Python & ML', 'MongoDB & SQL', 'REST APIs', 'Git & GitHub', 'Vercel Deployment'].map((tech) => (
                  <div key={tech} className="flex items-center space-x-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-800 dark:text-slate-200">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
