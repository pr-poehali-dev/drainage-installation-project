import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Product } from './types';

interface CatalogTabProps {
  products: Product[];
}

const CatalogTab = ({ products }: CatalogTabProps) => {
  const [area, setArea] = useState<number>(0);
  const [gutterType, setGutterType] = useState('metal');
  const [snowGuardType, setSnowGuardType] = useState('tube');
  const [cartItems, setCartItems] = useState<string[]>([]);

  const calculateEstimate = () => {
    const baseArea = area || 100;
    const gutterPrice = gutterType === 'metal' ? 1200 : 850;
    const snowGuardPrice = snowGuardType === 'tube' ? 2500 : 1800;
    
    const materials = Math.round(baseArea * gutterPrice * 0.13);
    const installation = Math.round(materials * 0.29);
    const delivery = 8000;
    
    return { materials, installation, delivery, total: materials + installation + delivery };
  };

  const estimate = calculateEstimate();

  const handleAddToEstimate = (productName: string) => {
    setCartItems([...cartItems, productName]);
    toast({
      title: 'Добавлено в смету!',
      description: `${productName} добавлен в калькулятор`,
    });
  };

  const handleCreateEstimate = () => {
    if (area === 0) {
      toast({
        title: 'Ошибка',
        description: 'Укажите площадь кровли',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Смета создана!',
      description: `Общая стоимость: ${estimate.total.toLocaleString()} ₽. Смета отправлена клиенту.`,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="ShoppingCart" size={24} />
              Каталог продукции
            </CardTitle>
            <CardDescription>Водосточные системы и снегозадержатели</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow border-2 hover:border-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`${product.category === 'gutter' ? 'bg-blue-100' : 'bg-orange-100'} p-3 rounded-lg`}>
                        <Icon 
                          name={product.category === 'gutter' ? 'Droplets' : 'Shield'} 
                          size={24}
                          className={product.category === 'gutter' ? 'text-blue-600' : 'text-orange-600'}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{product.name}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                            <p className="text-xs text-muted-foreground">за {product.unit}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handleAddToEstimate(product.name)}
                          >
                            <Icon name="Plus" size={14} />
                            В смету
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:sticky lg:top-24 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calculator" size={20} />
              Калькулятор сметы
            </CardTitle>
            <CardDescription>Расчет стоимости проекта</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Площадь кровли (м²)</label>
              <input 
                type="number" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Введите площадь"
                value={area || ''}
                onChange={(e) => setArea(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Тип водостока</label>
              <select 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                value={gutterType}
                onChange={(e) => setGutterType(e.target.value)}
              >
                <option value="metal">Металлический</option>
                <option value="plastic">Пластиковый</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Снегозадержатели</label>
              <select 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                value={snowGuardType}
                onChange={(e) => setSnowGuardType(e.target.value)}
              >
                <option value="tube">Трубчатые</option>
                <option value="corner">Уголковые</option>
              </select>
            </div>

            <Separator />

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Материалы:</span>
                <span className="font-semibold">{estimate.materials.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Монтаж:</span>
                <span className="font-semibold">{estimate.installation.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Доставка:</span>
                <span className="font-semibold">{estimate.delivery.toLocaleString()} ₽</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-bold">Итого:</span>
                <span className="text-2xl font-bold text-primary">{estimate.total.toLocaleString()} ₽</span>
              </div>
            </div>

            <Button className="w-full gap-2" size="lg" onClick={handleCreateEstimate}>
              <Icon name="FileText" size={16} />
              Создать смету
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CatalogTab;