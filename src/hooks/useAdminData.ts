import { useState, useEffect } from 'react';
import { User, SystemStats, AnalyticsData, SystemLog, AdminSettings, AIProviderUsage } from '@/types/admin';

// Mock data generators
const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const names = ['أحمد محمد', 'فاطمة علي', 'محمد حسن', 'عائشة أحمد', 'علي محمود', 'زينب سالم', 'يوسف عبدالله', 'مريم خالد'];
  const emails = ['ahmed@example.com', 'fatima@example.com', 'mohamed@example.com', 'aisha@example.com', 'ali@example.com', 'zeinab@example.com', 'youssef@example.com', 'mariam@example.com'];
  
  for (let i = 0; i < 50; i++) {
    users.push({
      id: `user-${i + 1}`,
      name: names[i % names.length],
      email: emails[i % emails.length].replace('@', `${i}@`),
      role: i < 3 ? 'admin' : 'user',
      status: ['active', 'suspended', 'inactive'][Math.floor(Math.random() * 3)] as any,
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      conversationsCount: Math.floor(Math.random() * 100),
      tokensUsed: Math.floor(Math.random() * 10000),
      createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    });
  }
  return users;
};

const generateMockAnalytics = (): AnalyticsData[] => {
  const data: AnalyticsData[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      conversations: Math.floor(Math.random() * 200) + 50,
      users: Math.floor(Math.random() * 50) + 10,
      tokens: Math.floor(Math.random() * 5000) + 1000,
      errors: Math.floor(Math.random() * 10),
    });
  }
  return data;
};

const generateMockLogs = (): SystemLog[] => {
  const logs: SystemLog[] = [];
  const messages = [
    'User logged in successfully',
    'AI response generated',
    'Database connection established',
    'API rate limit exceeded',
    'System backup completed',
    'User registration failed',
    'Integration test passed',
    'Memory usage high'
  ];
  
  for (let i = 0; i < 100; i++) {
    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      level: ['info', 'warning', 'error'][Math.floor(Math.random() * 3)] as any,
      message: messages[Math.floor(Math.random() * messages.length)],
      source: ['auth', 'ai-service', 'database', 'api', 'system'][Math.floor(Math.random() * 5)],
      userId: Math.random() > 0.5 ? `user-${Math.floor(Math.random() * 50) + 1}` : undefined,
    });
  }
  return logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const useAdminData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalConversations: 0,
    tokensUsed: 0,
    systemUptime: '99.9%',
    responseTime: 245,
    errorRate: 0.1,
    successRate: 99.9,
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [settings, setSettings] = useState<AdminSettings>({
    general: {
      siteName: 'GPT Mate',
      maxUsersPerDay: 100,
      allowRegistration: true,
      maintenanceMode: false,
    },
    security: {
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      requireEmailVerification: true,
    },
    ai: {
      defaultProvider: 'openai',
      maxTokensPerUser: 10000,
      enabledProviders: ['openai', 'anthropic', 'local'],
    },
    notifications: {
      emailAlerts: true,
      systemNotifications: true,
      alertThreshold: 90,
    },
  });
  const [aiProviderUsage, setAiProviderUsage] = useState<AIProviderUsage[]>([
    { provider: 'OpenAI', usage: 65, cost: 1250.50, requests: 3420 },
    { provider: 'Anthropic', usage: 25, cost: 480.25, requests: 1150 },
    { provider: 'Local', usage: 10, cost: 0, requests: 890 },
  ]);

  useEffect(() => {
    // Load mock data
    const mockUsers = generateMockUsers();
    setUsers(mockUsers);
    
    setSystemStats({
      totalUsers: mockUsers.length,
      activeUsers: mockUsers.filter(u => u.status === 'active').length,
      totalConversations: mockUsers.reduce((sum, u) => sum + u.conversationsCount, 0),
      tokensUsed: mockUsers.reduce((sum, u) => sum + u.tokensUsed, 0),
      systemUptime: '99.9%',
      responseTime: 245,
      errorRate: 0.1,
      successRate: 99.9,
    });
    
    setAnalyticsData(generateMockAnalytics());
    setSystemLogs(generateMockLogs());
  }, []);

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const updateSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings);
  };

  const refreshData = () => {
    // Simulate data refresh
    setSystemStats(prev => ({
      ...prev,
      responseTime: Math.floor(Math.random() * 100) + 200,
      errorRate: Math.random() * 0.5,
    }));
  };

  return {
    users,
    systemStats,
    analyticsData,
    systemLogs,
    settings,
    aiProviderUsage,
    updateUser,
    deleteUser,
    updateSettings,
    refreshData,
  };
};