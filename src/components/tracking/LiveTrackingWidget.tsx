import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Order, InstallerLocation, getLocationStatus } from '@/types';

interface LiveTrackingWidgetProps {
  orders: Order[];
  locations: InstallerLocation[];
  onViewDetails: (orderId: string) => void;
}

const LiveTrackingWidget = ({ orders, locations, onViewDetails }: LiveTrackingWidgetProps) => {
  const activeLocations = locations.filter(l => l.status !== 'departed');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Трекинг монтажников
            </CardTitle>
            <CardDescription>Местоположение в реальном времени</CardDescription>
          </div>
          {activeLocations.length > 0 && (
            <Badge variant="default" className="animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full mr-2" />
              {activeLocations.length} активных
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {activeLocations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MapOff" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Нет активных монтажников</p>
            <p className="text-sm mt-1">Когда монтажники выедут на объекты, они появятся здесь</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {activeLocations.map((location) => {
                const order = orders.find(o => o.id === location.orderId);
                if (!order) return null;

                const statusConfig = getLocationStatus(location.status);

                return (
                  <div
                    key={location.orderId}
                    className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onViewDetails(order.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {order.installerName?.split(' ').map(n => n[0]).join('') || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm truncate">{order.installerName}</span>
                          <Badge className={`${statusConfig.color} text-xs`}>
                            <Icon name={statusConfig.icon as any} size={10} className="mr-1" />
                            {statusConfig.label}
                          </Badge>
                        </div>
                        <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
                          <Icon name="MapPin" size={12} className="mt-0.5 flex-shrink-0" />
                          <span className="truncate">{order.address}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {location.arrivalTime ? `Прибыл в ${location.arrivalTime}` : `Обновлено ${location.lastUpdate}`}
                          </span>
                          {location.distance && (
                            <Badge variant="outline" className="text-xs">
                              ~{location.distance} км
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="flex-shrink-0">
                        <Icon name="ChevronRight" size={16} />
                      </Button>
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

export default LiveTrackingWidget;