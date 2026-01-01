/**
 * Recent Activity Component
 * Display recent activities and notifications
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { formatDate } from '@/lib/utils/format';
import { 
  FileText, 
  CreditCard, 
  MessageSquare, 
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export interface Activity {
  id: string;
  type: 'bill' | 'payment' | 'grievance' | 'connection';
  title: string;
  description: string;
  date: string;
  status: 'success' | 'pending' | 'info';
  link?: string;
}

export interface RecentActivityProps {
  activities: Activity[];
  loading?: boolean;
}

const activityIcons = {
  bill: <FileText className="h-5 w-5" />,
  payment: <CreditCard className="h-5 w-5" />,
  grievance: <MessageSquare className="h-5 w-5" />,
  connection: <CheckCircle className="h-5 w-5" />,
};

const statusColors = {
  success: 'text-green-600 bg-green-100',
  pending: 'text-yellow-600 bg-yellow-100',
  info: 'text-blue-600 bg-blue-100',
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ 
  activities, 
  loading 
}) => {
  if (loading) {
    return (
      <Card padding="none">
        <CardHeader title="Recent Activity" className="px-6 pt-6" />
        <div className="px-6 pb-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 animate-pulse">
              <div className="skeleton h-10 w-10 rounded-lg" />
              <div className="flex-1">
                <div className="skeleton h-4 w-3/4 mb-2" />
                <div className="skeleton h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <CardHeader 
        title="Recent Activity" 
        className="px-6 pt-6"
        action={
          <Link 
            href="/citizen/activity" 
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
      
      <div className="px-6 pb-6">
        {activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${statusColors[activity.status]}`}>
                  {activityIcons[activity.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(activity.date)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {activity.description}
                  </p>
                  {activity.link && (
                    <Link
                      href={activity.link}
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
                    >
                      View details <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
