import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import AvitoImport from "./pages/AvitoImport";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import DeliveryPage from "./pages/Delivery";
import Installers from "./pages/Installers";
import InstallerImport from "./pages/InstallerImport";
import Contracts from "./pages/Contracts";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";
import Icon from "./components/ui/icon";

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Главная', path: '/', icon: 'layout-dashboard' },
    { name: 'Монтажники', path: '/installers', icon: 'hard-hat' },
    { name: 'Клиенты', path: '/clients', icon: 'users' },
    { name: 'Договоры', path: '/contracts', icon: 'file-signature' },
    { name: 'Доставка', path: '/delivery', icon: 'truck' }
  ];

  const moreNavigation = [
    { name: 'Каталог', path: '/catalog', icon: 'package' },
    { name: 'Авито', path: '/avito', icon: 'external-link' },
    { name: 'Импорт монтажников', path: '/installer-import', icon: 'download' },
    { name: 'Платежи', path: '/payments', icon: 'wallet' },
    { name: 'Документы', path: '/documents', icon: 'file-text' }
  ];

  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Icon name="droplet" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  АкваСток Про
                </h1>
                <p className="text-xs text-gray-600">Водостоки & Снегозадержатели</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={item.icon as any} size={18} />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
              
              <div className="relative">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                >
                  <Icon name="more-horizontal" size={18} />
                  <span className="text-sm">Ещё</span>
                </button>
                
                {showMore && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {moreNavigation.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setShowMore(false)}
                          className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                            isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          <Icon name={item.icon as any} size={18} />
                          <span className="text-sm">{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="bell" size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Icon name="settings" size={20} />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  П
                </div>
                <span className="text-sm font-medium text-gray-700">Подрядчик</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/installers" element={<Installers />} />
            <Route path="/installer-import" element={<InstallerImport />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/avito" element={<AvitoImport />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;