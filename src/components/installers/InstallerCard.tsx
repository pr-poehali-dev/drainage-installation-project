import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Installer } from '@/types.ts';

interface InstallerCardProps {
  installer: Installer;
  onViewDetails: (installer: Installer) => void;
  onContact: (installer: Installer) => void;
}

const InstallerCard = ({ installer, onViewDetails, onContact }: InstallerCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-14 h-14">
            {installer.photo ? (
              <AvatarImage src={installer.photo} alt={installer.name} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {installer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-base truncate">{installer.name}</h3>
              {installer.verified && (
                <Icon name="BadgeCheck" size={18} className="text-blue-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground truncate">{installer.city}</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-semibold">{installer.rating}</span>
              <span className="text-xs text-muted-foreground">({installer.reviewsCount} отзывов)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {installer.specialization.map(spec => (
            <Badge key={spec} variant="secondary" className="text-xs">
              {spec === 'gutter' ? 'Водостоки' : spec === 'snow-guard' ? 'Снегозадержатели' : 'Всё'}
            </Badge>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="space-y-2 mb-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Монтаж водостока:</span>
            <span className="font-semibold">{installer.priceGutterInstall} ₽/м.п.</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Монтаж снегозадержателей:</span>
            <span className="font-semibold">{installer.priceSnowGuardInstall} ₽/шт</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Опыт работы:</span>
            <span className="font-semibold">{installer.experience} лет</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Выполнено заказов:</span>
            <span className="font-semibold">{installer.completedJobs}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(installer)}
          >
            <Icon name="Eye" size={14} className="mr-1" />
            Подробнее
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onContact(installer)}
          >
            <Icon name="Phone" size={14} className="mr-1" />
            Связаться
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstallerCard;