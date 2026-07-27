import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import GithubSection from '@/components/sections/GithubSection';
import TimelineSection from '@/components/sections/TimelineSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="space-y-12 md:space-y-20">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GithubSection />
      <TimelineSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}
