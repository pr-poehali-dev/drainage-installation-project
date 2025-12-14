import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Document } from '../types';

interface DocumentsPanelProps {
  orderId: string;
  documents: Document[];
  onGenerateDocument: (type: Document['type']) => void;
  onUploadDocument: () => void;
}

const DocumentsPanel = ({ orderId, documents, onGenerateDocument, onUploadDocument }: DocumentsPanelProps) => {
  const getDocumentIcon = (type: Document['type']) => {
    const icons = {
      contract: 'FileText',
      act: 'FileCheck',
      invoice: 'Receipt',
      other: 'File',
    };
    return icons[type] as any;
  };

  const getDocumentLabel = (type: Document['type']) => {
    const labels = {
      contract: 'Договор',
      act: 'Акт выполненных работ',
      invoice: 'Счет',
      other: 'Документ',
    };
    return labels[type];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="FolderOpen" size={20} />
          Документы заказа {orderId}
        </CardTitle>
        <CardDescription>Автоматическая генерация и хранение документов</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onGenerateDocument('contract')}
              className="gap-2"
            >
              <Icon name="FileText" size={14} />
              Сгенерировать договор
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onGenerateDocument('act')}
              className="gap-2"
            >
              <Icon name="FileCheck" size={14} />
              Сгенерировать акт
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onGenerateDocument('invoice')}
              className="gap-2"
            >
              <Icon name="Receipt" size={14} />
              Сгенерировать счет
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={onUploadDocument}
              className="gap-2"
            >
              <Icon name="Upload" size={14} />
              Загрузить документ
            </Button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FileX" size={48} className="mx-auto mb-3 opacity-50" />
              <p>Пока нет документов</p>
              <p className="text-sm mt-1">Сгенерируйте или загрузите документы</p>
            </div>
          ) : (
            <div className="space-y-2">
              {documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={getDocumentIcon(doc.type)} size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate">{doc.name}</h4>
                        <Badge variant="secondary" className="text-xs flex-shrink-0">
                          {getDocumentLabel(doc.type)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Загружено {doc.uploadedBy} • {doc.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" variant="ghost">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="Download" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsPanel;
