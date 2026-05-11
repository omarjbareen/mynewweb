import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">{t('home.heroEyebrow')}</p>
        <h1>{t('home.heroTitle')}</h1>
        <p>{t('home.heroText')}</p>
        <div className="hero-actions">
          <Link to="/wizard" className="button button-primary">{t('common.startWoodSelection')}</Link>
          <Link to="/results" className="button button-secondary">{t('common.browseCatalog')}</Link>
        </div>
      </div>
      <div className="hero-visual" aria-label="Premium interior wood material preview">
        <div className="interior-panel panel-kitchen">
          <span>{t('home.modernKitchen')}</span>
        </div>
        <div className="interior-panel panel-wardrobe">
          <span>{t('home.wardrobeWall')}</span>
        </div>
        <div className="sample-stack">
          <span className="sample sample-light">{t('home.oak')}</span>
          <span className="sample sample-dark">{t('home.walnut')}</span>
          <span className="sample sample-stone">{t('home.ash')}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
