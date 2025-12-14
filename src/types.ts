export type UserRole = 'client' | 'contractor' | 'supplier' | 'subcontractor';

export type OrderStatus = 
  | 'avito_import' 
  | 'estimate_pending' 
  | 'estimate_sent' 
  | 'payment_pending' 
  | 'payment_received' 
  | 'supplier_payment_sent'
  | 'delivery_in_progress' 
  | 'delivered' 
  | 'installation_pending'
  | 'installation_in_progress' 
  | 'installation_completed' 
  | 'documents_signing'
  | 'completed';

export type ProductCategory = 'gutter' | 'snow_guard';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  email: string;
  rating?: number;
  reviewsCount?: number;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  unit: string;
  material: string;
  color?: string;
  image?: string;
  supplierId: string;
  inStock: boolean;
}

export interface EstimateItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Estimate {
  id: string;
  orderId: string;
  items: EstimateItem[];
  subtotal: number;
  installationCost: number;
  deliveryCost: number;
  total: number;
  createdAt: string;
  validUntil: string;
}

export interface Payment {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: 'client_to_contractor' | 'contractor_to_supplier' | 'contractor_to_subcontractor';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  method?: string;
}

export interface Document {
  id: string;
  orderId: string;
  type: 'contract' | 'act' | 'invoice' | 'delivery_note';
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  signed: boolean;
  signedBy?: string[];
}

export interface Delivery {
  id: string;
  orderId: string;
  supplierId: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  trackingNumber?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  address: string;
  driverPhone?: string;
}

export interface Review {
  id: string;
  orderId: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  contractorId?: string;
  supplierId?: string;
  subcontractorId?: string;
  status: OrderStatus;
  address: string;
  description: string;
  avitoId?: string;
  avitoUrl?: string;
  estimate?: Estimate;
  createdAt: string;
  updatedAt: string;
}

export interface AvitoImport {
  id: string;
  url: string;
  clientName: string;
  clientPhone: string;
  description: string;
  address: string;
  importedAt: string;
}
