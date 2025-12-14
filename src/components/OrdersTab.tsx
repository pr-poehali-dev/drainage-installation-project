import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Order, getStatusConfig, getNextStatus } from './types';

interface OrdersTabProps {
  orders: Order[];
  isImportDialogOpen: boolean;
  setIsImportDialogOpen: (open: boolean) => void;
  avitoUrl: string;
  setAvitoUrl: (url: string) => void;
  importLoading: boolean;
  handleImportFromAvito: () => void;
  isNewOrderDialogOpen: boolean;
  setIsNewOrderDialogOpen: (open: boolean) => void;
  newOrderClient: string;
  setNewOrderClient: (value: string) => void;
  newOrderPhone: string;
  setNewOrderPhone: (value: string) => void;
  newOrderAddress: string;
  setNewOrderAddress: (value: string) => void;
  newOrderProduct: string;
  setNewOrderProduct: (value: string) => void;
  handleCreateNewOrder: () => void;
  handleOrderAction: (orderId: string) => void;
  handleChangeOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

const OrdersTab = ({
  orders,
  isImportDialogOpen,
  setIsImportDialogOpen,
  avitoUrl,
  setAvitoUrl,
  importLoading,
  handleImportFromAvito,
  isNewOrderDialogOpen,
  setIsNewOrderDialogOpen,
  newOrderClient,
  setNewOrderClient,
  newOrderPhone,
  setNewOrderPhone,
  newOrderAddress,
  setNewOrderAddress,
  newOrderProduct,
  setNewOrderProduct,
  handleCreateNewOrder,
  handleOrderAction,
  handleChangeOrderStatus,
}: OrdersTabProps) => {
  return (
    <div className="animate-fade-in">
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
            <div className="flex gap-2">
              <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Icon name="Download" size={16} />
                    Импорт из Авито
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon name="Download" size={20} className="text-blue-600" />
                      </div>
                      Импорт заявки из Авито
                    </DialogTitle>
                    <DialogDescription>
                      Автоматически загружаем номер телефона, ФИО и адрес клиента из объявления
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="avito-url">URL объявления Авито</Label>
                      <Input
                        id="avito-url"
                        placeholder="https://www.avito.ru/..."
                        value={avitoUrl}
                        onChange={(e) => setAvitoUrl(e.target.value)}
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-900 font-medium mb-2">Что импортируется:</p>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                          <span>Телефон клиента из контактов</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                          <span>ФИО из профиля</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                          <span>Адрес объекта из описания</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                          <span>Описание работ</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsImportDialogOpen(false)}
                      disabled={importLoading}
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleImportFromAvito}
                      disabled={importLoading}
                      className="gap-2"
                    >
                      {importLoading ? (
                        <>
                          <Icon name="Loader2" size={16} className="animate-spin" />
                          Импортируем...
                        </>
                      ) : (
                        <>
                          <Icon name="Download" size={16} />
                          Импортировать
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog open={isNewOrderDialogOpen} onOpenChange={setIsNewOrderDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Icon name="Plus" size={16} />
                    Новый заказ
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Icon name="Plus" size={20} className="text-green-600" />
                      </div>
                      Создать новый заказ
                    </DialogTitle>
                    <DialogDescription>
                      Введите данные клиента и информацию о заказе
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="client">ФИО клиента</Label>
                      <Input
                        id="client"
                        placeholder="Иванов Иван Иванович"
                        value={newOrderClient}
                        onChange={(e) => setNewOrderClient(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        placeholder="+7 999 123-45-67"
                        value={newOrderPhone}
                        onChange={(e) => setNewOrderPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Адрес объекта</Label>
                      <Input
                        id="address"
                        placeholder="ул. Пушкина, д. 10"
                        value={newOrderAddress}
                        onChange={(e) => setNewOrderAddress(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Описание работ</Label>
                      <Textarea
                        id="product"
                        placeholder="Водосточная система + Снегозадержатели"
                        value={newOrderProduct}
                        onChange={(e) => setNewOrderProduct(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsNewOrderDialogOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button onClick={handleCreateNewOrder} className="gap-2">
                      <Icon name="Plus" size={16} />
                      Создать заказ
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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
                        <div className="flex gap-2 mt-2">
                          {getNextStatus(order.status) && (
                            <Button
                              size="sm"
                              onClick={() => handleChangeOrderStatus(order.id, getNextStatus(order.status)!)}
                              className="flex-1"
                            >
                              <Icon name="ArrowRight" size={14} className="mr-1" />
                              {getStatusConfig(getNextStatus(order.status)!).label}
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleOrderAction(order.id)}
                          >
                            <Icon name="Eye" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTab;