import { useState } from 'react';
import Icon from '@/components/ui/icon';

const InstallerImport = () => {
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [source, setSource] = useState<'avito' | 'profi'>('avito');

  const [importHistory] = useState([
    {
      id: '1',
      source: 'avito' as const,
      url: 'https://www.avito.ru/moskva/predlozheniya_uslug/montazh_vodostokov-12345',
      installerName: 'Алексей Петров',
      city: 'Москва',
      phone: '+7 (999) 111-22-33',
      rating: 4.9,
      reviewsCount: 127,
      price: 450,
      importedAt: '2024-03-15T10:00:00Z',
      status: 'success' as const
    },
    {
      id: '2',
      source: 'profi' as const,
      url: 'https://profi.ru/profile/sidorov-dmitriy',
      installerName: 'Дмитрий Сидоров',
      city: 'Санкт-Петербург',
      phone: '+7 (999) 222-33-44',
      rating: 4.8,
      reviewsCount: 89,
      price: 420,
      importedAt: '2024-03-16T09:00:00Z',
      status: 'success' as const
    },
    {
      id: '3',
      source: 'avito' as const,
      url: 'https://www.avito.ru/kazan/predlozheniya_uslug/krovelnye_raboty-67890',
      installerName: 'Сергей Иванов',
      city: 'Казань',
      phone: '+7 (999) 333-44-55',
      rating: 4.7,
      reviewsCount: 56,
      price: 380,
      importedAt: '2024-03-16T14:00:00Z',
      status: 'success' as const
    }
  ]);

  const handleImport = () => {
    if (!importUrl.trim()) return;
    
    setIsImporting(true);
    
    setTimeout(() => {
      setImportUrl('');
      setIsImporting(false);
    }, 2500);
  };

  const sourceIcons = {
    avito: 'external-link',
    profi: 'briefcase'
  };

  const sourceColors = {
    avito: 'bg-purple-100 text-purple-700',
    profi: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Импорт монтажников</h1>
          <p className="text-gray-600">Автоматическая загрузка специалистов из Авито и Profi.ru</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="external-link" size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Импорт из Авито</h2>
                <p className="text-sm text-gray-600">Загрузка профилей мастеров</p>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <div className="flex gap-2 mb-2">
                <Icon name="info" size={20} className="text-purple-600 flex-shrink-0" />
                <div className="text-sm text-purple-900">
                  <p className="font-medium mb-1">Что извлекается:</p>
                  <ul className="list-disc list-inside space-y-1 text-purple-800">
                    <li>Имя и контактные данные</li>
                    <li>Город работы</li>
                    <li>Рейтинг и количество отзывов</li>
                    <li>Цены на услуги</li>
                    <li>Описание и опыт работы</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSource('avito')}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                source === 'avito'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Выбрать источник Авито
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Icon name="briefcase" size={24} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Импорт из Profi.ru</h2>
                <p className="text-sm text-gray-600">Загрузка профилей специалистов</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex gap-2 mb-2">
                <Icon name="info" size={20} className="text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-medium mb-1">Что извлекается:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>Имя и контакты</li>
                    <li>Регион работы</li>
                    <li>Оценки клиентов</li>
                    <li>Стоимость работ</li>
                    <li>Портфолио и сертификаты</li>
                  </ul>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSource('profi')}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                source === 'profi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Выбрать источник Profi.ru
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-lg ${source === 'avito' ? 'bg-purple-100' : 'bg-blue-100'}`}>
              <Icon name={sourceIcons[source] as any} size={24} className={source === 'avito' ? 'text-purple-600' : 'text-blue-600'} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Импортировать специалиста</h2>
              <p className="text-sm text-gray-600">
                Источник: <span className="font-medium">{source === 'avito' ? 'Авито' : 'Profi.ru'}</span>
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder={source === 'avito' ? 'https://www.avito.ru/...' : 'https://profi.ru/profile/...'}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isImporting}
            />
            <button
              onClick={handleImport}
              disabled={isImporting || !importUrl.trim()}
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
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">История импорта</h2>
            <span className="text-sm text-gray-600">
              Всего импортировано: <span className="font-bold text-gray-900">{importHistory.length}</span>
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {importHistory.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${sourceColors[item.source]}`}>
                        {item.source === 'avito' ? 'Авито' : 'Profi.ru'}
                      </span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                      >
                        Открыть профиль
                        <Icon name="arrow-up-right" size={14} />
                      </a>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.installerName}</h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="map-pin" size={16} className="text-gray-400" />
                        <span className="text-gray-700">{item.city}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="phone" size={16} className="text-gray-400" />
                        <span className="text-gray-700">{item.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="star" size={16} className="text-yellow-500" />
                        <span className="text-gray-700 font-medium">{item.rating} ({item.reviewsCount})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="wallet" size={16} className="text-gray-400" />
                        <span className="text-gray-700 font-medium">{item.price} ₽/п.м.</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right ml-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 mb-2">
                      <Icon name="check-circle" size={14} className="mr-1" />
                      Успешно
                    </span>
                    <p className="text-xs text-gray-500">
                      {new Date(item.importedAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                </div>

                <button className="mt-3 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  Посмотреть в базе
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallerImport;
