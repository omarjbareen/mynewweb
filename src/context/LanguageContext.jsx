import React, { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

const getNestedValue = (source, path) => {
  return path.split('.').reduce((currentValue, key) => {
    if (!currentValue) {
      return undefined;
    }

    return currentValue[key];
  }, source);
};

const replaceParams = (text, params = {}) => {
  return Object.entries(params).reduce((currentText, [key, value]) => {
    return currentText.replaceAll(`{${key}}`, value);
  }, text);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');

  const t = (path, params) => {
    const translatedText = getNestedValue(translations[language], path) || path;
    return typeof translatedText === 'string' ? replaceParams(translatedText, params) : translatedText;
  };

  const localize = (value) => {
    if (typeof value === 'string') {
      return value;
    }

    return value?.[language] || value?.ar || value?.he || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, localize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
};
