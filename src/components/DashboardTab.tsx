import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';
import FinancialAnalytics from './analytics/FinancialAnalytics';
import BusinessInsights from './analytics/BusinessInsights';
import LiveTrackingWidget from './tracking/LiveTrackingWidget';
import { FinancialStats, Order, Installer, InstallerLocation } from '@/types';

interface DashboardTabProps {
  financialStats: FinancialStats;
  orders?: Order[];
  installers?: Installer[];
  locations?: InstallerLocation[];
  onViewOrderDetails?: (orderId: string) => void;
}

const DashboardTab = ({ financialStats, orders = [], installers = [], locations = [], onViewOrderDetails }: DashboardTabProps) => {
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <Icon name="LayoutDashboard" size={16} />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <Icon name="TrendingUp" size={16} />
            Финансы
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-2">
            <Icon name="Lightbulb" size={16} />
            Инсайты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
                <CardTitle className="text-3xl font-bold text-accent">
                  {(financialStats.totalRevenue / 1000000).toFixed(1)}М ₽
                </CardTitle>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LiveTrackingWidget 
              orders={orders}
              locations={locations}
              onViewDetails={(orderId) => onViewOrderDetails?.(orderId)}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Users" size={20} />
                  Рейтинг монтажников
                </CardTitle>
                <CardDescription>Топ исполнителей</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[320px]">
                  <div className="space-y-4">
                    {[
                      { name: 'ООО "КровляПрофи"', rating: 4.9, orders: 28 },
                      { name: 'ИП Кузнецов М.А.', rating: 4.8, orders: 24 },
                      { name: 'СтройМонтаж НН', rating: 4.7, orders: 19 },
                      { name: 'Сергей Викторович М.', rating: 4.6, orders: 15 },
                      { name: 'ООО "МонтажСервис"', rating: 4.5, orders: 12 },
                    ].map((contractor, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
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

        <TabsContent value="analytics">
          <FinancialAnalytics stats={financialStats} />
        </TabsContent>

        <TabsContent value="insights">
          <BusinessInsights orders={orders} installers={installers} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardTab;