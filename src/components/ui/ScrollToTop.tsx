'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && pathname !== '/' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
        >
          <Link
            href="/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to Home"
            className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full glass-panel shadow-lg shadow-primary/20 text-primary dark:text-cyan-400 border border-primary/20 dark:border-cyan-500/30 hover:bg-primary hover:text-white dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all duration-300"
          >
            <ArrowUp className="w-5 h-5" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
