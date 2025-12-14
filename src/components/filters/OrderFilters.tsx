import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Order } from '@/types.ts';

interface OrderFiltersProps {
  orders: Order[];
  onFilter: (filtered: Order[]) => void;
  onExport: () => void;
}

const OrderFilters = ({ orders, onFilter, onExport }: OrderFiltersProps) => {
  const handleFilter = (filters: {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    minAmount?: number;
    maxAmount?: number;
  }) => {
    let filtered = [...orders];

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(o =>
        o.id.toLowerCase().includes(search) ||
        o.client.toLowerCase().includes(search) ||
        o.address.toLowerCase().includes(search)
      );
    }

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(o => o.status === filters.status);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(o => o.date >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(o => o.date <= filters.dateTo!);
    }

    if (filters.minAmount) {
      filtered = filtered.filter(o => o.amount >= filters.minAmount!);
    }

    if (filters.maxAmount) {
      filtered = filtered.filter(o => o.amount <= filters.maxAmount!);
    }

    onFilter(filtered);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Icon name="Filter" size={18} />
              Фильтры и поиск
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleFilter({})}>
                <Icon name="X" size={14} className="mr-1" />
                Сбросить
              </Button>
              <Button size="sm" variant="outline" onClick={onExport}>
                <Icon name="Download" size={14} className="mr-1" />
                Экспорт
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Поиск по номеру, клиенту, адресу..."
              onChange={(e) => handleFilter({ search: e.target.value })}
              className="col-span-2"
            />
            
            <Select onValueChange={(value) => handleFilter({ status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новая заявка</SelectItem>
                <SelectItem value="estimate">Смета готова</SelectItem>
                <SelectItem value="paid">Оплачено</SelectItem>
                <SelectItem value="delivery">Доставка</SelectItem>
                <SelectItem value="installation">Монтаж</SelectItem>
                <SelectItem value="completed">Завершено</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Input
                type="date"
                placeholder="От"
                onChange={(e) => handleFilter({ dateFrom: e.target.value })}
              />
              <Input
                type="date"
                placeholder="До"
                onChange={(e) => handleFilter({ dateTo: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Icon name="TrendingUp" size={12} className="mr-1" />
              По сумме: возрастание
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Icon name="TrendingDown" size={12} className="mr-1" />
              По сумме: убывание
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Icon name="Calendar" size={12} className="mr-1" />
              По дате: новые
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Icon name="User" size={12} className="mr-1" />
              С монтажником
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-muted">
              <Icon name="AlertCircle" size={12} className="mr-1" />
              Без монтажника
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderFilters;