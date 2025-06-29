import React from 'react';
import { 
  Users, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
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
      bgColor: 'bg-blue-50',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'المحادثات النشطة',
      value: systemStats.totalConversations.toLocaleString(),
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'الرموز المستخدمة',
      value: (systemStats.tokensUsed / 1000).toFixed(1) + 'K',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'معدل النجاح',
      value: systemStats.successRate.toFixed(1) + '%',
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      change: '+0.2%',
      changeType: 'positive'
    }
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'استخدام الذاكرة مرتفع (85%)', time: '5 دقائق' },
    { id: 2, type: 'info', message: 'تم تحديث النظام بنجاح', time: '1 ساعة' },
    { id: 3, type: 'error', message: 'فشل في الاتصال بـ OpenAI API', time: '2 ساعة' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600">نظرة عامة على أداء النظام</p>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Activity className="w-4 h-4" />
          <span>تحديث البيانات</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant={stat.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                        {stat.change}
                      </Badge>
                      <span className="text-xs text-gray-500 mr-2">من الشهر الماضي</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Trends */}
        <Card>
          <CardHeader>
            <CardTitle>اتجاهات الاستخدام (30 يوم)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversations" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Provider Usage */}
        <Card>
          <CardHeader>
            <CardTitle>استخدام مقدمي الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aiProviderUsage}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ provider, usage }) => `${provider} (${usage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="usage"
                >
                  {aiProviderUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>صحة النظام</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">وقت التشغيل</span>
              <span className="text-sm text-gray-600">{systemStats.systemUptime}</span>
            </div>
            <Progress value={99.9} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">زمن الاستجابة</span>
              <span className="text-sm text-gray-600">{systemStats.responseTime}ms</span>
            </div>
            <Progress value={(500 - systemStats.responseTime) / 5} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">معدل الأخطاء</span>
              <span className="text-sm text-gray-600">{systemStats.errorRate}%</span>
            </div>
            <Progress value={100 - systemStats.errorRate * 20} className="h-2" />
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>التنبيهات الأخيرة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 space-x-reverse p-3 rounded-lg bg-gray-50">
                <div className={`p-1 rounded-full ${
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
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">منذ {alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Provider Costs */}
      <Card>
        <CardHeader>
          <CardTitle>تكاليف مقدمي الذكاء الاصطناعي</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiProviderUsage.map((provider, index) => (
              <div key={provider.provider} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{provider.provider}</h3>
                  <Badge variant="outline">{provider.usage}%</Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">${provider.cost.toFixed(2)}</p>
                <p className="text-sm text-gray-600">{provider.requests.toLocaleString()} طلب</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;