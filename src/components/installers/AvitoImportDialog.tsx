import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface AvitoImportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  importCity: string;
  setImportCity: (city: string) => void;
  importSpecialization: string;
  setImportSpecialization: (spec: string) => void;
  importLoading: boolean;
  onImport: () => void;
}

const AvitoImportDialog = ({
  isOpen,
  onOpenChange,
  importCity,
  setImportCity,
  importSpecialization,
  setImportSpecialization,
  importLoading,
  onImport,
}: AvitoImportDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Icon name="Download" size={16} />
          Загрузить из Авито
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon name="Download" size={20} className="text-blue-600" />
            </div>
            Автоматическая загрузка монтажников
          </DialogTitle>
          <DialogDescription>
            Система автоматически найдет монтажников на Авито по указанным параметрам
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="import-city">Город поиска</Label>
            <Input
              id="import-city"
              placeholder="Москва"
              value={importCity}
              onChange={(e) => setImportCity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="import-spec">Специализация</Label>
            <Select value={importSpecialization} onValueChange={setImportSpecialization}>
              <SelectTrigger id="import-spec">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Водостоки + Снегозадержатели</SelectItem>
                <SelectItem value="gutter">Только водостоки</SelectItem>
                <SelectItem value="snow-guard">Только снегозадержатели</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900 font-medium mb-2">Что загружается:</p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Контакты и рейтинг из профиля</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Расценки на монтаж из объявлений</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Отзывы клиентов</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 flex-shrink-0" />
                <span>Фото выполненных работ</span>
              </li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={importLoading}
          >
            Отмена
          </Button>
          <Button
            onClick={onImport}
            disabled={importLoading}
            className="gap-2"
          >
            {importLoading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                Загружаем...
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                Загрузить
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvitoImportDialog;
