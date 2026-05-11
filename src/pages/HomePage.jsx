import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import RoomCard from '../components/RoomCard';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import '../styles/HomePage.css';

const HomePage = () => {
  const { projectTypes } = useContent();
  const { t, localize } = useLanguage();

  const spaces = [
    { id: 'kitchen', visualClass: 'visual-kitchen' },
    { id: 'bedroom', visualClass: 'visual-bedroom' },
    { id: 'living', visualClass: 'visual-living' },
    { id: 'office', visualClass: 'visual-desk' },
    { id: 'closet', visualClass: 'visual-closet' },
    { id: 'caravanStorage', visualClass: 'visual-storage' },
  ];

  return (
    <div className="app-shell">
      <Navbar />
      <HeroSection />
      <section className="intro-section">
        <div className="section-heading">
          <span className="eyebrow">{t('home.howItWorks')}</span>
          <h2>{t('home.advisorTitle')}</h2>
        </div>
        <p>{t('home.advisorText')}</p>
      </section>

      <section className="projects-section page-section">
        <div className="section-heading">
          <span className="eyebrow">{t('home.projectEyebrow')}</span>
          <h2>{t('home.projectTitle')}</h2>
        </div>
        <div className="cards-grid project-grid">
          {projectTypes.map((project) => (
            <ProjectCard
              key={project.id}
              title={localize(project.label)}
              description={localize(project.description)}
              visualClass={project.visualClass}
              imageUrl={project.imageUrl}
            />
          ))}
        </div>
      </section>

      <section className="spaces-section page-section">
        <div className="section-heading">
          <span className="eyebrow">{t('home.spacesEyebrow')}</span>
          <h2>{t('home.spacesTitle')}</h2>
        </div>
        <div className="cards-grid spaces-grid">
          {spaces.map((space) => (
            <RoomCard
              key={space.id}
              name={t(`rooms.${space.id}.title`)}
              description={t(`rooms.${space.id}.description`)}
              visualClass={space.visualClass}
            />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
