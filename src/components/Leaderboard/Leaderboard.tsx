import React from 'react';
import {
  PanelHeader,
  Card,
  Div,
  Avatar,
  Title,
  Text,
  Separator
} from '@vkontakte/vkui';
import { LeaderboardEntry } from '../../types';
import './Leaderboard.css';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentUserId?: string;
}

const rankIcons: Record<number, string> = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ 
  leaderboard,
  currentUserId 
}) => {
  return (
    <div className="leaderboard">
      <PanelHeader>Рейтинг</PanelHeader>
      
      <Div>
        <div className="leaderboard-podium">
          {leaderboard.slice(0, 3).map((entry, index) => (
            <div 
              key={entry.id} 
              className={`podium-item podium-position-${index + 1}`}
            >
              <div className="podium-avatar">
                <Avatar src={entry.avatar} size={index === 0 ? 80 : 64} />
                <span className="podium-rank">{rankIcons[index + 1]}</span>
              </div>
              <Title level="3" weight="3" className="podium-name">
                {entry.name}
              </Title>
              <Text weight="3" className="podium-points">
                {entry.totalPoints} очков
              </Text>
            </div>
          ))}
        </div>

        <Separator />

        <div className="leaderboard-list">
          {leaderboard.slice(3).map((entry, index) => (
            <Card 
              key={entry.id} 
              mode="outline"
              className={`leaderboard-card ${entry.id === currentUserId ? 'current-user' : ''}`}
            >
              <Div>
                <div className="leaderboard-entry">
                  <div className="entry-rank">
                    <Text weight="2">{entry.rank}</Text>
                  </div>
                  <Avatar src={entry.avatar} size={48} />
                  <div className="entry-info">
                    <Title level="3" weight="3">{entry.name}</Title>
                    <Text weight="3" className="entry-level">
                      Уровень {entry.level}
                    </Text>
                  </div>
                  <div className="entry-points">
                    <Text weight="2">{entry.totalPoints}</Text>
                    <Text weight="3" className="points-label">очков</Text>
                  </div>
                </div>
              </Div>
            </Card>
          ))}
        </div>
      </Div>
    </div>
  );
};
