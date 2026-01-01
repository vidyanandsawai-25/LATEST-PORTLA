/**
 * Quick Actions Component
 * Quick action buttons for common tasks
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { 
  Plus, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  Search 
} from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  bgColor: string;
}

export const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      title: 'New Connection',
      description: 'Apply for water connection',
      icon: <Plus className="h-6 w-6" />,
      href: '/citizen/connections/new',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'View Bills',
      description: 'Check pending bills',
      icon: <FileText className="h-6 w-6" />,
      href: '/citizen/bills',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Make Payment',
      description: 'Pay your water bill',
      icon: <CreditCard className="h-6 w-6" />,
      href: '/citizen/payments',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Register Grievance',
      description: 'Report an issue',
      icon: <MessageSquare className="h-6 w-6" />,
      href: '/citizen/grievances/new',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Meter Reading',
      description: 'Submit meter reading',
      icon: <BarChart3 className="h-6 w-6" />,
      href: '/citizen/meter-reading',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
    {
      title: 'Track Status',
      description: 'Track application status',
      icon: <Search className="h-6 w-6" />,
      href: '/track-status',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {actions.map((action, index) => (
        <Link key={index} href={action.href}>
          <Card padding="lg" hover className="h-full card-hover">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${action.bgColor} flex-shrink-0`}>
                <div className={action.color}>{action.icon}</div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
