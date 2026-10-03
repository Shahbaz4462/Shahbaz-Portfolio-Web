export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  screenshots: string[];
  category: 'Full Stack' | 'Web App' | 'Machine Learning' | 'POS System';
  techStack: string[];
  features: string[];
  challengesSolved: string[];
  architectureOverview: string;
  liveDemoUrl: string;
  githubUrl: string | null;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming Languages' | 'Databases' | 'Tools & Deployment';
  level: 'Experienced' | 'Advanced' | 'Intermediate' | 'Learning';
  icon: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'project' | 'learning' | 'opensource' | 'goal';
  technologies?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
}
