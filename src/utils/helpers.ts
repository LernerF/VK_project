import { Achievement, Badge, User } from '../types';

export function calculateLevel(experience: number): number {
  return Math.floor(experience / 100) + 1;
}

export function calculateExperienceForNextLevel(level: number): number {
  return level * 100;
}

export function calculateProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function checkAndAwardBadges(user: User): Badge[] {
  const newBadges: Badge[] = [];
  const completedCount = user.achievements.filter(a => a.completed).length;
  const now = new Date().toISOString();

  // Новичок
  if (completedCount >= 1 && !user.badges.find(b => b.id === 'beginner')) {
    newBadges.push({
      id: 'beginner',
      name: 'Новичок',
      description: 'Завершите первое достижение',
      icon: '🌱',
      earnedAt: now
    });
  }

  // Достигатор
  if (completedCount >= 5 && !user.badges.find(b => b.id === 'achiever')) {
    newBadges.push({
      id: 'achiever',
      name: 'Достигатор',
      description: 'Завершите 5 достижений',
      icon: '🏆',
      earnedAt: now
    });
  }

  // Чемпион
  if (completedCount >= 10 && !user.badges.find(b => b.id === 'champion')) {
    newBadges.push({
      id: 'champion',
      name: 'Чемпион',
      description: 'Завершите 10 достижений',
      icon: '👑',
      earnedAt: now
    });
  }

  // Серия 7 дней
  if (user.streak >= 7 && !user.badges.find(b => b.id === 'streak-7')) {
    newBadges.push({
      id: 'streak-7',
      name: 'Недельная серия',
      description: 'Активность 7 дней подряд',
      icon: '🔥',
      earnedAt: now
    });
  }

  // Серия 30 дней
  if (user.streak >= 30 && !user.badges.find(b => b.id === 'streak-30')) {
    newBadges.push({
      id: 'streak-30',
      name: 'Месячная серия',
      description: 'Активность 30 дней подряд',
      icon: '💎',
      earnedAt: now
    });
  }

  // Уровень 5
  if (user.level >= 5 && !user.badges.find(b => b.id === 'level-5')) {
    newBadges.push({
      id: 'level-5',
      name: 'Пятый уровень',
      description: 'Достигните 5 уровня',
      icon: '🎖️',
      earnedAt: now
    });
  }

  // Уровень 10
  if (user.level >= 10 && !user.badges.find(b => b.id === 'level-10')) {
    newBadges.push({
      id: 'level-10',
      name: 'Десятый уровень',
      description: 'Достигните 10 уровня',
      icon: '🏅',
      earnedAt: now
    });
  }

  // Тысячник
  if (user.totalPoints >= 1000 && !user.badges.find(b => b.id === 'points-1000')) {
    newBadges.push({
      id: 'points-1000',
      name: 'Тысячник',
      description: 'Наберите 1000 очков',
      icon: '💯',
      earnedAt: now
    });
  }

  return newBadges;
}

export function updateStreak(lastActivityDate: string): number {
  const lastDate = new Date(lastActivityDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 0; // Уже обновили сегодня
  } else if (diffDays === 1) {
    return 1; // Продолжаем серию
  } else {
    return -diffDays; // Серия прервана
  }
}
