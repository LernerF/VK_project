import React from 'react';
import './Header.css';

interface HeaderProps {
  userName: string;
  level: number;
  totalPoints: number;
  completedAchievements: number;
  totalBadges: number;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  level,
  totalPoints,
  completedAchievements,
  totalBadges
}) => {
  return (
    <div className="app-header">
      <div className="floating-shapes">
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
      </div>
      
      <div className="header-content">
        <div className="header-title">
          <div className="header-icon neon-glow">🏆</div>
          <div className="header-text">
            <h1>Achievement Tracker</h1>
            <p>Добро пожаловать, {userName}!</p>
          </div>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{level}</div>
            <div className="stat-label">Уровень</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalPoints}</div>
            <div className="stat-label">Очки</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedAchievements}</div>
            <div className="stat-label">Достижения</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{totalBadges}</div>
            <div className="stat-label">Значки</div>
          </div>
        </div>
      </div>

      <div className="header-waves" />
    </div>
  );
};

export default Header;