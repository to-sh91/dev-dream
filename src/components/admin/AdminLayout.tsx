import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  Menu,
  LogOut,
  Bell,
  Search,
  ChevronLeft,
  Home,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'لوحة التحكم', 
      icon: LayoutDashboard,
      description: 'نظرة عامة على النظام'
    },
    { 
      id: 'users', 
      label: 'إدارة المستخدمين', 
      icon: Users,
      description: 'إدارة الحسابات والصلاحيات',
      badge: '12'
    },
    { 
      id: 'analytics', 
      label: 'التحليلات', 
      icon: BarChart3,
      description: 'تقارير الأداء والإحصائيات'
    },
    { 
      id: 'logs', 
      label: 'سجلات النظام', 
      icon: FileText,
      description: 'مراقبة الأحداث والأخطاء',
      badge: '3'
    },
    { 
      id: 'settings', 
      label: 'الإعدادات', 
      icon: Settings,
      description: 'تكوين النظام والأمان'
    },
  ];

  const breadcrumbs = {
    dashboard: ['الرئيسية', 'لوحة التحكم'],
    users: ['الرئيسية', 'إدارة المستخدمين'],
    analytics: ['الرئيسية', 'التحليلات'],
    logs: ['الرئيسية', 'سجلات النظام'],
    settings: ['الرئيسية', 'الإعدادات'],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-20'} border-l border-gray-200`}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">GM</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900">GPT Mate</h1>
                <p className="text-sm text-gray-500">لوحة الإدارة المتقدمة</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <Tooltip key={item.id} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onTabChange(item.id)}
                      className={`w-full group relative flex items-center space-x-3 space-x-reverse px-4 py-3 text-right rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 shadow-sm border border-blue-200' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full" />
                      )}
                      
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-200' : 'group-hover:bg-gray-100'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      
                      {sidebarOpen && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs px-2 py-1">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{item.description}</p>
                        </div>
                      )}
                    </button>
                  </TooltipTrigger>
                  {!sidebarOpen && (
                    <TooltipContent side="left" className="bg-gray-900 text-white">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </nav>

        {/* Bottom Section */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button variant="ghost" size="sm" className="flex-1 justify-start">
                <HelpCircle className="w-4 h-4 ml-2" />
                المساعدة والدعم
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-6 space-x-reverse">
              {/* Breadcrumbs */}
              <nav className="flex items-center space-x-2 space-x-reverse text-sm">
                {breadcrumbs[activeTab as keyof typeof breadcrumbs]?.map((crumb, index, array) => (
                  <div key={crumb} className="flex items-center space-x-2 space-x-reverse">
                    <span className={index === array.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                      {crumb}
                    </span>
                    {index < array.length - 1 && (
                      <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Search */}
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث السريع..."
                  className="pl-4 pr-10 w-80 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -left-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  3
                </Badge>
              </Button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 space-x-reverse bg-gray-50 rounded-lg p-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">أد</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">المدير العام</p>
                  <p className="text-xs text-gray-500">admin@gptmate.com</p>
                </div>
              </div>

              {/* Logout */}
              <Button variant="ghost" size="sm" className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;