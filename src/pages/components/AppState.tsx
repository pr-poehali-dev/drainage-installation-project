import { useState } from 'react';
import { Order, Product, Notification, Estimate, ChatMessage, Document, InstallerLocation, WorkPhoto, Rating, InventoryItem, Installer, InstallerReview } from '@/types.ts';

export const useAppState = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([
    { id: 'AVT-2301', client: 'Иванов Петр', phone: '+7 999 123-45-67', address: 'ул. Ленина, 45', status: 'new', amount: 0, date: '2024-12-14', product: 'Водосток + Снегозадержатели', latitude: 55.7558, longitude: 37.6173 },
    { id: 'AVT-2302', client: 'ООО "СтройМастер"', phone: '+7 999 234-56-78', address: 'пр. Победы, 12', status: 'estimate', amount: 185000, date: '2024-12-13', product: 'Водосточная система', installerId: 'INS-002', installerName: 'ООО "КровляПрофи"', installationDate: '2024-12-18', latitude: 59.9343, longitude: 30.3351 },
    { id: 'AVT-2303', client: 'Сидорова Анна', phone: '+7 999 345-67-89', address: 'ул. Садовая, 8', status: 'paid', amount: 95000, date: '2024-12-12', product: 'Снегозадержатели', installerId: 'INS-005', installerName: 'Дмитрий С.', installationDate: '2024-12-15', latitude: 55.7887, longitude: 49.1221 },
    { id: 'AVT-2304', client: 'Петров Игорь', phone: '+7 999 456-78-90', address: 'ул. Мира, 23', status: 'delivery', amount: 220000, date: '2024-12-11', product: 'Водосток + Снегозадержатели', installerId: 'INS-001', installerName: 'Сергей Викторович М.', installationDate: '2024-12-16', latitude: 55.7522, longitude: 37.6156 },
    { id: 'AVT-2305', client: 'ИП Кузнецов', phone: '+7 999 567-89-01', address: 'ул. Кирова, 67', status: 'installation', amount: 150000, date: '2024-12-10', product: 'Водосточная система', installerId: 'INS-004', installerName: 'ИП Кузнецов М.А.', installationDate: '2024-12-14', latitude: 56.8389, longitude: 60.6057 },
  ]);
  
  const [products, setProducts] = useState<Product[]>([
    { id: 'P001', name: 'Водосточная система металл 125мм', category: 'gutter', price: 1200, wholesalePrice: 950, unit: 'м.п.', description: 'Металлический водосток диаметром 125мм', manufacturer: 'Металл Профиль' },
    { id: 'P002', name: 'Водосточная система пластик 125мм', category: 'gutter', price: 850, wholesalePrice: 680, unit: 'м.п.', description: 'Пластиковый водосток диаметром 125мм', manufacturer: 'Docke' },
    { id: 'P003', name: 'Снегозадержатель трубчатый 3м', category: 'snow-guard', price: 2500, wholesalePrice: 2100, unit: 'шт', description: 'Трубчатый снегозадержатель длиной 3 метра', manufacturer: 'Grand Line' },
    { id: 'P004', name: 'Снегозадержатель уголковый 2м', category: 'snow-guard', price: 1800, wholesalePrice: 1500, unit: 'шт', description: 'Уголковый снегозадержатель длиной 2 метра', manufacturer: 'Аквасистем' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'N001', type: 'location', title: 'Монтажник на объекте', message: 'ИП Кузнецов М.А. прибыл на объект по адресу ул. Кирова, 67', from: 'Система трекинга', timestamp: '5 мин назад', read: false, orderId: 'AVT-2305' },
    { id: 'N002', type: 'photo', title: 'Новые фотографии', message: 'ИП Кузнецов М.А. загрузил 2 фото в процессе монтажа', from: 'ИП Кузнецов М.А.', timestamp: '15 мин назад', read: false, orderId: 'AVT-2305' },
    { id: 'N003', type: 'order', title: 'Новая заявка из Авито', message: 'Клиент Иванов Петр оставил заявку на расчет водостока', from: 'Система Авито', timestamp: '1 час назад', read: false, orderId: 'AVT-2301' },
    { id: 'N004', type: 'location', title: 'Монтажник выехал', message: 'Сергей Викторович М. направляется на объект (осталось ~2.5 км)', from: 'Система трекинга', timestamp: '2 часа назад', read: true, orderId: 'AVT-2304' },
    { id: 'N005', type: 'payment', title: 'Оплата получена', message: 'Клиент Сидорова Анна оплатила заказ на сумму 95 000 ₽', from: 'Платежная система', timestamp: '3 часа назад', read: true },
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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 'MSG-001', orderId: 'AVT-2302', sender: 'ООО "СтройМастер"', senderRole: 'client', message: 'Добрый день! Когда планируется начало работ?', timestamp: '10:30', read: true },
    { id: 'MSG-002', orderId: 'AVT-2302', sender: 'Вы (Подрядчик)', senderRole: 'contractor', message: 'Здравствуйте! Монтажник выезжает 18 декабря в 9:00', timestamp: '10:35', read: true },
    { id: 'MSG-003', orderId: 'AVT-2302', sender: 'ООО "КровляПрофи"', senderRole: 'installer', message: 'Подтверждаю выезд. Все материалы готовы?', timestamp: '11:15', read: true },
    { id: 'MSG-004', orderId: 'AVT-2304', sender: 'Петров Игорь', senderRole: 'client', message: 'Где сейчас находится груз?', timestamp: '14:20', read: false },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    { id: 'DOC-001', orderId: 'AVT-2302', type: 'contract', name: 'Договор подряда №2302', url: '/docs/contract-2302.pdf', uploadedBy: 'Система', uploadDate: '13.12.2024' },
    { id: 'DOC-002', orderId: 'AVT-2302', type: 'invoice', name: 'Счет на оплату №2302', url: '/docs/invoice-2302.pdf', uploadedBy: 'Система', uploadDate: '13.12.2024' },
    { id: 'DOC-003', orderId: 'AVT-2303', type: 'contract', name: 'Договор подряда №2303', url: '/docs/contract-2303.pdf', uploadedBy: 'Система', uploadDate: '12.12.2024' },
    { id: 'DOC-004', orderId: 'AVT-2303', type: 'act', name: 'Акт выполненных работ №2303', url: '/docs/act-2303.pdf', uploadedBy: 'Дмитрий С.', uploadDate: '15.12.2024' },
  ]);
  const [selectedOrderForChat, setSelectedOrderForChat] = useState<string | null>(null);
  const [selectedOrderForDocs, setSelectedOrderForDocs] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isAssignInstallerOpen, setIsAssignInstallerOpen] = useState(false);
  const [selectedOrderForInstaller, setSelectedOrderForInstaller] = useState<string | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<string | null>(null);

  const [installerLocations, setInstallerLocations] = useState<InstallerLocation[]>([
    { orderId: 'AVT-2305', installerId: 'INS-004', status: 'working', arrivalTime: '09:15', currentLat: 56.8389, currentLng: 60.6057, lastUpdate: '14:32' },
    { orderId: 'AVT-2304', installerId: 'INS-001', status: 'on_way', currentLat: 55.7450, currentLng: 37.6100, distance: 2.5, lastUpdate: '14:45' },
    { orderId: 'AVT-2303', installerId: 'INS-005', status: 'departed', arrivalTime: '10:00', departureTime: '15:30', lastUpdate: '15:30' },
  ]);

  const [workPhotos, setWorkPhotos] = useState<WorkPhoto[]>([
    { id: 'PHT-001', orderId: 'AVT-2305', installerId: 'INS-004', stage: 'before', photoUrl: '/photos/before-1.jpg', caption: 'Состояние крыши до начала работ', timestamp: '09:20', location: { lat: 56.8389, lng: 60.6057 } },
    { id: 'PHT-002', orderId: 'AVT-2305', installerId: 'INS-004', stage: 'before', photoUrl: '/photos/before-2.jpg', caption: 'Общий вид объекта', timestamp: '09:22', location: { lat: 56.8389, lng: 60.6057 } },
    { id: 'PHT-003', orderId: 'AVT-2305', installerId: 'INS-004', stage: 'during', photoUrl: '/photos/during-1.jpg', caption: 'Монтаж водосточной системы', timestamp: '11:45', location: { lat: 56.8389, lng: 60.6057 } },
    { id: 'PHT-004', orderId: 'AVT-2305', installerId: 'INS-004', stage: 'during', photoUrl: '/photos/during-2.jpg', caption: 'Установка крепежей', timestamp: '12:30', location: { lat: 56.8389, lng: 60.6057 } },
    { id: 'PHT-005', orderId: 'AVT-2303', installerId: 'INS-005', stage: 'before', photoUrl: '/photos/before-3.jpg', caption: 'Крыша перед установкой снегозадержателей', timestamp: '10:05' },
    { id: 'PHT-006', orderId: 'AVT-2303', installerId: 'INS-005', stage: 'during', photoUrl: '/photos/during-3.jpg', caption: 'Процесс установки', timestamp: '12:15' },
    { id: 'PHT-007', orderId: 'AVT-2303', installerId: 'INS-005', stage: 'after', photoUrl: '/photos/after-1.jpg', caption: 'Готовый результат', timestamp: '15:20' },
    { id: 'PHT-008', orderId: 'AVT-2303', installerId: 'INS-005', stage: 'after', photoUrl: '/photos/after-2.jpg', caption: 'Вид с другой стороны', timestamp: '15:25' },
  ]);

  const [pushNotifications, setPushNotifications] = useState<Notification[]>([]);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);
  const [ratingTarget, setRatingTarget] = useState<{ orderId: string; name: string; role: 'contractor' | 'installer' | 'supplier' } | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'INV-001', productId: 'P001', quantity: 500, reserved: 120, available: 380, minStock: 100, location: 'Склад А, стеллаж 1', lastUpdated: '14:30' },
    { id: 'INV-002', productId: 'P002', quantity: 350, reserved: 80, available: 270, minStock: 100, location: 'Склад А, стеллаж 2', lastUpdated: '14:30' },
    { id: 'INV-003', productId: 'P003', quantity: 150, reserved: 60, available: 90, minStock: 50, location: 'Склад Б, секция 1', lastUpdated: '14:30' },
    { id: 'INV-004', productId: 'P004', quantity: 80, reserved: 25, available: 55, minStock: 30, location: 'Склад Б, секция 2', lastUpdated: '14:30' },
  ]);

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

  return {
    activeTab,
    setActiveTab,
    orders,
    setOrders,
    products,
    setProducts,
    notifications,
    setNotifications,
    isImportDialogOpen,
    setIsImportDialogOpen,
    avitoUrl,
    setAvitoUrl,
    importLoading,
    setImportLoading,
    isNewOrderDialogOpen,
    setIsNewOrderDialogOpen,
    newOrderClient,
    setNewOrderClient,
    newOrderPhone,
    setNewOrderPhone,
    newOrderAddress,
    setNewOrderAddress,
    newOrderProduct,
    setNewOrderProduct,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isEstimatePreviewOpen,
    setIsEstimatePreviewOpen,
    currentEstimate,
    setCurrentEstimate,
    isPriceManagementOpen,
    setIsPriceManagementOpen,
    chatMessages,
    setChatMessages,
    documents,
    setDocuments,
    selectedOrderForChat,
    setSelectedOrderForChat,
    selectedOrderForDocs,
    setSelectedOrderForDocs,
    isChatOpen,
    setIsChatOpen,
    isDocsOpen,
    setIsDocsOpen,
    isAssignInstallerOpen,
    setIsAssignInstallerOpen,
    selectedOrderForInstaller,
    setSelectedOrderForInstaller,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    selectedOrderForDetails,
    setSelectedOrderForDetails,
    installerLocations,
    setInstallerLocations,
    workPhotos,
    setWorkPhotos,
    pushNotifications,
    setPushNotifications,
    isRatingDialogOpen,
    setIsRatingDialogOpen,
    ratingTarget,
    setRatingTarget,
    ratings,
    setRatings,
    inventory,
    setInventory,
    installers,
    setInstallers,
    reviews,
    setReviews,
  };
};
