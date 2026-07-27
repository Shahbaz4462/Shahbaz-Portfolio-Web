'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary Blob */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
          y: [0, -60, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 dark:bg-primary/25 filter blur-[100px] opacity-70"
      />

      {/* Cyan Accent Blob */}
      <motion.div
        animate={{
          x: [0, -90, 60, 0],
          y: [0, 70, -70, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accent/20 dark:bg-accent/25 filter blur-[110px] opacity-60"
      />

      {/* Deep Blue Bottom Blob */}
      <motion.div
        animate={{
          x: [0, 60, -80, 0],
          y: [0, -80, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-blue-600/15 dark:bg-blue-600/20 filter blur-[120px] opacity-60"
      />

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
