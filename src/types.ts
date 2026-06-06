export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  category: AchievementCategory;
  progress: number;
  target: number;
  completed: boolean;
  completedAt?: string;
}

export type AchievementCategory = 
  | 'health'
  | 'education'
  | 'social'
  | 'creativity'
  | 'productivity';

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  experience: number;
  totalPoints: number;
  achievements: Achievement[];
  badges: Badge[];
  streak: number;
  lastActivityDate: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  totalPoints: number;
  rank: number;
}

export interface AppState {
  user: User;
  leaderboard: LeaderboardEntry[];
  isLoaded: boolean;
}
