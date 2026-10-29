'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >

          {/* ── Brand ──────────────────────────── */}
          <button
            onClick={() => scrollTo('#home')}
            aria-label="Back to top"
            className="flex items-center focus:outline-none group"
          >
            <span className="font-display font-semibold text-[15px] tracking-tight text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors duration-200">
              mshahbaz
            </span>
            <span className="font-mono text-[13px] text-primary dark:text-cyan-400">.me</span>
          </button>

          {/* ── Desktop Nav ─────────────────────── */}
          <nav
            className="hidden lg:flex items-center space-x-0.5"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none ${
                    isActive
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-800/80 rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* ── Right Controls ───────────────────── */}
          <div className="flex items-center space-x-1.5">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors duration-200 focus:outline-none"
              >
                {theme === 'dark'
                  ? <Sun style={{ width: '1.0625rem', height: '1.0625rem' }} />
                  : <Moon style={{ width: '1.0625rem', height: '1.0625rem' }} />
                }
              </button>
            )}

            {/* Hire Me CTA — visible from sm upward */}
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden sm:inline-flex items-center px-4 py-2 text-[13px] font-medium rounded-lg text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors duration-200 focus:outline-none"
            >
              Hire Me
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors duration-200 focus:outline-none"
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
              className="lg:hidden absolute top-full left-0 right-0 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0B0F19]/97 backdrop-blur-lg"
            >
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
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 focus:outline-none ${
                        isActive
                          ? 'bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <div className="pt-2 pb-1 px-0">
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors duration-200 focus:outline-none"
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
