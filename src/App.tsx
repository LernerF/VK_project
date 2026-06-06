import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Panel,
  Tabbar,
  TabbarItem,
  Epic,
  ScreenSpinner,
  AppRoot,
  Div,
  FixedLayout
} from '@vkontakte/vkui';
import {
  Icon28HomeOutline,
  Icon28FavoriteOutline,
  Icon28GraphOutline,
  Icon28UserCircleOutline
} from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';

import Header from './components/Header/Header';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
import { UserProfile } from './components/UserProfile';
import { AchievementsList } from './components/AchievementsList';
import { Leaderboard } from './components/Leaderboard';
import { Statistics } from './components/Statistics';

import { User, Achievement } from './types';
import { initialAchievements, mockLeaderboard } from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { checkAndAwardBadges, updateStreak } from './utils/helpers';

const App: React.FC = () => {
  const [activeStory, setActiveStory] = useState('achievements');
  const [user, setUser] = useLocalStorage<User>('vk-achievements-user', {
    id: 'current-user',
    name: 'Пользователь',
    avatar: '',
    level: 1,
    experience: 0,
    totalPoints: 0,
    achievements: initialAchievements,
    badges: [],
    streak: 0,
    lastActivityDate: new Date().toISOString()
  });
  const [popout, setPopout] = useState<React.ReactNode>(<ScreenSpinner />);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
  };

  // Инициализация VK Bridge
  useEffect(() => {
    const initApp = async () => {
      try {
        // Получаем информацию о пользователе
        const userInfo = await bridge.send('VKWebAppGetUserInfo');
        setUser((prev) => ({
          ...prev,
          name: `${userInfo.first_name} ${userInfo.last_name}`,
          avatar: userInfo.photo_100 || ''
        }));
      } catch (error) {
        console.log('Failed to get user info:', error);
      } finally {
        setPopout(null);
      }
    };

    initApp();
  }, []);

  // Обновление серии активности
  useEffect(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActivity = new Date(user.lastActivityDate).setHours(0, 0, 0, 0);
    
    if (today !== lastActivity) {
      const streakChange = updateStreak(user.lastActivityDate);
      if (streakChange === 1) {
        setUser((prev) => ({
          ...prev,
          streak: prev.streak + 1,
          lastActivityDate: new Date().toISOString()
        }));
      } else if (streakChange < 0) {
        setUser((prev) => ({
          ...prev,
          streak: 1,
          lastActivityDate: new Date().toISOString()
        }));
      }
    }
  }, []);

  const handleUpdateAchievement = useCallback((id: string, progress: number) => {
    setUser((prev) => {
      const achievement = prev.achievements.find((a) => a.id === id);
      if (!achievement) return prev;

      const wasCompleted = achievement.completed;
      const nowCompleted = progress >= achievement.target;

      const updatedAchievements = prev.achievements.map((a) =>
        a.id === id
          ? {
              ...a,
              progress,
              completed: nowCompleted,
              completedAt: nowCompleted && !wasCompleted ? new Date().toISOString() : a.completedAt
            }
          : a
      );

      // Если достижение только что завершено
      if (nowCompleted && !wasCompleted) {
        const pointsEarned = achievement.points;
        const newExperience = prev.experience + pointsEarned;
        const newLevel = Math.floor(newExperience / 100) + 1;
        const newTotalPoints = prev.totalPoints + pointsEarned;

        const updatedUser = {
          ...prev,
          achievements: updatedAchievements,
          experience: newExperience,
          level: newLevel,
          totalPoints: newTotalPoints,
          lastActivityDate: new Date().toISOString()
        };

        // Проверяем новые значки
        const newBadges = checkAndAwardBadges(updatedUser);
        if (newBadges.length > 0) {
          updatedUser.badges = [...prev.badges, ...newBadges];
        }

        // Показываем уведомление
        showAchievementNotification(achievement, newBadges);

        return updatedUser;
      }

      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  }, []);

  const showAchievementNotification = (achievement: Achievement, newBadges: any[]) => {
    // В реальном приложении здесь показывается модальное окно
    console.log('Achievement completed!', achievement.title);
    if (newBadges.length > 0) {
      console.log('New badges earned!', newBadges.length);
    }
  };

  const handleShare = useCallback(async (achievement: Achievement) => {
    try {
      await bridge.send('VKWebAppShare', {
        link: `https://vk.com/app54620281`
      });
    } catch (error) {
      console.log('Share failed:', error);
    }
  }, []);

  const renderStory = () => {
    switch (activeStory) {
      case 'achievements':
        return (
          <AchievementsList
            achievements={user.achievements}
            onUpdate={handleUpdateAchievement}
            onShare={handleShare}
          />
        );
      case 'leaderboard':
        return <Leaderboard leaderboard={mockLeaderboard} currentUserId={user.id} />;
      case 'statistics':
        return <Statistics user={user} />;
      case 'profile':
        return (
          <Panel>
            <UserProfile user={user} />
          </Panel>
        );
      default:
        return null;
    }
  };

  const renderStoryWithHeader = () => {
    const completedAchievements = user.achievements.filter(a => a.completed).length;
    
    return (
      <>
        <Header
          userName={user.name}
          level={user.level}
          totalPoints={user.totalPoints}
          completedAchievements={completedAchievements}
          totalBadges={user.badges.length}
        />
        
        <div style={{ marginTop: '40px', padding: '0 20px' }}>
          {renderStory()}
        </div>
      </>
    );
  };

  return (
    <>
      {showWelcome && <WelcomeModal onClose={handleWelcomeClose} />}
      
      <AppRoot>
        <Epic
          activeStory={activeStory}
          tabbar={
            <FixedLayout vertical="bottom">
              <Tabbar>
                <TabbarItem
                  selected={activeStory === 'achievements'}
                  onClick={() => setActiveStory('achievements')}
                  data-story="achievements"
                >
                  <Icon28HomeOutline />
                </TabbarItem>
                <TabbarItem
                  selected={activeStory === 'leaderboard'}
                  onClick={() => setActiveStory('leaderboard')}
                  data-story="leaderboard"
                >
                  <Icon28FavoriteOutline />
                </TabbarItem>
                <TabbarItem
                  selected={activeStory === 'statistics'}
                  onClick={() => setActiveStory('statistics')}
                  data-story="statistics"
                >
                  <Icon28GraphOutline />
                </TabbarItem>
                <TabbarItem
                  selected={activeStory === 'profile'}
                  onClick={() => setActiveStory('profile')}
                  data-story="profile"
                >
                  <Icon28UserCircleOutline />
                </TabbarItem>
              </Tabbar>
            </FixedLayout>
          }
        >
          <View id={activeStory} activePanel={activeStory}>
            <Panel id={activeStory}>
              {activeStory === 'profile' ? renderStory() : renderStoryWithHeader()}
            </Panel>
          </View>
        </Epic>
      </AppRoot>
    </>
  );
};

export default App;
