import { useState } from 'react';
import Icon from '@/components/ui/icon';

const AvitoImport = () => {
  const [avitoUrl, setAvitoUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importHistory, setImportHistory] = useState([
    {
      id: '1',
      url: 'https://www.avito.ru/moskva/predlozheniya_uslug/12345',
      clientName: 'Иван Петров',
      clientPhone: '+7 (999) 123-45-67',
      address: 'г. Москва, ул. Ленина, 15',
      description: 'Требуется расчет водосточной системы',
      importedAt: '2024-03-15T10:00:00Z',
      status: 'processed'
    },
    {
      id: '2',
      url: 'https://www.avito.ru/spb/predlozheniya_uslug/67890',
      clientName: 'Мария Сидорова',
      clientPhone: '+7 (999) 234-56-78',
      address: 'г. Санкт-Петербург, пр. Победы, 42',
      description: 'Монтаж снегозадержателей',
      importedAt: '2024-03-16T09:00:00Z',
      status: 'processed'
    }
  ]);

  const handleImport = () => {
    if (!avitoUrl.trim()) return;
    
    setIsImporting(true);
    
    setTimeout(() => {
      const newImport = {
        id: String(Date.now()),
        url: avitoUrl,
        clientName: 'Новый клиент',
        clientPhone: '+7 (999) 000-00-00',
        address: 'Адрес из объявления',
        description: 'Описание из объявления Авито',
        importedAt: new Date().toISOString(),
        status: 'pending'
      };
      
      setImportHistory([newImport, ...importHistory]);
      setAvitoUrl('');
      setIsImporting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Импорт из Авито</h1>
          <p className="text-gray-600">Автоматический импорт заказов из объявлений Авито</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Icon name="external-link" size={24} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Импортировать заказ</h2>
              <p className="text-sm text-gray-600">Вставьте ссылку на объявление Авито</p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={avitoUrl}
              onChange={(e) => setAvitoUrl(e.target.value)}
              placeholder="https://www.avito.ru/..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isImporting}
            />
            <button
              onClick={handleImport}
              disabled={isImporting || !avitoUrl.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              {isImporting ? (
                <>
                  <Icon name="loader" size={20} className="animate-spin" />
                  Импорт...
                </>
              ) : (
                <>
                  <Icon name="download" size={20} />
                  Импортировать
                </>
              )}
            </button>
          </div>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-2">
              <Icon name="info" size={20} className="text-blue-600 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Как это работает:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Система автоматически извлечет информацию из объявления</li>
                  <li>Создаст новый заказ с данными клиента</li>
                  <li>Вы сможете подготовить смету и связаться с клиентом</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">История импорта</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {importHistory.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      >
                        Объявление Авито
                        <Icon name="arrow-up-right" size={16} />
                      </a>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === 'processed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status === 'processed' ? 'Обработан' : 'В обработке'}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Icon name="user" size={16} className="text-gray-400" />
                        <span className="font-medium">{item.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Icon name="phone" size={16} className="text-gray-400" />
                        <span>{item.clientPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Icon name="map-pin" size={16} className="text-gray-400" />
                        <span>{item.address}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    {new Date(item.importedAt).toLocaleString('ru-RU')}
                  </div>
                </div>
                {item.status === 'processed' && (
                  <button className="mt-3 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    Посмотреть заказ
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvitoImport;
