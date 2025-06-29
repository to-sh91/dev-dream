import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Download,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { User } from '@/types/admin';

interface UserManagementProps {
  users: User[];
  onUpdateUser: (userId: string, updates: Partial<User>) => void;
  onDeleteUser: (userId: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onUpdateUser, onDeleteUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const getStatusBadge = (status: User['status']) => {
    const variants = {
      active: { variant: 'default' as const, label: 'نشط' },
      suspended: { variant: 'destructive' as const, label: 'معلق' },
      inactive: { variant: 'secondary' as const, label: 'غير نشط' }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getRoleBadge = (role: User['role']) => {
    return (
      <Badge variant={role === 'admin' ? 'default' : 'outline'}>
        {role === 'admin' ? 'مدير' : 'مستخدم'}
      </Badge>
    );
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    onUpdateUser(userId, { status: newStatus });
  };

  const handleRoleChange = (userId: string, newRole: User['role']) => {
    onUpdateUser(userId, { role: newRole });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المستخدمين</h1>
          <p className="text-gray-600">إدارة حسابات المستخدمين والصلاحيات</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير
          </Button>
          <Button>
            <Plus className="w-4 h-4 ml-2" />
            إضافة مستخدم
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث عن المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="active">نشط</SelectItem>
                <SelectItem value="suspended">معلق</SelectItem>
                <SelectItem value="inactive">غير نشط</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأدوار</SelectItem>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="user">مستخدم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>المستخدمون ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-right py-3 px-4 font-medium text-gray-900">المستخدم</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الدور</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">المحادثات</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الرموز</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">آخر دخول</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {user.conversationsCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-900">
                      {user.tokensUsed.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-500">
                      {user.lastLogin.toLocaleDateString('ar')}
                    </td>
                    <td className="py-4 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          {user.status === 'active' ? (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(user.id, 'suspended')}
                            >
                              <UserX className="w-4 h-4 ml-2" />
                              تعليق
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              <UserCheck className="w-4 h-4 ml-2" />
                              تفعيل
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')}
                          >
                            <UserCheck className="w-4 h-4 ml-2" />
                            {user.role === 'admin' ? 'إزالة صلاحية المدير' : 'منح صلاحية المدير'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => onDeleteUser(user.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;