import React, { useState } from 'react';
import { Save, RefreshCw, Shield, Bell, Zap, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminSettings as AdminSettingsType } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

interface AdminSettingsProps {
  settings: AdminSettingsType;
  onUpdateSettings: (settings: AdminSettingsType) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [localSettings, setLocalSettings] = useState<AdminSettingsType>(settings);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const updateSetting = (section: keyof AdminSettingsType, key: string, value: any) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setHasChanges(false);
    toast({
      title: 'تم حفظ الإعدادات',
      description: 'تم تحديث إعدادات النظام بنجاح',
    });
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
    toast({
      title: 'تم إعادة تعيين الإعدادات',
      description: 'تم استرجاع الإعدادات المحفوظة',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إعدادات النظام</h1>
          <p className="text-gray-600">إدارة إعدادات النظام والأمان</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة تعيين
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4 ml-2" />
            حفظ التغييرات
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center space-x-2 space-x-reverse">
            <SettingsIcon className="w-4 h-4" />
            <span>عام</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2 space-x-reverse">
            <Shield className="w-4 h-4" />
            <span>الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center space-x-2 space-x-reverse">
            <Zap className="w-4 h-4" />
            <span>الذكاء الاصطناعي</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2 space-x-reverse">
            <Bell className="w-4 h-4" />
            <span>الإشعارات</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">اسم الموقع</Label>
                  <Input
                    id="siteName"
                    value={localSettings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxUsers">الحد الأقصى للمستخدمين الجدد يومياً</Label>
                  <Input
                    id="maxUsers"
                    type="number"
                    value={localSettings.general.maxUsersPerDay}
                    onChange={(e) => updateSetting('general', 'maxUsersPerDay', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>السماح بالتسجيل الجديد</Label>
                  <p className="text-sm text-gray-500">
                    السماح للمستخدمين الجدد بإنشاء حسابات
                  </p>
                </div>
                <Switch
                  checked={localSettings.general.allowRegistration}
                  onCheckedChange={(checked) => updateSetting('general', 'allowRegistration', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>وضع الصيانة</Label>
                  <p className="text-sm text-gray-500">
                    تعطيل الوصول للمستخدمين العاديين
                  </p>
                </div>
                <Switch
                  checked={localSettings.general.maintenanceMode}
                  onCheckedChange={(checked) => updateSetting('general', 'maintenanceMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">مهلة انتهاء الجلسة (دقيقة)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={localSettings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={localSettings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تأكيد البريد الإلكتروني مطلوب</Label>
                  <p className="text-sm text-gray-500">
                    يجب على المستخدمين تأكيد بريدهم الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={localSettings.security.requireEmailVerification}
                  onCheckedChange={(checked) => updateSetting('security', 'requireEmailVerification', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Settings */}
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الذكاء الاصطناعي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultProvider">مقدم الخدمة الافتراضي</Label>
                  <Select
                    value={localSettings.ai.defaultProvider}
                    onValueChange={(value) => updateSetting('ai', 'defaultProvider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="local">محلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxTokens">الحد الأقصى للرموز لكل مستخدم</Label>
                  <Input
                    id="maxTokens"
                    type="number"
                    value={localSettings.ai.maxTokensPerUser}
                    onChange={(e) => updateSetting('ai', 'maxTokensPerUser', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>مقدمو الخدمة المفعلون</Label>
                <div className="space-y-2">
                  {['openai', 'anthropic', 'local'].map((provider) => (
                    <div key={provider} className="flex items-center justify-between">
                      <Label className="capitalize">{provider}</Label>
                      <Switch
                        checked={localSettings.ai.enabledProviders.includes(provider)}
                        onCheckedChange={(checked) => {
                          const providers = checked
                            ? [...localSettings.ai.enabledProviders, provider]
                            : localSettings.ai.enabledProviders.filter(p => p !== provider);
                          updateSetting('ai', 'enabledProviders', providers);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تنبيهات البريد الإلكتروني</Label>
                  <p className="text-sm text-gray-500">
                    إرسال تنبيهات النظام عبر البريد الإلكتروني
                  </p>
                </div>
                <Switch
                  checked={localSettings.notifications.emailAlerts}
                  onCheckedChange={(checked) => updateSetting('notifications', 'emailAlerts', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>إشعارات النظام</Label>
                  <p className="text-sm text-gray-500">
                    عرض الإشعارات في واجهة النظام
                  </p>
                </div>
                <Switch
                  checked={localSettings.notifications.systemNotifications}
                  onCheckedChange={(checked) => updateSetting('notifications', 'systemNotifications', checked)}
                />
              </div>

              <div className="space-y-4">
                <Label>عتبة التنبيه (%)</Label>
                <div className="px-3">
                  <Slider
                    value={[localSettings.notifications.alertThreshold]}
                    onValueChange={([value]) => updateSetting('notifications', 'alertThreshold', value)}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>{localSettings.notifications.alertThreshold}%</span>
                    <span>100%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  إرسال تنبيه عند تجاوز استخدام الموارد هذه النسبة
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;