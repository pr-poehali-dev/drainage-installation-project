import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Order, getStatusConfig } from '../types';

interface OrderTimelineProps {
  order: Order;
}

const OrderTimeline = ({ order }: OrderTimelineProps) => {
  const statuses: Order['status'][] = ['new', 'estimate', 'paid', 'delivery', 'installation', 'completed'];
  const currentIndex = statuses.indexOf(order.status);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Icon name="Timeline" size={18} />
          Этапы выполнения заказа
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted" />
          
          <div className="space-y-6">
            {statuses.map((status, index) => {
              const config = getStatusConfig(status);
              const isCompleted = index <= currentIndex;
              const isCurrent = index === currentIndex;
              
              return (
                <div key={status} className="relative flex items-start gap-4">
                  <div className={`
                    relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                    ${isCompleted ? config.color : 'bg-muted'}
                    ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}
                    transition-all duration-300
                  `}>
                    <Icon 
                      name={isCompleted ? 'Check' : config.icon as any} 
                      size={16} 
                      className="text-white"
                    />
                  </div>
                  
                  <div className="flex-1 pb-2">
                    <div className={`font-semibold text-sm ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {config.label}
                    </div>
                    {isCurrent && (
                      <div className="text-xs text-primary font-medium mt-1">
                        Текущий этап
                      </div>
                    )}
                    {status === 'installation' && order.installerName && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Монтажник: {order.installerName}
                        {order.installationDate && ` • ${new Date(order.installationDate).toLocaleDateString('ru')}`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
