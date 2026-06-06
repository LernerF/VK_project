import React from 'react';
import {
  PanelHeader,
  Card,
  Div,
  Title,
  Text,
  Progress,
  HorizontalScroll
} from '@vkontakte/vkui';
import { User } from '../../types';
import { categoryLabels, categoryIcons } from '../../data/initialData';
import './Statistics.css';

interface StatisticsProps {
  user: User;
}

export const Statistics: React.FC<StatisticsProps> = ({ user }) => {
  const completedByCategory = Object.keys(categoryLabels).map((category) => {
    const achievements = user.achievements.filter((a) => a.category === category);
    const completed = achievements.filter((a) => a.completed).length;
    return {
      category,
      total: achievements.length,
      completed,
      progress: achievements.length > 0 ? (completed / achievements.length) * 100 : 0
    };
  });

  const recentAchievements = user.achievements
    .filter((a) => a.completed && a.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
    .slice(0, 5);

  return (
    <div className="statistics">
      <PanelHeader>Статистика</PanelHeader>

      <Div>
        <Card mode="shadow" className="stats-card">
          <Div>
            <Title level="3" weight="3" className="stats-title">
              Общая статистика
            </Title>
            <div className="stats-grid">
              <div className="stat-block">
                <Text weight="2" className="stat-number">
                  {user.totalPoints}
                </Text>
                <Text weight="3" className="stat-label">
                  Всего очков
                </Text>
              </div>
              <div className="stat-block">
                <Text weight="2" className="stat-number">
                  {user.achievements.filter((a) => a.completed).length}
                </Text>
                <Text weight="3" className="stat-label">
                  Завершено
                </Text>
              </div>
              <div className="stat-block">
                <Text weight="2" className="stat-number">
                  {user.level}
                </Text>
                <Text weight="3" className="stat-label">
                  Уровень
                </Text>
              </div>
            </div>
          </Div>
        </Card>

        <Title level="3" weight="3" className="section-title">
          По категориям
        </Title>

        <div className="categories-stats">
          {completedByCategory.map((cat) => (
            <Card key={cat.category} mode="outline" className="category-card">
              <Div>
                <div className="category-header">
                  <span className="category-icon">{categoryIcons[cat.category]}</span>
                  <Text weight="2">{categoryLabels[cat.category]}</Text>
                </div>
                <div className="category-progress">
                  <Text weight="3">
                    {cat.completed} / {cat.total}
                  </Text>
                  <Progress value={cat.progress} />
                </div>
              </Div>
            </Card>
          ))}
        </div>

        {recentAchievements.length > 0 && (
          <>
            <Title level="3" weight="3" className="section-title">
              Последние достижения
            </Title>
            <HorizontalScroll>
              <div className="recent-achievements">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="recent-item">
                    <span className="recent-icon">{achievement.icon}</span>
                    <Text weight="3" className="recent-title">
                      {achievement.title}
                    </Text>
                  </div>
                ))}
              </div>
            </HorizontalScroll>
          </>
        )}

        <Card mode="shadow" className="motivation-card">
          <Div>
            <Title level="3" weight="3">
              💡 Совет дня
            </Title>
            <Text weight="3" className="tip-text">
              {user.streak > 0
                ? `Вы активны уже ${user.streak} дней подряд! Продолжайте в том же духе!`
                : 'Начните отслеживать достижения каждый день, чтобы получить бонус за серию!'}
            </Text>
          </Div>
        </Card>
      </Div>
    </div>
  );
};
