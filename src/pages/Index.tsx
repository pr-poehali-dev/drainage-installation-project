import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { toast } from '@/hooks/use-toast';
import { Notification } from '@/types.ts';
import DashboardTab from '@/components/DashboardTab';
import OrdersTab from '@/components/OrdersTab';
import CatalogTab from '@/components/CatalogTab';
import InstallersTab from '@/components/InstallersTab';
import NotificationsPanel from '@/components/NotificationsPanel';
import EstimatePreview from '@/components/EstimatePreview';
import PriceManagement from '@/components/PriceManagement';
import ChatPanel from '@/components/chat/ChatPanel';
import DocumentsPanel from '@/components/documents/DocumentsPanel';
import AssignInstallerDialog from '@/components/orders/AssignInstallerDialog';
import InstallationCalendar from '@/components/calendar/InstallationCalendar';
import OrderDetailsDialog from '@/components/orders/OrderDetailsDialog';
import PushNotification from '@/components/notifications/PushNotification';
import RatingDialog from '@/components/rating/RatingDialog';
import InventoryManager from '@/components/inventory/InventoryManager';
import AppHeader from './components/AppHeader';
import { useAppState } from './components/AppState';
import { useAppHandlers } from './components/AppHandlers';

const Index = () => {
  const state = useAppState();
  const {
    activeTab,
    setActiveTab,
    orders,
    setOrders,
    products,
    setProducts,
    notifications,
    setNotifications,
    isImportDialogOpen,
    setIsImportDialogOpen,
    avitoUrl,
    setAvitoUrl,
    importLoading,
    setImportLoading,
    isNewOrderDialogOpen,
    setIsNewOrderDialogOpen,
    newOrderClient,
    setNewOrderClient,
    newOrderPhone,
    setNewOrderPhone,
    newOrderAddress,
    setNewOrderAddress,
    newOrderProduct,
    setNewOrderProduct,
    isNotificationsOpen,
    setIsNotificationsOpen,
    isEstimatePreviewOpen,
    setIsEstimatePreviewOpen,
    currentEstimate,
    setCurrentEstimate,
    isPriceManagementOpen,
    setIsPriceManagementOpen,
    chatMessages,
    setChatMessages,
    documents,
    setDocuments,
    selectedOrderForChat,
    setSelectedOrderForChat,
    selectedOrderForDocs,
    setSelectedOrderForDocs,
    isChatOpen,
    setIsChatOpen,
    isDocsOpen,
    setIsDocsOpen,
    isAssignInstallerOpen,
    setIsAssignInstallerOpen,
    selectedOrderForInstaller,
    setSelectedOrderForInstaller,
    isOrderDetailsOpen,
    setIsOrderDetailsOpen,
    selectedOrderForDetails,
    setSelectedOrderForDetails,
    installerLocations,
    setInstallerLocations,
    workPhotos,
    setWorkPhotos,
    pushNotifications,
    setPushNotifications,
    isRatingDialogOpen,
    setIsRatingDialogOpen,
    ratingTarget,
    setRatingTarget,
    ratings,
    setRatings,
    inventory,
    setInventory,
    installers,
    setInstallers,
    reviews,
  } = state;

  const handlers = useAppHandlers({
    orders,
    setOrders,
    notifications,
    setNotifications,
    avitoUrl,
    setAvitoUrl,
    setImportLoading,
    setIsImportDialogOpen,
    newOrderClient,
    newOrderPhone,
    newOrderAddress,
    newOrderProduct,
    setIsNewOrderDialogOpen,
    setNewOrderClient,
    setNewOrderPhone,
    setNewOrderAddress,
    setNewOrderProduct,
    setSelectedOrderForDetails,
    setIsOrderDetailsOpen,
    selectedOrderForDetails,
    ratingTarget,
    ratings,
    setRatings,
    installerLocations,
    setInstallerLocations,
    pushNotifications,
    setPushNotifications,
    workPhotos,
    setWorkPhotos,
    currentEstimate,
    setCurrentEstimate,
    setActiveTab,
    installers,
    setInstallers,
    chatMessages,
    setChatMessages,
    documents,
    setDocuments,
  });

  const {
    handleImportFromAvito,
    handleCreateNewOrder,
    handleOrderAction,
    handleRefreshLocation,
    handleSubmitRating,
    simulateInstallerArrival,
    handleRequestPhoto,
    handleSaveEstimate,
    handleSendEstimate,
    handleChangeOrderStatus,
    handleNotificationClick,
    handleMarkAsRead,
    handleMarkAllAsRead,
    handleNotificationItemClick,
    handleImportInstallersFromAvito,
    handleAssignInstaller,
    handleSendMessage,
    handleGenerateDocument,
    getFinancialStats,
  } = handlers;

  const unreadCount = notifications.filter(n => !n.read).length;
  const financialStats = getFinancialStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <AppHeader
        unreadCount={unreadCount}
        onNotificationClick={() => handleNotificationClick(setIsNotificationsOpen)}
        onPriceManagementClick={() => setIsPriceManagementOpen(true)}
        onTestPushClick={() => simulateInstallerArrival('AVT-2304')}
      />

      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="mb-4">
            <SheetTitle>Уведомления</SheetTitle>
            <SheetDescription>
              {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все прочитано'}
            </SheetDescription>
          </SheetHeader>
          <NotificationsPanel
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onNotificationClick={handleNotificationItemClick}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={isPriceManagementOpen} onOpenChange={setIsPriceManagementOpen}>
        <SheetContent side="right" className="w-full sm:max-w-3xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Управление прайсами</SheetTitle>
            <SheetDescription>
              Редактирование цен и добавление новых товаров
            </SheetDescription>
          </SheetHeader>
          <PriceManagement products={products} onUpdateProducts={setProducts} />
        </SheetContent>
      </Sheet>

      {currentEstimate && (
        <EstimatePreview
          open={isEstimatePreviewOpen}
          onOpenChange={setIsEstimatePreviewOpen}
          estimate={currentEstimate}
          onSave={handleSaveEstimate}
          onSend={handleSendEstimate}
        />
      )}

      <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Чат по заказу</SheetTitle>
          </SheetHeader>
          {selectedOrderForChat && (
            <ChatPanel
              orderId={selectedOrderForChat}
              messages={chatMessages.filter(m => m.orderId === selectedOrderForChat)}
              onSendMessage={(msg) => handleSendMessage(selectedOrderForChat, msg)}
            />
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={isDocsOpen} onOpenChange={setIsDocsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Документы заказа</SheetTitle>
          </SheetHeader>
          {selectedOrderForDocs && (
            <DocumentsPanel
              orderId={selectedOrderForDocs}
              documents={documents.filter(d => d.orderId === selectedOrderForDocs)}
              onGenerateDocument={(type) => handleGenerateDocument(selectedOrderForDocs, type)}
              onUploadDocument={() => toast({ title: 'Функция в разработке', description: 'Скоро будет доступна загрузка файлов' })}
            />
          )}
        </SheetContent>
      </Sheet>

      {selectedOrderForInstaller && (
        <AssignInstallerDialog
          isOpen={isAssignInstallerOpen}
          onOpenChange={setIsAssignInstallerOpen}
          installers={installers}
          onAssign={(installerId, installerName, date) => 
            handleAssignInstaller(selectedOrderForInstaller, installerId, installerName, date)
          }
        />
      )}

      {selectedOrderForDetails && (
        <OrderDetailsDialog
          isOpen={isOrderDetailsOpen}
          onOpenChange={setIsOrderDetailsOpen}
          order={orders.find(o => o.id === selectedOrderForDetails) || null}
          location={installerLocations.find(l => l.orderId === selectedOrderForDetails) || null}
          photos={workPhotos.filter(p => p.orderId === selectedOrderForDetails)}
          onRefreshLocation={handleRefreshLocation}
          onRequestPhoto={handleRequestPhoto}
        />
      )}

      {ratingTarget && (
        <RatingDialog
          isOpen={isRatingDialogOpen}
          onOpenChange={setIsRatingDialogOpen}
          orderId={ratingTarget.orderId}
          targetName={ratingTarget.name}
          targetRole={ratingTarget.role}
          onSubmit={handleSubmitRating}
        />
      )}

      {pushNotifications.map((notif) => (
        <PushNotification
          key={notif.id}
          notification={notif}
          onClose={() => setPushNotifications(pushNotifications.filter(n => n.id !== notif.id))}
          onAction={() => {
            if (notif.orderId) {
              setSelectedOrderForDetails(notif.orderId);
              setIsOrderDetailsOpen(true);
            }
            setPushNotifications(pushNotifications.filter(n => n.id !== notif.id));
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-full lg:max-w-[1000px]">
            <TabsTrigger value="dashboard" className="gap-1 md:gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-1 md:gap-2">
              <Icon name="Package" size={16} />
              <span className="hidden sm:inline">Заказы</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-1 md:gap-2">
              <Icon name="CalendarDays" size={16} />
              <span className="hidden sm:inline">Календарь</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-1 md:gap-2">
              <Icon name="Warehouse" size={16} />
              <span className="hidden sm:inline">Склад</span>
            </TabsTrigger>
            <TabsTrigger value="catalog" className="gap-1 md:gap-2">
              <Icon name="ShoppingCart" size={16} />
              <span className="hidden sm:inline">Каталог</span>
            </TabsTrigger>
            <TabsTrigger value="installers" className="gap-1 md:gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Монтажники</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab 
              financialStats={financialStats} 
              orders={orders} 
              installers={installers}
              locations={installerLocations}
              onViewOrderDetails={(orderId) => {
                setSelectedOrderForDetails(orderId);
                setIsOrderDetailsOpen(true);
              }}
            />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab 
              orders={orders}
              isImportDialogOpen={isImportDialogOpen}
              setIsImportDialogOpen={setIsImportDialogOpen}
              avitoUrl={avitoUrl}
              setAvitoUrl={setAvitoUrl}
              importLoading={importLoading}
              handleImportFromAvito={handleImportFromAvito}
              isNewOrderDialogOpen={isNewOrderDialogOpen}
              setIsNewOrderDialogOpen={setIsNewOrderDialogOpen}
              newOrderClient={newOrderClient}
              setNewOrderClient={setNewOrderClient}
              newOrderPhone={newOrderPhone}
              setNewOrderPhone={setNewOrderPhone}
              newOrderAddress={newOrderAddress}
              setNewOrderAddress={setNewOrderAddress}
              newOrderProduct={newOrderProduct}
              setNewOrderProduct={setNewOrderProduct}
              handleCreateNewOrder={handleCreateNewOrder}
              handleOrderAction={handleOrderAction}
              handleChangeOrderStatus={handleChangeOrderStatus}
              onOpenChat={(orderId) => { setSelectedOrderForChat(orderId); setIsChatOpen(true); }}
              onOpenDocs={(orderId) => { setSelectedOrderForDocs(orderId); setIsDocsOpen(true); }}
              onAssignInstaller={(orderId) => { setSelectedOrderForInstaller(orderId); setIsAssignInstallerOpen(true); }}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <InstallationCalendar 
              orders={orders}
              onOrderClick={(orderId) => {
                setActiveTab('orders');
                toast({ title: 'Переход к заказу', description: `Заказ ${orderId}` });
              }}
            />
          </TabsContent>

          <TabsContent value="inventory">
            <InventoryManager
              inventory={inventory}
              products={products}
              onReorder={(itemId) => {
                toast({
                  title: 'Заказ отправлен поставщику',
                  description: 'Товар будет доставлен в течение 3-5 дней',
                });
                
                const newNotif: Notification = {
                  id: `N${(notifications.length + 1).toString().padStart(3, '0')}`,
                  type: 'inventory',
                  title: 'Заказ материалов',
                  message: 'Отправлен заказ поставщику на пополнение склада',
                  from: 'Вы',
                  timestamp: 'Только что',
                  read: true,
                };
                setNotifications([newNotif, ...notifications]);
              }}
            />
          </TabsContent>

          <TabsContent value="catalog">
            <CatalogTab products={products} />
          </TabsContent>

          <TabsContent value="installers">
            <InstallersTab 
              installers={installers} 
              reviews={reviews}
              onImportFromAvito={handleImportInstallersFromAvito}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
