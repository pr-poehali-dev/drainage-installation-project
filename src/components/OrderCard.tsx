import { Order } from '@/types';
import StatusBadge from './StatusBadge';
import Icon from './ui/icon';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

const OrderCard = ({ order, onClick }: OrderCardProps) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-gray-900">{order.id}</span>
            <StatusBadge status={order.status} />
          </div>
          {order.avitoId && (
            <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
              <Icon name="external-link" size={14} />
              <span>Авито #{order.avitoId}</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Icon name="user" size={16} className="text-gray-400" />
          <span className="font-medium">{order.clientName}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Icon name="phone" size={16} className="text-gray-400" />
          <span>{order.clientPhone}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Icon name="map-pin" size={16} className="text-gray-400" />
          <span>{order.address}</span>
        </div>
      </div>

      {order.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{order.description}</p>
      )}

      {order.estimate && (
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="text-sm text-green-700 mb-1">Смета</div>
          <div className="text-2xl font-bold text-green-900">
            {order.estimate.total.toLocaleString()} ₽
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Создан: {new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
        <span>Обновлен: {new Date(order.updatedAt).toLocaleDateString('ru-RU')}</span>
      </div>
    </div>
  );
};

export default OrderCard;
