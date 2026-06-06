import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  PanelHeader,
  Div,
  Spinner,
  Search,
  HorizontalScroll
} from '@vkontakte/vkui';
import { Icon24Search } from '@vkontakte/icons';
import { Achievement } from '../../types';
import { AchievementCard } from '../AchievementCard';
import { categoryLabels, categoryIcons } from '../../data/initialData';
import './AchievementsList.css';

interface AchievementsListProps {
  achievements: Achievement[];
  onUpdate: (id: string, progress: number) => void;
  onShare: (achievement: Achievement) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export const AchievementsList: React.FC<AchievementsListProps> = ({
  achievements,
  onUpdate,
  onShare
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowScrollTop(containerRef.current.scrollTop > 300);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      // Поиск по названию и описанию
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          achievement.title.toLowerCase().includes(query) ||
          achievement.description.toLowerCase().includes(query) ||
          categoryLabels[achievement.category].toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Фильтр по статусу
      if (activeFilter === 'active' && achievement.completed) return false;
      if (activeFilter === 'completed' && !achievement.completed) return false;

      // Фильтр по категории
      if (selectedCategory && achievement.category !== selectedCategory) return false;

      return true;
    });
  }, [achievements, searchQuery, activeFilter, selectedCategory]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const completedCount = achievements.filter(a => a.completed).length;
  const progressPercentage = Math.round((completedCount / achievements.length) * 100);

  return (
    <div className="achievements-container" ref={containerRef}>
      <div className="achievements-header">
        <div>
          <h2 className="page-title">Достижения</h2>
          <p className="page-subtitle">
            {completedCount} из {achievements.length} завершено ({progressPercentage}%)
          </p>
        </div>
        
        <div className="search-container">
          <Icon24Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Поиск достижений..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          Все ({achievements.length})
        </button>
        <button
          className={`filter-tab ${activeFilter === 'active' ? 'active' : ''}`}
          onClick={() => setActiveFilter('active')}
        >
          Активные ({achievements.filter(a => !a.completed).length})
        </button>
        <button
          className={`filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          Завершённые ({completedCount})
        </button>
      </div>

      <div className="category-filter">
        <HorizontalScroll>
          <div style={{ display: 'flex', gap: '8px', padding: '4px 0' }}>
            {Object.entries(categoryLabels).map(([category, label]) => (
              <button
                key={category}
                className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                <span className="icon">{categoryIcons[category]}</span>
                {label}
              </button>
            ))}
          </div>
        </HorizontalScroll>
      </div>

      {filteredAchievements.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">Ничего не найдено</h3>
          <p className="empty-text">
            {searchQuery ? 'Попробуйте изменить поисковый запрос или выбранные фильтры' : 'Вы выполнили все достижения! 🎉'}
          </p>
        </div>
      ) : (
        <div className="achievements-grid">
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="achievement-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <AchievementCard
                achievement={achievement}
                onUpdate={onUpdate}
                onShare={onShare}
              />
            </div>
          ))}
        </div>
      )}

      {showScrollTop && (
        <button className="scroll-top" onClick={scrollToTop} aria-label="Наверх">
          ↑
        </button>
      )}

      {completedCount === 0 && (
        <div className="motivation-text">
          <h3>Начните свой путь к достижениям!</h3>
          <p>
            Просто нажмите на карточку достижения, чтобы увеличить прогресс. 
            Каждое выполненное достижение принесёт вам очки и значки.
          </p>
        </div>
      )}

      {completedCount === achievements.length && achievements.length > 0 && (
        <div className="motivation-text">
          <h3>Поздравляем! 🎉</h3>
          <p>
            Вы выполнили все доступные достижения! Не останавливайтесь на достигнутом — 
            новые цели появятся в следующих обновлениях.
          </p>
        </div>
      )}
    </div>
  );
};