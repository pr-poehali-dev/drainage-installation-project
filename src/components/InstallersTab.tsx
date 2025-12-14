import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Installer, InstallerReview } from './types';
import AvitoImportDialog from './installers/AvitoImportDialog';
import InstallerCard from './installers/InstallerCard';
import InstallerDetailsDialog from './installers/InstallerDetailsDialog';

interface InstallersTabProps {
  installers: Installer[];
  reviews: InstallerReview[];
  onImportFromAvito: (city: string, specialization: string) => void;
}

const InstallersTab = ({ installers, reviews, onImportFromAvito }: InstallersTabProps) => {
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [importCity, setImportCity] = useState('');
  const [importSpecialization, setImportSpecialization] = useState('both');
  const [importLoading, setImportLoading] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState<Installer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград'];

  const handleImport = () => {
    if (!importCity.trim()) {
      toast({
        title: 'Ошибка',
        description: 'Укажите город для поиска',
        variant: 'destructive',
      });
      return;
    }

    setImportLoading(true);
    setTimeout(() => {
      onImportFromAvito(importCity, importSpecialization);
      setImportLoading(false);
      setIsImportDialogOpen(false);
      setImportCity('');
      toast({
        title: 'Монтажники загружены!',
        description: `Найдено новых монтажников из ${importCity}`,
      });
    }, 2000);
  };

  const filteredInstallers = installers.filter(installer => {
    const cityMatch = selectedCity === 'all' || installer.city === selectedCity;
    const specMatch = selectedSpecialization === 'all' || 
      installer.specialization.includes(selectedSpecialization as any);
    const searchMatch = searchQuery === '' || 
      installer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.city.toLowerCase().includes(searchQuery.toLowerCase());
    return cityMatch && specMatch && searchMatch;
  });

  const handleViewDetails = (installer: Installer) => {
    setSelectedInstaller(installer);
    setIsDetailsOpen(true);
  };

  const handleContact = (installer: Installer) => {
    toast({
      title: 'Контакты отправлены!',
      description: `Данные ${installer.name} отправлены вам на почту`,
    });
  };

  const installerReviews = selectedInstaller 
    ? reviews.filter(r => r.installerId === selectedInstaller.id)
    : [];

  return (
    <div className="animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" size={24} />
                База монтажников
              </CardTitle>
              <CardDescription>Профессиональные монтажники водосточных систем по всей России</CardDescription>
            </div>
            <AvitoImportDialog
              isOpen={isImportDialogOpen}
              onOpenChange={setIsImportDialogOpen}
              importCity={importCity}
              setImportCity={setImportCity}
              importSpecialization={importSpecialization}
              setImportSpecialization={setImportSpecialization}
              importLoading={importLoading}
              onImport={handleImport}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Поиск по имени или городу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Специализация" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все специализации</SelectItem>
                  <SelectItem value="both">Водостоки + Снегозадержатели</SelectItem>
                  <SelectItem value="gutter">Водостоки</SelectItem>
                  <SelectItem value="snow-guard">Снегозадержатели</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-muted-foreground">
              Найдено монтажников: {filteredInstallers.length}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredInstallers.map((installer) => (
                <InstallerCard
                  key={installer.id}
                  installer={installer}
                  onViewDetails={handleViewDetails}
                  onContact={handleContact}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <InstallerDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        installer={selectedInstaller}
        reviews={installerReviews}
        onContact={handleContact}
      />
    </div>
  );
};

export default InstallersTab;
