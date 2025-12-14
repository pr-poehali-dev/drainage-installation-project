import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Estimate, EstimateItem } from '@/types';

interface EstimatePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estimate: Estimate;
  onSave: (estimate: Estimate) => void;
  onSend: () => void;
}

const EstimatePreview = ({ open, onOpenChange, estimate, onSave, onSend }: EstimatePreviewProps) => {
  const [editMode, setEditMode] = useState(false);
  const [items, setItems] = useState<EstimateItem[]>(estimate.items);
  const [notes, setNotes] = useState(estimate.notes);
  const [installation, setInstallation] = useState(estimate.installation);
  const [delivery, setDelivery] = useState(estimate.delivery);

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: 'шт', price: 0, total: 0 }]);
  };

  const handleUpdateItem = (index: number, field: keyof EstimateItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const materialsTotal = items.reduce((sum, item) => sum + item.total, 0);
    return materialsTotal + installation + delivery;
  };

  const handleSave = () => {
    const updatedEstimate: Estimate = {
      ...estimate,
      items,
      materials: items.reduce((sum, item) => sum + item.total, 0),
      installation,
      delivery,
      total: calculateTotal(),
      notes,
    };
    onSave(updatedEstimate);
    setEditMode(false);
  };

  const handleSendToClient = () => {
    handleSave();
    onSend();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="FileText" size={24} />
            Предпросмотр сметы
          </DialogTitle>
          <DialogDescription>
            Проверьте смету перед отправкой клиенту
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-muted-foreground">Заказ</Label>
                  <p className="font-semibold">{estimate.orderId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Клиент</Label>
                  <p className="font-semibold">{estimate.client}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Позиции сметы</h3>
              {editMode && (
                <Button variant="outline" size="sm" onClick={handleAddItem}>
                  <Icon name="Plus" size={14} className="mr-1" />
                  Добавить позицию
                </Button>
              )}
            </div>

            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  {editMode ? (
                    <div className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Label>Наименование</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => handleUpdateItem(index, 'name', e.target.value)}
                          placeholder="Название позиции"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Количество</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(index, 'quantity', Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Ед. изм.</Label>
                        <Input
                          value={item.unit}
                          onChange={(e) => handleUpdateItem(index, 'unit', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Цена</Label>
                        <Input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleUpdateItem(index, 'price', Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(index)}
                        >
                          <Icon name="Trash2" size={16} className="text-red-500" />
                        </Button>
                      </div>
                      <div className="col-span-12">
                        <p className="text-right text-sm text-muted-foreground">
                          Итого: <span className="font-bold text-foreground">{item.total.toLocaleString()} ₽</span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} {item.unit} × {item.price.toLocaleString()} ₽
                        </p>
                      </div>
                      <p className="font-bold text-lg">{item.total.toLocaleString()} ₽</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Материалы:</span>
              <span className="font-semibold">
                {items.reduce((sum, item) => sum + item.total, 0).toLocaleString()} ₽
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Монтаж:</span>
              {editMode ? (
                <Input
                  type="number"
                  value={installation}
                  onChange={(e) => setInstallation(Number(e.target.value))}
                  className="w-32 text-right"
                />
              ) : (
                <span className="font-semibold">{installation.toLocaleString()} ₽</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Доставка:</span>
              {editMode ? (
                <Input
                  type="number"
                  value={delivery}
                  onChange={(e) => setDelivery(Number(e.target.value))}
                  className="w-32 text-right"
                />
              ) : (
                <span className="font-semibold">{delivery.toLocaleString()} ₽</span>
              )}
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Итого:</span>
              <span className="font-bold text-2xl text-primary">{calculateTotal().toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Примечания</Label>
            {editMode ? (
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Дополнительная информация для клиента"
                rows={3}
              />
            ) : (
              <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                {notes || 'Нет примечаний'}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSave}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setEditMode(true)}>
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
            )}
          </div>
          <Button onClick={handleSendToClient} disabled={editMode}>
            <Icon name="Send" size={16} className="mr-2" />
            Отправить клиенту
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstimatePreview;