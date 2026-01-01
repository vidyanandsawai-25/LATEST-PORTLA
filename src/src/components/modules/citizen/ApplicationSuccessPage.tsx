/**
 * Application Success Page Component
 * Display success message after application submission
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import {
  CheckCircle,
  Copy,
  FileText,
  Download,
  Home,
  Clock,
  Shield,
  Phone,
  Mail,
  ArrowRight,
} from 'lucide-react';

export interface ApplicationSuccessPageProps {
  applicationId: string;
  applicationType?: string;
  onClose?: () => void;
  onTrackStatus?: (id: string) => void;
  onDownloadReceipt?: () => void;
}

export const ApplicationSuccessPage: React.FC<ApplicationSuccessPageProps> = ({
  applicationId,
  applicationType = 'Water Connection',
  onClose,
  onTrackStatus,
  onDownloadReceipt,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Success Card */}
        <Card padding="lg" className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" strokeWidth={3} />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-green-400 rounded-full animate-ping opacity-20" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎉 Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your {applicationType} application has been received and is under review
          </p>

          {/* Application ID */}
          <Card padding="lg" variant="bordered" className="mb-6">
            <p className="text-sm text-gray-600 mb-2 flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              Your Application ID
            </p>
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-wider">
                {applicationId}
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Copied to clipboard!
              </p>
            )}
            <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Save this ID to track your application status
            </p>
          </Card>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card padding="lg" variant="bordered" className="text-left">
              <Badge variant="info" className="mb-2">
                In Process
              </Badge>
              <h3 className="font-semibold text-gray-900 mb-1">Current Status</h3>
              <p className="text-sm text-gray-600">
                Your application is submitted and awaiting initial scrutiny
              </p>
            </Card>

            <Card padding="lg" variant="bordered" className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Expected Timeline</h3>
              </div>
              <p className="text-sm text-gray-600">
                Processed within 7-15 working days as per RTS guidelines
              </p>
            </Card>
          </div>

          {/* What Happens Next */}
          <Card padding="lg" variant="bordered" className="text-left mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">What Happens Next?</h3>
            <div className="space-y-3">
              {[
                'Document verification and initial scrutiny',
                'Site inspection by field officer',
                'Fee assessment and notification',
                'Approval and Consumer ID generation',
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {onTrackStatus && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onTrackStatus(applicationId)}
                leftIcon={<FileText className="h-4 w-4" />}
              >
                Track
              </Button>
            )}
            {onDownloadReceipt && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDownloadReceipt}
                leftIcon={<Download className="h-4 w-4" />}
              >
                Receipt
              </Button>
            )}
            {onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                leftIcon={<Home className="h-4 w-4" />}
                className="md:col-span-2"
              >
                Back to Home
              </Button>
            )}
          </div>

          {/* Help Notice */}
          <Card padding="md" variant="bordered" className="bg-blue-50">
            <p className="text-xs text-gray-700 flex items-center justify-center gap-1 flex-wrap">
              <Shield className="w-3 h-3" />
              Need help? Contact our helpline:
              <strong className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                1800-XXX-XXXX
              </strong>
              or email
              <strong className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                support@municipal.gov.in
              </strong>
            </p>
          </Card>
        </Card>
      </div>
    </div>
  );
};
