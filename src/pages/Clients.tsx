import { useState } from 'react';
import { Client } from '@/types';
import Icon from '@/components/ui/icon';

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'avito' | 'profi' | 'direct' | 'referral'>('all');

  const [clients] = useState<Client[]>([
    {
      id: 'CLI-001',
      name: 'Иван Петров',
      phone: '+7 (999) 123-45-67',
      email: 'petrov@mail.ru',
      city: 'Москва',
      address: 'ул. Ленина, д. 15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      source: 'avito',
      totalOrders: 3,
      completedOrders: 2,
      totalSpent: 157000,
      rating: 5,
      notes: 'Постоянный клиент, всегда оплачивает вовремя',
      createdAt: '2023-06-15T10:00:00Z',
      lastOrderAt: '2024-03-15T10:00:00Z'
    },
    {
      id: 'CLI-002',
      name: 'Мария Сидорова',
      phone: '+7 (999) 234-56-78',
      email: 'sidorova@gmail.com',
      city: 'Санкт-Петербург',
      address: 'пр. Победы, д. 42',
      source: 'profi',
      totalOrders: 2,
      completedOrders: 2,
      totalSpent: 109000,
      rating: 5,
      createdAt: '2023-08-20T10:00:00Z',
      lastOrderAt: '2024-03-16T09:00:00Z'
    },
    {
      id: 'CLI-003',
      name: 'Алексей Кузнецов',
      phone: '+7 (999) 345-67-89',
      city: 'Казань',
      address: 'ул. Баумана, д. 78',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      source: 'avito',
      totalOrders: 1,
      completedOrders: 0,
      totalSpent: 70000,
      rating: 4,
      createdAt: '2024-03-14T08:00:00Z',
      lastOrderAt: '2024-03-14T08:00:00Z'
    },
    {
      id: 'CLI-004',
      name: 'Елена Новикова',
      phone: '+7 (999) 456-78-90',
      email: 'novikova@yandex.ru',
      city: 'Екатеринбург',
      address: 'пр. Ленина, д. 52',
      source: 'direct',
      totalOrders: 5,
      completedOrders: 5,
      totalSpent: 245000,
      rating: 5,
      notes: 'VIP клиент, порекомендовала нас 3 знакомым',
      createdAt: '2023-03-10T10:00:00Z',
      lastOrderAt: '2024-03-10T14:00:00Z'
    },
    {
      id: 'CLI-005',
      name: 'Дмитрий Волков',
      phone: '+7 (999) 567-89-01',
      city: 'Новосибирск',
      source: 'referral',
      totalOrders: 1,
      completedOrders: 1,
      totalSpent: 42000,
      createdAt: '2024-02-05T10:00:00Z',
      lastOrderAt: '2024-02-20T18:00:00Z'
    },
    {
      id: 'CLI-006',
      name: 'Ольга Смирнова',
      phone: '+7 (999) 678-90-12',
      email: 'smirnova@mail.ru',
      city: 'Краснодар',
      address: 'ул. Красная, д. 125',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      source: 'avito',
      totalOrders: 2,
      completedOrders: 1,
      totalSpent: 85000,
      rating: 4,
      createdAt: '2023-11-12T10:00:00Z',
      lastOrderAt: '2024-03-08T11:00:00Z'
    }
  ]);

  const sourceLabels = {
    avito: 'Авито',
    profi: 'Profi.ru',
    direct: 'Прямой',
    referral: 'Рекомендация'
  };

  const sourceColors = {
    avito: 'bg-purple-100 text-purple-700',
    profi: 'bg-blue-100 text-blue-700',
    direct: 'bg-green-100 text-green-700',
    referral: 'bg-orange-100 text-orange-700'
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === 'all' || client.source === sourceFilter;
    return matchesSearch && matchesSource;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.lastOrderAt && new Date(c.lastOrderAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0),
    avgOrderValue: Math.round(clients.reduce((sum, c) => sum + c.totalSpent, 0) / clients.reduce((sum, c) => sum + c.totalOrders, 0))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">База клиентов</h1>
          <p className="text-gray-600">Управление клиентами и история заказов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего клиентов</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="users" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Активных</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="user-check" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Общий доход</p>
                <p className="text-2xl font-bold text-purple-600">{stats.totalRevenue.toLocaleString()} ₽</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="wallet" size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Средний чек</p>
                <p className="text-2xl font-bold text-orange-600">{stats.avgOrderValue.toLocaleString()} ₽</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="trending-up" size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 relative">
              <Icon name="search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени, телефону или городу..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все источники</option>
              <option value="avito">Авито</option>
              <option value="profi">Profi.ru</option>
              <option value="direct">Прямые</option>
              <option value="referral">Рекомендации</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Найдено: <span className="font-bold text-gray-900">{filteredClients.length}</span> клиентов
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="user-plus" size={20} />
            Добавить клиента
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map(client => (
            <div key={client.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-start gap-4 mb-4">
                {client.avatar ? (
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                    {client.name.charAt(0)}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{client.name}</h3>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${sourceColors[client.source]}`}>
                        {sourceLabels[client.source]}
                      </span>
                    </div>
                    {client.rating && (
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                        <Icon name="star" size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-yellow-700">{client.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon name="phone" size={16} className="text-gray-400" />
                  <a href={`tel:${client.phone}`} className="text-blue-600 hover:text-blue-700">
                    {client.phone}
                  </a>
                </div>
                {client.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Icon name="mail" size={16} className="text-gray-400" />
                    <a href={`mailto:${client.email}`} className="text-blue-600 hover:text-blue-700">
                      {client.email}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon name="map-pin" size={16} className="text-gray-400" />
                  <span>{client.city}{client.address && `, ${client.address}`}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 mb-1">Заказов</p>
                  <p className="text-xl font-bold text-blue-900">{client.totalOrders}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-600 mb-1">Завершено</p>
                  <p className="text-xl font-bold text-green-900">{client.completedOrders}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-purple-600 mb-1">Потрачено</p>
                  <p className="text-lg font-bold text-purple-900">{(client.totalSpent / 1000).toFixed(0)}K ₽</p>
                </div>
              </div>

              {client.notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-600 mb-1">Заметки:</p>
                  <p className="text-sm text-gray-700">{client.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Создан: {new Date(client.createdAt).toLocaleDateString('ru-RU')}</span>
                {client.lastOrderAt && (
                  <span>Последний заказ: {new Date(client.lastOrderAt).toLocaleDateString('ru-RU')}</span>
                )}
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Профиль
                </button>
                <button className="flex-1 bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
                  Новый заказ
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Icon name="users-x" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Клиенты не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
