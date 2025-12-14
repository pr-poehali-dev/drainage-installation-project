import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Order, Product, Notification, Estimate, EstimateItem, Installer, InstallerReview, getStatusConfig } from '@/components/types';
import DashboardTab from '@/components/DashboardTab';
import OrdersTab from '@/components/OrdersTab';
import CatalogTab from '@/components/CatalogTab';
import InstallersTab from '@/components/InstallersTab';
import NotificationsPanel from '@/components/NotificationsPanel';
import EstimatePreview from '@/components/EstimatePreview';
import PriceManagement from '@/components/PriceManagement';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([
    { id: 'AVT-2301', client: 'Иванов Петр', phone: '+7 999 123-45-67', address: 'ул. Ленина, 45', status: 'new', amount: 0, date: '2024-12-14', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2302', client: 'ООО "СтройМастер"', phone: '+7 999 234-56-78', address: 'пр. Победы, 12', status: 'estimate', amount: 185000, date: '2024-12-13', product: 'Водосточная система' },
    { id: 'AVT-2303', client: 'Сидорова Анна', phone: '+7 999 345-67-89', address: 'ул. Садовая, 8', status: 'paid', amount: 95000, date: '2024-12-12', product: 'Снегозадержатели' },
    { id: 'AVT-2304', client: 'Петров Игорь', phone: '+7 999 456-78-90', address: 'ул. Мира, 23', status: 'delivery', amount: 220000, date: '2024-12-11', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2305', client: 'ИП Кузнецов', phone: '+7 999 567-89-01', address: 'ул. Кирова, 67', status: 'installation', amount: 150000, date: '2024-12-10', product: 'Водосточная система' },
  ]);
  
  const [products, setProducts] = useState<Product[]>([
    { id: 'P001', name: 'Водосточная система металл 125мм', category: 'gutter', price: 1200, wholesalePrice: 950, unit: 'м.п.', description: 'Металлический водосток диаметром 125мм', manufacturer: 'Металл Профиль' },
    { id: 'P002', name: 'Водосточная система пластик 125мм', category: 'gutter', price: 850, wholesalePrice: 680, unit: 'м.п.', description: 'Пластиковый водосток диаметром 125мм', manufacturer: 'Docke' },
    { id: 'P003', name: 'Снегозадержатель трубчатый 3м', category: 'snow-guard', price: 2500, wholesalePrice: 2100, unit: 'шт', description: 'Трубчатый снегозадержатель длиной 3 метра', manufacturer: 'Grand Line' },
    { id: 'P004', name: 'Снегозадержатель уголковый 2м', category: 'snow-guard', price: 1800, wholesalePrice: 1500, unit: 'шт', description: 'Уголковый снегозадержатель длиной 2 метра', manufacturer: 'Аквасистем' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'N001', type: 'order', title: 'Новая заявка из Авито', message: 'Клиент Иванов Петр оставил заявку на расчет водостока', from: 'Система Авито', timestamp: '10 мин назад', read: false, orderId: 'AVT-2301' },
    { id: 'N002', type: 'payment', title: 'Оплата получена', message: 'Клиент Сидорова Анна оплатила заказ на сумму 95 000 ₽', from: 'Платежная система', timestamp: '1 час назад', read: false },
    { id: 'N003', type: 'delivery', title: 'Материалы отгружены', message: 'Заказ AVT-2304 отправлен на объект', from: 'Поставщик МеталлПроф', timestamp: '3 часа назад', read: false },
  ]);

  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [avitoUrl, setAvitoUrl] = useState('');
  const [importLoading, setImportLoading] = useState(false);
  const [isNewOrderDialogOpen, setIsNewOrderDialogOpen] = useState(false);
  const [newOrderClient, setNewOrderClient] = useState('');
  const [newOrderPhone, setNewOrderPhone] = useState('');
  const [newOrderAddress, setNewOrderAddress] = useState('');
  const [newOrderProduct, setNewOrderProduct] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isEstimatePreviewOpen, setIsEstimatePreviewOpen] = useState(false);
  const [currentEstimate, setCurrentEstimate] = useState<Estimate | null>(null);
  const [isPriceManagementOpen, setIsPriceManagementOpen] = useState(false);

  const [installers, setInstallers] = useState<Installer[]>([
    { id: 'INS-001', name: 'Сергей Викторович М.', city: 'Москва', phone: '+7 495 123-45-67', email: 'sergey.m@example.com', rating: 4.9, reviewsCount: 87, completedJobs: 124, experience: 8, specialization: ['both'], priceGutterInstall: 450, priceSnowGuardInstall: 1200, photo: '', description: 'Профессиональный монтаж водосточных систем и снегозадержателей. Работаю с любыми типами кровли. Даю гарантию на все работы 3 года. Выезд на замер бесплатно.', avitoUrl: 'https://www.avito.ru/moscow/predlozheniya_uslug/montazh_vodostokov', verified: true, lastActive: '5 мин назад' },
    { id: 'INS-002', name: 'ООО "КровляПрофи"', city: 'Санкт-Петербург', phone: '+7 812 234-56-78', rating: 4.8, reviewsCount: 143, completedJobs: 215, experience: 12, specialization: ['both'], priceGutterInstall: 420, priceSnowGuardInstall: 1150, photo: '', description: 'Компания с опытом более 12 лет. Бригада монтажников 8 человек. Выполняем объекты любой сложности. Работаем с юридическими и физическими лицами.', avitoUrl: 'https://www.avito.ru/sankt-peterburg/predlozheniya_uslug/montazh', verified: true, lastActive: '1 час назад' },
    { id: 'INS-003', name: 'Алексей Н.', city: 'Новосибирск', phone: '+7 383 345-67-89', rating: 4.7, reviewsCount: 52, completedJobs: 68, experience: 5, specialization: ['gutter'], priceGutterInstall: 380, priceSnowGuardInstall: 0, photo: '', description: 'Специализируюсь на монтаже водосточных систем. Работаю качественно и быстро. Использую только проверенные материалы.', avitoUrl: 'https://www.avito.ru/novosibirsk/predlozheniya_uslug/vodostoki', verified: false, lastActive: '2 часа назад' },
    { id: 'INS-004', name: 'ИП Кузнецов М.А.', city: 'Екатеринбург', phone: '+7 343 456-78-90', email: 'kuznetsov@example.com', rating: 4.9, reviewsCount: 96, completedJobs: 142, experience: 10, specialization: ['both'], priceGutterInstall: 400, priceSnowGuardInstall: 1100, photo: '', description: 'Индивидуальный предприниматель с большим опытом работы. Все работы выполняю лично. Гарантия качества 5 лет. Работаю по договору.', avitoUrl: 'https://www.avito.ru/ekaterinburg/predlozheniya_uslug/vodostoki_snegozaderzhateli', verified: true, lastActive: '30 мин назад' },
    { id: 'INS-005', name: 'Дмитрий С.', city: 'Казань', phone: '+7 843 567-89-01', rating: 4.6, reviewsCount: 34, completedJobs: 45, experience: 4, specialization: ['snow-guard'], priceGutterInstall: 0, priceSnowGuardInstall: 950, photo: '', description: 'Монтаж снегозадержателей на любые типы кровли. Быстро, качественно, с гарантией.', verified: false, lastActive: '1 день назад' },
    { id: 'INS-006', name: 'СтройМонтаж НН', city: 'Нижний Новгород', phone: '+7 831 678-90-12', rating: 4.8, reviewsCount: 78, completedJobs: 112, experience: 9, specialization: ['both'], priceGutterInstall: 410, priceSnowGuardInstall: 1080, photo: '', description: 'Профессиональная бригада монтажников. Выполняем работы под ключ. Собственный инструмент и оборудование.', verified: true, lastActive: '10 мин назад' },
  ]);

  const [reviews, setReviews] = useState<InstallerReview[]>([
    { id: 'REV-001', installerId: 'INS-001', clientName: 'Иван Петрович', rating: 5, comment: 'Отличная работа! Сергей выполнил монтаж водостока быстро и качественно. Все аккуратно, чисто. Рекомендую!', date: '10.12.2024', photos: ['photo1.jpg', 'photo2.jpg'] },
    { id: 'REV-002', installerId: 'INS-001', clientName: 'Мария Сергеевна', rating: 5, comment: 'Профессионал своего дела. Установил снегозадержатели, дал рекомендации по уходу. Очень доволен работой!', date: '05.12.2024' },
    { id: 'REV-003', installerId: 'INS-001', clientName: 'ООО "СтройКомплект"', rating: 4, comment: 'Хорошая работа, выполнено в срок. Небольшие замечания по оформлению документов, но все исправили быстро.', date: '28.11.2024' },
    { id: 'REV-004', installerId: 'INS-002', clientName: 'Андрей В.', rating: 5, comment: 'Компания работает профессионально. Бригада приехала вовремя, все сделали за один день. Качество отличное!', date: '12.12.2024', photos: ['photo3.jpg'] },
    { id: 'REV-005', installerId: 'INS-002', clientName: 'Елена Ивановна', rating: 5, comment: 'Очень довольны результатом! Установили водосточную систему на большом доме. Работали быстро и аккуратно.', date: '01.12.2024' },
    { id: 'REV-006', installerId: 'INS-004', clientName: 'Олег П.', rating: 5, comment: 'Михаил Александрович - настоящий профессионал! Все объяснил, показал, сделал качественно. Рекомендую!', date: '08.12.2024' },
  ]);

  const handleImportFromAvito = () => {
    if (!avitoUrl.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите URL объявления Авито',
        variant: 'destructive',
      });
      return;
    }

    setImportLoading(true);
    
    setTimeout(() => {
      const newOrderId = `AVT-${2300 + orders.length + 1}`;
      const mockOrder: Order = {
        id: newOrderId,
        client: 'Смирнов Алексей',
        phone: '+7 999 678-90-12',
        address: 'ул. Строителей, 34',
        status: 'new',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        product: 'Водосток + Снегозадержатели',
      };
      
      const newNotification: Notification = {
        id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
        type: 'order',
        title: 'Новая заявка импортирована',
        message: `Заказ ${newOrderId} от ${mockOrder.client} добавлен из Авито`,
        from: 'Система Авито',
        timestamp: 'Только что',
        read: false,
        orderId: newOrderId,
      };
      
      setOrders([mockOrder, ...orders]);
      setNotifications([newNotification, ...notifications]);
      setImportLoading(false);
      setIsImportDialogOpen(false);
      setAvitoUrl('');
      
      toast({
        title: 'Заявка импортирована!',
        description: `Заказ ${newOrderId} успешно добавлен из Авито`,
      });
    }, 1500);
  };

  const handleCreateNewOrder = () => {
    if (!newOrderClient.trim() || !newOrderPhone.trim() || !newOrderAddress.trim() || !newOrderProduct.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    const newOrderId = `AVT-${2300 + orders.length + 1}`;
    const newOrder: Order = {
      id: newOrderId,
      client: newOrderClient,
      phone: newOrderPhone,
      address: newOrderAddress,
      status: 'new',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      product: newOrderProduct,
    };

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'order',
      title: 'Новый заказ создан',
      message: `Заказ ${newOrderId} от ${newOrderClient} добавлен вручную`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId: newOrderId,
    };

    setOrders([newOrder, ...orders]);
    setNotifications([newNotification, ...notifications]);
    setIsNewOrderDialogOpen(false);
    setNewOrderClient('');
    setNewOrderPhone('');
    setNewOrderAddress('');
    setNewOrderProduct('');

    toast({
      title: 'Заказ создан!',
      description: `Заказ ${newOrderId} успешно добавлен`,
    });
  };

  const handleOrderAction = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const estimate: Estimate = {
      orderId: order.id,
      client: order.client,
      items: [
        { name: 'Водосточная система металл 125мм', quantity: 35, unit: 'м.п.', price: 1200, total: 42000 },
        { name: 'Снегозадержатель трубчатый 3м', quantity: 8, unit: 'шт', price: 2500, total: 20000 },
      ],
      materials: 62000,
      installation: 18000,
      delivery: 8000,
      total: 88000,
      notes: 'Монтаж в течение 3 рабочих дней после доставки материалов',
    };

    setCurrentEstimate(estimate);
    setIsEstimatePreviewOpen(true);
  };

  const handleSaveEstimate = (estimate: Estimate) => {
    setCurrentEstimate(estimate);
    toast({
      title: 'Смета сохранена',
      description: 'Изменения успешно сохранены',
    });
  };

  const handleSendEstimate = () => {
    if (!currentEstimate) return;

    const updatedOrders = orders.map(o =>
      o.id === currentEstimate.orderId
        ? { ...o, status: 'estimate' as const, amount: currentEstimate.total }
        : o
    );

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'order',
      title: 'Смета отправлена клиенту',
      message: `Смета на сумму ${currentEstimate.total.toLocaleString()} ₽ отправлена клиенту ${currentEstimate.client}`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId: currentEstimate.orderId,
    };

    setOrders(updatedOrders);
    setNotifications([newNotification, ...notifications]);

    toast({
      title: 'Смета отправлена!',
      description: `Клиент ${currentEstimate.client} получил смету на ${currentEstimate.total.toLocaleString()} ₽`,
    });
  };

  const handleChangeOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const updatedOrders = orders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );

    const statusConfig = getStatusConfig(newStatus);
    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'order',
      title: `Статус изменен: ${statusConfig.label}`,
      message: `Заказ ${orderId} перешел в статус "${statusConfig.label}"`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId,
    };

    setOrders(updatedOrders);
    setNotifications([newNotification, ...notifications]);

    toast({
      title: 'Статус обновлен!',
      description: `Заказ ${orderId}: ${statusConfig.label}`,
    });
  };

  const handleNotificationClick = () => {
    setIsNotificationsOpen(true);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationItemClick = (notification: Notification) => {
    if (notification.orderId) {
      setActiveTab('orders');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleImportInstallersFromAvito = (city: string, specialization: string) => {
    const mockInstallers: Installer[] = [
      { id: `INS-${installers.length + 1}`, name: 'Владимир Петрович К.', city, phone: '+7 999 111-22-33', rating: 4.5, reviewsCount: 23, completedJobs: 34, experience: 6, specialization: [specialization === 'both' ? 'both' : specialization as any], priceGutterInstall: 390, priceSnowGuardInstall: 1050, photo: '', description: `Качественный монтаж в городе ${city}. Работаю быстро и аккуратно.`, avitoUrl: `https://www.avito.ru/${city.toLowerCase()}/predlozheniya_uslug/montazh`, verified: false, lastActive: 'Только что' },
      { id: `INS-${installers.length + 2}`, name: 'ООО "МонтажСервис"', city, phone: '+7 999 222-33-44', rating: 4.7, reviewsCount: 45, completedJobs: 67, experience: 7, specialization: [specialization === 'both' ? 'both' : specialization as any], priceGutterInstall: 420, priceSnowGuardInstall: 1120, photo: '', description: `Профессиональная бригада в ${city}. Выполняем объекты любой сложности.`, avitoUrl: `https://www.avito.ru/${city.toLowerCase()}/predlozheniya_uslug/vodostoki`, verified: true, lastActive: '15 мин назад' },
    ];
    setInstallers([...mockInstallers, ...installers]);

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'system',
      title: 'Монтажники загружены из Авито',
      message: `Добавлено ${mockInstallers.length} новых монтажников из города ${city}`,
      from: 'Система Авито',
      timestamp: 'Только что',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <Icon name="Droplets" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  АкваСток Про
                </h1>
                <p className="text-sm text-muted-foreground">Маркетплейс водосточных систем</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsPriceManagementOpen(true)}>
                <Icon name="DollarSign" size={18} className="mr-2" />
                Прайсы
              </Button>
              <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Button>
              <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                <AvatarFallback className="bg-primary text-white font-semibold">ПИ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="mb-4">
            <SheetTitle>Уведомления</SheetTitle>
            <SheetDescription>
              {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все прочитано'}
            </SheetDescription>
          </SheetHeader>
          <NotificationsPanel
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNotificationClick={handleNotificationItemClick}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isPriceManagementOpen} onOpenChange={setIsPriceManagementOpen}>
        <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Управление прайсами</SheetTitle>
            <SheetDescription>
              Редактирование цен и добавление новых товаров
            </SheetDescription>
          </SheetHeader>
          <PriceManagement products={products} onUpdateProducts={setProducts} />
        </SheetContent>
      </Sheet>

      {currentEstimate && (
        <EstimatePreview
          open={isEstimatePreviewOpen}
          onOpenChange={setIsEstimatePreviewOpen}
          estimate={currentEstimate}
          onSave={handleSaveEstimate}
          onSend={handleSendEstimate}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[700px]">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="Package" size={16} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="ShoppingCart" size={16} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="installers" className="gap-2">
              <Icon name="Users" size={16} />
              Монтажники
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab 
              orders={orders}
              isImportDialogOpen={isImportDialogOpen}
              setIsImportDialogOpen={setIsImportDialogOpen}
              avitoUrl={avitoUrl}
              setAvitoUrl={setAvitoUrl}
              importLoading={importLoading}
              handleImportFromAvito={handleImportFromAvito}
              isNewOrderDialogOpen={isNewOrderDialogOpen}
              setIsNewOrderDialogOpen={setIsNewOrderDialogOpen}
              newOrderClient={newOrderClient}
              setNewOrderClient={setNewOrderClient}
              newOrderPhone={newOrderPhone}
              setNewOrderPhone={setNewOrderPhone}
              newOrderAddress={newOrderAddress}
              setNewOrderAddress={setNewOrderAddress}
              newOrderProduct={newOrderProduct}
              setNewOrderProduct={setNewOrderProduct}
              handleCreateNewOrder={handleCreateNewOrder}
              handleOrderAction={handleOrderAction}
              handleChangeOrderStatus={handleChangeOrderStatus}
            />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab products={products} />
          </TabsContent>

          <TabsContent value="installers">
            <InstallersTab 
              installers={installers} 
              reviews={reviews}
              onImportFromAvito={handleImportInstallersFromAvito}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;