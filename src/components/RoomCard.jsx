import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/RoomCard.css';

const RoomCard = ({ name, description, visualClass }) => {
  const { t } = useLanguage();

  return (
    <article className={`room-card image-card ${visualClass}`}>
      <div className="image-card-overlay">
        <span className="card-kicker">{t('roomCard.kicker')}</span>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default RoomCard;
