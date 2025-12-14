import { useState } from 'react';
import { Order } from '@/types';
import OrderCard from '@/components/OrderCard';
import Icon from '@/components/ui/icon';

const Dashboard = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      clientId: '1',
      clientName: 'Иван Петров',
      clientPhone: '+7 (999) 123-45-67',
      status: 'avito_import',
      address: 'г. Москва, ул. Ленина, д. 15',
      description: 'Требуется расчет водосточной системы для частного дома 120 кв.м',
      avitoId: 'AV-12345',
      avitoUrl: 'https://avito.ru/moskva/predlozheniya_uslug/vodostock-12345',
      createdAt: '2024-03-15T10:00:00Z',
      updatedAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'ORD-002',
      clientId: '2',
      clientName: 'Мария Сидорова',
      clientPhone: '+7 (999) 234-56-78',
      contractorId: 'C1',
      status: 'estimate_sent',
      address: 'г. Санкт-Петербург, пр. Победы, д. 42',
      description: 'Монтаж снегозадержателей на крышу 200 кв.м',
      estimate: {
        id: 'EST-002',
        orderId: 'ORD-002',
        items: [
          { productId: 'P1', productName: 'Снегозадержатель трубчатый', quantity: 20, unitPrice: 1200, total: 24000 }
        ],
        subtotal: 24000,
        installationCost: 15000,
        deliveryCost: 3000,
        total: 42000,
        createdAt: '2024-03-16T12:00:00Z',
        validUntil: '2024-03-23T12:00:00Z'
      },
      createdAt: '2024-03-16T09:00:00Z',
      updatedAt: '2024-03-16T12:00:00Z'
    },
    {
      id: 'ORD-003',
      clientId: '3',
      clientName: 'Алексей Кузнецов',
      clientPhone: '+7 (999) 345-67-89',
      contractorId: 'C1',
      supplierId: 'S1',
      status: 'delivery_in_progress',
      address: 'г. Казань, ул. Баумана, д. 78',
      description: 'Водосточная система металлическая для коттеджа',
      estimate: {
        id: 'EST-003',
        orderId: 'ORD-003',
        items: [
          { productId: 'P2', productName: 'Водосток металлический', quantity: 30, unitPrice: 1500, total: 45000 }
        ],
        subtotal: 45000,
        installationCost: 20000,
        deliveryCost: 5000,
        total: 70000,
        createdAt: '2024-03-14T10:00:00Z',
        validUntil: '2024-03-21T10:00:00Z'
      },
      createdAt: '2024-03-14T08:00:00Z',
      updatedAt: '2024-03-17T14:00:00Z'
    }
  ]);

  const stats = {
    total: orders.length,
    newOrders: orders.filter(o => o.status === 'avito_import' || o.status === 'estimate_pending').length,
    inProgress: orders.filter(o => 
      o.status !== 'avito_import' && 
      o.status !== 'estimate_pending' && 
      o.status !== 'completed'
    ).length,
    totalRevenue: orders.reduce((sum, o) => sum + (o.estimate?.total || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель управления</h1>
          <p className="text-gray-600">Обзор всех заказов и статистики</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего заказов</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="shopping-bag" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Новые заказы</p>
                <p className="text-3xl font-bold text-gray-900">{stats.newOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Icon name="bell" size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">В работе</p>
                <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="loader" size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Общая сумма</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} ₽</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="wallet" size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Все заказы</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Icon name="plus" size={20} />
              Новый заказ
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {orders.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
