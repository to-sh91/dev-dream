import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import UserManagement from '@/components/admin/UserManagement';
import Analytics from '@/components/admin/Analytics';
import SystemLogs from '@/components/admin/SystemLogs';
import AdminSettings from '@/components/admin/AdminSettings';
import { useAdminData } from '@/hooks/useAdminData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const {
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
  } = useAdminData();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            systemStats={systemStats}
            analyticsData={analyticsData}
            aiProviderUsage={aiProviderUsage}
            onRefresh={refreshData}
          />
        );
      case 'users':
        return (
          <UserManagement
            users={users}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
        );
      case 'analytics':
        return (
          <Analytics
            analyticsData={analyticsData}
            aiProviderUsage={aiProviderUsage}
          />
        );
      case 'logs':
        return (
          <SystemLogs
            logs={systemLogs}
            onRefresh={refreshData}
          />
        );
      case 'settings':
        return (
          <AdminSettings
            settings={settings}
            onUpdateSettings={updateSettings}
          />
        );
      default:
        return <Dashboard systemStats={systemStats} analyticsData={analyticsData} aiProviderUsage={aiProviderUsage} onRefresh={refreshData} />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminDashboard;