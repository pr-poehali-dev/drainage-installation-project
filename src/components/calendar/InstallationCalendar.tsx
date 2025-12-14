import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Order } from '@/types.ts';

interface InstallationCalendarProps {
  orders: Order[];
  onOrderClick: (orderId: string) => void;
}

const InstallationCalendar = ({ orders, onOrderClick }: InstallationCalendarProps) => {
  const scheduledOrders = orders.filter(o => o.installationDate && o.installerName);
  
  const groupByDate = scheduledOrders.reduce((acc, order) => {
    if (!order.installationDate) return acc;
    const date = order.installationDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(order);
    return acc;
  }, {} as Record<string, Order[]>);

  const sortedDates = Object.keys(groupByDate).sort();
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="CalendarDays" size={20} />
          Календарь монтажа
        </CardTitle>
        <CardDescription>
          Запланировано работ: {scheduledOrders.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {scheduledOrders.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="CalendarX" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Пока нет запланированных монтажей</p>
            <p className="text-sm mt-1">Назначьте монтажников на заказы</p>
          </div>
        ) : (
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {sortedDates.map((date) => {
                const dateObj = new Date(date);
                const isToday = date === today;
                const isPast = date < today;
                
                return (
                  <div key={date} className={`border-l-4 pl-4 ${isToday ? 'border-l-primary' : isPast ? 'border-l-gray-300' : 'border-l-blue-400'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold ${isToday ? 'text-primary' : ''}`}>
                        {dateObj.toLocaleDateString('ru', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </h3>
                      {isToday && <Badge variant="default">Сегодня</Badge>}
                      {isPast && <Badge variant="secondary">Прошедшая</Badge>}
                    </div>
                    
                    <div className="space-y-2">
                      {groupByDate[date].map((order) => (
                        <div
                          key={order.id}
                          className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => onOrderClick(order.id)}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="font-mono text-xs">
                                  {order.id}
                                </Badge>
                                <span className="font-semibold text-sm truncate">{order.client}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                <Icon name="User" size={12} />
                                <span>{order.installerName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Icon name="MapPin" size={12} />
                                <span className="truncate">{order.address}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-bold text-sm text-primary">
                                {order.amount.toLocaleString()} ₽
                              </div>
                              <Button size="sm" variant="ghost" className="mt-1">
                                <Icon name="ArrowRight" size={14} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default InstallationCalendar;