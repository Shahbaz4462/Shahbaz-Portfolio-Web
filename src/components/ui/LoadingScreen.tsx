'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 text-white"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="relative p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl shadow-primary/30">
              <Code2 className="w-12 h-12 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-2xl border border-primary/40 animate-ping opacity-25" />
            </div>

            <motion.h1 
              className="text-2xl font-bold font-display tracking-wide"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Muhammad Shahbaz
            </motion.h1>

            <motion.p
              className="text-sm font-medium text-slate-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Software Engineer
            </motion.p>

            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
