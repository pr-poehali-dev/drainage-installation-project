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
  unit: string;
  description: string;
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
