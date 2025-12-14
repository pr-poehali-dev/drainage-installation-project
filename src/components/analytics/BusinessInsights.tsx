import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order, Installer } from '@/types';

interface BusinessInsightsProps {
  orders: Order[];
  installers: Installer[];
}

const BusinessInsights = ({ orders, installers }: BusinessInsightsProps) => {
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const inProgressOrders = orders.filter(o => ['delivery', 'installation'].includes(o.status)).length;
  const assignedOrders = orders.filter(o => o.installerId).length;
  const avgRating = installers.reduce((sum, i) => sum + i.rating, 0) / installers.length;
  
  const insights = [
    {
      icon: 'TrendingUp',
      title: 'Высокая эффективность',
      description: `${completedOrders} заказов завершено успешно`,
      status: 'positive',
      recommendation: 'Продолжайте в том же духе!',
    },
    {
      icon: 'Users',
      title: 'Активные монтажники',
      description: `${installers.length} проверенных специалистов`,
      status: 'positive',
      recommendation: `Средний рейтинг: ${avgRating.toFixed(1)}⭐`,
    },
    {
      icon: 'Calendar',
      title: 'Планирование работ',
      description: `${assignedOrders} заказов с назначенными монтажниками`,
      status: assignedOrders > orders.length / 2 ? 'positive' : 'warning',
      recommendation: assignedOrders < orders.length / 2 ? 'Назначьте монтажников на оставшиеся заказы' : 'Отличное планирование!',
    },
    {
      icon: 'Package',
      title: 'Заказы в работе',
      description: `${inProgressOrders} активных заказов`,
      status: inProgressOrders > 0 ? 'active' : 'neutral',
      recommendation: inProgressOrders > 0 ? 'Контролируйте выполнение' : 'Нет активных работ',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight, idx) => (
        <Card key={idx} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center
                  ${insight.status === 'positive' ? 'bg-green-100' : 
                    insight.status === 'warning' ? 'bg-yellow-100' : 
                    insight.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <Icon 
                    name={insight.icon as any} 
                    size={24} 
                    className={
                      insight.status === 'positive' ? 'text-green-600' : 
                      insight.status === 'warning' ? 'text-yellow-600' : 
                      insight.status === 'active' ? 'text-blue-600' : 'text-gray-600'
                    }
                  />
                </div>
                <div>
                  <CardTitle className="text-base">{insight.title}</CardTitle>
                  <CardDescription className="text-xs mt-1">{insight.description}</CardDescription>
                </div>
              </div>
              <Badge 
                variant={insight.status === 'positive' ? 'default' : insight.status === 'warning' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {insight.status === 'positive' ? '✓' : insight.status === 'warning' ? '!' : '•'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BusinessInsights;