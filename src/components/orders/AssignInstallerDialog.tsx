import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Installer } from '../types';

interface AssignInstallerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  installers: Installer[];
  onAssign: (installerId: string, installerName: string, date: string) => void;
}

const AssignInstallerDialog = ({ isOpen, onOpenChange, installers, onAssign }: AssignInstallerDialogProps) => {
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [installationDate, setInstallationDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInstallers = installers.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedInstaller && installationDate) {
      onAssign(selectedInstaller.id, selectedInstaller.name, installationDate);
      setSelectedInstaller(null);
      setInstallationDate('');
      setSearchQuery('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="UserPlus" size={20} />
            Назначить монтажника
          </DialogTitle>
          <DialogDescription>
            Выберите монтажника и дату выполнения работ
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Поиск монтажника</Label>
            <Input
              placeholder="Имя или город..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[300px] rounded-md border p-3">
            <div className="space-y-2">
              {filteredInstallers.map((installer) => (
                <div
                  key={installer.id}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedInstaller?.id === installer.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-muted hover:border-muted-foreground/20'
                  }`}
                  onClick={() => setSelectedInstaller(installer)}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {installer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{installer.name}</h4>
                        {installer.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          {installer.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                          {installer.rating}
                        </span>
                        <span>{installer.completedJobs} работ</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {installer.specialization.map(spec => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec === 'both' ? 'Все виды работ' : spec === 'gutter' ? 'Водостоки' : 'Снегозадержатели'}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {selectedInstaller && (
            <div className="space-y-2">
              <Label htmlFor="installation-date">Дата монтажа</Label>
              <Input
                id="installation-date"
                type="date"
                value={installationDate}
                onChange={(e) => setInstallationDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button onClick={handleAssign} disabled={!selectedInstaller || !installationDate}>
            Назначить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignInstallerDialog;
