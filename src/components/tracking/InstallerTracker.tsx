import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Order, InstallerLocation, getLocationStatus } from '../types';

interface InstallerTrackerProps {
  order: Order;
  location: InstallerLocation | null;
  onRefresh: () => void;
}

const InstallerTracker = ({ order, location, onRefresh }: InstallerTrackerProps) => {
  if (!order.installerId || !order.installerName) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MapPin" size={20} />
            Геолокация монтажника
          </CardTitle>
          <CardDescription>Монтажник ещё не назначен на этот заказ</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const statusConfig = location ? getLocationStatus(location.status) : null;
  const objectCoords = order.latitude && order.longitude 
    ? { lat: order.latitude, lng: order.longitude } 
    : null;

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const distance = location && location.currentLat && location.currentLng && objectCoords
    ? calculateDistance(location.currentLat, location.currentLng, objectCoords.lat, objectCoords.lng)
    : null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="MapPin" size={20} />
              Геолокация монтажника
            </CardTitle>
            <CardDescription>Отслеживание в реальном времени</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <Icon name="RefreshCw" size={16} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!location ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MapOff" size={48} className="mx-auto mb-3 opacity-50" />
            <p>Геолокация не активна</p>
            <p className="text-sm mt-1">Монтажник ещё не выехал на объект</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {order.installerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{order.installerName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={statusConfig?.color}>
                    <Icon name={statusConfig?.icon as any} size={12} className="mr-1" />
                    {statusConfig?.label}
                  </Badge>
                  {distance !== null && location.status !== 'arrived' && location.status !== 'working' && (
                    <span className="text-xs text-muted-foreground">
                      ~{distance.toFixed(1)} км до объекта
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="MapPin" size={14} />
                  Адрес объекта
                </p>
                <p className="font-medium text-sm">{order.address}</p>
              </div>
              {objectCoords && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Icon name="Crosshair" size={14} />
                    Координаты
                  </p>
                  <p className="font-mono text-xs">
                    {objectCoords.lat.toFixed(4)}, {objectCoords.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-xs text-blue-900 font-medium mb-1">Время прибытия</p>
                <p className="text-sm font-bold text-blue-600">
                  {location.arrivalTime || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-900 font-medium mb-1">Время отъезда</p>
                <p className="text-sm font-bold text-blue-600">
                  {location.departureTime || '—'}
                </p>
              </div>
            </div>

            {location.arrivalTime && location.departureTime && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-900 font-medium mb-1">Время на объекте</p>
                <p className="text-lg font-bold text-green-600">
                  {(() => {
                    const arrival = new Date(`2024-01-01 ${location.arrivalTime}`);
                    const departure = new Date(`2024-01-01 ${location.departureTime}`);
                    const diff = (departure.getTime() - arrival.getTime()) / 1000 / 60;
                    const hours = Math.floor(diff / 60);
                    const minutes = Math.floor(diff % 60);
                    return `${hours}ч ${minutes}мин`;
                  })()}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <span>Последнее обновление</span>
              <span className="font-medium">{location.lastUpdate}</span>
            </div>

            {objectCoords && location.currentLat && location.currentLng && (
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="Map" size={48} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Карта: {order.installerName}
                    </p>
                    <div className="flex gap-2 mt-3 justify-center">
                      <Badge variant="outline">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        Объект
                      </Badge>
                      <Badge variant="default">
                        <Icon name="Navigation" size={12} className="mr-1" />
                        Монтажник
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstallerTracker;
