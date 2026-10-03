'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, CheckCircle2, Cpu, AlertTriangle, Layers } from 'lucide-react';
import { Project } from '@/types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % project.screenshots.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
  };

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

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl glass-panel bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-10"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary dark:text-cyan-400 border border-primary/20">
                  {project.category}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scroll Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-700 dark:text-slate-300">
            {/* Screenshots Carousel */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800 group shadow-lg">
              <img
                src={project.screenshots[activeImageIndex] || project.image}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Carousel Controls */}
              {project.screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-primary transition-colors border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-950/70 text-white hover:bg-primary transition-colors border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {project.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === activeImageIndex ? 'bg-primary w-6' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Links & CTA Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono font-medium rounded-lg bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl glass-panel text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-cyan-400 font-semibold text-xs border border-slate-300 dark:border-slate-700 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 text-xs font-semibold cursor-not-allowed opacity-60"
                  >
                    <Github className="w-4 h-4" />
                    <span>Private Repository</span>
                  </button>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs shadow-md shadow-primary/20 hover:opacity-95 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-primary" />
                <span>Project Description</span>
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.fullDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Key Features &amp; Capabilities</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 p-3.5 rounded-xl glass-card border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges Solved */}
            {project.challengesSolved.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span>Engineering Challenges Solved</span>
                </h4>
                <div className="space-y-2">
                  {project.challengesSolved.map((challenge, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 font-medium leading-relaxed"
                    >
                      💡 {challenge}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Overview */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-accent" />
                <span>Architecture &amp; System Design</span>
              </h4>
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs font-mono leading-relaxed text-slate-700 dark:text-slate-300">
                {project.architectureOverview}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
