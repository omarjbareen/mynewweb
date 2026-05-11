import React, { createContext, useContext, useState } from 'react';
import { defaultProjectTypes } from '../data/projectTypes';
import { woodProducts } from '../data/woodProducts';
import { defaultRecommendationSettings } from '../data/recommendationSettings';
import { defaultQuoteRequests } from '../data/quoteRequests';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [projectTypes, setProjectTypes] = useState(defaultProjectTypes);
  const [products, setProducts] = useState(woodProducts);
  const [recommendationSettings, setRecommendationSettings] = useState(defaultRecommendationSettings);
  const [quoteRequests, setQuoteRequests] = useState(defaultQuoteRequests);

  const updateProjectType = (projectId, updatedFields) => {
    setProjectTypes((currentProjectTypes) =>
      currentProjectTypes.map((projectType) =>
        projectType.id === projectId
          ? { ...projectType, ...updatedFields }
          : projectType
      )
    );
  };

  const updateProduct = (productId, updatedFields) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, ...updatedFields }
          : product
      )
    );
  };

  const updateRecommendationSettings = (updatedFields) => {
    setRecommendationSettings((currentSettings) => ({
      ...currentSettings,
      ...updatedFields,
    }));
  };

  const addQuoteRequest = (quoteRequest) => {
    const newQuoteRequest = {
      ...quoteRequest,
      id: Date.now(),
      status: 'new',
      createdAt: new Date().toLocaleString(),
    };

    setQuoteRequests((currentQuoteRequests) => [newQuoteRequest, ...currentQuoteRequests]);
  };

  const updateQuoteStatus = (quoteRequestId, status) => {
    setQuoteRequests((currentQuoteRequests) =>
      currentQuoteRequests.map((quoteRequest) =>
        quoteRequest.id === quoteRequestId
          ? { ...quoteRequest, status }
          : quoteRequest
      )
    );
  };

  return (
    <ContentContext.Provider
      value={{
        projectTypes,
        products,
        recommendationSettings,
        quoteRequests,
        updateProjectType,
        updateProduct,
        updateRecommendationSettings,
        addQuoteRequest,
        updateQuoteStatus,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error('useContent must be used inside ContentProvider');
  }

  return context;
};
