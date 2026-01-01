/**
 * Connection Details Component
 * Detailed view of water connection
 */

'use client';

import React from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { formatDate, formatCurrency } from '@/lib/utils/format';
import {
  Droplet,
  MapPin,
  Calendar,
  User,
  Home,
  Phone,
  Mail,
  FileText,
  Download,
  Edit,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import type { WaterConnection } from '@/types/common.types';

export interface ConnectionDetailsProps {
  connection: WaterConnection;
  onEdit?: () => void;
  onDownloadCertificate?: () => void;
  loading?: boolean;
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

export const ConnectionDetails: React.FC<ConnectionDetailsProps> = ({
  connection,
  onEdit,
  onDownloadCertificate,
  loading = false,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Card */}
      <Card padding="lg">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-lg">
              <Droplet className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {connection.applicantName}
              </h1>
              <p className="text-gray-600 mt-1">
                Consumer ID: {connection.consumerId}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={statusVariantMap[connection.connectionStatus]} size="lg">
              {connection.connectionStatus.replace(/_/g, ' ')}
            </Badge>
            <p className="text-sm text-gray-600 mt-2">
              Applied on {formatDate(connection.appliedDate)}
            </p>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card padding="lg">
        <CardHeader
          title="Personal Information"
          action={
            onEdit && (
              <Button variant="outline" size="sm" leftIcon={<Edit className="h-4 w-4" />} onClick={onEdit}>
                Edit
              </Button>
            )
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Applicant Name</p>
              <p className="font-medium text-gray-900">{connection.applicantName}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Father's/Husband's Name</p>
              <p className="font-medium text-gray-900">{connection.fatherName || '-'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Mobile Number</p>
              <p className="font-medium text-gray-900">{connection.mobileNumber}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-gray-400 mt-1" />
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-medium text-gray-900">{connection.email || '-'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Address Information */}
      <Card padding="lg">
        <CardHeader title="Address Information" />
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Complete Address</p>
              <p className="font-medium text-gray-900">{connection.address}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600">Ward Number</p>
              <p className="font-medium text-gray-900">Ward {connection.wardNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Zone</p>
              <p className="font-medium text-gray-900">{connection.zone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pincode</p>
              <p className="font-medium text-gray-900">{connection.pincode || '-'}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Connection Information */}
      <Card padding="lg">
        <CardHeader title="Connection Information" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Property ID</p>
            <p className="font-medium text-gray-900">{connection.propertyId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Property Type</p>
            <p className="font-medium text-gray-900 capitalize">{connection.propertyType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Connection Type</p>
            <p className="font-medium text-gray-900 capitalize">{connection.connectionType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pipe Size</p>
            <p className="font-medium text-gray-900">{connection.pipeSize}</p>
          </div>
          {connection.meterNumber && (
            <>
              <div>
                <p className="text-sm text-gray-600 mb-1">Meter Number</p>
                <p className="font-medium text-gray-900">{connection.meterNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Meter Type</p>
                <p className="font-medium text-gray-900 capitalize">{connection.meterType || '-'}</p>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Timeline */}
      <Card padding="lg">
        <CardHeader title="Application Timeline" />
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="w-0.5 h-12 bg-gray-300 my-1" />
            </div>
            <div className="flex-1 pb-8">
              <p className="font-medium text-gray-900">Application Submitted</p>
              <p className="text-sm text-gray-600">{formatDate(connection.appliedDate)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Your application has been successfully submitted
              </p>
            </div>
          </div>

          {connection.verificationDate && (
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="w-0.5 h-12 bg-gray-300 my-1" />
              </div>
              <div className="flex-1 pb-8">
                <p className="font-medium text-gray-900">Document Verification</p>
                <p className="text-sm text-gray-600">{formatDate(connection.verificationDate)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Documents verified successfully
                </p>
              </div>
            </div>
          )}

          {connection.inspectionDate && (
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div className="w-0.5 h-12 bg-gray-300 my-1" />
              </div>
              <div className="flex-1 pb-8">
                <p className="font-medium text-gray-900">Site Inspection</p>
                <p className="text-sm text-gray-600">{formatDate(connection.inspectionDate)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Site inspection completed
                </p>
              </div>
            </div>
          )}

          {connection.approvalDate && (
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Connection Approved</p>
                <p className="text-sm text-gray-600">{formatDate(connection.approvalDate)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Your connection has been activated
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Actions */}
      {connection.connectionStatus === 'active' && (
        <Card padding="lg">
          <div className="flex flex-col sm:flex-row gap-3">
            {onDownloadCertificate && (
              <Button
                variant="primary"
                leftIcon={<Download className="h-5 w-5" />}
                onClick={onDownloadCertificate}
                loading={loading}
              >
                Download Connection Certificate
              </Button>
            )}
            <Button
              variant="outline"
              leftIcon={<FileText className="h-5 w-5" />}
              onClick={() => window.open('/citizen/bills', '_self')}
            >
              View Bills
            </Button>
          </div>
        </Card>
      )}

      {/* Rejection Information */}
      {connection.connectionStatus === 'rejected' && connection.remarks && (
        <Card padding="lg" variant="bordered">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Application Rejected</h3>
              <p className="text-sm text-red-700">{connection.remarks}</p>
              <Button variant="primary" size="sm" className="mt-4">
                Reapply
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
