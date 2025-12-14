import { toast } from '@/hooks/use-toast';
import { Order, Notification, Estimate, getStatusConfig, ChatMessage, Document, WorkPhoto, Rating, Installer, FinancialStats } from '@/types.ts';

interface AppHandlersProps {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  avitoUrl: string;
  setAvitoUrl: (url: string) => void;
  setImportLoading: (loading: boolean) => void;
  setIsImportDialogOpen: (open: boolean) => void;
  newOrderClient: string;
  newOrderPhone: string;
  newOrderAddress: string;
  newOrderProduct: string;
  setIsNewOrderDialogOpen: (open: boolean) => void;
  setNewOrderClient: (client: string) => void;
  setNewOrderPhone: (phone: string) => void;
  setNewOrderAddress: (address: string) => void;
  setNewOrderProduct: (product: string) => void;
  setSelectedOrderForDetails: (orderId: string | null) => void;
  setIsOrderDetailsOpen: (open: boolean) => void;
  selectedOrderForDetails: string | null;
  ratingTarget: { orderId: string; name: string; role: 'contractor' | 'installer' | 'supplier' } | null;
  ratings: Rating[];
  setRatings: (ratings: Rating[]) => void;
  installerLocations: any[];
  setInstallerLocations: (locations: any[]) => void;
  pushNotifications: Notification[];
  setPushNotifications: (notifications: Notification[]) => void;
  workPhotos: WorkPhoto[];
  setWorkPhotos: (photos: WorkPhoto[]) => void;
  currentEstimate: Estimate | null;
  setCurrentEstimate: (estimate: Estimate | null) => void;
  setActiveTab: (tab: string) => void;
  installers: Installer[];
  setInstallers: (installers: Installer[]) => void;
  chatMessages: ChatMessage[];
  setChatMessages: (messages: ChatMessage[]) => void;
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
}

export const useAppHandlers = (props: AppHandlersProps) => {
  const {
    orders,
    setOrders,
    notifications,
    setNotifications,
    avitoUrl,
    setAvitoUrl,
    setImportLoading,
    setIsImportDialogOpen,
    newOrderClient,
    newOrderPhone,
    newOrderAddress,
    newOrderProduct,
    setIsNewOrderDialogOpen,
    setNewOrderClient,
    setNewOrderPhone,
    setNewOrderAddress,
    setNewOrderProduct,
    setSelectedOrderForDetails,
    setIsOrderDetailsOpen,
    selectedOrderForDetails,
    ratingTarget,
    ratings,
    setRatings,
    installerLocations,
    setInstallerLocations,
    pushNotifications,
    setPushNotifications,
    workPhotos,
    setWorkPhotos,
    currentEstimate,
    setCurrentEstimate,
    setActiveTab,
    installers,
    setInstallers,
    chatMessages,
    setChatMessages,
    documents,
    setDocuments,
  } = props;

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
    setSelectedOrderForDetails(orderId);
    setIsOrderDetailsOpen(true);
  };

  const handleRefreshLocation = () => {
    if (!selectedOrderForDetails) return;
    
    toast({
      title: 'Обновление геолокации',
      description: 'Данные о местоположении обновлены',
    });
  };

  const handleSubmitRating = (rating: number, comment: string) => {
    if (!ratingTarget) return;

    const newRating: Rating = {
      id: `RAT-${ratings.length + 1}`,
      orderId: ratingTarget.orderId,
      fromRole: 'contractor',
      toRole: ratingTarget.role,
      rating,
      comment,
      date: new Date().toLocaleDateString('ru'),
    };

    setRatings([...ratings, newRating]);

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'rating',
      title: 'Оценка отправлена',
      message: `Вы оценили работу ${ratingTarget.name} на ${rating} из 5`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId: ratingTarget.orderId,
    };
    setNotifications([newNotification, ...notifications]);

    toast({
      title: 'Спасибо за оценку!',
      description: `Ваш отзыв поможет улучшить качество сервиса`,
    });
  };

  const simulateInstallerArrival = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.installerName) return;

    const location = installerLocations.find(l => l.orderId === orderId);
    if (location && location.status === 'on_way') {
      setInstallerLocations(installerLocations.map(l =>
        l.orderId === orderId
          ? { ...l, status: 'arrived', arrivalTime: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }) }
          : l
      ));

      const pushNotif: Notification = {
        id: `PUSH-${Date.now()}`,
        type: 'location',
        title: '🚗 Монтажник прибыл!',
        message: `${order.installerName} прибыл на объект по адресу ${order.address}`,
        from: 'Система трекинга',
        timestamp: 'Только что',
        read: false,
        orderId,
        priority: 'high',
      };
      
      setPushNotifications([...pushNotifications, pushNotif]);
      setNotifications([pushNotif, ...notifications]);

      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Монтажник прибыл на объект!', {
          body: `${order.installerName} начинает работу по адресу ${order.address}`,
          icon: '/favicon.ico',
        });
      }

      toast({
        title: '🚗 Монтажник прибыл на объект!',
        description: `${order.installerName} начинает работу`,
      });
    }
  };

  const handleRequestPhoto = (stage: WorkPhoto['stage']) => {
    if (!selectedOrderForDetails) return;

    const order = orders.find(o => o.id === selectedOrderForDetails);
    if (!order || !order.installerName) return;

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'photo',
      title: 'Запрос фотографии',
      message: `Монтажнику ${order.installerName} отправлен запрос на фото (${stage === 'before' ? 'до монтажа' : stage === 'during' ? 'в процессе' : 'после монтажа'})`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId: selectedOrderForDetails,
    };
    setNotifications([newNotification, ...notifications]);

    setTimeout(() => {
      const newPhoto: WorkPhoto = {
        id: `PHT-${workPhotos.length + 1}`,
        orderId: selectedOrderForDetails,
        installerId: order.installerId || '',
        stage,
        photoUrl: `/photos/${stage}-new.jpg`,
        caption: `Фотография ${stage === 'before' ? 'до начала работ' : stage === 'during' ? 'в процессе монтажа' : 'после завершения'}`,
        timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        location: order.latitude && order.longitude ? { lat: order.latitude, lng: order.longitude } : undefined,
      };
      
      setWorkPhotos([...workPhotos, newPhoto]);

      const photoNotification: Notification = {
        id: `N${(notifications.length + 2).toString().padStart(3, '0')}`,
        type: 'photo',
        title: 'Новая фотография',
        message: `${order.installerName} загрузил фото с объекта`,
        from: order.installerName,
        timestamp: 'Только что',
        read: false,
        orderId: selectedOrderForDetails,
      };
      setNotifications([photoNotification, ...notifications]);

      toast({
        title: 'Фото получено!',
        description: `${order.installerName} загрузил новую фотографию`,
      });
    }, 3000);

    toast({
      title: 'Запрос отправлен!',
      description: `${order.installerName} получит уведомление о необходимости загрузить фото`,
    });
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

  const handleNotificationClick = (setIsNotificationsOpen: (open: boolean) => void) => {
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

  const handleAssignInstaller = (orderId: string, installerId: string, installerName: string, date: string) => {
    const updatedOrders = orders.map(o =>
      o.id === orderId ? { ...o, installerId, installerName, installationDate: date } : o
    );
    setOrders(updatedOrders);

    const newNotification: Notification = {
      id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
      type: 'order',
      title: 'Монтажник назначен',
      message: `На заказ ${orderId} назначен монтажник ${installerName}. Дата монтажа: ${new Date(date).toLocaleDateString('ru')}`,
      from: 'Вы',
      timestamp: 'Только что',
      read: true,
      orderId,
    };
    setNotifications([newNotification, ...notifications]);

    toast({
      title: 'Монтажник назначен!',
      description: `${installerName} будет выполнять работы ${new Date(date).toLocaleDateString('ru')}`,
    });
  };

  const handleSendMessage = (orderId: string, message: string) => {
    const newMessage: ChatMessage = {
      id: `MSG-${chatMessages.length + 1}`,
      orderId,
      sender: 'Вы (Подрядчик)',
      senderRole: 'contractor',
      message,
      timestamp: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setChatMessages([...chatMessages, newMessage]);

    toast({
      title: 'Сообщение отправлено',
      description: 'Участники заказа получат уведомление',
    });
  };

  const handleGenerateDocument = (orderId: string, type: Document['type']) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const docNames = {
      contract: `Договор ${orderId}`,
      act: `Акт выполненных работ ${orderId}`,
      invoice: `Счет на оплату ${orderId}`,
      other: `Документ ${orderId}`,
      contract_installer: `Договор с монтажником ${orderId}`,
      passport: `Паспорт ${orderId}`,
    };

    const newDoc: Document = {
      id: `DOC-${documents.length + 1}`,
      orderId,
      type,
      name: docNames[type] || `Документ ${orderId}`,
      url: `/documents/${orderId}-${type}.pdf`,
      uploadedBy: 'Вы',
      uploadDate: new Date().toLocaleDateString('ru'),
    };

    setDocuments([...documents, newDoc]);

    toast({
      title: 'Документ сгенерирован!',
      description: `${docNames[type]} успешно создан`,
    });
  };

  const getFinancialStats = (): FinancialStats => {
    return {
      totalRevenue: orders.reduce((sum, o) => sum + o.amount, 0),
      materialsExpense: orders.reduce((sum, o) => sum + o.amount * 0.45, 0),
      installationExpense: orders.reduce((sum, o) => sum + o.amount * 0.20, 0),
      deliveryExpense: orders.reduce((sum, o) => sum + o.amount * 0.08, 0),
      profit: orders.reduce((sum, o) => sum + o.amount * 0.27, 0),
      profitMargin: 27,
      avgOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.amount, 0) / orders.length : 0,
      ordersCount: orders.length,
    };
  };

  return {
    handleImportFromAvito,
    handleCreateNewOrder,
    handleOrderAction,
    handleRefreshLocation,
    handleSubmitRating,
    simulateInstallerArrival,
    handleRequestPhoto,
    handleSaveEstimate,
    handleSendEstimate,
    handleChangeOrderStatus,
    handleNotificationClick,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleNotificationItemClick,
    handleImportInstallersFromAvito,
    handleAssignInstaller,
    handleSendMessage,
    handleGenerateDocument,
    getFinancialStats,
  };
};
