import React from 'react';
import styles from './agent-card.module.css';

interface AgentCardSimpleProps {
  image: string;
  title: string;
  description?: string;
  buttonText: string;
  onButtonClick: () => void;
  imageAlt?: string;
  className?: string;
}

const AgentCard: React.FC<AgentCardSimpleProps> = ({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
  imageAlt = 'Card image',
  className = '',
}) => {
  return (
    <div className={`${styles.agentCard || 'agent-card'} ${className}`}>
      <div className={styles.imageContainer || 'agent-card__image-container'}>
        <img 
          src={image} 
          alt={imageAlt} 
          className={styles.image || 'agent-card__image'}
          loading="lazy"
        />
      </div>
      <div className={styles.content || 'agent-card__content'}>
        <h3 className={styles.title || 'agent-card__title'}>{title}</h3>
        {description && (
          <p className={styles.description || 'agent-card__description'}>{description}</p>
        )}
        <button 
          className={styles.button || 'agent-card__button'}
          onClick={onButtonClick}
          type="button"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default AgentCard;