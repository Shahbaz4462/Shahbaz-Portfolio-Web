import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';

/**
 * Single continuous-scrolling portfolio page.
 *
 * Section order:
 *   #home → #about → #qualification → #experience →
 *   #projects → #skills → #achievements → #contact
 *
 * Each section already carries its own `id` attribute.
 * #qualification is a semantic anchor that resolves to the
 * AboutSection — which visually contains the qualification card.
 */
export default function Home() {
  return (
    <div>
      {/* ① Home */}
      <HeroSection />

      {/* ② About + Qualification
           The #qualification anchor sits right above AboutSection
           so navbar clicks land at the right visual position. */}
      <div id="qualification" style={{ scrollMarginTop: '80px' }} />
      <AboutSection />

      {/* ③ Experience / Timeline */}
      <TimelineSection />

      {/* ④ Projects */}
      <ProjectsSection />

      {/* ⑤ Skills */}
      <SkillsSection />

      {/* ⑥ Achievements */}
      <AchievementsSection />

      {/* ⑦ Contact */}
      <ContactSection />
    </div>
  );
}
