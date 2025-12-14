import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { ClientData } from '@/types';

interface ClientDataFormProps {
  orderId: string;
  clientData?: ClientData;
  onSave: (data: ClientData) => void;
  onGenerateContract: () => void;
}

const ClientDataForm = ({ orderId, clientData, onSave, onGenerateContract }: ClientDataFormProps) => {
  const [data, setData] = useState<ClientData>(clientData || {
    orderId,
    fullName: '',
    phone: '',
    email: '',
    address: '',
    isLegalEntity: false,
  });

  const handleSave = () => {
    onSave(data);
  };

  const isPhysicalComplete = data.fullName && data.phone && data.address && data.passportSeries && data.passportNumber;
  const isLegalComplete = data.companyName && data.inn && data.address && data.phone;
  const isComplete = data.isLegalEntity ? isLegalComplete : isPhysicalComplete;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Icon name="User" size={20} />
              Данные клиента
            </CardTitle>
            <CardDescription>Для формирования договора и акта выполненных работ</CardDescription>
          </div>
          {isComplete && (
            <Badge variant="default" className="bg-green-500">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Готово к генерации
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={data.isLegalEntity ? "legal" : "physical"} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="physical"
              onClick={() => setData({ ...data, isLegalEntity: false })}
            >
              Физическое лицо
            </TabsTrigger>
            <TabsTrigger 
              value="legal"
              onClick={() => setData({ ...data, isLegalEntity: true })}
            >
              Юридическое лицо
            </TabsTrigger>
          </TabsList>

          <TabsContent value="physical" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">ФИО полностью</Label>
              <Input
                id="full-name"
                placeholder="Иванов Иван Иванович"
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  placeholder="+7 999 123-45-67"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email (опционально)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="client@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passport-series">Серия паспорта</Label>
                <Input
                  id="passport-series"
                  placeholder="1234"
                  value={data.passportSeries}
                  onChange={(e) => setData({ ...data, passportSeries: e.target.value })}
                  maxLength={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passport-number">Номер паспорта</Label>
                <Input
                  id="passport-number"
                  placeholder="567890"
                  value={data.passportNumber}
                  onChange={(e) => setData({ ...data, passportNumber: e.target.value })}
                  maxLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address-phys">Адрес регистрации</Label>
              <Input
                id="address-phys"
                placeholder="г. Москва, ул. Ленина, д. 1, кв. 1"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
          </TabsContent>

          <TabsContent value="legal" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Наименование организации</Label>
              <Input
                id="company-name"
                placeholder='ООО "Строительная компания"'
                value={data.companyName}
                onChange={(e) => setData({ ...data, companyName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inn">ИНН</Label>
                <Input
                  id="inn"
                  placeholder="1234567890"
                  value={data.inn}
                  onChange={(e) => setData({ ...data, inn: e.target.value })}
                  maxLength={12}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-person">Контактное лицо</Label>
                <Input
                  id="contact-person"
                  placeholder="Иванов И.И."
                  value={data.fullName}
                  onChange={(e) => setData({ ...data, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone-legal">Телефон</Label>
                <Input
                  id="phone-legal"
                  placeholder="+7 495 123-45-67"
                  value={data.phone}
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-legal">Email</Label>
                <Input
                  id="email-legal"
                  type="email"
                  placeholder="info@company.ru"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address-legal">Юридический адрес</Label>
              <Input
                id="address-legal"
                placeholder="г. Москва, ул. Тверская, д. 1"
                value={data.address}
                onChange={(e) => setData({ ...data, address: e.target.value })}
              />
            </div>
          </TabsContent>

          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleSave} variant="outline" disabled={!isComplete}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить данные
            </Button>
            <Button onClick={onGenerateContract} disabled={!isComplete} className="flex-1">
              <Icon name="FileText" size={16} className="mr-2" />
              Сформировать договор
            </Button>
            <Button variant="outline" disabled={!isComplete}>
              <Icon name="FileCheck" size={16} className="mr-2" />
              Создать акт
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ClientDataForm;