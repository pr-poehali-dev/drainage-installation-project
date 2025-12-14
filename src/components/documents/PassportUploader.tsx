import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { PassportData } from '../types';

interface PassportUploaderProps {
  installerId: string;
  installerName: string;
  passportData?: PassportData;
  onSave: (data: PassportData) => void;
}

const PassportUploader = ({ installerId, installerName, passportData, onSave }: PassportUploaderProps) => {
  const [data, setData] = useState<PassportData>(passportData || {
    series: '',
    number: '',
    issuedBy: '',
    issuedDate: '',
    departmentCode: '',
    birthDate: '',
    birthPlace: '',
    address: '',
  });

  const handleSave = () => {
    onSave(data);
  };

  const isComplete = data.series && data.number && data.issuedBy && data.issuedDate && data.birthDate && data.address;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="IdCard" size={20} />
              Паспортные данные
            </CardTitle>
            <CardDescription>Для формирования договора с монтажником {installerName}</CardDescription>
          </div>
          {isComplete && (
            <Badge variant="default" className="bg-green-500">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Заполнено
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passport-series">Серия паспорта</Label>
              <Input
                id="passport-series"
                placeholder="1234"
                value={data.series}
                onChange={(e) => setData({ ...data, series: e.target.value })}
                maxLength={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passport-number">Номер паспорта</Label>
              <Input
                id="passport-number"
                placeholder="567890"
                value={data.number}
                onChange={(e) => setData({ ...data, number: e.target.value })}
                maxLength={6}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issued-by">Кем выдан</Label>
            <Input
              id="issued-by"
              placeholder="ОУФМС России по г. Москва"
              value={data.issuedBy}
              onChange={(e) => setData({ ...data, issuedBy: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issued-date">Дата выдачи</Label>
              <Input
                id="issued-date"
                type="date"
                value={data.issuedDate}
                onChange={(e) => setData({ ...data, issuedDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department-code">Код подразделения</Label>
              <Input
                id="department-code"
                placeholder="123-456"
                value={data.departmentCode}
                onChange={(e) => setData({ ...data, departmentCode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birth-date">Дата рождения</Label>
              <Input
                id="birth-date"
                type="date"
                value={data.birthDate}
                onChange={(e) => setData({ ...data, birthDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth-place">Место рождения</Label>
              <Input
                id="birth-place"
                placeholder="г. Москва"
                value={data.birthPlace}
                onChange={(e) => setData({ ...data, birthPlace: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Адрес регистрации</Label>
            <Input
              id="address"
              placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scan">Скан паспорта (опционально)</Label>
            <div className="flex gap-2">
              <Input
                id="scan"
                type="file"
                accept="image/*,application/pdf"
                className="flex-1"
              />
              <Button variant="outline" size="sm">
                <Icon name="Upload" size={16} />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Загрузите скан разворота с фото
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} disabled={!isComplete} className="flex-1">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить данные
            </Button>
            {isComplete && (
              <Button variant="outline">
                <Icon name="FileText" size={16} className="mr-2" />
                Сформировать договор
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PassportUploader;
