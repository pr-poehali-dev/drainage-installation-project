import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { FinancialStats } from '@/types.ts';

interface FinancialAnalyticsProps {
  stats: FinancialStats;
}

const FinancialAnalytics = ({ stats }: FinancialAnalyticsProps) => {
  const expenses = [
    { label: 'Материалы', value: stats.materialsExpense, color: 'bg-blue-500', percent: (stats.materialsExpense / stats.totalRevenue) * 100 },
    { label: 'Монтаж', value: stats.installationExpense, color: 'bg-orange-500', percent: (stats.installationExpense / stats.totalRevenue) * 100 },
    { label: 'Доставка', value: stats.deliveryExpense, color: 'bg-purple-500', percent: (stats.deliveryExpense / stats.totalRevenue) * 100 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardDescription>Общая выручка</CardDescription>
            <CardTitle className="text-3xl font-bold text-green-600">
              {stats.totalRevenue.toLocaleString()} ₽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Package" size={16} />
              <span>{stats.ordersCount} заказов</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardDescription>Чистая прибыль</CardDescription>
            <CardTitle className="text-3xl font-bold text-blue-600">
              {stats.profit.toLocaleString()} ₽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Icon name="TrendingUp" size={16} />
              <span>Маржа {stats.profitMargin}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardDescription>Средний чек</CardDescription>
            <CardTitle className="text-3xl font-bold text-orange-600">
              {stats.avgOrderValue.toLocaleString()} ₽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Calculator" size={16} />
              <span>На заказ</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardDescription>Общие расходы</CardDescription>
            <CardTitle className="text-3xl font-bold text-purple-600">
              {(stats.materialsExpense + stats.installationExpense + stats.deliveryExpense).toLocaleString()} ₽
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="DollarSign" size={16} />
              <span>Все статьи</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="PieChart" size={20} />
            Структура расходов
          </CardTitle>
          <CardDescription>Распределение затрат по категориям</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{expense.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{expense.percent.toFixed(1)}%</span>
                    <span className="font-semibold">{expense.value.toLocaleString()} ₽</span>
                  </div>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${expense.color} transition-all duration-500`}
                    style={{ width: `${expense.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Эффективность бизнеса</p>
                <p className="text-xs text-green-700 mt-1">На каждый рубль выручки вы зарабатываете</p>
              </div>
              <div className="text-3xl font-bold text-green-600">
                {(stats.profit / stats.totalRevenue).toFixed(2)} ₽
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialAnalytics;