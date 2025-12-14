import { Installer } from '@/types';
import Icon from './ui/icon';

interface InstallerCardProps {
  installer: Installer;
  onSelect?: () => void;
  onViewProfile?: () => void;
}

const InstallerCard = ({ installer, onSelect, onViewProfile }: InstallerCardProps) => {
  const sourceLabels = {
    avito: 'Авито',
    profi: 'Profi.ru',
    manual: 'Добавлен вручную'
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          {installer.avatar ? (
            <img
              src={installer.avatar}
              alt={installer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              {installer.name.charAt(0)}
            </div>
          )}
          {installer.isVerified && (
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
              <Icon name="check" size={12} className="text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-lg text-gray-900">{installer.name}</h3>
            {installer.isAvailable && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                Доступен
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Icon name="star" size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-gray-900">{installer.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-600">
              ({installer.reviewsCount} отзывов)
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">
              {installer.completedJobs} работ
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Icon name="map-pin" size={14} className="text-gray-400" />
            <span>{installer.city}, {installer.region}</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {sourceLabels[installer.source]}
            </span>
            {installer.isVerified && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                <Icon name="shield-check" size={12} />
                Проверен
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {installer.specializations.map((spec, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">Цена за п.м.</p>
            <p className="text-lg font-bold text-gray-900">
              {installer.pricePerMeter.toLocaleString()} ₽
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Опыт работы</p>
            <p className="text-lg font-bold text-gray-900">
              {installer.workExperience} {installer.workExperience === 1 ? 'год' : 'лет'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
        <Icon name="phone" size={14} className="text-gray-400" />
        <a href={`tel:${installer.phone}`} className="text-blue-600 hover:text-blue-700">
          {installer.phone}
        </a>
        {installer.email && (
          <>
            <span className="text-gray-300">•</span>
            <a href={`mailto:${installer.email}`} className="text-blue-600 hover:text-blue-700">
              {installer.email}
            </a>
          </>
        )}
      </div>

      <div className="flex gap-2">
        {onViewProfile && (
          <button
            onClick={onViewProfile}
            className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Профиль
          </button>
        )}
        {onSelect && (
          <button
            onClick={onSelect}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Выбрать
          </button>
        )}
      </div>
    </div>
  );
};

export default InstallerCard;
