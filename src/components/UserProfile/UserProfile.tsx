import React from 'react';
import {
  Card,
  Header,
  Avatar,
  Title,
  Text,
  Progress,
  Div,
  Spacing,
  Separator,
  HorizontalScroll
} from '@vkontakte/vkui';
import { User } from '../../types';
import { calculateExperienceForNextLevel } from '../../utils/helpers';
import './UserProfile.css';

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const currentLevelExp = (user.level - 1) * 100;
  const nextLevelExp = calculateExperienceForNextLevel(user.level);
  const progressPercent = ((user.experience - currentLevelExp) / 100) * 100;

  return (
    <div className="user-profile">
      <Div>
        <div className="user-header">
          <Avatar src={user.avatar} size={80} />
          <div className="user-info">
            <Title level="2" weight="2">
              {user.name}
            </Title>
            <span className="level-text">
              Уровень {user.level}
            </span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{user.totalPoints}</div>
            <div className="stat-label">Очков</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.achievements.filter(a => a.completed).length}</div>
            <div className="stat-label">Достижений</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{user.badges.length}</div>
            <div className="stat-label">Значков</div>
          </div>
        </div>

        <div className="experience-bar">
          <div className="exp-labels">
            <span>Опыт</span>
            <span>
              {user.experience} / {nextLevelExp}
            </span>
          </div>
          <Progress value={progressPercent} />
        </div>

        {user.streak > 0 && (
          <>
            <div className="streak-badge">
              <span className="streak-icon">🔥</span>
              <span>{user.streak} дней подряд</span>
            </div>
          </>
        )}

        {user.badges.length > 0 && (
          <>
            <div style={{ marginTop: '24px' }}>
              <div className="badges-title">Значки</div>
              <HorizontalScroll>
                <div className="badges-scroll">
                  {user.badges.map((badge) => (
                    <div key={badge.id} className="badge-item" title={badge.description}>
                      <span className="badge-icon">{badge.icon}</span>
                      <div className="badge-name">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </HorizontalScroll>
            </div>
          </>
        )}
      </Div>
    </div>
  );
};
