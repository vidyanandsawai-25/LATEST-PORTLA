/**
 * Dashboard Stats Component
 * Display key statistics on citizen dashboard
 */

'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Droplet, FileText, CreditCard, AlertCircle } from 'lucide-react';

export interface StatsData {
  totalConnections: number;
  activeConnections: number;
  pendingBills: number;
  overdueAmount: number;
}

export interface DashboardStatsProps {
  stats: StatsData;
  loading?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} padding="lg" className="animate-pulse">
            <div className="skeleton h-12 w-12 rounded-lg mb-3" />
            <div className="skeleton h-4 w-20 mb-2" />
            <div className="skeleton h-8 w-16" />
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Connections',
      value: stats.totalConnections,
      icon: <Droplet className="h-6 w-6" />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900',
    },
    {
      title: 'Active Connections',
      value: stats.activeConnections,
      icon: <Droplet className="h-6 w-6" />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      textColor: 'text-green-900',
    },
    {
      title: 'Pending Bills',
      value: stats.pendingBills,
      icon: <FileText className="h-6 w-6" />,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      textColor: 'text-yellow-900',
    },
    {
      title: 'Overdue Amount',
      value: `₹${stats.overdueAmount.toLocaleString()}`,
      icon: <AlertCircle className="h-6 w-6" />,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} padding="lg" hover className="card-hover">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <div className={stat.iconColor}>{stat.icon}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
