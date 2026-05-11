import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const defaultSelections = {
  projectType: 'home',
  room: 'kitchen',
  wallColor: 'warmWhite',
  style: 'modern',
  width: '300',
  height: '240',
  depth: '60',
};

const ResultsPage = () => {
  const location = useLocation();
  const { projectTypes, products, recommendationSettings } = useContent();
  const { t, localize } = useLanguage();
  const selections = location.state?.selections || defaultSelections;
  const selectedProject = projectTypes.find((projectType) => projectType.id === selections.projectType);
  const projectLabel = selectedProject ? localize(selectedProject.label) : selections.projectType;
  const roomLabel = selections.room ? t(`rooms.${selections.room}.shortTitle`) : selections.room;
  const styleLabel = selections.style ? t(`styles.${selections.style}`) : selections.style;
  const wallColorLabel = selections.wallColor ? t(`wallColors.${selections.wallColor}`) : selections.wallColor;

  const scoredProducts = products
    .map((product) => {
      let score = 0;

      if (product.projectTypes.includes(selections.projectType)) {
        score += Number(recommendationSettings.projectMatchPoints);
      }

      if (product.recommendedRooms.includes(selections.room)) {
        score += Number(recommendationSettings.roomMatchPoints);
      }

      if (product.styles.includes(selections.style)) {
        score += Number(recommendationSettings.styleMatchPoints);
      }

      return { ...product, score };
    })
    .sort((firstProduct, secondProduct) => secondProduct.score - firstProduct.score);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="results-page">
        <section className="results-hero">
          <div>
            <p className="eyebrow">{t('results.eyebrow')}</p>
            <h1>{localize(recommendationSettings.resultsHeadline)}</h1>
            <p>{localize(recommendationSettings.resultsIntro)}</p>
          </div>

          <aside className="brief-card">
            <span>{t('results.brief')}</span>
            <strong>{projectLabel} / {roomLabel}</strong>
            <p>{t('results.styleWithWalls', { style: styleLabel, wallColor: wallColorLabel })}</p>
            <p>{selections.width} x {selections.height} x {selections.depth || t('wizard.notSpecified')} cm</p>
          </aside>
        </section>

        <section className="recommendations-section">
          <div className="section-heading">
            <span className="eyebrow">{t('results.catalogEyebrow')}</span>
            <h2>{t('results.bestFit')}</h2>
          </div>
          <div className="product-grid">
            {scoredProducts.map((product) => (
              <ProductCard key={product.id} product={product} selections={selections} />
            ))}
          </div>
        </section>

        <section className="quote-strip">
          <div>
            <p className="eyebrow">{t('results.quoteEyebrow')}</p>
            <h2>{t('results.quoteTitle')}</h2>
            <p>{t('results.quoteText')}</p>
          </div>
          <Link className="button button-primary" to="/quote" state={{ selections }}>
            {t('results.requestQuote')}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
