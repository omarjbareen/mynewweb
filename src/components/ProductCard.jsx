import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../styles/ProductCard.css';

const ProductCard = ({ product, selections }) => {
  const { t, localize } = useLanguage();
  const imageStyle = product.imageUrl ? { backgroundImage: `url(${product.imageUrl})` } : undefined;
  const roomNames = product.recommendedRooms.map((roomId) => t(`rooms.${roomId}.shortTitle`)).join(', ');

  return (
    <article className="product-card">
      <div className={`product-visual ${product.visualClass}`} style={imageStyle}>
        <span>{localize(product.colorName)}</span>
      </div>
      <div className="product-content">
        <div>
          <p className="eyebrow">{localize(product.materialType)}</p>
          <h3>{localize(product.name)}</h3>
          <p>{localize(product.description)}</p>
        </div>

        <dl className="product-specs">
          <div>
            <dt>{t('results.colorTone')}</dt>
            <dd>{localize(product.colorName)}</dd>
          </div>
          <div>
            <dt>{t('results.rooms')}</dt>
            <dd>{roomNames}</dd>
          </div>
          <div>
            <dt>{t('results.pricePerMeter')}</dt>
            <dd>${product.pricePerMeter}</dd>
          </div>
          <div>
            <dt>{t('results.estimate')}</dt>
            <dd>{product.estimatedRange}</dd>
          </div>
          <div>
            <dt>{t('results.measurements')}</dt>
            <dd>{localize(product.measurementGuidance)}</dd>
          </div>
        </dl>

        <Link
          className="button button-dark"
          to="/quote"
          state={{ selectedProduct: product, selections }}
        >
          {t('results.addToQuote')}
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;
