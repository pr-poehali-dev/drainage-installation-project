import { useState } from 'react';
import { Installer } from '@/types';
import InstallerCard from '@/components/InstallerCard';
import Icon from '@/components/ui/icon';

const Installers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'avito' | 'profi' | 'manual'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'experience'>('rating');

  const [installers] = useState<Installer[]>([
    {
      id: 'INS-001',
      name: 'Алексей Петров',
      phone: '+7 (999) 111-22-33',
      email: 'petrov@mail.ru',
      city: 'Москва',
      region: 'Московская область',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 4.9,
      reviewsCount: 127,
      completedJobs: 145,
      pricePerMeter: 450,
      pricePerUnit: 800,
      specializations: ['Водостоки', 'Снегозадержатели', 'Кровля'],
      workExperience: 8,
      source: 'avito',
      avitoUrl: 'https://avito.ru/user/12345',
      documents: [],
      isVerified: true,
      isAvailable: true,
      createdAt: '2023-01-15T10:00:00Z',
      lastActiveAt: '2024-03-17T15:30:00Z'
    },
    {
      id: 'INS-002',
      name: 'Дмитрий Сидоров',
      phone: '+7 (999) 222-33-44',
      email: 'sidorov@profi.ru',
      city: 'Санкт-Петербург',
      region: 'Ленинградская область',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 4.8,
      reviewsCount: 89,
      completedJobs: 98,
      pricePerMeter: 420,
      pricePerUnit: 750,
      specializations: ['Водостоки', 'Фасады'],
      workExperience: 5,
      source: 'profi',
      profiUrl: 'https://profi.ru/profile/sidorov',
      documents: [],
      isVerified: true,
      isAvailable: true,
      createdAt: '2023-03-20T10:00:00Z',
      lastActiveAt: '2024-03-17T14:20:00Z'
    },
    {
      id: 'INS-003',
      name: 'Сергей Иванов',
      phone: '+7 (999) 333-44-55',
      city: 'Казань',
      region: 'Республика Татарстан',
      rating: 4.7,
      reviewsCount: 56,
      completedJobs: 62,
      pricePerMeter: 380,
      pricePerUnit: 650,
      specializations: ['Водостоки', 'Снегозадержатели'],
      workExperience: 4,
      source: 'avito',
      avitoUrl: 'https://avito.ru/user/67890',
      documents: [],
      isVerified: false,
      isAvailable: true,
      createdAt: '2023-06-10T10:00:00Z',
      lastActiveAt: '2024-03-17T12:00:00Z'
    },
    {
      id: 'INS-004',
      name: 'Михаил Кузнецов',
      phone: '+7 (999) 444-55-66',
      email: 'kuznetsov@gmail.com',
      city: 'Екатеринбург',
      region: 'Свердловская область',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      rating: 5.0,
      reviewsCount: 203,
      completedJobs: 215,
      pricePerMeter: 500,
      pricePerUnit: 900,
      specializations: ['Водостоки', 'Снегозадержатели', 'Кровля', 'Фасады'],
      workExperience: 12,
      source: 'profi',
      profiUrl: 'https://profi.ru/profile/kuznetsov',
      documents: [],
      isVerified: true,
      isAvailable: false,
      createdAt: '2022-09-01T10:00:00Z',
      lastActiveAt: '2024-03-17T16:45:00Z'
    },
    {
      id: 'INS-005',
      name: 'Андрей Волков',
      phone: '+7 (999) 555-66-77',
      city: 'Новосибирск',
      region: 'Новосибирская область',
      rating: 4.6,
      reviewsCount: 42,
      completedJobs: 48,
      pricePerMeter: 360,
      pricePerUnit: 600,
      specializations: ['Водостоки'],
      workExperience: 3,
      source: 'manual',
      documents: [],
      isVerified: false,
      isAvailable: true,
      createdAt: '2023-11-05T10:00:00Z',
      lastActiveAt: '2024-03-16T09:30:00Z'
    },
    {
      id: 'INS-006',
      name: 'Владимир Соколов',
      phone: '+7 (999) 666-77-88',
      email: 'sokolov@mail.ru',
      city: 'Краснодар',
      region: 'Краснодарский край',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      rating: 4.9,
      reviewsCount: 78,
      completedJobs: 84,
      pricePerMeter: 410,
      pricePerUnit: 720,
      specializations: ['Водостоки', 'Снегозадержатели'],
      workExperience: 6,
      source: 'avito',
      avitoUrl: 'https://avito.ru/user/54321',
      documents: [],
      isVerified: true,
      isAvailable: true,
      createdAt: '2023-04-12T10:00:00Z',
      lastActiveAt: '2024-03-17T11:15:00Z'
    }
  ]);

  const cities = ['all', ...Array.from(new Set(installers.map(i => i.city)))];

  const filteredInstallers = installers
    .filter(installer => {
      const matchesSearch = installer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        installer.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = cityFilter === 'all' || installer.city === cityFilter;
      const matchesSource = sourceFilter === 'all' || installer.source === sourceFilter;
      return matchesSearch && matchesCity && matchesSource;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.pricePerMeter - b.pricePerMeter;
      if (sortBy === 'experience') return b.workExperience - a.workExperience;
      return 0;
    });

  const stats = {
    total: installers.length,
    verified: installers.filter(i => i.isVerified).length,
    available: installers.filter(i => i.isAvailable).length,
    avgRating: (installers.reduce((sum, i) => sum + i.rating, 0) / installers.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">База монтажников</h1>
          <p className="text-gray-600">Проверенные специалисты из Авито и Profi.ru по всей России</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Всего монтажников</p>
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
                <p className="text-sm text-gray-600 mb-1">Проверенных</p>
                <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Icon name="shield-check" size={24} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Доступно сейчас</p>
                <p className="text-3xl font-bold text-purple-600">{stats.available}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Icon name="check-circle" size={24} className="text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Средний рейтинг</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.avgRating}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Icon name="star" size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Icon name="search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по имени или городу..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все города</option>
              {cities.filter(c => c !== 'all').map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все источники</option>
              <option value="avito">Авито</option>
              <option value="profi">Profi.ru</option>
              <option value="manual">Добавлены вручную</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="rating">По рейтингу</option>
              <option value="price">По цене</option>
              <option value="experience">По опыту</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Найдено: <span className="font-bold text-gray-900">{filteredInstallers.length}</span> монтажников
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="user-plus" size={20} />
            Добавить монтажника
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstallers.map(installer => (
            <InstallerCard key={installer.id} installer={installer} />
          ))}
        </div>

        {filteredInstallers.length === 0 && (
          <div className="text-center py-12">
            <Icon name="users-x" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Монтажники не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Installers;
