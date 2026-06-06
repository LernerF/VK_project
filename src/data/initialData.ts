import { Achievement, Badge, LeaderboardEntry } from '../types';

export const initialAchievements: Achievement[] = [
  // Здоровье
  {
    id: 'health-1',
    title: 'Первый шаг',
    description: 'Пройдите 10 000 шагов за день',
    icon: '🏃',
    points: 50,
    category: 'health',
    progress: 0,
    target: 10000,
    completed: false
  },
  {
    id: 'health-2',
    title: 'Водный баланс',
    description: 'Выпейте 8 стаканов воды за день',
    icon: '💧',
    points: 30,
    category: 'health',
    progress: 0,
    target: 8,
    completed: false
  },
  {
    id: 'health-3',
    title: 'Ранняя пташка',
    description: 'Встаньте раньше 7 утра 5 дней подряд',
    icon: '🌅',
    points: 100,
    category: 'health',
    progress: 0,
    target: 5,
    completed: false
  },
  {
    id: 'health-4',
    title: 'Спортсмен',
    description: 'Занимайтесь спортом 30 минут 10 раз',
    icon: '💪',
    points: 150,
    category: 'health',
    progress: 0,
    target: 10,
    completed: false
  },

  // Образование
  {
    id: 'education-1',
    title: 'Книголюб',
    description: 'Прочитайте 5 книг',
    icon: '📚',
    points: 200,
    category: 'education',
    progress: 0,
    target: 5,
    completed: false
  },
  {
    id: 'education-2',
    title: 'Полиглот',
    description: 'Изучайте новый язык 30 дней подряд',
    icon: '🌍',
    points: 300,
    category: 'education',
    progress: 0,
    target: 30,
    completed: false
  },
  {
    id: 'education-3',
    title: 'Студент',
    description: 'Посетите 10 онлайн-курсов',
    icon: '🎓',
    points: 250,
    category: 'education',
    progress: 0,
    target: 10,
    completed: false
  },

  // Социальное
  {
    id: 'social-1',
    title: 'Душа компании',
    description: 'Организуйте 3 мероприятия',
    icon: '🎉',
    points: 150,
    category: 'social',
    progress: 0,
    target: 3,
    completed: false
  },
  {
    id: 'social-2',
    title: 'Волонтёр',
    description: 'Примите участие в 5 волонтёрских акциях',
    icon: '🤝',
    points: 300,
    category: 'social',
    progress: 0,
    target: 5,
    completed: false
  },

  // Креативность
  {
    id: 'creativity-1',
    title: 'Художник',
    description: 'Создайте 10 рисунков или картин',
    icon: '🎨',
    points: 200,
    category: 'creativity',
    progress: 0,
    target: 10,
    completed: false
  },
  {
    id: 'creativity-2',
    title: 'Музыкант',
    description: 'Разучите 3 новых произведения',
    icon: '🎵',
    points: 250,
    category: 'creativity',
    progress: 0,
    target: 3,
    completed: false
  },

  // Продуктивность
  {
    id: 'productivity-1',
    title: 'Мастер времени',
    description: 'Используйте технику Pomodoro 50 раз',
    icon: '⏰',
    points: 100,
    category: 'productivity',
    progress: 0,
    target: 50,
    completed: false
  },
  {
    id: 'productivity-2',
    title: 'Организатор',
    description: 'Завершите 20 задач из списка дел',
    icon: '✅',
    points: 150,
    category: 'productivity',
    progress: 0,
    target: 20,
    completed: false
  },
  {
    id: 'productivity-3',
    title: 'Без прокрастинации',
    description: 'Работайте без отвлечений 7 дней подряд',
    icon: '🚀',
    points: 400,
    category: 'productivity',
    progress: 0,
    target: 7,
    completed: false
  }
];

export const availableBadges: Omit<Badge, 'earnedAt'>[] = [
  {
    id: 'beginner',
    name: 'Новичок',
    description: 'Завершите первое достижение',
    icon: '🌱'
  },
  {
    id: 'achiever',
    name: 'Достигатор',
    description: 'Завершите 5 достижений',
    icon: '🏆'
  },
  {
    id: 'champion',
    name: 'Чемпион',
    description: 'Завершите 10 достижений',
    icon: '👑'
  },
  {
    id: 'master',
    name: 'Мастер',
    description: 'Завершите все достижения в одной категории',
    icon: '⭐'
  },
  {
    id: 'streak-7',
    name: 'Недельная серия',
    description: 'Активность 7 дней подряд',
    icon: '🔥'
  },
  {
    id: 'streak-30',
    name: 'Месячная серия',
    description: 'Активность 30 дней подряд',
    icon: '💎'
  },
  {
    id: 'social-star',
    name: 'Социальная звезда',
    description: 'Поделитесь достижением 10 раз',
    icon: '🌟'
  },
  {
    id: 'level-5',
    name: 'Пятый уровень',
    description: 'Достигните 5 уровня',
    icon: '🎖️'
  },
  {
    id: 'level-10',
    name: 'Десятый уровень',
    description: 'Достигните 10 уровня',
    icon: '🏅'
  },
  {
    id: 'points-1000',
    name: 'Тысячник',
    description: 'Наберите 1000 очков',
    icon: '💯'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Александр',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    level: 15,
    totalPoints: 3500,
    rank: 1
  },
  {
    id: '2',
    name: 'Мария',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    level: 12,
    totalPoints: 2800,
    rank: 2
  },
  {
    id: '3',
    name: 'Дмитрий',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    level: 10,
    totalPoints: 2200,
    rank: 3
  },
  {
    id: '4',
    name: 'Елена',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    level: 8,
    totalPoints: 1800,
    rank: 4
  },
  {
    id: '5',
    name: 'Иван',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    level: 7,
    totalPoints: 1500,
    rank: 5
  }
];

export const categoryLabels: Record<string, string> = {
  health: 'Здоровье',
  education: 'Образование',
  social: 'Социальное',
  creativity: 'Креативность',
  productivity: 'Продуктивность'
};

export const categoryIcons: Record<string, string> = {
  health: '❤️',
  education: '📖',
  social: '👥',
  creativity: '🎨',
  productivity: '📊'
};
