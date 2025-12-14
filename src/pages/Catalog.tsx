import { useState } from 'react';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';

const Catalog = () => {
  const [filter, setFilter] = useState<'all' | 'gutter' | 'snow_guard'>('all');
  const [products] = useState<Product[]>([
    {
      id: 'P1',
      name: 'Водосток металлический Grand Line',
      category: 'gutter',
      description: 'Водосточная система из оцинкованной стали с полимерным покрытием',
      price: 1450,
      unit: 'п.м.',
      material: 'Оцинкованная сталь',
      color: 'Коричневый RAL 8017',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      supplierId: 'S1',
      inStock: true
    },
    {
      id: 'P2',
      name: 'Водосток пластиковый Docke',
      category: 'gutter',
      description: 'Легкая и практичная водосточная система из ПВХ',
      price: 890,
      unit: 'п.м.',
      material: 'ПВХ',
      color: 'Белый',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
      supplierId: 'S2',
      inStock: true
    },
    {
      id: 'P3',
      name: 'Снегозадержатель трубчатый',
      category: 'snow_guard',
      description: 'Надежная защита от схода снега с крыши',
      price: 1200,
      unit: 'шт',
      material: 'Оцинкованная труба',
      color: 'Любой RAL',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
      supplierId: 'S1',
      inStock: true
    },
    {
      id: 'P4',
      name: 'Снегозадержатель решетчатый',
      category: 'snow_guard',
      description: 'Универсальная решетка для любого типа кровли',
      price: 1580,
      unit: 'шт',
      material: 'Металл',
      color: 'RAL 8017',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400',
      supplierId: 'S1',
      inStock: true
    },
    {
      id: 'P5',
      name: 'Водосток медный Premium',
      category: 'gutter',
      description: 'Элитная водосточная система из натуральной меди',
      price: 3200,
      unit: 'п.м.',
      material: 'Медь',
      color: 'Медный',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400',
      supplierId: 'S3',
      inStock: false
    },
    {
      id: 'P6',
      name: 'Снегозадержатель уголковый',
      category: 'snow_guard',
      description: 'Бюджетное решение для металлочерепицы',
      price: 450,
      unit: 'шт',
      material: 'Оцинкованная сталь',
      color: 'Любой RAL',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400',
      supplierId: 'S2',
      inStock: true
    }
  ]);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Каталог товаров</h1>
          <p className="text-gray-600">Водосточные системы и снегозадержатели</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-3">
            <Icon name="filter" size={20} className="text-gray-600" />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Все товары
              </button>
              <button
                onClick={() => setFilter('gutter')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'gutter'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Водостоки
              </button>
              <button
                onClick={() => setFilter('snow_guard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'snow_guard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Снегозадержатели
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Icon name="package-x" size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Товары не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
