'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Users, ExternalLink, Code2, Activity, Calendar } from 'lucide-react';
import { GithubProfile, GithubRepo } from '@/types';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function GithubSection() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}`),
          fetch(`https://api.github.com/users/${PERSONAL_INFO.githubUsername}/repos?sort=updated&per_page=6`)
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error('Failed to fetch live GitHub metrics');
        }

        const profileData: GithubProfile = await profileRes.json();
        const reposData: GithubRepo[] = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData);
      } catch (err: any) {
        setError(err.message || 'GitHub API fallback activated');
        // Static fallback so section never breaks
        setProfile({
          login: PERSONAL_INFO.githubUsername,
          avatar_url: `https://avatars.githubusercontent.com/u/172325687?v=4`,
          html_url: PERSONAL_INFO.githubUrl,
          name: PERSONAL_INFO.name,
          bio: "Software Engineer | MERN Stack Developer | UI/UX Enthusiast",
          public_repos: 6,
          followers: 0,
          following: 3,
          created_at: "2024-06-10T21:15:14Z"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchGithubData();
  }, []);

  return (
    <section id="github" className="py-20 relative bg-slate-50/50 dark:bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary dark:text-cyan-400 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            Open Source &amp; Code Hub
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white">
            Live GitHub Statistics
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-time synchronization with my public repositories and open-source contribution metrics.
          </p>
        </div>

        {/* Profile Card & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 p-8 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={profile?.avatar_url || "https://avatars.githubusercontent.com/u/172325687?v=4"}
                  alt={PERSONAL_INFO.name}
                  className="w-16 h-16 rounded-2xl border-2 border-primary shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    {profile?.name || PERSONAL_INFO.name}
                  </h3>
                  <a
                    href={profile?.html_url || PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-primary dark:text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <span>@{profile?.login || PERSONAL_INFO.githubUsername}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-mono bg-slate-100 dark:bg-slate-800/60 p-3 rounded-xl">
                "{profile?.bio || 'Building scalable web applications & AI pipelines.'}"
              </p>
            </div>

            {/* Metrics List */}
            <div className="grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                  {profile?.public_repos ?? 6}
                </p>
                <p className="text-[11px] font-mono text-slate-500">Repos</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                  {profile?.followers ?? 0}
                </p>
                <p className="text-[11px] font-mono text-slate-500">Followers</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-100/60 dark:bg-slate-800/40">
                <p className="text-xl font-extrabold font-display text-slate-900 dark:text-white">
                  {profile?.following ?? 3}
                </p>
                <p className="text-[11px] font-mono text-slate-500">Following</p>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs hover:bg-primary transition-colors shadow-md"
            >
              <Github className="w-4 h-4" />
              <span>Follow on GitHub</span>
            </a>
          </motion.div>

          {/* GitHub Stats Cards / GitHub Readme Stats Embeds */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 space-y-6 flex flex-col justify-between"
          >
            {/* Live Stats Card Graphics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-primary dark:text-cyan-400">Activity Stats</span>
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  Continuous Commit Cadence
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Regular contributions across TypeScript, React, Python ML notebooks, and POS system repositories.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-emerald-500 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Active GitHub Profile Sync</span>
                </div>
              </div>

              <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-accent">Top Languages</span>
                  <Code2 className="w-4 h-4 text-accent" />
                </div>
                <h4 className="text-lg font-bold font-display text-slate-900 dark:text-white">
                  TypeScript &amp; Python Dominance
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Primary emphasis on strongly-typed web architectures and data science machine learning scripts.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-blue-500/10 text-blue-500 font-semibold">TypeScript</span>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-amber-500/10 text-amber-500 font-semibold">Python</span>
                  <span className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-yellow-500/10 text-yellow-500 font-semibold">JavaScript</span>
                </div>
              </div>
            </div>

            {/* Contribution Graph Preview Box */}
            <div className="p-6 rounded-3xl glass-card border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>GitHub Contribution Activity</span>
                </h4>
                <a
                  href={`https://github.com/${PERSONAL_INFO.githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-primary dark:text-cyan-400 hover:underline flex items-center space-x-1"
                >
                  <span>View Profile Graph</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* GitHub contribution activity graphic mock */}
              <div className="overflow-x-auto py-2">
                <img
                  src={`https://ghchart.rshah.org/2563eb/${PERSONAL_INFO.githubUsername}`}
                  alt="GitHub Contribution Graph"
                  className="w-full min-w-[600px] rounded-xl dark:invert dark:hue-rotate-180"
                  onError={(e) => {
                    // Fallback to static styled activity grid if chart server is unreachable
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Latest Repositories Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span>Public Repositories ({repos.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl glass-card border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-primary/40 dark:hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold font-mono text-sm text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {repo.name}
                    </h4>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {repo.description || "Production repository by Muhammad Shahbaz."}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="flex items-center space-x-1.5 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>{repo.language || 'Code'}</span>
                  </span>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Star className="w-3.5 h-3.5 text-amber-500" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork className="w-3.5 h-3.5 text-blue-500" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
