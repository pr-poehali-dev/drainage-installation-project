import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

const DashboardTab = () => {
  return (
    <div className="space-y-6 animate-fade-in">
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
    </div>
  );
};

export default DashboardTab;
