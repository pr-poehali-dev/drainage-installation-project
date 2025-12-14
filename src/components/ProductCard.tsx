import { Product } from '@/types';
import Icon from './ui/icon';

interface ProductCardProps {
  product: Product;
  onSelect?: () => void;
}

const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const categoryLabel = product.category === 'gutter' ? 'Водосток' : 'Снегозадержатель';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all">
      {product.image && (
        <div className="h-48 bg-gray-100 relative">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium">
                Нет в наличии
              </span>
            </div>
          )}
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {categoryLabel}
          </span>
          {product.inStock && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
              <Icon name="check-circle" size={12} />
              В наличии
            </span>
          )}
        </div>

        <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        <div className="space-y-1 text-sm text-gray-700 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="box" size={14} className="text-gray-400" />
            <span>{product.material}</span>
          </div>
          {product.color && (
            <div className="flex items-center gap-2">
              <Icon name="palette" size={14} className="text-gray-400" />
              <span>{product.color}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <div className="text-2xl font-bold text-gray-900">{product.price.toLocaleString()} ₽</div>
            <div className="text-xs text-gray-500">за {product.unit}</div>
          </div>
          {onSelect && product.inStock && (
            <button
              onClick={onSelect}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Выбрать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
