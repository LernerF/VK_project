import React, { useState, useEffect } from 'react';
import './WelcomeModal.css';

interface WelcomeModalProps {
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onClose }) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; duration: number }>>([]);

  useEffect(() => {
    // Создаём конфетти
    const pieces = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        duration: 2 + Math.random() * 3
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="welcome-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-icon">🎉</div>
        <h2 className="welcome-title">Добро пожаловать!</h2>
        <p className="welcome-subtitle">
          Добро пожаловать в Achievement Tracker — твой персональный помощник для достижения целей!
        </p>
        
        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <div className="feature-text">
              <h4>Ставь цели</h4>
              <p>Более 20 готовых достижений в разных категориях</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <div className="feature-text">
              <h4>Получай награды</h4>
              <p>Система очков, уровней и уникальных значков</p>
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <div className="feature-text">
              <h4>Отслеживай прогресс</h4>
              <p>Подробная статистика и рейтинг с друзьями</p>
            </div>
          </div>
        </div>
        
        <button className="start-button" onClick={onClose}>
          Начать путешествие!
        </button>
      </div>
      
      <div className="confetti">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              animation: `fall ${piece.duration}s linear forwards`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WelcomeModal;