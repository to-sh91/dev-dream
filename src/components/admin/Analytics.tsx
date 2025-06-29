import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, Users, MessageSquare, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AnalyticsData, AIProviderUsage } from '@/types/admin';

interface AnalyticsProps {
  analyticsData: AnalyticsData[];
  aiProviderUsage: AIProviderUsage[];
}

const Analytics: React.FC<AnalyticsProps> = ({ analyticsData, aiProviderUsage }) => {
  const [timeRange, setTimeRange] = useState('30d');
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  // Calculate metrics
  const totalConversations = analyticsData.reduce((sum, day) => sum + day.conversations, 0);
  const totalUsers = analyticsData.reduce((sum, day) => sum + day.users, 0);
  const totalTokens = analyticsData.reduce((sum, day) => sum + day.tokens, 0);
  const totalErrors = analyticsData.reduce((sum, day) => sum + day.errors, 0);

  const avgConversationsPerDay = Math.round(totalConversations / analyticsData.length);
  const avgUsersPerDay = Math.round(totalUsers / analyticsData.length);
  const errorRate = ((totalErrors / totalConversations) * 100).toFixed(2);

  // Role usage data (mock)
  const roleUsageData = [
    { role: 'مختبر البرمجيات', usage: 35, color: '#3B82F6' },
    { role: 'مطور واجهات', usage: 28, color: '#10B981' },
    { role: 'محلل الأعمال', usage: 15, color: '#F59E0B' },
    { role: 'مطور خادم', usage: 12, color: '#EF4444' },
    { role: 'أخرى', usage: 10, color: '#8B5CF6' },
  ];

  // Performance metrics
  const performanceData = analyticsData.map(day => ({
    ...day,
    responseTime: Math.floor(Math.random() * 200) + 150,
    successRate: 100 - (day.errors / day.conversations) * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">التحليلات والتقارير</h1>
          <p className="text-gray-600">تحليل مفصل لأداء النظام واستخدام المستخدمين</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">
            <Calendar className="w-4 h-4 ml-2" />
            اختيار الفترة
          </Button>
          <Button>
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">إجمالي المحادثات</p>
                <p className="text-2xl font-bold text-gray-900">{totalConversations.toLocaleString()}</p>
                <p className="text-sm text-gray-500">متوسط {avgConversationsPerDay}/يوم</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-500">متوسط {avgUsersPerDay}/يوم</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">الرموز المستهلكة</p>
                <p className="text-2xl font-bold text-gray-900">{(totalTokens / 1000).toFixed(1)}K</p>
                <p className="text-sm text-gray-500">في آخر 30 يوم</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">معدل الأخطاء</p>
                <p className="text-2xl font-bold text-gray-900">{errorRate}%</p>
                <Badge variant={parseFloat(errorRate) < 1 ? 'default' : 'destructive'} className="mt-1">
                  {parseFloat(errorRate) < 1 ? 'ممتاز' : 'يحتاج تحسين'}
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>اتجاهات الاستخدام اليومي</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="conversations" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="users" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>استخدام الأدوار</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={roleUsageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ role, usage }) => `${role} (${usage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="usage"
                >
                  {roleUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>مقاييس الأداء</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="left" />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="responseTime" stroke="#F59E0B" strokeWidth={2} name="زمن الاستجابة (ms)" />
              <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#10B981" strokeWidth={2} name="معدل النجاح (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* AI Provider Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تحليل التكاليف</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={aiProviderUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="provider" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cost" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>تفاصيل مقدمي الخدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiProviderUsage.map((provider, index) => (
                <div key={provider.provider} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <h3 className="font-medium">{provider.provider}</h3>
                      <p className="text-sm text-gray-500">{provider.requests.toLocaleString()} طلب</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold">${provider.cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">{provider.usage}% من الاستخدام</p>
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

export default Analytics;