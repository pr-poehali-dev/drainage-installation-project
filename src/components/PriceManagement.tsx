import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/types';

interface PriceManagementProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

const PriceManagement = ({ products, onUpdateProducts }: PriceManagementProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'gutter',
    unit: 'м.п.',
  });
  const [importUrl, setImportUrl] = useState('');
  const [importing, setImporting] = useState(false);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: 'Ошибка',
        description: 'Заполните название и цену',
        variant: 'destructive',
      });
      return;
    }

    const product: Product = {
      id: `P${(products.length + 1).toString().padStart(3, '0')}`,
      name: newProduct.name!,
      category: newProduct.category as 'gutter' | 'snow-guard',
      price: newProduct.price!,
      wholesalePrice: newProduct.wholesalePrice,
      unit: newProduct.unit!,
      description: newProduct.description || '',
      manufacturer: newProduct.manufacturer,
    };

    onUpdateProducts([...products, product]);
    setIsAddDialogOpen(false);
    setNewProduct({ category: 'gutter', unit: 'м.п.' });

    toast({
      title: 'Товар добавлен!',
      description: `${product.name} успешно добавлен в каталог`,
    });
  };

  const handleImportPrices = () => {
    if (!importUrl.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите URL прайс-листа производителя',
        variant: 'destructive',
      });
      return;
    }

    setImporting(true);

    setTimeout(() => {
      const mockImportedProducts: Product[] = [
        {
          id: `P${(products.length + 1).toString().padStart(3, '0')}`,
          name: 'Водосток Металл Профиль 125мм',
          category: 'gutter',
          price: 1350,
          wholesalePrice: 1100,
          unit: 'м.п.',
          description: 'Металлический водосток премиум класса',
          manufacturer: 'Металл Профиль',
        },
        {
          id: `P${(products.length + 2).toString().padStart(3, '0')}`,
          name: 'Снегозадержатель Grand Line 3м',
          category: 'snow-guard',
          price: 2800,
          wholesalePrice: 2300,
          unit: 'шт',
          description: 'Трубчатый снегозадержатель от Grand Line',
          manufacturer: 'Grand Line',
        },
      ];

      onUpdateProducts([...products, ...mockImportedProducts]);
      setImporting(false);
      setIsImportDialogOpen(false);
      setImportUrl('');

      toast({
        title: 'Прайс импортирован!',
        description: `Добавлено ${mockImportedProducts.length} новых товаров`,
      });
    }, 2000);
  };

  const handleUpdatePrice = (productId: string, field: 'price' | 'wholesalePrice', value: number) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, [field]: value } : p
    );
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    onUpdateProducts(updated);
    toast({
      title: 'Товар удален',
      description: 'Товар удален из каталога',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Управление прайсами</h3>
          <p className="text-sm text-muted-foreground">Розничные и оптовые цены</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Icon name="Download" size={16} />
                Импорт прайса
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Icon name="Download" size={20} />
                  Импорт прайс-листа
                </DialogTitle>
                <DialogDescription>
                  Автоматическая загрузка цен от производителей
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Производитель</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите производителя" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metallprofil">Металл Профиль</SelectItem>
                      <SelectItem value="grandline">Grand Line</SelectItem>
                      <SelectItem value="docke">Docke</SelectItem>
                      <SelectItem value="aquasystem">Аквасистем</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>URL прайс-листа (опционально)</Label>
                  <Input
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    placeholder="https://example.com/price.xlsx"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900 font-medium mb-2">Что импортируется:</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Розничные цены</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Оптовые цены</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                      <span>Наименования и артикулы</span>
                    </li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleImportPrices} disabled={importing}>
                  {importing ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Импортируем...
                    </>
                  ) : (
                    <>
                      <Icon name="Download" size={16} className="mr-2" />
                      Импортировать
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Icon name="Plus" size={16} />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить товар вручную</DialogTitle>
                <DialogDescription>Введите данные товара</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Название</Label>
                  <Input
                    value={newProduct.name || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Водосточная система 125мм"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Категория</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gutter">Водостоки</SelectItem>
                        <SelectItem value="snow-guard">Снегозадержатели</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Единица измерения</Label>
                    <Input
                      value={newProduct.unit || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
                      placeholder="м.п., шт"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Розничная цена (₽)</Label>
                    <Input
                      type="number"
                      value={newProduct.price || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Оптовая цена (₽)</Label>
                    <Input
                      type="number"
                      value={newProduct.wholesalePrice || ''}
                      onChange={(e) => setNewProduct({ ...newProduct, wholesalePrice: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Производитель (опционально)</Label>
                  <Input
                    value={newProduct.manufacturer || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })}
                    placeholder="Металл Профиль"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Описание</Label>
                  <Input
                    value={newProduct.description || ''}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Краткое описание товара"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddProduct}>
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Все товары ({products.length})</TabsTrigger>
          <TabsTrigger value="gutter">
            Водостоки ({products.filter(p => p.category === 'gutter').length})
          </TabsTrigger>
          <TabsTrigger value="snow-guard">
            Снегозадержатели ({products.filter(p => p.category === 'snow-guard').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-2">
          {products.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <Badge variant="outline">{product.id}</Badge>
                      {product.manufacturer && (
                        <Badge variant="secondary">{product.manufacturer}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Розница</p>
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleUpdatePrice(product.id, 'price', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Опт</p>
                      <Input
                        type="number"
                        value={product.wholesalePrice || 0}
                        onChange={(e) => handleUpdatePrice(product.id, 'wholesalePrice', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="gutter" className="space-y-2">
          {products.filter(p => p.category === 'gutter').map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <Badge variant="outline">{product.id}</Badge>
                      {product.manufacturer && (
                        <Badge variant="secondary">{product.manufacturer}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Розница</p>
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleUpdatePrice(product.id, 'price', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Опт</p>
                      <Input
                        type="number"
                        value={product.wholesalePrice || 0}
                        onChange={(e) => handleUpdatePrice(product.id, 'wholesalePrice', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="snow-guard" className="space-y-2">
          {products.filter(p => p.category === 'snow-guard').map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <Badge variant="outline">{product.id}</Badge>
                      {product.manufacturer && (
                        <Badge variant="secondary">{product.manufacturer}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Розница</p>
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => handleUpdatePrice(product.id, 'price', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Опт</p>
                      <Input
                        type="number"
                        value={product.wholesalePrice || 0}
                        onChange={(e) => handleUpdatePrice(product.id, 'wholesalePrice', Number(e.target.value))}
                        className="w-28 text-right font-semibold"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceManagement;