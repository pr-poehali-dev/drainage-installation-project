import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { Order, Product } from '@/components/types';
import DashboardTab from '@/components/DashboardTab';
import OrdersTab from '@/components/OrdersTab';
import CatalogTab from '@/components/CatalogTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([
    { id: 'AVT-2301', client: 'Иванов Петр', phone: '+7 999 123-45-67', address: 'ул. Ленина, 45', status: 'new', amount: 0, date: '2024-12-14', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2302', client: 'ООО "СтройМастер"', phone: '+7 999 234-56-78', address: 'пр. Победы, 12', status: 'estimate', amount: 185000, date: '2024-12-13', product: 'Водосточная система' },
    { id: 'AVT-2303', client: 'Сидорова Анна', phone: '+7 999 345-67-89', address: 'ул. Садовая, 8', status: 'paid', amount: 95000, date: '2024-12-12', product: 'Снегозадержатели' },
    { id: 'AVT-2304', client: 'Петров Игорь', phone: '+7 999 456-78-90', address: 'ул. Мира, 23', status: 'delivery', amount: 220000, date: '2024-12-11', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2305', client: 'ИП Кузнецов', phone: '+7 999 567-89-01', address: 'ул. Кирова, 67', status: 'installation', amount: 150000, date: '2024-12-10', product: 'Водосточная система' },
  ]);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [avitoUrl, setAvitoUrl] = useState('');
  const [importLoading, setImportLoading] = useState(false);

  const products: Product[] = [
    { id: 'P001', name: 'Водосточная система металл 125мм', category: 'gutter', price: 1200, unit: 'м.п.', description: 'Металлический водосток диаметром 125мм' },
    { id: 'P002', name: 'Водосточная система пластик 125мм', category: 'gutter', price: 850, unit: 'м.п.', description: 'Пластиковый водосток диаметром 125мм' },
    { id: 'P003', name: 'Снегозадержатель трубчатый 3м', category: 'snow-guard', price: 2500, unit: 'шт', description: 'Трубчатый снегозадержатель длиной 3 метра' },
    { id: 'P004', name: 'Снегозадержатель уголковый 2м', category: 'snow-guard', price: 1800, unit: 'шт', description: 'Уголковый снегозадержатель длиной 2 метра' },
  ];

  const handleImportFromAvito = () => {
    if (!avitoUrl.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Введите URL объявления Авито',
        variant: 'destructive',
      });
      return;
    }

    setImportLoading(true);
    
    setTimeout(() => {
      const newOrderId = `AVT-${2300 + orders.length + 1}`;
      const mockOrder: Order = {
        id: newOrderId,
        client: 'Смирнов Алексей',
        phone: '+7 999 678-90-12',
        address: 'ул. Строителей, 34',
        status: 'new',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        product: 'Водосток + Снегозадержатели',
      };
      
      setOrders([mockOrder, ...orders]);
      setImportLoading(false);
      setIsImportDialogOpen(false);
      setAvitoUrl('');
      
      toast({
        title: 'Заявка импортирована!',
        description: `Заказ ${newOrderId} успешно добавлен из Авито`,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-xl">
                <Icon name="Droplets" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  АкваСток Про
                </h1>
                <p className="text-sm text-muted-foreground">Маркетплейс водосточных систем</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-white font-semibold">ПИ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <Icon name="Package" size={16} />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="ShoppingCart" size={16} />
              Каталог
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab 
              orders={orders}
              isImportDialogOpen={isImportDialogOpen}
              setIsImportDialogOpen={setIsImportDialogOpen}
              avitoUrl={avitoUrl}
              setAvitoUrl={setAvitoUrl}
              importLoading={importLoading}
              handleImportFromAvito={handleImportFromAvito}
            />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab products={products} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
