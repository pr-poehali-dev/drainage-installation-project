import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AppHeaderProps {
  unreadCount: number;
  onNotificationClick: () => void;
  onPriceManagementClick: () => void;
  onTestPushClick: () => void;
}

const AppHeader = ({ unreadCount, onNotificationClick, onPriceManagementClick, onTestPushClick }: AppHeaderProps) => {
  return (
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={onTestPushClick}
              className="hidden md:flex"
            >
              <Icon name="Bell" size={16} className="mr-2" />
              Тест Push
            </Button>
            <Button variant="outline" onClick={onPriceManagementClick}>
              <Icon name="DollarSign" size={18} className="mr-2" />
              Прайсы
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={onNotificationClick}>
              <Icon name="Bell" size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarFallback className="bg-primary text-white font-semibold">ПИ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
