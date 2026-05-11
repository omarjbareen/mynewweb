import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const QuotePage = () => {
  const location = useLocation();
  const { projectTypes, addQuoteRequest } = useContent();
  const { t, localize } = useLanguage();
  const selections = location.state?.selections || {};
  const selectedProduct = location.state?.selectedProduct;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const selectedProject = projectTypes.find((projectType) => projectType.id === selections.projectType);
  const projectLabel = selectedProject ? localize(selectedProject.label) : '';
  const roomLabel = selections.room ? t(`rooms.${selections.room}.shortTitle`) : '';
  const productName = selectedProduct ? localize(selectedProduct.name) : '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectType: projectLabel,
    selectedRoom: roomLabel,
    measurements: selections.width && selections.height
      ? `${selections.width} x ${selections.height} x ${selections.depth || t('wizard.notSpecified')} cm`
      : '',
    notes: selectedProduct ? t('quote.interestedIn', { product: productName }) : '',
  });

  const updateForm = (field, value) => {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addQuoteRequest({
      ...formData,
      selectedProductName: productName || t('quote.notSelected'),
    });
    setIsSubmitted(true);
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="quote-page">
        <section className="quote-hero">
          <div>
            <p className="eyebrow">{t('quote.eyebrow')}</p>
            <h1>{t('quote.title')}</h1>
            <p>{t('quote.intro')}</p>
          </div>
          <div className="quote-preview image-card visual-custom">
            <div className="image-card-overlay">
              <span className="card-kicker">{t('quote.selectedMaterial')}</span>
              <h3>{productName || t('results.materialToConfirm')}</h3>
              <p>{selectedProduct ? localize(selectedProduct.colorName) : t('quote.fallbackText')}</p>
            </div>
          </div>
        </section>

        <form className="quote-form" onSubmit={handleSubmit}>
          {isSubmitted && (
            <div className="form-success">
              {t('quote.success')}
            </div>
          )}
          <div className="form-grid">
            <label>
              {t('quote.fullName')}
              <input
                type="text"
                value={formData.fullName}
                onChange={(event) => updateForm('fullName', event.target.value)}
                placeholder={t('quote.namePlaceholder')}
                required
              />
            </label>
            <label>
              {t('quote.phone')}
              <input
                type="tel"
                value={formData.phone}
                onChange={(event) => updateForm('phone', event.target.value)}
                placeholder={t('quote.phonePlaceholder')}
                required
              />
            </label>
            <label>
              {t('quote.projectType')}
              <input
                type="text"
                value={formData.projectType}
                onChange={(event) => updateForm('projectType', event.target.value)}
                placeholder={t('quote.projectPlaceholder')}
              />
            </label>
            <label>
              {t('quote.selectedRoom')}
              <input
                type="text"
                value={formData.selectedRoom}
                onChange={(event) => updateForm('selectedRoom', event.target.value)}
                placeholder={t('quote.roomPlaceholder')}
              />
            </label>
            <label className="form-wide">
              {t('quote.measurements')}
              <input
                type="text"
                value={formData.measurements}
                onChange={(event) => updateForm('measurements', event.target.value)}
                placeholder={t('quote.measurementPlaceholder')}
              />
            </label>
            <label className="form-wide">
              {t('quote.notes')}
              <textarea
                rows="5"
                value={formData.notes}
                onChange={(event) => updateForm('notes', event.target.value)}
                placeholder={t('quote.notesPlaceholder')}
              />
            </label>
          </div>
          <button className="button button-primary" type="submit">
            {t('quote.submit')}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;
