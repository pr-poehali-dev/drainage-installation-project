import { OrderStatus } from '@/types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<OrderStatus, { label: string; color: string }> = {
    avito_import: { label: 'Импорт из Авито', color: 'bg-purple-500' },
    estimate_pending: { label: 'Ожидание сметы', color: 'bg-yellow-500' },
    estimate_sent: { label: 'Смета отправлена', color: 'bg-blue-500' },
    payment_pending: { label: 'Ожидание оплаты', color: 'bg-orange-500' },
    payment_received: { label: 'Оплата получена', color: 'bg-green-500' },
    supplier_payment_sent: { label: 'Оплата поставщику', color: 'bg-teal-500' },
    delivery_in_progress: { label: 'Доставка', color: 'bg-indigo-500' },
    delivered: { label: 'Доставлено', color: 'bg-cyan-500' },
    installation_pending: { label: 'Ожидание монтажа', color: 'bg-amber-500' },
    installation_in_progress: { label: 'Монтаж', color: 'bg-violet-500' },
    installation_completed: { label: 'Монтаж завершен', color: 'bg-emerald-500' },
    documents_signing: { label: 'Подписание документов', color: 'bg-pink-500' },
    completed: { label: 'Завершено', color: 'bg-gray-600' }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
