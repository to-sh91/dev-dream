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
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
    { id: 'logs', label: 'سجلات النظام', icon: FileText },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GM</span>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">GPT Mate</h1>
                <p className="text-xs text-gray-500">لوحة الإدارة</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 text-right hover:bg-gray-50 transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' : 'text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="البحث..."
                  className="pl-4 pr-10 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -left-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </Button>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>أد</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium">المدير العام</p>
                  <p className="text-xs text-gray-500">admin@gptmate.com</p>
                </div>
              </div>

              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;