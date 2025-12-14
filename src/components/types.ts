export interface Order {
  id: string;
  client: string;
  phone: string;
  address: string;
  status: 'new' | 'estimate' | 'paid' | 'delivery' | 'installation' | 'completed';
  amount: number;
  date: string;
  product: string;
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
  type: 'order' | 'payment' | 'delivery' | 'system';
  title: string;
  message: string;
  from: string;
  timestamp: string;
  read: boolean;
  orderId?: string;
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