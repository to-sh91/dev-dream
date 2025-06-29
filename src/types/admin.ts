export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'suspended' | 'inactive';
  lastLogin: Date;
  conversationsCount: number;
  tokensUsed: number;
  createdAt: Date;
  avatar?: string;
}

export interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalConversations: number;
  tokensUsed: number;
  systemUptime: string;
  responseTime: number;
  errorRate: number;
  successRate: number;
}

export interface AnalyticsData {
  date: string;
  conversations: number;
  users: number;
  tokens: number;
  errors: number;
}

export interface SystemLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  source: string;
  userId?: string;
  details?: any;
}

export interface AdminSettings {
  general: {
    siteName: string;
    maxUsersPerDay: number;
    allowRegistration: boolean;
    maintenanceMode: boolean;
  };
  security: {
    sessionTimeout: number;
    maxLoginAttempts: number;
    requireEmailVerification: boolean;
  };
  ai: {
    defaultProvider: string;
    maxTokensPerUser: number;
    enabledProviders: string[];
  };
  notifications: {
    emailAlerts: boolean;
    systemNotifications: boolean;
    alertThreshold: number;
  };
}

export interface AIProviderUsage {
  provider: string;
  usage: number;
  cost: number;
  requests: number;
}