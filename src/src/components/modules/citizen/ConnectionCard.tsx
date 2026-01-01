/**
 * Connection Card Component
 * Display water connection summary in a card
 */

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { formatDate, formatCurrency, getStatusBadgeClass } from '@/lib/utils/format';
import { Droplet, MapPin, Calendar, Eye } from 'lucide-react';
import type { WaterConnection } from '@/types/common.types';

export interface ConnectionCardProps {
  connection: WaterConnection;
  onViewDetails?: (connection: WaterConnection) => void;
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  under_verification: 'info',
  inspection_scheduled: 'info',
  inspection_completed: 'info',
  approved: 'success',
  rejected: 'error',
  active: 'success',
  disconnected: 'default',
  suspended: 'warning',
};

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  connection,
  onViewDetails,
}) => {
  return (
    <Card hover padding="lg" className="h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Droplet className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {connection.applicantName}
              </h3>
              <p className="text-sm text-gray-600">
                ID: {connection.consumerId}
              </p>
            </div>
          </div>
          <Badge 
            variant={statusVariantMap[connection.connectionStatus]}
            size="sm"
          >
            {connection.connectionStatus.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gray-900">{connection.address}</p>
              <p className="text-gray-600">
                Ward {connection.wardNumber}, Zone: {connection.zone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              Applied: {formatDate(connection.appliedDate)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
            <div>
              <p className="text-xs text-gray-600">Connection Type</p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {connection.connectionType}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Pipe Size</p>
              <p className="text-sm font-medium text-gray-900">
                {connection.pipeSize}
              </p>
            </div>
          </div>

          {connection.meterNumber && (
            <div className="pt-2">
              <p className="text-xs text-gray-600">Meter Number</p>
              <p className="text-sm font-medium text-gray-900">
                {connection.meterNumber}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            leftIcon={<Eye className="h-4 w-4" />}
            onClick={() => onViewDetails && onViewDetails(connection)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
