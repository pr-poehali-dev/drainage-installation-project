import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Notification } from '@/types';

interface NotificationsPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: Notification) => void;
}

const NotificationsPanel = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
}: NotificationsPanelProps) => {
  const getNotificationIcon = (type: Notification['type']) => {
    const icons = {
      order: 'Package',
      payment: 'CreditCard',
      delivery: 'Truck',
      system: 'Bell',
    };
    return icons[type];
  };

  const getNotificationColor = (type: Notification['type']) => {
    const colors = {
      order: 'text-blue-600 bg-blue-50',
      payment: 'text-green-600 bg-green-50',
      delivery: 'text-orange-600 bg-orange-50',
      system: 'text-purple-600 bg-purple-50',
    };
    return colors[type];
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Bell" size={20} />
              Уведомления
            </CardTitle>
            <CardDescription>
              {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все прочитано'}
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
              Прочитать все
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Bell" size={48} className="mx-auto mb-3 opacity-20" />
              <p>Нет уведомлений</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                    notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => {
                    onNotificationClick(notification);
                    if (!notification.read) {
                      onMarkAsRead(notification.id);
                    }
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                      <Icon name={getNotificationIcon(notification.type) as any} size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">Новое</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon name="User" size={12} />
                        <span>{notification.from}</span>
                        <span>•</span>
                        <Icon name="Clock" size={12} />
                        <span>{notification.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationsPanel;