import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Order {
  id: string;
  client: string;
  phone: string;
  address: string;
  status: 'new' | 'estimate' | 'paid' | 'delivery' | 'installation' | 'completed';
  amount: number;
  date: string;
  product: string;
}

interface Product {
  id: string;
  name: string;
  category: 'gutter' | 'snow-guard';
  price: number;
  unit: string;
  description: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const orders: Order[] = [
    { id: 'AVT-2301', client: 'Иванов Петр', phone: '+7 999 123-45-67', address: 'ул. Ленина, 45', status: 'new', amount: 0, date: '2024-12-14', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2302', client: 'ООО "СтройМастер"', phone: '+7 999 234-56-78', address: 'пр. Победы, 12', status: 'estimate', amount: 185000, date: '2024-12-13', product: 'Водосточная система' },
    { id: 'AVT-2303', client: 'Сидорова Анна', phone: '+7 999 345-67-89', address: 'ул. Садовая, 8', status: 'paid', amount: 95000, date: '2024-12-12', product: 'Снегозадержатели' },
    { id: 'AVT-2304', client: 'Петров Игорь', phone: '+7 999 456-78-90', address: 'ул. Мира, 23', status: 'delivery', amount: 220000, date: '2024-12-11', product: 'Водосток + Снегозадержатели' },
    { id: 'AVT-2305', client: 'ИП Кузнецов', phone: '+7 999 567-89-01', address: 'ул. Кирова, 67', status: 'installation', amount: 150000, date: '2024-12-10', product: 'Водосточная система' },
  ];

  const products: Product[] = [
    { id: 'P001', name: 'Водосточная система металл 125мм', category: 'gutter', price: 1200, unit: 'м.п.', description: 'Металлический водосток диаметром 125мм' },
    { id: 'P002', name: 'Водосточная система пластик 125мм', category: 'gutter', price: 850, unit: 'м.п.', description: 'Пластиковый водосток диаметром 125мм' },
    { id: 'P003', name: 'Снегозадержатель трубчатый 3м', category: 'snow-guard', price: 2500, unit: 'шт', description: 'Трубчатый снегозадержатель длиной 3 метра' },
    { id: 'P004', name: 'Снегозадержатель уголковый 2м', category: 'snow-guard', price: 1800, unit: 'шт', description: 'Уголковый снегозадержатель длиной 2 метра' },
  ];

  const getStatusConfig = (status: Order['status']) => {
    const configs = {
      new: { label: 'Новая заявка', color: 'bg-blue-500', icon: 'FileText' },
      estimate: { label: 'Смета готова', color: 'bg-purple-500', icon: 'Calculator' },
      paid: { label: 'Оплачено', color: 'bg-green-500', icon: 'CreditCard' },
      delivery: { label: 'Доставка', color: 'bg-orange-500', icon: 'Truck' },
      installation: { label: 'Монтаж', color: 'bg-yellow-500', icon: 'Wrench' },
      completed: { label: 'Завершено', color: 'bg-gray-500', icon: 'CheckCircle' },
    };
    return configs[status];
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

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Новые заявки</CardDescription>
                  <CardTitle className="text-3xl font-bold text-primary">12</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span>+3 за сегодня</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>В работе</CardDescription>
                  <CardTitle className="text-3xl font-bold text-secondary">8</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Activity" size={16} />
                    <span>5 на монтаже</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Выручка за месяц</CardDescription>
                  <CardTitle className="text-3xl font-bold text-accent">2.4М ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Icon name="TrendingUp" size={16} />
                    <span>+18% к прошлому</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardDescription>Завершено</CardDescription>
                  <CardTitle className="text-3xl font-bold text-green-600">45</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="CheckCircle" size={16} />
                    <span>За месяц</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} />
                    Активность продаж
                  </CardTitle>
                  <CardDescription>Динамика заказов за последние 7 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => {
                      const values = [45, 62, 38, 71, 55, 48, 58];
                      return (
                        <div key={day} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{day}</span>
                            <span className="text-muted-foreground">{values[idx]}%</span>
                          </div>
                          <Progress value={values[idx]} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={20} />
                    Рейтинг участников
                  </CardTitle>
                  <CardDescription>Топ исполнителей</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-4">
                      {[
                        { name: 'ООО "МонтажПро"', rating: 4.9, orders: 28 },
                        { name: 'ИП Кузнецов', rating: 4.8, orders: 24 },
                        { name: 'СтройАльянс', rating: 4.7, orders: 19 },
                        { name: 'Мастер Кровли', rating: 4.6, orders: 15 },
                        { name: 'ЭлитСтрой', rating: 4.5, orders: 12 },
                      ].map((contractor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{contractor.name}</p>
                              <p className="text-xs text-muted-foreground">{contractor.orders} заказов</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-sm">{contractor.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Package" size={24} />
                      Управление заказами
                    </CardTitle>
                    <CardDescription>Отслеживайте все этапы от заявки до монтажа</CardDescription>
                  </div>
                  <Button className="gap-2">
                    <Icon name="Plus" size={16} />
                    Новый заказ
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                      <Card key={order.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                            <div className="lg:col-span-2">
                              <div className="flex items-start gap-3">
                                <div className={`${statusConfig.color} p-2 rounded-lg`}>
                                  <Icon name={statusConfig.icon as any} size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{order.id}</h3>
                                    <Badge variant="secondary">{statusConfig.label}</Badge>
                                  </div>
                                  <p className="text-sm font-semibold text-foreground">{order.client}</p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                    <Icon name="Phone" size={14} />
                                    {order.phone}
                                  </p>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Icon name="MapPin" size={14} />
                                    {order.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">Товар</p>
                              <p className="font-semibold">{order.product}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Icon name="Calendar" size={12} />
                                {order.date}
                              </p>
                            </div>

                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Сумма</p>
                                <p className="text-2xl font-bold text-primary">
                                  {order.amount > 0 ? `${order.amount.toLocaleString()} ₽` : 'Расчет...'}
                                </p>
                              </div>
                              <Button variant="outline" size="sm" className="mt-2">
                                Подробнее
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="catalog" className="animate-fade-in">
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
                                <Button size="sm" className="gap-1">
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Тип водостока</label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                      <option>Металлический</option>
                      <option>Пластиковый</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Снегозадержатели</label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary">
                      <option>Трубчатые</option>
                      <option>Уголковые</option>
                    </select>
                  </div>

                  <Separator />

                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Материалы:</span>
                      <span className="font-semibold">156 000 ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Монтаж:</span>
                      <span className="font-semibold">45 000 ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Доставка:</span>
                      <span className="font-semibold">8 000 ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Итого:</span>
                      <span className="text-2xl font-bold text-primary">209 000 ₽</span>
                    </div>
                  </div>

                  <Button className="w-full gap-2" size="lg">
                    <Icon name="FileText" size={16} />
                    Создать смету
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
