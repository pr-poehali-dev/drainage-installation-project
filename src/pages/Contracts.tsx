import { useState } from 'react';
import { SubcontractContract } from '@/types';
import Icon from '@/components/ui/icon';

const Contracts = () => {
  const [contracts] = useState<SubcontractContract[]>([
    {
      id: 'CON-001',
      installerId: 'INS-001',
      installerName: 'Алексей Петров',
      orderId: 'ORD-003',
      contractNumber: 'СПД-2024-001',
      status: 'active',
      amount: 20000,
      scope: 'Монтаж водосточной системы 30 п.м.',
      startDate: '2024-03-18T09:00:00Z',
      endDate: '2024-03-20T18:00:00Z',
      signedAt: '2024-03-17T15:00:00Z',
      documentUrl: '#',
      createdAt: '2024-03-17T14:00:00Z',
      updatedAt: '2024-03-17T15:00:00Z'
    },
    {
      id: 'CON-002',
      installerId: 'INS-002',
      installerName: 'Дмитрий Сидоров',
      orderId: 'ORD-005',
      contractNumber: 'СПД-2024-002',
      status: 'signed',
      amount: 15000,
      scope: 'Установка снегозадержателей 20 шт.',
      startDate: '2024-03-19T09:00:00Z',
      endDate: '2024-03-21T18:00:00Z',
      signedAt: '2024-03-17T16:30:00Z',
      documentUrl: '#',
      createdAt: '2024-03-17T15:00:00Z',
      updatedAt: '2024-03-17T16:30:00Z'
    },
    {
      id: 'CON-003',
      installerId: 'INS-004',
      installerName: 'Михаил Кузнецов',
      orderId: 'ORD-006',
      contractNumber: 'СПД-2024-003',
      status: 'sent',
      amount: 35000,
      scope: 'Комплексный монтаж водосточной системы и снегозадержателей',
      startDate: '2024-03-20T09:00:00Z',
      endDate: '2024-03-23T18:00:00Z',
      documentUrl: '#',
      createdAt: '2024-03-17T10:00:00Z',
      updatedAt: '2024-03-17T12:00:00Z'
    },
    {
      id: 'CON-004',
      installerId: 'INS-001',
      installerName: 'Алексей Петров',
      orderId: 'ORD-002',
      contractNumber: 'СПД-2024-004',
      status: 'completed',
      amount: 18000,
      scope: 'Монтаж водосточной системы 25 п.м.',
      startDate: '2024-03-10T09:00:00Z',
      endDate: '2024-03-12T18:00:00Z',
      signedAt: '2024-03-09T14:00:00Z',
      documentUrl: '#',
      createdAt: '2024-03-09T13:00:00Z',
      updatedAt: '2024-03-12T18:30:00Z'
    },
    {
      id: 'CON-005',
      installerId: 'INS-003',
      installerName: 'Сергей Иванов',
      orderId: 'ORD-007',
      contractNumber: 'СПД-2024-005',
      status: 'draft',
      amount: 12000,
      scope: 'Монтаж водостоков 15 п.м.',
      startDate: '2024-03-22T09:00:00Z',
      endDate: '2024-03-24T18:00:00Z',
      createdAt: '2024-03-17T17:00:00Z',
      updatedAt: '2024-03-17T17:00:00Z'
    }
  ]);

  const getStatusConfig = (status: SubcontractContract['status']) => {
    const configs = {
      draft: { label: 'Черновик', color: 'bg-gray-500', icon: 'file-text' },
      sent: { label: 'Отправлен', color: 'bg-blue-500', icon: 'send' },
      signed: { label: 'Подписан', color: 'bg-green-500', icon: 'pen-tool' },
      active: { label: 'Активный', color: 'bg-purple-500', icon: 'check-circle' },
      completed: { label: 'Завершен', color: 'bg-teal-500', icon: 'check-check' },
      terminated: { label: 'Расторгнут', color: 'bg-red-500', icon: 'x-circle' }
    };
    return configs[status];
  };

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    draft: contracts.filter(c => c.status === 'draft').length,
    totalAmount: contracts
      .filter(c => c.status === 'active' || c.status === 'signed')
      .reduce((sum, c) => sum + c.amount, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Договоры субподряда</h1>
          <p className="text-gray-600">Управление договорами с монтажниками</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего договоров</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="file-text" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Активных</p>
                <p className="text-3xl font-bold text-purple-600">{stats.active}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="check-circle" size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Черновиков</p>
                <p className="text-3xl font-bold text-gray-600">{stats.draft}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <Icon name="file-edit" size={24} className="text-gray-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Сумма работ</p>
                <p className="text-2xl font-bold text-green-600">{stats.totalAmount.toLocaleString()} ₽</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="wallet" size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Все договоры</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Icon name="plus" size={20} />
              Создать договор
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {contracts.map((contract) => {
              const statusConfig = getStatusConfig(contract.status);

              return (
                <div key={contract.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${statusConfig.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      <Icon name={statusConfig.icon as any} size={24} className={statusConfig.color.replace('bg-', 'text-')} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-gray-900">{contract.contractNumber}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Монтажник: <span className="font-medium text-gray-900">{contract.installerName}</span>
                          </p>
                          <p className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                            Заказ: {contract.orderId}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 mb-1">
                            {contract.amount.toLocaleString()} ₽
                          </p>
                          {contract.signedAt && (
                            <p className="text-xs text-green-600 flex items-center gap-1 justify-end">
                              <Icon name="check" size={12} />
                              Подписан {new Date(contract.signedAt).toLocaleDateString('ru-RU')}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-900 mb-1">Объем работ:</p>
                        <p className="text-sm text-gray-700">{contract.scope}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="calendar" size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-600">Начало: {new Date(contract.startDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="calendar-check" size={16} className="text-gray-400" />
                          <div>
                            <p className="text-gray-600">Окончание: {new Date(contract.endDate).toLocaleDateString('ru-RU')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2">
                          <Icon name="eye" size={16} />
                          Просмотр
                        </button>
                        {contract.documentUrl && (
                          <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium flex items-center gap-2">
                            <Icon name="download" size={16} />
                            Скачать
                          </button>
                        )}
                        {contract.status === 'draft' && (
                          <button className="bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center gap-2">
                            <Icon name="send" size={16} />
                            Отправить
                          </button>
                        )}
                        {contract.status === 'sent' && (
                          <button className="bg-purple-50 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium flex items-center gap-2">
                            <Icon name="pen-tool" size={16} />
                            Подписать
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
