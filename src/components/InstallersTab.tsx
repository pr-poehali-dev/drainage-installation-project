import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Installer, InstallerReview } from './types';

interface InstallersTabProps {
  installers: Installer[];
  reviews: InstallerReview[];
  onImportFromAvito: (city: string, specialization: string) => void;
}

const InstallersTab = ({ installers, reviews, onImportFromAvito }: InstallersTabProps) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [importCity, setImportCity] = useState('');
  const [importSpecialization, setImportSpecialization] = useState('both');
  const [importLoading, setImportLoading] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];

  const handleImport = () => {
    if (!importCity.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Укажите город для поиска',
        variant: 'destructive',
      });
      return;
    }

    setImportLoading(true);
    setTimeout(() => {
      onImportFromAvito(importCity, importSpecialization);
      setImportLoading(false);
      setIsImportDialogOpen(false);
      setImportCity('');
      toast({
        title: 'Монтажники загружены!',
        description: `Найдено новых монтажников из ${importCity}`,
      });
    }, 2000);
  };

  const filteredInstallers = installers.filter(installer => {
    const cityMatch = selectedCity === 'all' || installer.city === selectedCity;
    const specMatch = selectedSpecialization === 'all' || 
      installer.specialization.includes(selectedSpecialization as any);
    const searchMatch = searchQuery === '' || 
      installer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.city.toLowerCase().includes(searchQuery.toLowerCase());
    return cityMatch && specMatch && searchMatch;
  });

  const handleViewDetails = (installer: Installer) => {
    setSelectedInstaller(installer);
    setIsDetailsOpen(true);
  };

  const handleContact = (installer: Installer) => {
    toast({
      title: 'Контакты отправлены!',
      description: `Данные ${installer.name} отправлены вам на почту`,
    });
  };

  const installerReviews = selectedInstaller 
    ? reviews.filter(r => r.installerId === selectedInstaller.id)
    : [];

  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={24} />
                База монтажников
              </CardTitle>
              <CardDescription>Профессиональные монтажники водосточных систем по всей России</CardDescription>
            </div>
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Icon name="Download" size={16} />
                  Загрузить из Авито
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon name="Download" size={20} className="text-blue-600" />
                    </div>
                    Автоматическая загрузка монтажников
                  </DialogTitle>
                  <DialogDescription>
                    Система автоматически найдет монтажников на Авито по указанным параметрам
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="import-city">Город поиска</Label>
                    <Input
                      id="import-city"
                      placeholder="Москва"
                      value={importCity}
                      onChange={(e) => setImportCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="import-spec">Специализация</Label>
                    <Select value={importSpecialization} onValueChange={setImportSpecialization}>
                      <SelectTrigger id="import-spec">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Водостоки + Снегозадержатели</SelectItem>
                        <SelectItem value="gutter">Только водостоки</SelectItem>
                        <SelectItem value="snow-guard">Только снегозадержатели</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-900 font-medium mb-2">Что загружается:</p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Контакты и рейтинг из профиля</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Расценки на монтаж из объявлений</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Отзывы клиентов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>Фото выполненных работ</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsImportDialogOpen(false)}
                    disabled={importLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleImport}
                    disabled={importLoading}
                    className="gap-2"
                  >
                    {importLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        Загружаем...
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={16} />
                        Загрузить
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по имени или городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Специализация" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все специализации</SelectItem>
                  <SelectItem value="both">Водостоки + Снегозадержатели</SelectItem>
                  <SelectItem value="gutter">Водостоки</SelectItem>
                  <SelectItem value="snow-guard">Снегозадержатели</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Найдено монтажников: {filteredInstallers.length}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInstallers.map((installer) => (
                <Card key={installer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="w-14 h-14">
                        {installer.photo ? (
                          <AvatarImage src={installer.photo} alt={installer.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {installer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-base truncate">{installer.name}</h3>
                          {installer.verified && (
                            <Icon name="BadgeCheck" size={18} className="text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Icon name="MapPin" size={14} className="text-muted-foreground" />
                          <p className="text-sm text-muted-foreground truncate">{installer.city}</p>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-semibold">{installer.rating}</span>
                          <span className="text-xs text-muted-foreground">({installer.reviewsCount} отзывов)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {installer.specialization.map(spec => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec === 'gutter' ? 'Водостоки' : spec === 'snow-guard' ? 'Снегозадержатели' : 'Всё'}
                        </Badge>
                      ))}
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Монтаж водостока:</span>
                        <span className="font-semibold">{installer.priceGutterInstall} ₽/м.п.</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Монтаж снегозадержателей:</span>
                        <span className="font-semibold">{installer.priceSnowGuardInstall} ₽/шт</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Опыт работы:</span>
                        <span className="font-semibold">{installer.experience} лет</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Выполнено заказов:</span>
                        <span className="font-semibold">{installer.completedJobs}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleViewDetails(installer)}
                      >
                        <Icon name="Eye" size={14} className="mr-1" />
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContact(installer)}
                      >
                        <Icon name="Phone" size={14} className="mr-1" />
                        Связаться
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
          {selectedInstaller && (
            <ScrollArea className="max-h-[70vh]">
              <DialogHeader className="mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-20 h-20">
                    {selectedInstaller.photo ? (
                      <AvatarImage src={selectedInstaller.photo} alt={selectedInstaller.name} />
                    ) : (
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-2xl">
                        {selectedInstaller.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                      {selectedInstaller.name}
                      {selectedInstaller.verified && (
                        <Icon name="BadgeCheck" size={20} className="text-blue-500" />
                      )}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon name="MapPin" size={16} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{selectedInstaller.city}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold">{selectedInstaller.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {selectedInstaller.reviewsCount} отзывов
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {selectedInstaller.completedJobs} выполненных заказов
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="info" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Информация</TabsTrigger>
                  <TabsTrigger value="reviews">Отзывы ({installerReviews.length})</TabsTrigger>
                  <TabsTrigger value="contact">Контакты</TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">О монтажнике</h4>
                    <p className="text-sm text-muted-foreground">{selectedInstaller.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-3">Специализация</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedInstaller.specialization.map(spec => (
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
                        <span className="font-bold text-primary">{selectedInstaller.priceGutterInstall} ₽/м.п.</span>
                      </div>
                      <div className="flex justify-between p-3 bg-muted/50 rounded-lg">
                        <span>Монтаж снегозадержателей</span>
                        <span className="font-bold text-primary">{selectedInstaller.priceSnowGuardInstall} ₽/шт</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Опыт работы</p>
                      <p className="text-xl font-bold">{selectedInstaller.experience} лет</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Последняя активность</p>
                      <p className="text-sm font-semibold">{selectedInstaller.lastActive}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-3 mt-4">
                  {installerReviews.length > 0 ? (
                    installerReviews.map(review => (
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
                        <p className="font-semibold">{selectedInstaller.phone}</p>
                      </div>
                    </div>
                    {selectedInstaller.email && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="Mail" size={20} className="text-primary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold">{selectedInstaller.email}</p>
                        </div>
                      </div>
                    )}
                    {selectedInstaller.avitoUrl && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Icon name="ExternalLink" size={20} className="text-primary" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">Профиль Авито</p>
                          <a 
                            href={selectedInstaller.avitoUrl} 
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
                    onClick={() => handleContact(selectedInstaller)}
                  >
                    <Icon name="MessageCircle" size={18} />
                    Отправить сообщение
                  </Button>
                </TabsContent>
              </Tabs>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstallersTab;
