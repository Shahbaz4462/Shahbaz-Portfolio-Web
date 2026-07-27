import React from 'react';
import Link from 'next/link';
import { Terminal, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950 text-white relative overflow-hidden">
      <div className="text-center space-y-6 max-w-md relative z-10">
        <div className="p-4 rounded-3xl bg-primary/10 border border-primary/20 text-primary w-fit mx-auto shadow-2xl">
          <Terminal className="w-12 h-12 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            404
          </h1>
          <h2 className="text-2xl font-bold font-display">Page Not Found</h2>
          <p className="text-sm text-slate-400">
            The requested portfolio path does not exist or has been relocated.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-sm shadow-xl shadow-primary/30 hover:scale-105 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portfolio Home</span>
        </Link>
      </div>
    </div>
  );
}
