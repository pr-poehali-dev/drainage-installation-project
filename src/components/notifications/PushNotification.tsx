import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Notification } from '@/types';

interface PushNotificationProps {
  notification: Notification;
  onClose: () => void;
  onAction?: () => void;
}

const PushNotification = ({ notification, onClose, onAction }: PushNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (notification.type) {
      case 'location':
        return { name: 'MapPin', color: 'text-blue-500 bg-blue-100' };
      case 'photo':
        return { name: 'Camera', color: 'text-purple-500 bg-purple-100' };
      case 'payment':
        return { name: 'CreditCard', color: 'text-green-500 bg-green-100' };
      case 'chat':
        return { name: 'MessageSquare', color: 'text-orange-500 bg-orange-100' };
      case 'rating':
        return { name: 'Star', color: 'text-yellow-500 bg-yellow-100' };
      case 'document':
        return { name: 'FileText', color: 'text-indigo-500 bg-indigo-100' };
      default:
        return { name: 'Bell', color: 'text-gray-500 bg-gray-100' };
    }
  };

  const icon = getIcon();
  const isPriority = notification.priority === 'high';

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <Card className={`w-96 shadow-2xl ${isPriority ? 'ring-2 ring-red-500 ring-offset-2' : ''}`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${icon.color}`}>
              <Icon name={icon.name as any} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-sm">{notification.title}</h3>
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 300);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{notification.from}</span>
                {notification.actionUrl && onAction && (
                  <Button size="sm" variant="outline" onClick={onAction}>
                    <Icon name="ExternalLink" size={12} className="mr-1" />
                    Открыть
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PushNotification;