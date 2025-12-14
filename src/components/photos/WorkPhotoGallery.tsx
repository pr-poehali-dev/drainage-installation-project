import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { WorkPhoto, getStageLabel } from '../types';

interface WorkPhotoGalleryProps {
  orderId: string;
  photos: WorkPhoto[];
  installerName?: string;
  onRequestPhoto?: (stage: WorkPhoto['stage']) => void;
}

const WorkPhotoGallery = ({ orderId, photos, installerName, onRequestPhoto }: WorkPhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<WorkPhoto | null>(null);
  
  const photosByStage = {
    before: photos.filter(p => p.stage === 'before'),
    during: photos.filter(p => p.stage === 'during'),
    after: photos.filter(p => p.stage === 'after'),
  };

  const renderPhotoGrid = (stagePhotos: WorkPhoto[]) => {
    if (stagePhotos.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="Image" size={48} className="mx-auto mb-3 opacity-50" />
          <p>Пока нет фотографий</p>
          <p className="text-sm mt-1">Монтажник загрузит фото с объекта</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {stagePhotos.map((photo) => (
          <div
            key={photo.id}
            className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary transition-all group"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 relative">
              <Icon name="Image" size={48} className="text-muted-foreground/50" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm">
                <p className="text-xs text-white truncate">{photo.caption || 'Фото'}</p>
                <p className="text-xs text-white/70">{photo.timestamp}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge variant="secondary" className="text-xs">
                  <Icon name="Maximize2" size={10} className="mr-1" />
                  Открыть
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Camera" size={20} />
                Фотоотчёт с объекта
              </CardTitle>
              <CardDescription>
                {installerName ? `Фотографии от ${installerName}` : 'Фотографии процесса монтажа'}
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-sm">
              {photos.length} фото
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">
                Все ({photos.length})
              </TabsTrigger>
              <TabsTrigger value="before">
                До ({photosByStage.before.length})
              </TabsTrigger>
              <TabsTrigger value="during">
                В процессе ({photosByStage.during.length})
              </TabsTrigger>
              <TabsTrigger value="after">
                После ({photosByStage.after.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {photos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="ImageOff" size={64} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Фотографий пока нет</p>
                  <p className="text-sm">Монтажник загрузит фото после начала работ</p>
                  {onRequestPhoto && installerName && (
                    <div className="flex gap-2 justify-center mt-4">
                      <Button size="sm" variant="outline" onClick={() => onRequestPhoto('before')}>
                        <Icon name="Camera" size={14} className="mr-1" />
                        Запросить фото
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(photosByStage).map(([stage, stagePhotos]) => {
                    if (stagePhotos.length === 0) return null;
                    return (
                      <div key={stage}>
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Badge variant="outline">{getStageLabel(stage as WorkPhoto['stage'])}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {stagePhotos.length} фото
                          </span>
                        </h3>
                        {renderPhotoGrid(stagePhotos)}
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="before">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Состояние объекта до начала работ
                  </p>
                  {onRequestPhoto && (
                    <Button size="sm" variant="outline" onClick={() => onRequestPhoto('before')}>
                      <Icon name="Camera" size={14} className="mr-1" />
                      Запросить
                    </Button>
                  )}
                </div>
                {renderPhotoGrid(photosByStage.before)}
              </div>
            </TabsContent>

            <TabsContent value="during">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Процесс выполнения работ
                  </p>
                  {onRequestPhoto && (
                    <Button size="sm" variant="outline" onClick={() => onRequestPhoto('during')}>
                      <Icon name="Camera" size={14} className="mr-1" />
                      Запросить
                    </Button>
                  )}
                </div>
                {renderPhotoGrid(photosByStage.during)}
              </div>
            </TabsContent>

            <TabsContent value="after">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Результат после завершения
                  </p>
                  {onRequestPhoto && (
                    <Button size="sm" variant="outline" onClick={() => onRequestPhoto('after')}>
                      <Icon name="Camera" size={14} className="mr-1" />
                      Запросить
                    </Button>
                  )}
                </div>
                {renderPhotoGrid(photosByStage.after)}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Badge>{getStageLabel(selectedPhoto.stage)}</Badge>
                <span>{selectedPhoto.caption || 'Фотография'}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <Icon name="Image" size={96} className="text-muted-foreground/50" />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Время загрузки</p>
                  <p className="font-medium">{selectedPhoto.timestamp}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Монтажник</p>
                  <p className="font-medium">{installerName || 'Не указан'}</p>
                </div>
                {selectedPhoto.location && (
                  <>
                    <div>
                      <p className="text-muted-foreground">Координаты</p>
                      <p className="font-mono text-xs">
                        {selectedPhoto.location.lat.toFixed(4)}, {selectedPhoto.location.lng.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Этап работ</p>
                      <p className="font-medium">{getStageLabel(selectedPhoto.stage)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default WorkPhotoGallery;
