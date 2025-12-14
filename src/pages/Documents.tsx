import { useState } from 'react';
import { Document } from '@/types';
import Icon from '@/components/ui/icon';

const Documents = () => {
  const [documents] = useState<Document[]>([
    {
      id: 'DOC-001',
      orderId: 'ORD-002',
      type: 'contract',
      name: 'Договор подряда ORD-002.pdf',
      url: '#',
      uploadedAt: '2024-03-16T14:00:00Z',
      uploadedBy: 'Подрядчик',
      signed: true,
      signedBy: ['Клиент', 'Подрядчик']
    },
    {
      id: 'DOC-002',
      orderId: 'ORD-003',
      type: 'contract',
      name: 'Договор подряда ORD-003.pdf',
      url: '#',
      uploadedAt: '2024-03-14T11:00:00Z',
      uploadedBy: 'Подрядчик',
      signed: true,
      signedBy: ['Клиент', 'Подрядчик']
    },
    {
      id: 'DOC-003',
      orderId: 'ORD-003',
      type: 'invoice',
      name: 'Счет на оплату ORD-003.pdf',
      url: '#',
      uploadedAt: '2024-03-14T11:30:00Z',
      uploadedBy: 'Подрядчик',
      signed: false
    },
    {
      id: 'DOC-004',
      orderId: 'ORD-003',
      type: 'delivery_note',
      name: 'Товарная накладная от поставщика.pdf',
      url: '#',
      uploadedAt: '2024-03-15T09:00:00Z',
      uploadedBy: 'Поставщик',
      signed: true,
      signedBy: ['Поставщик', 'Подрядчик']
    },
    {
      id: 'DOC-005',
      orderId: 'ORD-003',
      type: 'act',
      name: 'Акт выполненных работ ORD-003.pdf',
      url: '#',
      uploadedAt: '2024-03-17T16:00:00Z',
      uploadedBy: 'Субподрядчик',
      signed: false
    }
  ]);

  const getDocumentTypeLabel = (type: Document['type']) => {
    const labels = {
      contract: 'Договор',
      act: 'Акт',
      invoice: 'Счет',
      delivery_note: 'Накладная'
    };
    return labels[type];
  };

  const getDocumentTypeIcon = (type: Document['type']) => {
    const icons = {
      contract: 'file-text',
      act: 'file-check',
      invoice: 'receipt',
      delivery_note: 'truck'
    };
    return icons[type];
  };

  const getDocumentTypeColor = (type: Document['type']) => {
    const colors = {
      contract: 'bg-blue-100 text-blue-700',
      act: 'bg-green-100 text-green-700',
      invoice: 'bg-purple-100 text-purple-700',
      delivery_note: 'bg-orange-100 text-orange-700'
    };
    return colors[type];
  };

  const totalDocuments = documents.length;
  const signedDocuments = documents.filter(d => d.signed).length;
  const pendingSignature = documents.filter(d => !d.signed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Документы</h1>
          <p className="text-gray-600">Договоры, акты и накладные</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего документов</p>
                <p className="text-3xl font-bold text-gray-900">{totalDocuments}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="files" size={24} className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Подписано</p>
                <p className="text-3xl font-bold text-green-600">{signedDocuments}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="check-circle" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ожидают подписи</p>
                <p className="text-3xl font-bold text-orange-600">{pendingSignature}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Icon name="clock" size={24} className="text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Все документы</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Icon name="upload" size={20} />
              Загрузить документ
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${getDocumentTypeColor(doc.type)}`}>
                    <Icon name={getDocumentTypeIcon(doc.type) as any} size={24} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{doc.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Icon name="tag" size={14} />
                            {getDocumentTypeLabel(doc.type)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="shopping-bag" size={14} />
                            {doc.orderId}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="user" size={14} />
                            {doc.uploadedBy}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {doc.signed ? (
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Icon name="check-circle" size={14} />
                            Подписан
                          </div>
                        ) : (
                          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <Icon name="clock" size={14} />
                            Ожидает подписи
                          </div>
                        )}
                      </div>
                    </div>

                    {doc.signed && doc.signedBy && (
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          Подписали: {doc.signedBy.join(', ')}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        <Icon name="download" size={16} />
                        Скачать
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center gap-1">
                        <Icon name="eye" size={16} />
                        Просмотр
                      </button>
                      {!doc.signed && (
                        <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
                          <Icon name="pen-tool" size={16} />
                          Подписать
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Загружен: {new Date(doc.uploadedAt).toLocaleString('ru-RU')}
                    </p>
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

export default Documents;
