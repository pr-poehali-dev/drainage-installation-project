import { useState } from 'react';

interface Order {
  id: string;
  client: string;
  phone: string;
  address: string;
  status: 'new' | 'in_progress' | 'completed';
  amount: number;
  date: string;
  product: string;
}

const Index = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      client: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      address: 'ул. Ленина, 15',
      status: 'new',
      amount: 45000,
      date: '2024-03-15',
      product: 'Водосток металлический 10м'
    },
    {
      id: 'ORD-002',
      client: 'Мария Сидорова',
      phone: '+7 (999) 234-56-78',
      address: 'пр. Победы, 42',
      status: 'in_progress',
      amount: 67000,
      date: '2024-03-16',
      product: 'Водосток пластиковый 15м'
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      new: 'bg-blue-500',
      in_progress: 'bg-yellow-500',
      completed: 'bg-green-500'
    };
    return colors[status];
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      new: 'Новая',
      in_progress: 'В работе',
      completed: 'Завершена'
    };
    return labels[status];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                АкваСток Про
              </h1>
              <p className="text-sm text-gray-600">Маркетплейс водосточных систем</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего заказов</p>
                <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Общая сумма</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()} ₽
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Новые заказы</p>
                <p className="text-3xl font-bold text-gray-900">
                  {orders.filter(o => o.status === 'new').length}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Заказы</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">{order.id}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">{order.client}</p>
                    <p className="text-sm text-gray-600 mb-1">{order.phone}</p>
                    <p className="text-sm text-gray-600 mb-2">{order.address}</p>
                    <p className="text-sm text-gray-700 font-medium">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {order.amount.toLocaleString()} ₽
                    </p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
