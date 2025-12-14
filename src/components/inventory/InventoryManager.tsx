import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { InventoryItem, Product } from '@/types.ts';

interface InventoryManagerProps {
  inventory: InventoryItem[];
  products: Product[];
  onReorder: (itemId: string) => void;
}

const InventoryManager = ({ inventory, products, onReorder }: InventoryManagerProps) => {
  const getProduct = (productId: string) => products.find(p => p.id === productId);

  const getLowStockItems = () => inventory.filter(item => item.available <= item.minStock);
  const getOutOfStockItems = () => inventory.filter(item => item.available === 0);

  const lowStockItems = getLowStockItems();
  const outOfStockItems = getOutOfStockItems();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Package" size={20} />
              Склад и остатки
            </CardTitle>
            <CardDescription>Управление товарными запасами</CardDescription>
          </div>
          <div className="flex gap-2">
            {outOfStockItems.length > 0 && (
              <Badge variant="destructive">
                <Icon name="AlertCircle" size={12} className="mr-1" />
                {outOfStockItems.length} нет в наличии
              </Badge>
            )}
            {lowStockItems.length > 0 && (
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                <Icon name="AlertTriangle" size={12} className="mr-1" />
                {lowStockItems.length} заканчиваются
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventory.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;

            const stockPercent = (item.available / (item.quantity || 1)) * 100;
            const isLowStock = item.available <= item.minStock;
            const isOutOfStock = item.available === 0;

            return (
              <div key={item.id} className="p-4 rounded-lg border bg-card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      {isOutOfStock && (
                        <Badge variant="destructive" className="text-xs">
                          Нет в наличии
                        </Badge>
                      )}
                      {isLowStock && !isOutOfStock && (
                        <Badge variant="secondary" className="text-xs bg-yellow-500 text-white">
                          Мало товара
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Производитель: {product.manufacturer || 'Не указан'}
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    variant={isLowStock ? "default" : "outline"}
                    onClick={() => onReorder(item.id)}
                  >
                    <Icon name="ShoppingCart" size={14} className="mr-1" />
                    Заказать
                  </Button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Всего</p>
                    <p className="font-semibold">{item.quantity} {product.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Зарезервировано</p>
                    <p className="font-semibold text-orange-600">{item.reserved} {product.unit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Доступно</p>
                    <p className={`font-semibold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-yellow-600' : 'text-green-600'}`}>
                      {item.available} {product.unit}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Мин. остаток</p>
                    <p className="font-semibold">{item.minStock} {product.unit}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Заполненность склада</span>
                    <span className="font-medium">{stockPercent.toFixed(0)}%</span>
                  </div>
                  <Progress 
                    value={stockPercent} 
                    className={`h-2 ${isOutOfStock ? '[&>div]:bg-red-500' : isLowStock ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'}`}
                  />
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {item.location}
                  </span>
                  <span>Обновлено: {item.lastUpdated}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryManager;