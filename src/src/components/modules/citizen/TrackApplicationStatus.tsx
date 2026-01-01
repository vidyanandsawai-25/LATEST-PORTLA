/**
 * Track Application Status Component
 * Track status of water connection applications
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { formatDate } from '@/lib/utils/format';
import {
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  MapPin,
  User,
  Phone,
  Home,
  Droplet,
} from 'lucide-react';

export interface ApplicationStatus {
  applicationId: string;
  applicantName: string;
  mobileNumber: string;
  address: string;
  status: 'pending' | 'under_verification' | 'inspection_scheduled' | 'approved' | 'rejected';
  appliedDate: string;
  currentStage: string;
  timeline: Array<{
    stage: string;
    status: 'completed' | 'in_progress' | 'pending';
    date?: string;
    remarks?: string;
  }>;
}

export interface TrackApplicationStatusProps {
  onSearch: (applicationId: string) => Promise<ApplicationStatus | null>;
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  under_verification: 'info',
  inspection_scheduled: 'info',
  approved: 'success',
  rejected: 'error',
};

export const TrackApplicationStatus: React.FC<TrackApplicationStatusProps> = ({
  onSearch,
}) => {
  const [applicationId, setApplicationId] = useState('');
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setLoading(true);
    setError('');
    setApplicationStatus(null);

    try {
      const status = await onSearch(applicationId);
      if (status) {
        setApplicationStatus(status);
      } else {
        setError('Application not found. Please check your ID and try again.');
      }
    } catch (err) {
      setError('Failed to fetch application status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Card */}
      <Card padding="lg">
        <CardHeader
          title="Track Application Status"
          subtitle="Enter your application ID to track the status"
        />

        <div className="flex gap-3">
          <Input
            placeholder="Enter Application ID (e.g., WTR2025001234)"
            value={applicationId}
            onChange={(e) => {
              setApplicationId(e.target.value);
              setError('');
            }}
            leftIcon={<FileText className="h-5 w-5" />}
            fullWidth
            error={error}
          />
          <Button
            variant="primary"
            onClick={handleSearch}
            loading={loading}
            leftIcon={<Search className="h-5 w-5" />}
          >
            Track
          </Button>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
      </Card>

      {/* Status Display */}
      {applicationStatus && (
        <>
          {/* Application Info */}
          <Card padding="lg">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Application #{applicationStatus.applicationId}
                </h2>
                <p className="text-gray-600">
                  Applied on {formatDate(applicationStatus.appliedDate)}
                </p>
              </div>
              <Badge variant={statusVariantMap[applicationStatus.status]} size="lg">
                {applicationStatus.status.replace(/_/g, ' ')}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Applicant Name</p>
                  <p className="font-medium text-gray-900">{applicationStatus.applicantName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Mobile Number</p>
                  <p className="font-medium text-gray-900">{applicationStatus.mobileNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <Home className="h-5 w-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium text-gray-900">{applicationStatus.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card padding="lg">
            <CardHeader
              title="Application Timeline"
              subtitle="Track your application progress"
            />

            <div className="space-y-6">
              {applicationStatus.timeline.map((stage, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${stage.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : stage.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                        }
                      `}
                    >
                      {stage.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : stage.status === 'in_progress' ? (
                        <Clock className="h-5 w-5 animate-spin" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    {index < applicationStatus.timeline.length - 1 && (
                      <div
                        className={`
                          w-0.5 h-16 my-2
                          ${stage.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'}
                        `}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-gray-900">{stage.stage}</h3>
                      {stage.date && (
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {formatDate(stage.date)}
                        </span>
                      )}
                    </div>
                    {stage.remarks && (
                      <p className="text-sm text-gray-600 mt-1">{stage.remarks}</p>
                    )}
                    {stage.status === 'in_progress' && (
                      <div className="mt-2">
                        <Badge variant="info" size="sm">
                          Current Stage
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Help Card */}
          <Card padding="lg" variant="bordered" className="bg-blue-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  If you have any questions about your application status, please contact our helpdesk.
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <strong className="text-blue-900">1800-XXX-XXXX</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <strong className="text-blue-900">support@municipal.gov.in</strong>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
