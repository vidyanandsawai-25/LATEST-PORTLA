/**
 * Sidebar Component
 * Navigation sidebar for dashboard layouts
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import {
  LayoutDashboard,
  Droplet,
  FileText,
  CreditCard,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  ClipboardList,
  MapPin,
  Database,
} from 'lucide-react';
import type { UserRole } from '@/types/common.types';

export interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

export interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
}

const navigationByRole: Record<UserRole, SidebarItem[]> = {
  citizen: [
    { name: 'Dashboard', href: '/citizen/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'My Connections', href: '/citizen/connections', icon: <Droplet className="h-5 w-5" /> },
    { name: 'Bills', href: '/citizen/bills', icon: <FileText className="h-5 w-5" /> },
    { name: 'Payments', href: '/citizen/payments', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Meter Reading', href: '/citizen/meter-reading', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Grievances', href: '/citizen/grievances', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Support', href: '/citizen/support', icon: <Settings className="h-5 w-5" /> },
  ],
  officer: [
    { name: 'Dashboard', href: '/officer/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Applications', href: '/officer/applications', icon: <ClipboardList className="h-5 w-5" /> },
    { name: 'Connections', href: '/officer/connections', icon: <Droplet className="h-5 w-5" /> },
    { name: 'Bills', href: '/officer/bills', icon: <FileText className="h-5 w-5" /> },
    { name: 'Collection', href: '/officer/collection', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Grievances', href: '/officer/grievances', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Reports', href: '/officer/reports', icon: <BarChart3 className="h-5 w-5" /> },
  ],
  fieldOfficer: [
    { name: 'Dashboard', href: '/field/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'My Tasks', href: '/field/tasks', icon: <ClipboardList className="h-5 w-5" /> },
    { name: 'Inspections', href: '/field/inspections', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Verifications', href: '/field/verifications', icon: <FileText className="h-5 w-5" /> },
    { name: 'Installations', href: '/field/installations', icon: <Settings className="h-5 w-5" /> },
  ],
  admin: [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Masters', href: '/admin/masters', icon: <Database className="h-5 w-5" /> },
    { name: 'Zones', href: '/admin/masters/zones', icon: <MapPin className="h-5 w-5" /> },
    { name: 'Reports', href: '/admin/reports', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ],
};

export const Sidebar: React.FC<SidebarProps> = ({ role, collapsed = false }) => {
  const pathname = usePathname();
  const navigation = navigationByRole[role] || [];

  return (
    <aside
      className={cn(
        'bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                'hover:bg-gray-100',
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700'
              )}
              title={collapsed ? item.name : undefined}
            >
              <span className={cn(
                'flex-shrink-0',
                isActive && 'text-blue-700'
              )}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="flex-1">{item.name}</span>
              )}
              {!collapsed && item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
