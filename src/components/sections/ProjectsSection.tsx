'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '@/data/portfolioData';
import { Project } from '@/types';
import ProjectModal from '@/components/modals/ProjectModal';
import { ExternalLink, Github, Info, Search, Sparkles, Code2, CheckCircle2 } from 'lucide-react';

const PROJECT_CATEGORIES = ['All', 'Full Stack', 'POS System', 'Machine Learning'] as const;

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Featured Engineering Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world full stack applications, Point-of-Sale software platforms, and machine learning analytics systems.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md shadow-primary/20 scale-105'
                    : 'glass-panel text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full glass-panel text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-primary dark:focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Projects Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
            <Code2 className="w-12 h-12 text-slate-400 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No matching projects found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your category filter or search terms.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="flex flex-col rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 overflow-hidden group hover:shadow-2xl hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300"
                >
                  {/* Card Header Media */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30 shadow-md">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                        {project.shortDescription}
                      </p>

                      {/* Key features quick preview list */}
                      <div className="space-y-1.5 pt-1">
                        {project.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 text-[11px] font-mono font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-primary dark:text-cyan-400 hover:bg-primary/10 transition-colors"
                      >
                        <Info className="w-4 h-4" />
                        <span>Project Details</span>
                      </button>

                      <div className="flex items-center space-x-2">
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub Repository"
                            className="p-2 rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 border border-slate-200 dark:border-slate-800 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        ) : (
                          <button
                            disabled
                            aria-label="Private Repository"
                            className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 opacity-50 cursor-not-allowed"
                          >
                            <Github className="w-4 h-4" />
                          </button>
                        )}

                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-xs shadow-md hover:opacity-95 transition-all"
                          >
                            <span>Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Selected Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
}
