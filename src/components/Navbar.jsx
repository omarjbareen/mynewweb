import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { languageOptions } from '../i18n/translations';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" aria-label="WoodVision Assistant home">
          <span className="brand-mark">WV</span>
          <span>
            <strong>WoodVision</strong>
            <small>{t('nav.assistant')}</small>
          </span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" end>{t('nav.home')}</NavLink></li>
        <li><NavLink to="/wizard">{t('nav.selection')}</NavLink></li>
        <li><NavLink to="/results">{t('nav.catalog')}</NavLink></li>
        <li><NavLink to="/quote">{t('nav.quote')}</NavLink></li>
        <li><NavLink to="/admin">{t('nav.admin')}</NavLink></li>
        <li className="language-switcher" aria-label="Language switcher">
          {languageOptions.map((option) => (
            <button
              className={language === option.code ? 'active' : ''}
              key={option.code}
              type="button"
              onClick={() => setLanguage(option.code)}
            >
              {option.label}
            </button>
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
