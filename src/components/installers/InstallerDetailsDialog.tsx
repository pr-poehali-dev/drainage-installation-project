import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Installer, InstallerReview } from '@/types';

interface InstallerDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  installer: Installer | null;
  reviews: InstallerReview[];
  onContact: (installer: Installer) => void;
}

const InstallerDetailsDialog = ({
  isOpen,
  onOpenChange,
  installer,
  reviews,
  onContact,
}: InstallerDetailsDialogProps) => {
  if (!installer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <ScrollArea className="max-h-[70vh]">
          <DialogHeader className="mb-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                {installer.photo ? (
                  <AvatarImage src={installer.photo} alt={installer.name} />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                    {installer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <DialogTitle className="flex items-center gap-2 text-xl">
                  {installer.name}
                  {installer.verified && (
                    <Icon name="BadgeCheck" size={20} className="text-blue-500" />
                  )}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">{installer.city}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{installer.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {installer.reviewsCount} отзывов
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {installer.completedJobs} выполненных заказов
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>

          <Tabs defaultValue="info" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Информация</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
              <TabsTrigger value="contact">Контакты</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2">О монтажнике</h4>
                <p className="text-sm text-muted-foreground">{installer.description}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Специализация</h4>
                <div className="flex flex-wrap gap-2">
                  {installer.specialization.map(spec => (
                    <Badge key={spec} variant="secondary">
                      {spec === 'gutter' ? 'Водостоки' : spec === 'snow-guard' ? 'Снегозадержатели' : 'Универсальный монтаж'}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-3">Расценки</h4>
                <div className="space-y-2">
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span>Монтаж водосточной системы</span>
                    <span className="font-bold text-primary">{installer.priceGutterInstall} ₽/м.п.</span>
                  </div>
                  <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                    <span>Монтаж снегозадержателей</span>
                    <span className="font-bold text-primary">{installer.priceSnowGuardInstall} ₽/шт</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Опыт работы</p>
                  <p className="text-xl font-bold">{installer.experience} лет</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Последняя активность</p>
                  <p className="text-sm font-semibold">{installer.lastActive}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-3 mt-4">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold">{review.clientName}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {review.photos.map((photo, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
                              <Icon name="Image" size={24} className="text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Icon name="MessageSquare" size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Пока нет отзывов</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 mt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <p className="font-semibold">{installer.phone}</p>
                  </div>
                </div>
                {installer.email && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{installer.email}</p>
                    </div>
                  </div>
                )}
                {installer.avitoUrl && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Icon name="ExternalLink" size={20} className="text-primary" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Профиль Авито</p>
                      <a 
                        href={installer.avitoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-primary hover:underline"
                      >
                        Открыть профиль
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <Button 
                className="w-full gap-2" 
                size="lg"
                onClick={() => onContact(installer)}
              >
                <Icon name="MessageCircle" size={18} />
                Отправить сообщение
              </Button>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default InstallerDetailsDialog;