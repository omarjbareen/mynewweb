import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/ProjectCard.css';

const ProjectCard = ({ title, description, visualClass, imageUrl }) => {
  const { t } = useLanguage();
  const imageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined;

  return (
    <article className={`project-card image-card ${visualClass}`} style={imageStyle}>
      <div className="image-card-overlay">
        <span className="card-kicker">{t('projectCard.kicker')}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
};

export default ProjectCard;
