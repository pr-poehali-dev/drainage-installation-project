import { useState } from 'react';
import { Payment } from '@/types';
import Icon from '@/components/ui/icon';

const Payments = () => {
  const [payments] = useState<Payment[]>([
    {
      id: 'PAY-001',
      orderId: 'ORD-002',
      fromUserId: 'CLIENT-2',
      toUserId: 'CONTRACTOR-1',
      amount: 42000,
      type: 'client_to_contractor',
      status: 'completed',
      date: '2024-03-16T15:30:00Z',
      method: 'Банковский перевод'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-003',
      fromUserId: 'CLIENT-3',
      toUserId: 'CONTRACTOR-1',
      amount: 70000,
      type: 'client_to_contractor',
      status: 'completed',
      date: '2024-03-14T12:00:00Z',
      method: 'Наличные'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-003',
      fromUserId: 'CONTRACTOR-1',
      toUserId: 'SUPPLIER-1',
      amount: 45000,
      type: 'contractor_to_supplier',
      status: 'completed',
      date: '2024-03-14T16:00:00Z',
      method: 'Банковский перевод'
    },
    {
      id: 'PAY-004',
      orderId: 'ORD-003',
      fromUserId: 'CONTRACTOR-1',
      toUserId: 'SUBCONTRACTOR-1',
      amount: 20000,
      type: 'contractor_to_subcontractor',
      status: 'pending',
      date: '2024-03-17T10:00:00Z',
      method: 'Банковский перевод'
    }
  ]);

  const getPaymentTypeLabel = (type: Payment['type']) => {
    const labels = {
      client_to_contractor: 'Клиент → Подрядчик',
      contractor_to_supplier: 'Подрядчик → Поставщик',
      contractor_to_subcontractor: 'Подрядчик → Субподряд'
    };
    return labels[type];
  };

  const totalIncome = payments
    .filter(p => p.type === 'client_to_contractor' && p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalExpenses = payments
    .filter(p => 
      (p.type === 'contractor_to_supplier' || p.type === 'contractor_to_subcontractor') && 
      p.status === 'completed'
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = payments.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Платежи</h1>
          <p className="text-gray-600">История финансовых операций</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Поступления</p>
                <p className="text-3xl font-bold text-green-600">{totalIncome.toLocaleString()} ₽</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="trending-up" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Расходы</p>
                <p className="text-3xl font-bold text-red-600">{totalExpenses.toLocaleString()} ₽</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <Icon name="trending-down" size={24} className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ожидают оплаты</p>
                <p className="text-3xl font-bold text-orange-600">{pendingPayments}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="clock" size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Все транзакции</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID платежа
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Заказ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Тип операции
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Способ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">{payment.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        {payment.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700">{getPaymentTypeLabel(payment.type)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`font-bold ${
                        payment.type === 'client_to_contractor' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {payment.type === 'client_to_contractor' ? '+' : '-'}
                        {payment.amount.toLocaleString()} ₽
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.method || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status === 'completed' ? 'Завершен' : payment.status === 'pending' ? 'Ожидает' : 'Отменен'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(payment.date).toLocaleString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
