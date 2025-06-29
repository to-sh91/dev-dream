import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  AlertTriangle, 
  Info, 
  XCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { SystemLog } from '@/types/admin';

interface SystemLogsProps {
  logs: SystemLog[];
  onRefresh: () => void;
}

const SystemLogs: React.FC<SystemLogsProps> = ({ logs, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
    
    return matchesSearch && matchesLevel && matchesSource;
  });

  const getLogIcon = (level: SystemLog['level']) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-blue-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getLogBadge = (level: SystemLog['level']) => {
    const variants = {
      error: { variant: 'destructive' as const, label: 'خطأ' },
      warning: { variant: 'secondary' as const, label: 'تحذير' },
      info: { variant: 'default' as const, label: 'معلومات' }
    };
    
    const config = variants[level];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getSourceBadge = (source: string) => {
    const colors = {
      'auth': 'bg-blue-100 text-blue-800',
      'ai-service': 'bg-green-100 text-green-800',
      'database': 'bg-purple-100 text-purple-800',
      'api': 'bg-orange-100 text-orange-800',
      'system': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[source as keyof typeof colors] || colors.system}`}>
        {source}
      </span>
    );
  };

  const logCounts = {
    total: logs.length,
    error: logs.filter(log => log.level === 'error').length,
    warning: logs.filter(log => log.level === 'warning').length,
    info: logs.filter(log => log.level === 'info').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">سجلات النظام</h1>
          <p className="text-gray-600">مراقبة وتتبع أحداث النظام في الوقت الفعلي</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير السجلات
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي السجلات</p>
                <p className="text-2xl font-bold text-gray-900">{logCounts.total}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">أخطاء</p>
                <p className="text-2xl font-bold text-red-600">{logCounts.error}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">تحذيرات</p>
                <p className="text-2xl font-bold text-yellow-600">{logCounts.warning}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معلومات</p>
                <p className="text-2xl font-bold text-blue-600">{logCounts.info}</p>
              </div>
              <Info className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في السجلات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10"
              />
            </div>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="مستوى السجل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="error">أخطاء</SelectItem>
                <SelectItem value="warning">تحذيرات</SelectItem>
                <SelectItem value="info">معلومات</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="المصدر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المصادر</SelectItem>
                <SelectItem value="auth">المصادقة</SelectItem>
                <SelectItem value="ai-service">خدمة الذكاء الاصطناعي</SelectItem>
                <SelectItem value="database">قاعدة البيانات</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="system">النظام</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>السجلات ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-start space-x-4 space-x-reverse p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-shrink-0 mt-1">
                  {getLogIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getLogBadge(log.level)}
                      {getSourceBadge(log.source)}
                    </div>
                    <span className="text-xs text-gray-500">
                      {log.timestamp.toLocaleString('ar')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-900 mb-1">{log.message}</p>
                  
                  {log.userId && (
                    <p className="text-xs text-gray-500">
                      المستخدم: {log.userId}
                    </p>
                  )}
                  
                  {log.details && (
                    <details className="mt-2">
                      <summary className="text-xs text-blue-600 cursor-pointer">
                        عرض التفاصيل
                      </summary>
                      <pre className="text-xs text-gray-600 mt-1 bg-gray-100 p-2 rounded overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                لا توجد سجلات تطابق معايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;