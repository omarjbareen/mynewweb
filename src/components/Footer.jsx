import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div>
        <strong>WoodVision Assistant</strong>
        <p>{t('footer.text')}</p>
      </div>
      <p>{t('footer.note')}</p>
    </footer>
  );
};

export default Footer;
