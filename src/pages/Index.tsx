import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { 
  Order, 
  Product, 
  Notification, 
  ChatMessage, 
  Document, 
  Estimate, 
  Installer, 
  InstallerLocation, 
  WorkPhoto, 
  Rating, 
  InventoryItem,
  InstallerReview,
  FinancialStats,
  getNextStatus
} from '@/types.ts';
import DashboardTab from '@/components/DashboardTab';
import OrdersTab from '@/components/OrdersTab';
import CatalogTab from '@/components/CatalogTab';
import InstallersTab from '@/components/InstallersTab';
import NotificationsPanel from '@/components/NotificationsPanel';
import EstimatePreview from '@/components/EstimatePreview';
import PriceManagement from '@/components/PriceManagement';
import ChatPanel from '@/components/chat/ChatPanel';
import DocumentsPanel from '@/components/documents/DocumentsPanel';
import AssignInstallerDialog from '@/components/orders/AssignInstallerDialog';
import InstallationCalendar from '@/components/calendar/InstallationCalendar';
import OrderDetailsDialog from '@/components/orders/OrderDetailsDialog';
import PushNotification from '@/components/notifications/PushNotification';
import RatingDialog from '@/components/rating/RatingDialog';
import InventoryManager from '@/components/inventory/InventoryManager';

const Index = () => {
  // Основные состояния
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'AVT-2304', 
      client: 'Иван Петров', 
      phone: '+7 (999) 123-45-67',
      address: 'ул. Ленина, 15',
      status: 'new', 
      amount: 45000, 
      date: '2024-03-15',
      product: 'Водосток металлический Aquasystem 125/90',
      latitude: 55.7558,
      longitude: 37.6173
    },
    { 
      id: 'AVT-2305', 
      client: 'Мария Сидорова', 
      phone: '+7 (999) 234-56-78',
      address: 'пр. Победы, 42',
      status: 'estimate', 
      amount: 67000, 
      date: '2024-03-16',
      product: 'Водосток пластиковый Docke Premium 120/85'
    },
    { 
      id: 'AVT-2306', 
      client: 'Алексей Козлов', 
      phone: '+7 (999) 345-67-89',
      address: 'ул. Гагарина, 28',
      status: 'paid', 
      amount: 52000, 
      date: '2024-03-14',
      product: 'Снегозадержатель трубчатый 3м',
      installerId: 'INS-001',
      installerName: 'Сергей Монтажников'
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 'PROD-001',
      name: 'Водосток металлический Aquasystem 125/90',
      category: 'gutter',
      price: 850,
      wholesalePrice: 680,
      unit: 'м.п.',
      description: 'Металлическая водосточная система',
      manufacturer: 'Aquasystem'
    },
    {
      id: 'PROD-002',
      name: 'Водосток пластиковый Docke Premium 120/85',
      category: 'gutter',
      price: 650,
      wholesalePrice: 520,
      unit: 'м.п.',
      description: 'Пластиковая водосточная система премиум класса',
      manufacturer: 'Docke'
    },
    {
      id: 'PROD-003',
      name: 'Снегозадержатель трубчатый 3м',
      category: 'snow-guard',
      price: 2500,
      wholesalePrice: 2000,
      unit: 'шт',
      description: 'Трубчатый снегозадержатель для кровли',
      manufacturer: 'RoofSafety'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'NOT-001',
      type: 'order',
      title: 'Новая заявка',
      message: 'Поступила заявка от Иван Петров',
      from: 'Система',
      timestamp: new Date().toISOString(),
      read: false,
      orderId: 'AVT-2304',
      priority: 'high'
    }
  ]);

  // Состояния диалогов
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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isAssignInstallerOpen, setIsAssignInstallerOpen] = useState(false);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  // Состояния выбранных элементов
  const [selectedOrderForChat, setSelectedOrderForChat] = useState<string | null>(null);
  const [selectedOrderForDocs, setSelectedOrderForDocs] = useState<string | null>(null);
  const [selectedOrderForInstaller, setSelectedOrderForInstaller] = useState<string | null>(null);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<Order | null>(null);
  const [ratingTarget, setRatingTarget] = useState<{ type: 'installer' | 'order', id: string } | null>(null);

  // Дополнительные данные
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [installerLocations, setInstallerLocations] = useState<InstallerLocation[]>([]);
  const [workPhotos, setWorkPhotos] = useState<WorkPhoto[]>([]);
  const [pushNotifications, setPushNotifications] = useState<any[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'INV-001',
      productId: 'PROD-001',
      quantity: 500,
      reserved: 120,
      available: 380,
      minStock: 100,
      location: 'Склад А',
      lastUpdated: new Date().toISOString()
    }
  ]);

  const [installers, setInstallers] = useState<Installer[]>([
    {
      id: 'INS-001',
      name: 'Сергей Монтажников',
      city: 'Москва',
      phone: '+7 (999) 111-22-33',
      email: 'sergey@example.com',
      rating: 4.8,
      reviewsCount: 47,
      completedJobs: 152,
      experience: 8,
      specialization: ['gutter', 'snow-guard'],
      priceGutterInstall: 450,
      priceSnowGuardInstall: 800,
      description: 'Опытный монтажник водосточных систем',
      verified: true,
      lastActive: new Date().toISOString()
    }
  ]);

  const [reviews, setReviews] = useState<InstallerReview[]>([]);

  // Обработчики импорта
  const handleImportFromAvito = () => {
    if (!avitoUrl) {
      toast({
        title: 'Ошибка',
        description: 'Введите URL объявления с Avito',
        variant: 'destructive'
      });
      return;
    }

    setImportLoading(true);
    
    setTimeout(() => {
      const newOrder: Order = {
        id: `AVT-${Math.floor(Math.random() * 10000)}`,
        client: 'Импорт из Avito',
        phone: '+7 (999) 000-00-00',
        address: 'Адрес из объявления',
        status: 'new',
        amount: Math.floor(Math.random() * 50000) + 30000,
        date: new Date().toISOString().split('T')[0],
        product: 'Товар из Avito'
      };

      setOrders([newOrder, ...orders]);
      setImportLoading(false);
      setIsImportDialogOpen(false);
      setAvitoUrl('');
      
      toast({
        title: 'Успешно',
        description: 'Заявка импортирована из Avito'
      });
    }, 2000);
  };

  const handleImportInstallersFromAvito = () => {
    toast({
      title: 'Импорт монтажников',
      description: 'Функция в разработке'
    });
  };

  // Обработчики заказов
  const handleCreateNewOrder = () => {
    if (!newOrderClient || !newOrderPhone || !newOrderAddress || !newOrderProduct) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      client: newOrderClient,
      phone: newOrderPhone,
      address: newOrderAddress,
      status: 'new',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      product: newOrderProduct
    };

    setOrders([newOrder, ...orders]);
    setIsNewOrderDialogOpen(false);
    setNewOrderClient('');
    setNewOrderPhone('');
    setNewOrderAddress('');
    setNewOrderProduct('');

    toast({
      title: 'Успешно',
      description: 'Новая заявка создана'
    });
  };

  const handleOrderAction = (orderId: string, action: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    switch (action) {
      case 'estimate':
        const estimateItems = [
          { name: order.product, quantity: 10, unit: 'м.п.', price: 850, total: 8500 },
          { name: 'Кронштейны', quantity: 15, unit: 'шт', price: 120, total: 1800 },
          { name: 'Воронки', quantity: 2, unit: 'шт', price: 450, total: 900 }
        ];
        const materials = estimateItems.reduce((sum, item) => sum + item.total, 0);
        const installation = 4500;
        const delivery = 1500;

        setCurrentEstimate({
          orderId: order.id,
          client: order.client,
          items: estimateItems,
          materials,
          installation,
          delivery,
          total: materials + installation + delivery,
          notes: ''
        });
        setIsEstimatePreviewOpen(true);
        break;

      case 'chat':
        setSelectedOrderForChat(orderId);
        setIsChatOpen(true);
        break;

      case 'docs':
        setSelectedOrderForDocs(orderId);
        setIsDocsOpen(true);
        break;

      case 'assign':
        setSelectedOrderForInstaller(orderId);
        setIsAssignInstallerOpen(true);
        break;

      case 'details':
        setSelectedOrderForDetails(order);
        setIsOrderDetailsOpen(true);
        break;

      case 'track':
        toast({
          title: 'Отслеживание',
          description: 'Открыто отслеживание заказа'
        });
        break;

      case 'rate':
        setRatingTarget({ type: 'order', id: orderId });
        setIsRatingDialogOpen(true);
        break;
    }
  };

  const handleChangeOrderStatus = (orderId: string) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const nextStatus = getNextStatus(order.status);
        if (nextStatus) {
          return { ...order, status: nextStatus };
        }
      }
      return order;
    }));

    toast({
      title: 'Статус обновлен',
      description: 'Заказ переведен на следующий этап'
    });
  };

  // Обработчики смет
  const handleSaveEstimate = () => {
    if (!currentEstimate) return;

    const updatedOrders = orders.map(order => {
      if (order.id === currentEstimate.orderId) {
        return { ...order, amount: currentEstimate.total, status: 'estimate' as const };
      }
      return order;
    });

    setOrders(updatedOrders);
    setIsEstimatePreviewOpen(false);

    toast({
      title: 'Смета сохранена',
      description: 'Смета успешно сохранена в системе'
    });
  };

  const handleSendEstimate = () => {
    if (!currentEstimate) return;

    handleSaveEstimate();

    toast({
      title: 'Смета отправлена',
      description: 'Смета отправлена клиенту на email'
    });
  };

  // Обработчики уведомлений
  const handleNotificationClick = (setOpen: (value: boolean) => void) => {
    setOpen(true);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleNotificationItemClick = (notification: Notification) => {
    handleMarkAsRead(notification.id);
    
    if (notification.orderId) {
      const order = orders.find(o => o.id === notification.orderId);
      if (order) {
        setSelectedOrderForDetails(order);
        setIsOrderDetailsOpen(true);
      }
    }
    
    setIsNotificationsOpen(false);
  };

  // Обработчики монтажников
  const handleAssignInstaller = (orderId: string, installerId: string, installerName: string, date: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, installerId, installerName, installationDate: date }
        : order
    ));

    setIsAssignInstallerOpen(false);

    toast({
      title: 'Монтажник назначен',
      description: `${installerName} назначен на ${date}`
    });
  };

  const handleRefreshLocation = (orderId: string) => {
    toast({
      title: 'Обновление геолокации',
      description: 'Запрошена актуальная геолокация монтажника'
    });
  };

  const simulateInstallerArrival = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const notification = {
      id: `NOT-${Date.now()}`,
      title: 'Монтажник прибыл на объект!',
      body: `${order.installerName || 'Монтажник'} начинает работу по адресу ${order.address}`,
      icon: '/favicon.ico',
      timestamp: new Date().toISOString()
    };

    setPushNotifications([notification, ...pushNotifications]);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.body,
        icon: notification.icon
      });
    }

    toast({
      title: notification.title,
      description: notification.body
    });
  };

  const handleRequestPhoto = (orderId: string, stage: 'before' | 'during' | 'after') => {
    toast({
      title: 'Запрос фото',
      description: `Запрошено фото этапа "${stage}" у монтажника`
    });
  };

  // Обработчики рейтинга
  const handleSubmitRating = (rating: number, comment: string) => {
    if (!ratingTarget) return;

    const newRating: Rating = {
      id: `RAT-${Date.now()}`,
      orderId: ratingTarget.id,
      fromRole: 'contractor',
      toRole: ratingTarget.type === 'installer' ? 'installer' : 'contractor',
      rating,
      comment,
      date: new Date().toISOString()
    };

    setRatings([...ratings, newRating]);
    setIsRatingDialogOpen(false);
    setRatingTarget(null);

    toast({
      title: 'Оценка отправлена',
      description: 'Спасибо за ваш отзыв!'
    });
  };

  // Обработчики чата
  const handleSendMessage = (orderId: string, message: string) => {
    const newMessage: ChatMessage = {
      id: `MSG-${Date.now()}`,
      orderId,
      sender: 'Подрядчик',
      senderRole: 'contractor',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };

    setChatMessages([...chatMessages, newMessage]);

    toast({
      title: 'Сообщение отправлено',
      description: 'Сообщение доставлено'
    });
  };

  // Обработчики документов
  const handleGenerateDocument = (orderId: string, type: Document['type']) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const newDoc: Document = {
      id: `DOC-${Date.now()}`,
      orderId,
      type,
      name: `Документ ${type}`,
      url: '#',
      uploadedBy: 'Система',
      uploadDate: new Date().toISOString(),
      status: 'draft'
    };

    setDocuments([...documents, newDoc]);

    toast({
      title: 'Документ создан',
      description: `Документ типа "${type}" успешно создан`
    });
  };

  // Финансовая статистика
  const getFinancialStats = (): FinancialStats => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
    const materialsExpense = totalRevenue * 0.45;
    const installationExpense = totalRevenue * 0.25;
    const deliveryExpense = totalRevenue * 0.08;
    const profit = totalRevenue - materialsExpense - installationExpense - deliveryExpense;

    return {
      totalRevenue,
      materialsExpense,
      installationExpense,
      deliveryExpense,
      profit,
      profitMargin: totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0,
      avgOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
      ordersCount: orders.length
    };
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const financialStats = getFinancialStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
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
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => handleNotificationClick(setIsNotificationsOpen)}
              >
                <Icon name="Bell" size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setIsPriceManagementOpen(true)}
              >
                <Icon name="Settings" size={16} className="mr-2" />
                Прайсы
              </Button>

              <Button 
                variant="outline"
                onClick={() => simulateInstallerArrival('AVT-2304')}
              >
                <Icon name="TestTube" size={16} className="mr-2" />
                Тест Push
              </Button>

              <Avatar>
                <AvatarFallback>АП</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Sheet */}
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

      {/* Price Management Sheet */}
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

      {/* Estimate Preview */}
      {currentEstimate && (
        <EstimatePreview
          open={isEstimatePreviewOpen}
          onOpenChange={setIsEstimatePreviewOpen}
          estimate={currentEstimate}
          onSave={handleSaveEstimate}
          onSend={handleSendEstimate}
        />
      )}

      {/* Chat Sheet */}
      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Чат по заказу</SheetTitle>
          </SheetHeader>
          {selectedOrderForChat && (
            <ChatPanel
              orderId={selectedOrderForChat}
              messages={chatMessages.filter(m => m.orderId === selectedOrderForChat)}
              onSendMessage={(msg) => handleSendMessage(selectedOrderForChat, msg)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Documents Sheet */}
      <Sheet open={isDocsOpen} onOpenChange={setIsDocsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Документы заказа</SheetTitle>
          </SheetHeader>
          {selectedOrderForDocs && (
            <DocumentsPanel
              orderId={selectedOrderForDocs}
              documents={documents.filter(d => d.orderId === selectedOrderForDocs)}
              onGenerateDocument={(type) => handleGenerateDocument(selectedOrderForDocs, type)}
              onUploadDocument={() => toast({ title: 'Функция в разработке', description: 'Скоро будет доступна загрузка файлов' })}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Assign Installer Dialog */}
      {selectedOrderForInstaller && (
        <AssignInstallerDialog
          isOpen={isAssignInstallerOpen}
          onOpenChange={setIsAssignInstallerOpen}
          installers={installers}
          onAssign={(installerId, installerName, date) => 
            handleAssignInstaller(selectedOrderForInstaller, installerId, installerName, date)
          }
        />
      )}

      {/* Order Details Dialog */}
      {selectedOrderForDetails && (
        <OrderDetailsDialog
          isOpen={isOrderDetailsOpen}
          onOpenChange={setIsOrderDetailsOpen}
          order={selectedOrderForDetails}
          onChangeStatus={handleChangeOrderStatus}
          onOpenChat={() => {
            setSelectedOrderForChat(selectedOrderForDetails.id);
            setIsChatOpen(true);
            setIsOrderDetailsOpen(false);
          }}
          onOpenDocs={() => {
            setSelectedOrderForDocs(selectedOrderForDetails.id);
            setIsDocsOpen(true);
            setIsOrderDetailsOpen(false);
          }}
          onRefreshLocation={handleRefreshLocation}
          onRequestPhoto={handleRequestPhoto}
          installerLocation={installerLocations.find(loc => loc.orderId === selectedOrderForDetails.id)}
          workPhotos={workPhotos.filter(photo => photo.orderId === selectedOrderForDetails.id)}
        />
      )}

      {/* Rating Dialog */}
      <RatingDialog
        isOpen={isRatingDialogOpen}
        onOpenChange={setIsRatingDialogOpen}
        onSubmit={handleSubmitRating}
        targetType={ratingTarget?.type || 'order'}
      />

      {/* Push Notifications */}
      <PushNotification notifications={pushNotifications} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline">Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="Package" size={16} />
              <span className="hidden sm:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="installers" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Монтажники</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Icon name="Warehouse" size={16} />
              <span className="hidden sm:inline">Склад</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab 
              financialStats={financialStats}
              orders={orders}
              installers={installers}
              locations={installerLocations}
              onViewOrderDetails={(orderId) => {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                  setSelectedOrderForDetails(order);
                  setIsOrderDetailsOpen(true);
                }
              }}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab
              orders={orders}
              onOrderAction={handleOrderAction}
              onImportFromAvito={() => setIsImportDialogOpen(true)}
              onCreateNewOrder={() => setIsNewOrderDialogOpen(true)}
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

          <TabsContent value="inventory">
            <InventoryManager
              inventory={inventory}
              products={products}
              onUpdateInventory={setInventory}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Import from Avito Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Импорт заявки из Avito</DialogTitle>
            <DialogDescription>
              Вставьте URL объявления с Avito для автоматического создания заявки
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="avito-url">URL объявления</Label>
              <Input
                id="avito-url"
                placeholder="https://www.avito.ru/..."
                value={avitoUrl}
                onChange={(e) => setAvitoUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleImportFromAvito} disabled={importLoading}>
              {importLoading ? 'Импорт...' : 'Импортировать'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Order Dialog */}
      <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать новую заявку</DialogTitle>
            <DialogDescription>
              Введите данные для создания новой заявки вручную
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="client-name">Имя клиента</Label>
              <Input
                id="client-name"
                placeholder="Иван Иванов"
                value={newOrderClient}
                onChange={(e) => setNewOrderClient(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="client-phone">Телефон</Label>
              <Input
                id="client-phone"
                placeholder="+7 (999) 123-45-67"
                value={newOrderPhone}
                onChange={(e) => setNewOrderPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="client-address">Адрес</Label>
              <Input
                id="client-address"
                placeholder="ул. Ленина, 15"
                value={newOrderAddress}
                onChange={(e) => setNewOrderAddress(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="order-product">Товар</Label>
              <Input
                id="order-product"
                placeholder="Водосток металлический"
                value={newOrderProduct}
                onChange={(e) => setNewOrderProduct(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewOrderDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreateNewOrder}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Installation Calendar */}
      <InstallationCalendar
        orders={orders.filter(o => o.installationDate)}
        installers={installers}
      />
    </div>
  );
};

export default Index;
