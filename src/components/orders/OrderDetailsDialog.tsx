import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order, InstallerLocation, WorkPhoto, getStatusConfig } from '../types';
import OrderTimeline from './OrderTimeline';
import InstallerTracker from '../tracking/InstallerTracker';
import WorkPhotoGallery from '../photos/WorkPhotoGallery';

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  location: InstallerLocation | null;
  photos: WorkPhoto[];
  onRefreshLocation: () => void;
  onRequestPhoto: (stage: WorkPhoto['stage']) => void;
}

const OrderDetailsDialog = ({
  isOpen,
  onOpenChange,
  order,
  location,
  photos,
  onRefreshLocation,
  onRequestPhoto,
}: OrderDetailsDialogProps) => {
  if (!order) return null;

  const statusConfig = getStatusConfig(order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Badge variant="outline" className="font-mono">
                  {order.id}
                </Badge>
                <span>{order.client}</span>
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={statusConfig.color}>
                  <Icon name={statusConfig.icon as any} size={12} className="mr-1" />
                  {statusConfig.label}
                </Badge>
                {order.installerName && (
                  <Badge variant="secondary">
                    <Icon name="User" size={12} className="mr-1" />
                    {order.installerName}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <Tabs defaultValue="info" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">
                <Icon name="Info" size={14} className="mr-1" />
                Информация
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Icon name="List" size={14} className="mr-1" />
                Этапы
              </TabsTrigger>
              <TabsTrigger value="tracking">
                <Icon name="MapPin" size={14} className="mr-1" />
                Трекинг
                {location && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    <span className="animate-pulse">•</span>
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="photos">
                <Icon name="Camera" size={14} className="mr-1" />
                Фото
                {photos.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {photos.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Клиент</p>
                    <p className="font-semibold">{order.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Icon name="Phone" size={12} />
                      Телефон
                    </p>
                    <p className="font-medium">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      Адрес
                    </p>
                    <p className="font-medium">{order.address}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Сумма заказа</p>
                    <p className="text-2xl font-bold text-primary">
                      {order.amount > 0 ? `${order.amount.toLocaleString()} ₽` : 'Не рассчитано'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      Дата создания
                    </p>
                    <p className="font-medium">{new Date(order.date).toLocaleDateString('ru')}</p>
                  </div>
                  {order.installationDate && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Icon name="CalendarCheck" size={12} />
                        Дата монтажа
                      </p>
                      <p className="font-medium">{new Date(order.installationDate).toLocaleDateString('ru')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Описание работ</p>
                <p className="font-medium">{order.product}</p>
              </div>
            </TabsContent>

            <TabsContent value="timeline">
              <OrderTimeline order={order} />
            </TabsContent>

            <TabsContent value="tracking">
              <InstallerTracker 
                order={order} 
                location={location}
                onRefresh={onRefreshLocation}
              />
            </TabsContent>

            <TabsContent value="photos">
              <WorkPhotoGallery
                orderId={order.id}
                photos={photos}
                installerName={order.installerName}
                onRequestPhoto={onRequestPhoto}
              />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
