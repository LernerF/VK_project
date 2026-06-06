import React, { useState } from 'react';
import {
  Card,
  Div,
  Text,
  Progress,
  IconButton,
  Title
} from '@vkontakte/vkui';
import { Icon24Share, Icon24CheckCircleOn } from '@vkontakte/icons';
import { Achievement } from '../../types';
import { categoryLabels } from '../../data/initialData';
import { calculateProgress, formatDate } from '../../utils/helpers';
import bridge from '@vkontakte/vk-bridge';
import './AchievementCard.css';

interface AchievementCardProps {
  achievement: Achievement;
  onUpdate: (id: string, progress: number) => void;
  onShare: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onUpdate,
  onShare
}) => {
  const progressPercent = calculateProgress(achievement.progress, achievement.target);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleIncrement = () => {
    if (!achievement.completed) {
      const newProgress = Math.min(achievement.progress + 1, achievement.target);
      onUpdate(achievement.id, newProgress);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleShare = () => {
    onShare(achievement);
    bridge.send('VKWebAppShare', {
      link: 'https://vk.com/app1234567'
    });
  };

  return (
    <Card
      mode="shadow"
      className={`achievement-card ${achievement.completed ? 'completed' : ''} ${
        isAnimating ? 'achievement-complete-animation' : ''
      }`}
      onClick={handleIncrement}
    >
      <Div>
        <div className="achievement-header">
          <div className="achievement-icon">
            {achievement.completed ? '✅' : achievement.icon}
          </div>
          <div className="achievement-info">
            <Title level="3" weight="2" className="achievement-title">
              {achievement.title}
            </Title>
            <div className="achievement-category">
              {categoryLabels[achievement.category]}
            </div>
          </div>
          {achievement.completed && (
            <div className="completed-badge">
              <Icon24CheckCircleOn fill="white" />
            </div>
          )}
        </div>

        <Text weight="3" className="achievement-description">
          {achievement.description}
        </Text>

        <div className="achievement-progress">
          <div className="progress-header">
            <span>
              {achievement.progress} / {achievement.target}
            </span>
            <span className="points-badge">
              +{achievement.points} очков
            </span>
          </div>
          <div className="progress-bar-gradient" style={{ width: `${progressPercent}%` }} />
        </div>

        {achievement.completed && achievement.completedAt && (
          <div className="completed-date">
            Завершено: {formatDate(achievement.completedAt)}
          </div>
        )}

        <div className="achievement-actions">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            aria-label="Поделиться"
          >
            <Icon24Share />
          </button>
        </div>
      </Div>
    </Card>
  );
};
