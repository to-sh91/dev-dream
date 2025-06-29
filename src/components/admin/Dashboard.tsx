import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  BarChart3,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { SystemStats, AnalyticsData, AIProviderUsage } from '@/types/admin';

interface DashboardProps {
  systemStats: SystemStats;
  analyticsData: AnalyticsData[];
  aiProviderUsage: AIProviderUsage[];
  onRefresh: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ systemStats, analyticsData, aiProviderUsage, onRefresh }) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const statCards = [
    {
      title: 'إجمالي المستخدمين',
      value: systemStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive',
      subtitle: 'مستخدم نشط'
    },
    {
      title: 'المحادثات اليوم',
      value: systemStats.totalConversations.toLocaleString(),
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconBg: 'bg-green-500',
      change: '+8%',
      changeType: 'positive',
      subtitle: 'محادثة جديدة'
    },
    {
      title: 'الرموز المستخدمة',
      value: (systemStats.tokensUsed / 1000).toFixed(1) + 'K',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      iconBg: 'bg-yellow-500',
      change: '+15%',
      changeType: 'positive',
      subtitle: 'رمز هذا الشهر'
    },
    {
      title: 'معدل النجاح',
      value: systemStats.successRate.toFixed(1) + '%',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconBg: 'bg-emerald-500',
      change: '+0.2%',
      changeType: 'positive',
      subtitle: 'أداء ممتاز'
    }
  ];

  const recentAlerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'استخدام الذاكرة مرتفع (85%)', 
      time: '5 دقائق',
      severity: 'medium'
    },
    { 
      id: 2, 
      type: 'info', 
      message: 'تم تحديث النظام بنجاح', 
      time: '1 ساعة',
      severity: 'low'
    },
    { 
      id: 3, 
      type: 'error', 
      message: 'فشل في الاتصال بـ OpenAI API', 
      time: '2 ساعة',
      severity: 'high'
    },
  ];

  const quickActions = [
    { label: 'إضافة مستخدم جديد', icon: Users, color: 'bg-blue-500' },
    { label: 'عرض التقارير', icon: BarChart3, color: 'bg-green-500' },
    { label: 'إعدادات النظام', icon: Settings, color: 'bg-purple-500' },
    { label: 'النسخ الاحتياطي', icon: Download, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">مرحباً بك في لوحة التحكم</h1>
          <p className="text-gray-600 text-lg">نظرة شاملة على أداء نظام GPT Mate</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <Button variant="outline" className="flex items-center space-x-2 space-x-reverse">
            <Eye className="w-4 h-4" />
            <span>عرض مفصل</span>
          </Button>
          <Button
            onClick={onRefresh}
            className="flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Activity className="w-4 h-4" />
            <span>تحديث البيانات</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 ${stat.bgColor} opacity-50`} />
              <CardContent className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                    
                    <div className="flex items-center mt-3">
                      <div className={`flex items-center space-x-1 space-x-reverse px-2 py-1 rounded-full text-xs font-medium ${
                        stat.changeType === 'positive' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                      <span className="text-xs text-gray-500 mr-2">من الشهر الماضي</span>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Trends - Takes 2 columns */}
        <Card className="lg:col-span-2 shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">اتجاهات الاستخدام (30 يوم)</CardTitle>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">المحادثات</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">المستخدمون</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px', 
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorConversations)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">صحة النظام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">وقت التشغيل</span>
                  <span className="text-sm font-bold text-green-600">{systemStats.systemUptime}</span>
                </div>
                <Progress value={99.9} className="h-2 bg-gray-100" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">زمن الاستجابة</span>
                  <span className="text-sm font-bold text-blue-600">{systemStats.responseTime}ms</span>
                </div>
                <Progress value={(500 - systemStats.responseTime) / 5} className="h-2 bg-gray-100" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">معدل الأخطاء</span>
                  <span className="text-sm font-bold text-yellow-600">{systemStats.errorRate}%</span>
                </div>
                <Progress value={100 - systemStats.errorRate * 20} className="h-2 bg-gray-100" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">إجراءات سريعة</h4>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center space-y-1 hover:shadow-md transition-all"
                    >
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs text-center leading-tight">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Provider Usage */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">استخدام مقدمي الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {aiProviderUsage.map((provider, index) => (
                <div key={provider.provider} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{provider.provider}</h3>
                      <p className="text-sm text-gray-500">{provider.requests.toLocaleString()} طلب</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-lg text-gray-900">${provider.cost.toFixed(2)}</p>
                    <Badge variant="outline" className="text-xs">
                      {provider.usage}% من الاستخدام
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold">التنبيهات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 space-x-reverse p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    alert.type === 'error' ? 'bg-red-100' : 
                    alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {alert.type === 'error' ? (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    ) : alert.type === 'warning' ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{alert.message}</p>
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {alert.severity === 'high' ? 'عالي' : alert.severity === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">منذ {alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;