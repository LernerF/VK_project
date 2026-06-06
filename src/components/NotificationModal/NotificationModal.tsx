import React from 'react';
import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Div,
  Title,
  Text,
  Button
} from '@vkontakte/vkui';
import { Icon24Dismiss } from '@vkontakte/icons';

interface NotificationModalProps {
  id: string;
  type: 'achievement' | 'badge' | 'levelUp';
  title: string;
  description: string;
  icon?: string;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  id,
  type,
  title,
  description,
  icon,
  onClose
}) => {
  return (
    <ModalPage
      id={id}
      header={
        <ModalPageHeader
          right={
            <PanelHeaderButton onClick={onClose}>
              <Icon24Dismiss />
            </PanelHeaderButton>
          }
        >
          Уведомление
        </ModalPageHeader>
      }
      onClose={onClose}
    >
      <Div className="notification-content">
        <div className={`notification-icon ${type}`}>
          <span>{icon || (type === 'achievement' ? '🏆' : type === 'badge' ? '🎖️' : '⭐')}</span>
        </div>
        
        <Title level="2" weight="2" className="notification-title">
          {title}
        </Title>
        
        <Text weight="3" className="notification-description">
          {description}
        </Text>
        
        <Button size="l" stretched onClick={onClose}>
          Отлично!
        </Button>
      </Div>
    </ModalPage>
  );
};
