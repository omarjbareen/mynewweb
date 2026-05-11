import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const roomOptions = [
  { id: 'kitchen', visualClass: 'visual-kitchen' },
  { id: 'bedroom', visualClass: 'visual-bedroom' },
  { id: 'closet', visualClass: 'visual-closet' },
  { id: 'living', visualClass: 'visual-living' },
  { id: 'office', visualClass: 'visual-desk' },
  { id: 'caravanStorage', visualClass: 'visual-storage' },
];

const wallColors = [
  { id: 'warmWhite', swatchClass: 'swatch-warm-white' },
  { id: 'softGrey', swatchClass: 'swatch-soft-grey' },
  { id: 'sageGreen', swatchClass: 'swatch-sage-green' },
  { id: 'stoneBeige', swatchClass: 'swatch-stone-beige' },
  { id: 'deepCharcoal', swatchClass: 'swatch-deep-charcoal' },
];
const styleOptions = ['minimal', 'scandinavian', 'classic', 'modern', 'industrial', 'luxury'];

const WizardPage = () => {
  const navigate = useNavigate();
  const { projectTypes } = useContent();
  const { t, localize } = useLanguage();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    projectType: '',
    room: '',
    wallColor: '',
    style: '',
    width: '',
    height: '',
    depth: '',
  });

  const totalSteps = 4;
  const progressWidth = `${(step / totalSteps) * 100}%`;

  const updateSelection = (field, value) => {
    setSelection((currentSelection) => ({
      ...currentSelection,
      [field]: value,
    }));
  };

  const goBack = () => {
    setStep((currentStep) => Math.max(1, currentStep - 1));
  };

  const goNext = () => {
    if (step === totalSteps) {
      navigate('/results', { state: { selections: selection } });
      return;
    }

    setStep((currentStep) => Math.min(totalSteps, currentStep + 1));
  };

  const isNextDisabled =
    (step === 1 && !selection.projectType) ||
    (step === 2 && !selection.room) ||
    (step === 3 && (!selection.wallColor || !selection.style)) ||
    (step === 4 && (!selection.width || !selection.height));
  const selectedProject = projectTypes.find((projectType) => projectType.id === selection.projectType);
  const selectedProjectLabel = selectedProject ? localize(selectedProject.label) : t('wizard.projectType');
  const selectedRoomLabel = selection.room ? t(`rooms.${selection.room}.shortTitle`) : t('wizard.room');
  const selectedWallColorLabel = selection.wallColor ? t(`wallColors.${selection.wallColor}`) : t('wizard.wallColor');
  const selectedStyleLabel = selection.style ? t(`styles.${selection.style}`) : t('wizard.preferredStyle');

  return (
    <div className="app-shell">
      <Navbar />
      <main className="wizard-page">
        <section className="wizard-hero">
          <div>
            <p className="eyebrow">{t('wizard.eyebrow')}</p>
            <h1>{t('wizard.title')}</h1>
            <p>{t('wizard.intro')}</p>
          </div>
          <div className="wizard-summary">
            <span>{t('wizard.currentBrief')}</span>
            <strong>{selectedProjectLabel} / {selectedRoomLabel}</strong>
            <p>{selectedWallColorLabel} / {selectedStyleLabel}</p>
          </div>
        </section>

        <section className="wizard-panel">
          <div className="progress-header">
            <span>{t('wizard.step')} {step} {t('wizard.of')} {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% {t('wizard.complete')}</span>
          </div>
          <div className="progress-track" aria-label="Wizard progress">
            <div className="progress-fill" style={{ width: progressWidth }} />
          </div>

          {step === 1 && (
            <div className="wizard-step">
              <div className="section-heading">
                <span className="eyebrow">{t('wizard.step')} 1</span>
                <h2>{t('wizard.step1')}</h2>
              </div>
              <div className="selection-grid">
                {projectTypes.map((option) => {
                  const imageStyle = option.imageUrl ? { backgroundImage: `url(${option.imageUrl})` } : undefined;

                  return (
                  <button
                    className={`selection-card image-card ${option.visualClass} ${selection.projectType === option.id ? 'selected' : ''}`}
                    key={option.id}
                    type="button"
                    style={imageStyle}
                    onClick={() => updateSelection('projectType', option.id)}
                  >
                    <span className="image-card-overlay">
                      <span className="card-kicker">{t('wizard.project')}</span>
                      <strong>{localize(option.label)}</strong>
                      <small>{localize(option.description)}</small>
                    </span>
                  </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="wizard-step">
              <div className="section-heading">
                <span className="eyebrow">{t('wizard.step')} 2</span>
                <h2>{t('wizard.step2')}</h2>
              </div>
              <div className="selection-grid">
                {roomOptions.map((option) => (
                  <button
                    className={`selection-card image-card ${option.visualClass} ${selection.room === option.id ? 'selected' : ''}`}
                    key={option.id}
                    type="button"
                    onClick={() => updateSelection('room', option.id)}
                  >
                    <span className="image-card-overlay">
                      <span className="card-kicker">{t('wizard.roomKicker')}</span>
                      <strong>{t(`rooms.${option.id}.shortTitle`)}</strong>
                      <small>{t(`rooms.${option.id}.description`)}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="wizard-step two-column-step">
              <div>
                <div className="section-heading">
                  <span className="eyebrow">{t('wizard.step')} 3</span>
                  <h2>{t('wizard.step3')}</h2>
                </div>
                <div className="swatch-grid">
                  {wallColors.map((color) => (
                    <button
                      className={`swatch-option ${selection.wallColor === color.id ? 'selected' : ''}`}
                      key={color.id}
                      type="button"
                      onClick={() => updateSelection('wallColor', color.id)}
                    >
                      <span className={`wall-swatch ${color.swatchClass}`} />
                      {t(`wallColors.${color.id}`)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="section-heading">
                  <span className="eyebrow">{t('wizard.styleDirection')}</span>
                  <h2>{t('wizard.chooseStyle')}</h2>
                </div>
                <div className="style-grid">
                  {styleOptions.map((style) => (
                    <button
                      className={`style-option ${selection.style === style ? 'selected' : ''}`}
                      key={style}
                      type="button"
                      onClick={() => updateSelection('style', style)}
                    >
                      {t(`styles.${style}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="wizard-step measurements-step">
              <div className="section-heading">
                <span className="eyebrow">{t('wizard.step')} 4</span>
                <h2>{t('wizard.step4')}</h2>
              </div>
              <div className="form-grid">
                <label>
                  {t('wizard.width')}
                  <input
                    type="number"
                    min="1"
                    placeholder="320"
                    value={selection.width}
                    onChange={(event) => updateSelection('width', event.target.value)}
                  />
                </label>
                <label>
                  {t('wizard.height')}
                  <input
                    type="number"
                    min="1"
                    placeholder="240"
                    value={selection.height}
                    onChange={(event) => updateSelection('height', event.target.value)}
                  />
                </label>
                <label>
                  {t('wizard.depth')}
                  <input
                    type="number"
                    min="1"
                    placeholder="60"
                    value={selection.depth}
                    onChange={(event) => updateSelection('depth', event.target.value)}
                  />
                </label>
              </div>
              <div className="measurement-preview">
                <span>{t('wizard.measuredArea')}</span>
                <strong>{selection.width || '0'} x {selection.height || '0'} cm</strong>
                <p>{t('wizard.depth')}: {selection.depth || t('wizard.notSpecified')} cm</p>
              </div>
            </div>
          )}

          <div className="wizard-actions">
            <button className="button button-secondary" type="button" onClick={goBack} disabled={step === 1}>
              {t('common.back')}
            </button>
            <button className="button button-primary" type="button" onClick={goNext} disabled={isNextDisabled}>
              {step === totalSteps ? t('common.showResults') : t('common.next')}
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WizardPage;
