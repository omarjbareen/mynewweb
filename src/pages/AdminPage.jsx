import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const tabKeys = ['overview', 'projectCards', 'products', 'recommendations', 'quoteRequests'];
const quoteStatuses = ['new', 'contacted', 'quoted', 'closed'];

const listToText = (items) => items.join(', ');
const textToList = (text) =>
  text
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const createProjectDraft = (projectType) => ({
  labelAr: projectType.label.ar,
  labelHe: projectType.label.he,
  descriptionAr: projectType.description.ar,
  descriptionHe: projectType.description.he,
  imageUrl: projectType.imageUrl,
});

const createProductDraft = (product) => ({
  nameAr: product.name.ar,
  nameHe: product.name.he,
  materialTypeAr: product.materialType.ar,
  materialTypeHe: product.materialType.he,
  colorNameAr: product.colorName.ar,
  colorNameHe: product.colorName.he,
  descriptionAr: product.description.ar,
  descriptionHe: product.description.he,
  measurementGuidanceAr: product.measurementGuidance.ar,
  measurementGuidanceHe: product.measurementGuidance.he,
  pricePerMeter: product.pricePerMeter,
  estimatedRange: product.estimatedRange,
  imageUrl: product.imageUrl,
  recommendedRooms: listToText(product.recommendedRooms),
  projectTypes: listToText(product.projectTypes),
  styles: listToText(product.styles),
});

const createSettingsDraft = (settings) => ({
  resultsHeadlineAr: settings.resultsHeadline.ar,
  resultsHeadlineHe: settings.resultsHeadline.he,
  resultsIntroAr: settings.resultsIntro.ar,
  resultsIntroHe: settings.resultsIntro.he,
  projectMatchPoints: settings.projectMatchPoints,
  roomMatchPoints: settings.roomMatchPoints,
  styleMatchPoints: settings.styleMatchPoints,
});

const AdminPage = () => {
  const {
    projectTypes,
    products,
    recommendationSettings,
    quoteRequests,
    updateProjectType,
    updateProduct,
    updateRecommendationSettings,
    updateQuoteStatus,
  } = useContent();
  const { t, localize, language } = useLanguage();

  const [activeTab, setActiveTab] = useState('overview');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [projectDrafts, setProjectDrafts] = useState(() =>
    projectTypes.reduce((draftValues, projectType) => {
      draftValues[projectType.id] = createProjectDraft(projectType);
      return draftValues;
    }, {})
  );
  const [productDrafts, setProductDrafts] = useState(() =>
    products.reduce((draftValues, product) => {
      draftValues[product.id] = createProductDraft(product);
      return draftValues;
    }, {})
  );
  const [settingsDraft, setSettingsDraft] = useState(() => createSettingsDraft(recommendationSettings));

  const updateProjectDraft = (projectId, field, value) => {
    setProjectDrafts((currentDrafts) => ({
      ...currentDrafts,
      [projectId]: {
        ...currentDrafts[projectId],
        [field]: value,
      },
    }));
  };

  const updateProductDraft = (productId, field, value) => {
    setProductDrafts((currentDrafts) => ({
      ...currentDrafts,
      [productId]: {
        ...currentDrafts[productId],
        [field]: value,
      },
    }));
  };

  const startEditingProject = (projectType) => {
    setProjectDrafts((currentDrafts) => ({
      ...currentDrafts,
      [projectType.id]: createProjectDraft(projectType),
    }));
    setEditingProjectId(projectType.id);
  };

  const saveProjectType = (projectId) => {
    const draft = projectDrafts[projectId];

    updateProjectType(projectId, {
      label: { ar: draft.labelAr, he: draft.labelHe },
      description: { ar: draft.descriptionAr, he: draft.descriptionHe },
      imageUrl: draft.imageUrl,
    });
    setEditingProjectId(null);
  };

  const startEditingProduct = (product) => {
    setProductDrafts((currentDrafts) => ({
      ...currentDrafts,
      [product.id]: createProductDraft(product),
    }));
    setEditingProductId(product.id);
  };

  const saveProduct = (productId) => {
    const draft = productDrafts[productId];

    updateProduct(productId, {
      name: { ar: draft.nameAr, he: draft.nameHe },
      materialType: { ar: draft.materialTypeAr, he: draft.materialTypeHe },
      colorName: { ar: draft.colorNameAr, he: draft.colorNameHe },
      description: { ar: draft.descriptionAr, he: draft.descriptionHe },
      measurementGuidance: { ar: draft.measurementGuidanceAr, he: draft.measurementGuidanceHe },
      pricePerMeter: Number(draft.pricePerMeter),
      estimatedRange: draft.estimatedRange,
      imageUrl: draft.imageUrl,
      recommendedRooms: textToList(draft.recommendedRooms),
      projectTypes: textToList(draft.projectTypes),
      styles: textToList(draft.styles),
    });
    setEditingProductId(null);
  };

  const updateSettingsDraft = (field, value) => {
    setSettingsDraft((currentDraft) => ({
      ...currentDraft,
      [field]: value,
    }));
  };

  const saveRecommendationSettings = () => {
    updateRecommendationSettings({
      resultsHeadline: { ar: settingsDraft.resultsHeadlineAr, he: settingsDraft.resultsHeadlineHe },
      resultsIntro: { ar: settingsDraft.resultsIntroAr, he: settingsDraft.resultsIntroHe },
      projectMatchPoints: Number(settingsDraft.projectMatchPoints),
      roomMatchPoints: Number(settingsDraft.roomMatchPoints),
      styleMatchPoints: Number(settingsDraft.styleMatchPoints),
    });
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="admin-page">
        <section className="admin-hero">
          <div>
            <p className="eyebrow">{t('admin.heroEyebrow')}</p>
            <h1>{t('admin.heroTitle')}</h1>
            <p>{t('admin.heroText')}</p>
          </div>
          <div className="admin-note">
            <span>{t('admin.scope')}</span>
            <strong>{t('admin.scopeTitle')}</strong>
            <p>{t('admin.scopeText')}</p>
          </div>
        </section>

        <nav className="admin-tabs" aria-label="Admin sections">
          {tabKeys.map((tabKey) => (
            <button
              className={activeTab === tabKey ? 'active' : ''}
              key={tabKey}
              type="button"
              onClick={() => setActiveTab(tabKey)}
            >
              {t(`admin.tabs.${tabKey}`)}
            </button>
          ))}
        </nav>

        {activeTab === 'overview' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">{t('admin.atGlance')}</p>
                <h2>{t('admin.dashboard')}</h2>
              </div>
              <span>{t('admin.cmsMode')}</span>
            </div>
            <div className="business-summary-grid">
              <article>
                <strong>{projectTypes.length}</strong>
                <span>{t('admin.projectCards')}</span>
                <p>{t('admin.projectSummary')}</p>
              </article>
              <article>
                <strong>{products.length}</strong>
                <span>{t('admin.products')}</span>
                <p>{t('admin.productSummary')}</p>
              </article>
              <article>
                <strong>{quoteRequests.length}</strong>
                <span>{t('admin.quoteRequests')}</span>
                <p>{t('admin.quoteSummary')}</p>
              </article>
            </div>
          </section>
        )}

        {activeTab === 'projectCards' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">{t('admin.websiteVisuals')}</p>
                <h2>{t('admin.projectCards')}</h2>
              </div>
              <span>{t('admin.editableCards', { count: projectTypes.length })}</span>
            </div>

            <div className="admin-card-list">
              {projectTypes.map((projectType) => {
                const draft = projectDrafts[projectType.id] || createProjectDraft(projectType);
                const isEditing = editingProjectId === projectType.id;
                const previewStyle = draft.imageUrl ? { backgroundImage: `url(${draft.imageUrl})` } : undefined;
                const previewLabel = isEditing
                  ? language === 'ar' ? draft.labelAr : draft.labelHe
                  : localize(projectType.label);
                const previewDescription = isEditing
                  ? language === 'ar' ? draft.descriptionAr : draft.descriptionHe
                  : localize(projectType.description);

                return (
                  <article className="admin-card" key={projectType.id}>
                    <div className={`admin-preview image-card ${projectType.visualClass}`} style={previewStyle}>
                      <div className="image-card-overlay">
                        <span className="card-kicker">{t('common.preview')}</span>
                        <h3>{previewLabel}</h3>
                        <p>{previewDescription}</p>
                      </div>
                    </div>

                    <div className="admin-fields">
                      <label>
                        {t('admin.categoryName')} - {t('admin.arabic')}
                        <input
                          type="text"
                          value={draft.labelAr}
                          disabled={!isEditing}
                          onChange={(event) => updateProjectDraft(projectType.id, 'labelAr', event.target.value)}
                        />
                      </label>
                      <label>
                        {t('admin.categoryName')} - {t('admin.hebrew')}
                        <input
                          type="text"
                          value={draft.labelHe}
                          disabled={!isEditing}
                          onChange={(event) => updateProjectDraft(projectType.id, 'labelHe', event.target.value)}
                        />
                      </label>
                      <label>
                        {t('common.description')} - {t('admin.arabic')}
                        <textarea
                          rows="3"
                          value={draft.descriptionAr}
                          disabled={!isEditing}
                          onChange={(event) => updateProjectDraft(projectType.id, 'descriptionAr', event.target.value)}
                        />
                      </label>
                      <label>
                        {t('common.description')} - {t('admin.hebrew')}
                        <textarea
                          rows="3"
                          value={draft.descriptionHe}
                          disabled={!isEditing}
                          onChange={(event) => updateProjectDraft(projectType.id, 'descriptionHe', event.target.value)}
                        />
                      </label>
                      <label className="form-wide">
                        {t('common.imageUrl')}
                        <input
                          type="url"
                          value={draft.imageUrl}
                          disabled={!isEditing}
                          placeholder="https://example.com/interior-image.jpg"
                          onChange={(event) => updateProjectDraft(projectType.id, 'imageUrl', event.target.value)}
                        />
                      </label>

                      <div className="admin-card-actions form-wide">
                        {isEditing ? (
                          <button className="button button-primary" type="button" onClick={() => saveProjectType(projectType.id)}>
                            {t('admin.saveCard')}
                          </button>
                        ) : (
                          <button className="button button-secondary" type="button" onClick={() => startEditingProject(projectType)}>
                            {t('admin.editCard')}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'products' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">{t('admin.catalogManagement')}</p>
                <h2>{t('admin.products')}</h2>
              </div>
              <span>{t('admin.productCount', { count: products.length })}</span>
            </div>

            <div className="admin-card-list">
              {products.map((product) => {
                const draft = productDrafts[product.id] || createProductDraft(product);
                const isEditing = editingProductId === product.id;
                const previewStyle = draft.imageUrl ? { backgroundImage: `url(${draft.imageUrl})` } : undefined;
                const previewColor = isEditing
                  ? language === 'ar' ? draft.colorNameAr : draft.colorNameHe
                  : localize(product.colorName);

                return (
                  <article className="admin-product-card" key={product.id}>
                    <div className={`product-visual admin-product-preview ${product.visualClass}`} style={previewStyle}>
                      <span>{previewColor}</span>
                    </div>

                    <div className="admin-fields product-admin-fields">
                      <label>
                        {t('admin.productName')} - {t('admin.arabic')}
                        <input type="text" value={draft.nameAr} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'nameAr', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.productName')} - {t('admin.hebrew')}
                        <input type="text" value={draft.nameHe} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'nameHe', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.materialType')} - {t('admin.arabic')}
                        <input type="text" value={draft.materialTypeAr} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'materialTypeAr', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.materialType')} - {t('admin.hebrew')}
                        <input type="text" value={draft.materialTypeHe} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'materialTypeHe', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.colorName')} - {t('admin.arabic')}
                        <input type="text" value={draft.colorNameAr} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'colorNameAr', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.colorName')} - {t('admin.hebrew')}
                        <input type="text" value={draft.colorNameHe} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'colorNameHe', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.pricePerMeter')}
                        <input type="number" value={draft.pricePerMeter} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'pricePerMeter', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.estimatedRange')}
                        <input type="text" value={draft.estimatedRange} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'estimatedRange', event.target.value)} />
                      </label>
                      <label className="form-wide">
                        {t('common.imageUrl')}
                        <input type="url" value={draft.imageUrl} disabled={!isEditing} placeholder="https://example.com/material.jpg" onChange={(event) => updateProductDraft(product.id, 'imageUrl', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.recommendedRooms')}
                        <input type="text" value={draft.recommendedRooms} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'recommendedRooms', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.projectTypes')}
                        <input type="text" value={draft.projectTypes} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'projectTypes', event.target.value)} />
                      </label>
                      <label className="form-wide">
                        {t('admin.styleTags')}
                        <input type="text" value={draft.styles} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'styles', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.measurementGuidance')} - {t('admin.arabic')}
                        <input type="text" value={draft.measurementGuidanceAr} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'measurementGuidanceAr', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.measurementGuidance')} - {t('admin.hebrew')}
                        <input type="text" value={draft.measurementGuidanceHe} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'measurementGuidanceHe', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.productDescription')} - {t('admin.arabic')}
                        <textarea rows="3" value={draft.descriptionAr} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'descriptionAr', event.target.value)} />
                      </label>
                      <label>
                        {t('admin.productDescription')} - {t('admin.hebrew')}
                        <textarea rows="3" value={draft.descriptionHe} disabled={!isEditing} onChange={(event) => updateProductDraft(product.id, 'descriptionHe', event.target.value)} />
                      </label>

                      <div className="admin-card-actions form-wide">
                        {isEditing ? (
                          <button className="button button-primary" type="button" onClick={() => saveProduct(product.id)}>
                            {t('admin.saveProduct')}
                          </button>
                        ) : (
                          <button className="button button-secondary" type="button" onClick={() => startEditingProduct(product)}>
                            {t('admin.editProduct')}
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 'recommendations' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">{t('admin.recommendationContent')}</p>
                <h2>{t('admin.resultsGuidance')}</h2>
              </div>
              <span>{t('admin.ownerEditable')}</span>
            </div>

            <div className="recommendation-admin-grid">
              <label>
                {t('admin.resultsHeadline')} - {t('admin.arabic')}
                <input type="text" value={settingsDraft.resultsHeadlineAr} onChange={(event) => updateSettingsDraft('resultsHeadlineAr', event.target.value)} />
              </label>
              <label>
                {t('admin.resultsHeadline')} - {t('admin.hebrew')}
                <input type="text" value={settingsDraft.resultsHeadlineHe} onChange={(event) => updateSettingsDraft('resultsHeadlineHe', event.target.value)} />
              </label>
              <label>
                {t('admin.resultsIntro')} - {t('admin.arabic')}
                <textarea rows="4" value={settingsDraft.resultsIntroAr} onChange={(event) => updateSettingsDraft('resultsIntroAr', event.target.value)} />
              </label>
              <label>
                {t('admin.resultsIntro')} - {t('admin.hebrew')}
                <textarea rows="4" value={settingsDraft.resultsIntroHe} onChange={(event) => updateSettingsDraft('resultsIntroHe', event.target.value)} />
              </label>
              <label>
                {t('admin.projectPriority')}
                <input type="number" min="0" value={settingsDraft.projectMatchPoints} onChange={(event) => updateSettingsDraft('projectMatchPoints', event.target.value)} />
              </label>
              <label>
                {t('admin.roomPriority')}
                <input type="number" min="0" value={settingsDraft.roomMatchPoints} onChange={(event) => updateSettingsDraft('roomMatchPoints', event.target.value)} />
              </label>
              <label>
                {t('admin.stylePriority')}
                <input type="number" min="0" value={settingsDraft.styleMatchPoints} onChange={(event) => updateSettingsDraft('styleMatchPoints', event.target.value)} />
              </label>
            </div>

            <div className="admin-card-actions">
              <button className="button button-primary" type="button" onClick={saveRecommendationSettings}>
                {t('admin.saveRecommendationSettings')}
              </button>
            </div>
          </section>
        )}

        {activeTab === 'quoteRequests' && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="eyebrow">{t('admin.customerRequests')}</p>
                <h2>{t('admin.quoteInbox')}</h2>
              </div>
              <span>{t('admin.requestCount', { count: quoteRequests.length })}</span>
            </div>

            <div className="quote-request-list">
              {quoteRequests.map((quoteRequest) => (
                <article className="quote-request-card" key={quoteRequest.id}>
                  <div>
                    <span className="request-date">{quoteRequest.createdAt}</span>
                    <h3>{quoteRequest.fullName}</h3>
                    <p>{quoteRequest.phone}</p>
                  </div>
                  <div>
                    <strong>{quoteRequest.projectType} / {quoteRequest.selectedRoom}</strong>
                    <p>{quoteRequest.measurements}</p>
                    <p>{quoteRequest.selectedProductName}</p>
                  </div>
                  <p>{quoteRequest.notes}</p>
                  <label>
                    {t('common.status')}
                    <select value={quoteRequest.status} onChange={(event) => updateQuoteStatus(quoteRequest.id, event.target.value)}>
                      {quoteStatuses.map((status) => (
                        <option key={status} value={status}>{t(`statuses.${status}`)}</option>
                      ))}
                    </select>
                  </label>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
