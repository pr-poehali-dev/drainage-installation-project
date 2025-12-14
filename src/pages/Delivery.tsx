import { useState } from 'react';
import { Delivery } from '@/types';
import Icon from '@/components/ui/icon';

const DeliveryPage = () => {
  const [deliveries] = useState<Delivery[]>([
    {
      id: 'DEL-001',
      orderId: 'ORD-002',
      supplierId: 'S1',
      status: 'delivered',
      trackingNumber: 'TRK-2024-001',
      estimatedDelivery: '2024-03-16T18:00:00Z',
      actualDelivery: '2024-03-16T17:30:00Z',
      address: 'г. Санкт-Петербург, пр. Победы, д. 42',
      driverPhone: '+7 (999) 555-11-22'
    },
    {
      id: 'DEL-002',
      orderId: 'ORD-003',
      supplierId: 'S1',
      status: 'in_transit',
      trackingNumber: 'TRK-2024-002',
      estimatedDelivery: '2024-03-18T14:00:00Z',
      address: 'г. Казань, ул. Баумана, д. 78',
      driverPhone: '+7 (999) 555-33-44'
    },
    {
      id: 'DEL-003',
      orderId: 'ORD-004',
      supplierId: 'S2',
      status: 'picked_up',
      trackingNumber: 'TRK-2024-003',
      estimatedDelivery: '2024-03-19T10:00:00Z',
      address: 'г. Москва, ул. Ленина, д. 15',
      driverPhone: '+7 (999) 555-66-77'
    },
    {
      id: 'DEL-004',
      orderId: 'ORD-005',
      supplierId: 'S1',
      status: 'pending',
      trackingNumber: 'TRK-2024-004',
      estimatedDelivery: '2024-03-20T16:00:00Z',
      address: 'г. Екатеринбург, пр. Ленина, д. 52'
    }
  ]);

  const getStatusConfig = (status: Delivery['status']) => {
    const configs = {
      pending: { label: 'Ожидает отправки', color: 'bg-gray-500', icon: 'clock' },
      picked_up: { label: 'Забран со склада', color: 'bg-blue-500', icon: 'package' },
      in_transit: { label: 'В пути', color: 'bg-yellow-500', icon: 'truck' },
      delivered: { label: 'Доставлено', color: 'bg-green-500', icon: 'check-circle' }
    };
    return configs[status];
  };

  const getProgressPercentage = (status: Delivery['status']) => {
    const percentages = {
      pending: 0,
      picked_up: 33,
      in_transit: 66,
      delivered: 100
    };
    return percentages[status];
  };

  const stats = {
    total: deliveries.length,
    inTransit: deliveries.filter(d => d.status === 'in_transit').length,
    delivered: deliveries.filter(d => d.status === 'delivered').length,
    pending: deliveries.filter(d => d.status === 'pending' || d.status === 'picked_up').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Отслеживание доставки</h1>
          <p className="text-gray-600">Логистика и статус заказов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего доставок</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="package" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">В пути</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.inTransit}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Icon name="truck" size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Доставлено</p>
                <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="check-circle" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ожидают</p>
                <p className="text-3xl font-bold text-gray-600">{stats.pending}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Icon name="clock" size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {deliveries.map((delivery) => {
              const statusConfig = getStatusConfig(delivery.status);
              const progress = getProgressPercentage(delivery.status);

              return (
                <div key={delivery.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-lg text-gray-900">{delivery.trackingNumber}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1 ${statusConfig.color}`}>
                          <Icon name={statusConfig.icon as any} size={14} />
                          {statusConfig.label}
                        </span>
                      </div>
                      <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer mb-3">
                        Заказ: {delivery.orderId}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Прогресс доставки</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          delivery.status === 'delivered' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Icon name="map-pin" size={16} className="text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Адрес доставки</p>
                        <p className="text-sm text-gray-900">{delivery.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Icon name="calendar" size={16} className="text-gray-400" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Ожидаемая доставка</p>
                        <p className="text-sm text-gray-900">
                          {new Date(delivery.estimatedDelivery).toLocaleString('ru-RU')}
                        </p>
                      </div>
                    </div>

                    {delivery.actualDelivery && (
                      <div className="flex items-center gap-2">
                        <Icon name="check" size={16} className="text-green-600" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Фактическая доставка</p>
                          <p className="text-sm text-green-700 font-medium">
                            {new Date(delivery.actualDelivery).toLocaleString('ru-RU')}
                          </p>
                        </div>
                      </div>
                    )}

                    {delivery.driverPhone && (
                      <div className="flex items-center gap-2">
                        <Icon name="phone" size={16} className="text-gray-400" />
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">Телефон водителя</p>
                          <a href={`tel:${delivery.driverPhone}`} className="text-sm text-blue-600 hover:text-blue-700">
                            {delivery.driverPhone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <Icon name="map" size={16} />
                      Показать на карте
                    </button>
                    {delivery.status === 'in_transit' && (
                      <button className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <Icon name="phone-call" size={16} />
                        Позвонить водителю
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Icon name="map" size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Карта доставок</h3>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 mb-4 h-64 flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <Icon name="map-pin" size={48} className="text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">Интерактивная карта</p>
                  <p className="text-gray-500 text-xs mt-1">Отслеживание транспорта в реальном времени</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Icon name="truck" size={20} className="text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-900">На маршруте</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-900">{stats.inTransit}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Icon name="package" size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">На складе</span>
                  </div>
                  <span className="text-lg font-bold text-blue-900">{stats.pending}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <Icon name="check-circle" size={20} className="text-green-600" />
                    <span className="text-sm font-medium text-green-900">Доставлено сегодня</span>
                  </div>
                  <span className="text-lg font-bold text-green-900">{stats.delivered}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Быстрые действия</h4>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <Icon name="bell" size={16} className="text-gray-400" />
                    Уведомить о задержке
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <Icon name="refresh-cw" size={16} className="text-gray-400" />
                    Изменить адрес
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                    <Icon name="download" size={16} className="text-gray-400" />
                    Экспорт отчета
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
