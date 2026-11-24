'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Github, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const NAV_ITEMS = [
  { label: 'Home',          href: '#home' },
  { label: 'About',         href: '#about' },
  { label: 'Qualification', href: '#qualification' },
  { label: 'Experience',    href: '#experience' },
  { label: 'Projects',      href: '#projects' },
  { label: 'Skills',        href: '#skills' },
  { label: 'Achievements',  href: '#achievements' },
  { label: 'Contact',       href: '#contact' },
];

// Header redesigned 2026-11-25: one colour scheme across the bar —
// the site's brand gradient (primary blue #2563EB → accent cyan
// #06B6D4) drives the logo tile, the active nav pill, the CTA and
// every hover accent, in light and dark mode alike. Slate stays as
// the neutral base; nothing else introduces its own colour.
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted]             = useState(false);
  const [isScrolled, setIsScrolled]       = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth-scroll that respects the sticky header height
  const scrollTo = useCallback((href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const headerHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    const sectionIds = NAV_ITEMS.map(i => i.href.replace('#', ''));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollMid) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC key closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'nav-scrolled' : 'bg-transparent'
      }`}
    >
      {/* Brand gradient hairline — the scheme's signature, visible
          once the bar gains its glass background on scroll. */}
      {isScrolled && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary"
        />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between gap-3 transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >

          {/* ── Brand ──────────────────────────── */}
          <button
            onClick={() => scrollTo('#home')}
            aria-label="Back to top"
            className="flex items-center gap-3 focus:outline-none group shrink-0"
          >
            <span className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent text-white font-display font-bold text-[15px] tracking-tight shadow-glow-blue transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
              MS
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0B0F19]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start leading-none">
              <span className="font-display font-semibold text-[17px] tracking-tight text-slate-900 dark:text-white">
                mshahbaz<span className="gradient-text">.me</span>
              </span>
              <span className="hidden sm:block mt-1 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                Software Engineer
              </span>
            </span>
          </button>

          {/* ── Desktop Nav — one glass pill ─────── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 rounded-full border border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-white/[0.04] backdrop-blur-md p-1 shadow-sm"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent-300'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent shadow-glow-blue"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Right Controls ───────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* GitHub */}
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent-300 hover:border-primary/40 dark:hover:border-accent/40 transition-colors duration-200 focus:outline-none"
            >
              <Github style={{ width: '1.05rem', height: '1.05rem' }} />
            </a>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-accent-300 hover:border-primary/40 dark:hover:border-accent/40 transition-colors duration-200 focus:outline-none"
              >
                {theme === 'dark'
                  ? <Sun style={{ width: '1.05rem', height: '1.05rem' }} />
                  : <Moon style={{ width: '1.05rem', height: '1.05rem' }} />
                }
              </button>
            )}

            {/* Hire Me CTA — brand gradient */}
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-[13px] font-semibold rounded-full text-white bg-gradient-to-r from-primary to-accent shadow-glow-blue hover:shadow-glow-cyan hover:brightness-110 active:scale-[0.98] transition-all duration-200 focus:outline-none"
            >
              Hire Me
              <ArrowUpRight style={{ width: '0.95rem', height: '0.95rem' }} />
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-accent-300 transition-colors duration-200 focus:outline-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  45,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate:  45, opacity: 0 }}
                    animate={{ rotate:  0,  opacity: 1 }}
                    exit={{   rotate: -45,  opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ───────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dimmed backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{   opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 bg-black/20 dark:bg-black/50 backdrop-blur-sm lg:hidden -z-10"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y:  0 }}
              exit={{   opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-lg"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary" />
              <nav
                className="max-w-7xl mx-auto px-4 py-3 space-y-0.5"
                aria-label="Mobile navigation"
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.replace('#', '');
                  return (
                    <button
                      key={item.href}
                      onClick={() => scrollTo(item.href)}
                      className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 focus:outline-none ${
                        isActive
                          ? 'bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent-300'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-gradient-to-r from-primary to-accent' : 'bg-slate-300 dark:bg-slate-700'}`} aria-hidden="true" />
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-2 pb-1 px-0">
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold shadow-glow-blue hover:brightness-110 transition-all duration-200 focus:outline-none"
                  >
                    Get In Touch
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
