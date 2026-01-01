/**
 * Grievance List Component
 * Display list of registered grievances
 */

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { formatDate } from '@/lib/utils/format';
import { 
  Search, 
  MessageSquare, 
  Plus, 
  Eye, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock 
} from 'lucide-react';
import type { Grievance } from '@/types/common.types';

export interface GrievanceListProps {
  grievances: Grievance[];
  loading?: boolean;
  onViewDetails?: (grievance: Grievance) => void;
  onNewGrievance?: () => void;
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  acknowledged: 'info',
  under_review: 'info',
  in_progress: 'info',
  resolved: 'success',
  rejected: 'error',
  closed: 'default',
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  acknowledged: <CheckCircle className="h-4 w-4" />,
  under_review: <AlertCircle className="h-4 w-4" />,
  in_progress: <AlertCircle className="h-4 w-4" />,
  resolved: <CheckCircle className="h-4 w-4" />,
  rejected: <AlertCircle className="h-4 w-4" />,
  closed: <CheckCircle className="h-4 w-4" />,
};

export const GrievanceList: React.FC<GrievanceListProps> = ({
  grievances,
  loading = false,
  onViewDetails,
  onNewGrievance,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter grievances
  const filteredGrievances = grievances.filter(grievance => {
    const matchesSearch = 
      grievance.grievanceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      grievance.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Grievances</h1>
          <p className="text-gray-600 mt-1">
            Track and manage your registered grievances
          </p>
        </div>
        {onNewGrievance && (
          <Button
            variant="primary"
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={onNewGrievance}
          >
            New Grievance
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by Grievance Number, Subject, or Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            fullWidth
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'pending', label: 'Pending' },
              { value: 'acknowledged', label: 'Acknowledged' },
              { value: 'under_review', label: 'Under Review' },
              { value: 'in_progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'closed', label: 'Closed' },
            ]}
            fullWidth
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredGrievances.length} of {grievances.length} grievances
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32" />
            </div>
          ))}
        </div>
      )}

      {/* Grievance List */}
      {!loading && filteredGrievances.length > 0 && (
        <div className="space-y-4">
          {filteredGrievances.map(grievance => (
            <Card key={grievance.id} padding="lg" hover>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {grievance.subject}
                      </h3>
                      <p className="text-sm text-gray-600">
                        #{grievance.grievanceNumber}
                      </p>
                    </div>
                    <Badge 
                      variant={statusVariantMap[grievance.status]}
                      className="flex items-center gap-1"
                    >
                      {statusIcons[grievance.status]}
                      {grievance.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {grievance.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(grievance.registeredDate)}
                    </div>
                    <div>
                      Category: <span className="font-medium text-gray-900">{grievance.category}</span>
                    </div>
                    <div>
                      Priority: <span className={`font-medium ${
                        grievance.priority === 'high' ? 'text-red-600' :
                        grievance.priority === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>{grievance.priority}</span>
                    </div>
                  </div>

                  {grievance.resolvedDate && (
                    <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Resolved on {formatDate(grievance.resolvedDate)}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                  {onViewDetails && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye className="h-4 w-4" />}
                      onClick={() => onViewDetails(grievance)}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredGrievances.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No grievances found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'You haven\'t registered any grievances yet'}
          </p>
          {onNewGrievance && !searchQuery && statusFilter === 'all' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="h-5 w-5" />}
              onClick={onNewGrievance}
            >
              Register New Grievance
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
