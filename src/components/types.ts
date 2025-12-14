export interface Order {
  id: string;
  client: string;
  phone: string;
  address: string;
  status: 'new' | 'estimate' | 'paid' | 'delivery' | 'installation' | 'completed';
  amount: number;
  date: string;
  product: string;
  installerId?: string;
  installerName?: string;
  installationDate?: string;
  paymentMethod?: string;
  documents?: Document[];
  latitude?: number;
  longitude?: number;
  installerLocation?: InstallerLocation;
  workPhotos?: WorkPhoto[];
  clientData?: ClientData;
}

export interface Product {
  id: string;
  name: string;
  category: 'gutter' | 'snow-guard';
  price: number;
  wholesalePrice?: number;
  unit: string;
  description: string;
  manufacturer?: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'delivery' | 'system' | 'chat' | 'location' | 'photo' | 'rating' | 'document' | 'inventory';
  title: string;
  message: string;
  from: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
  priority?: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  sender: string;
  senderRole: 'client' | 'contractor' | 'supplier' | 'installer';
  message: string;
  timestamp: string;
  read: boolean;
}

export interface Document {
  id: string;
  orderId: string;
  type: 'contract' | 'act' | 'invoice' | 'other' | 'contract_installer' | 'passport';
  name: string;
  url: string;
  uploadedBy: string;
  uploadDate: string;
  status?: 'draft' | 'sent' | 'signed';
  signedDate?: string;
  recipientEmail?: string;
}

export interface InventoryItem {
  id: string;
  productId: string;
  quantity: number;
  reserved: number;
  available: number;
  minStock: number;
  location: string;
  lastUpdated: string;
}

export interface Rating {
  id: string;
  orderId: string;
  fromRole: 'client' | 'contractor' | 'installer';
  toRole: 'contractor' | 'installer' | 'supplier';
  rating: number;
  comment: string;
  date: string;
}

export interface FinancialStats {
  totalRevenue: number;
  materialsExpense: number;
  installationExpense: number;
  deliveryExpense: number;
  profit: number;
  profitMargin: number;
  avgOrderValue: number;
  ordersCount: number;
}

export interface EstimateItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}

export interface Estimate {
  orderId: string;
  client: string;
  items: EstimateItem[];
  materials: number;
  installation: number;
  delivery: number;
  total: number;
  notes: string;
}

export interface Installer {
  id: string;
  name: string;
  city: string;
  phone: string;
  email?: string;
  rating: number;
  reviewsCount: number;
  completedJobs: number;
  experience: number;
  specialization: ('gutter' | 'snow-guard' | 'both')[];
  priceGutterInstall: number;
  priceSnowGuardInstall: number;
  photo?: string;
  description: string;
  avitoUrl?: string;
  verified: boolean;
  lastActive: string;
  passportData?: PassportData;
  contractSigned?: boolean;
  inn?: string;
  bankAccount?: string;
}

export interface PassportData {
  series: string;
  number: string;
  issuedBy: string;
  issuedDate: string;
  departmentCode: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  scanUrl?: string;
}

export interface ClientData {
  orderId: string;
  fullName: string;
  phone: string;
  email?: string;
  passportSeries?: string;
  passportNumber?: string;
  address: string;
  inn?: string;
  companyName?: string;
  isLegalEntity: boolean;
}

export interface InstallerReview {
  id: string;
  installerId: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  orderId?: string;
  photos?: string[];
}

export interface InstallerLocation {
  orderId: string;
  installerId: string;
  status: 'on_way' | 'arrived' | 'working' | 'departed';
  arrivalTime?: string;
  departureTime?: string;
  currentLat?: number;
  currentLng?: number;
  distance?: number;
  lastUpdate: string;
}

export interface WorkPhoto {
  id: string;
  orderId: string;
  installerId: string;
  stage: 'before' | 'during' | 'after';
  photoUrl: string;
  caption?: string;
  timestamp: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export const getStageLabel = (stage: WorkPhoto['stage']) => {
  const labels = {
    before: 'До монтажа',
    during: 'В процессе',
    after: 'После монтажа',
  };
  return labels[stage];
};

export const getLocationStatus = (status: InstallerLocation['status']) => {
  const statuses = {
    on_way: { label: 'В пути', color: 'bg-blue-500', icon: 'Navigation' },
    arrived: { label: 'На объекте', color: 'bg-green-500', icon: 'MapPin' },
    working: { label: 'Работает', color: 'bg-orange-500', icon: 'Wrench' },
    departed: { label: 'Уехал', color: 'bg-gray-500', icon: 'CheckCircle' },
  };
  return statuses[status];
};

export const getStatusConfig = (status: Order['status']) => {
  const configs = {
    new: { label: 'Новая заявка', color: 'bg-blue-500', icon: 'FileText' },
    estimate: { label: 'Смета готова', color: 'bg-purple-500', icon: 'Calculator' },
    paid: { label: 'Оплачено', color: 'bg-green-500', icon: 'CreditCard' },
    delivery: { label: 'Доставка', color: 'bg-orange-500', icon: 'Truck' },
    installation: { label: 'Монтаж', color: 'bg-yellow-500', icon: 'Wrench' },
    completed: { label: 'Завершено', color: 'bg-gray-500', icon: 'CheckCircle' },
  };
  return configs[status];
};

export const getNextStatus = (currentStatus: Order['status']): Order['status'] | null => {
  const flow: Record<Order['status'], Order['status'] | null> = {
    new: 'estimate',
    estimate: 'paid',
    paid: 'delivery',
    delivery: 'installation',
    installation: 'completed',
    completed: null,
  };
  return flow[currentStatus];
};
