import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WizardPage from './pages/WizardPage';
import ResultsPage from './pages/ResultsPage';
import QuotePage from './pages/QuotePage';
import AdminPage from './pages/AdminPage';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './App.css';

const AppRoutes = () => {
  const { language } = useLanguage();

  return (
    <div dir="rtl" lang={language}>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wizard" element={<WizardPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </Router>
      </ContentProvider>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}

export default App;
