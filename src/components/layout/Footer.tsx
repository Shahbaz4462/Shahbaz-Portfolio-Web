'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Code2, Github, ArrowUp, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import Link from 'next/link';

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-md shadow-primary/20">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
              {PERSONAL_INFO.tagline} Focused on software architecture, modern UIs, clean code principles, and intelligent software engineering.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full glass-panel text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-cyan-400 transition-colors border border-slate-200/80 dark:border-slate-800"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">About Qualification</Link></li>
              <li><Link href="/skills" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Technical Skills</Link></li>
              <li><Link href="/projects" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Featured Projects</Link></li>
            </ul>
          </div>

          {/* Col 3: Experience & Contact */}
          <div>
            <h4 className="font-display font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">
              Engineering & Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/experience" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Career Timeline</Link></li>
              <li><Link href="/achievements" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Achievements</Link></li>
              <li><Link href="/contact" className="hover:text-primary dark:hover:text-cyan-400 transition-colors">Contact Form</Link></li>
              <li>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="flex items-center space-x-2 hover:text-primary dark:hover:text-cyan-400 transition-colors mt-2"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>Switch Theme ({theme === 'dark' ? 'Light' : 'Dark'})</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>

          <p className="text-slate-500 dark:text-slate-400">
            A project by MS Developers
          </p>

          <Link
            href="/"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-panel hover:text-primary dark:hover:text-cyan-400 transition-colors border border-slate-200/80 dark:border-slate-800"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
