/**
 * Payment Receipt Component
 * Display and print payment receipt
 */

'use client';

import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { formatDate, formatCurrency } from '@/lib/utils/format';
import { APP_CONFIG } from '@/config/app.config';
import {
  CheckCircle,
  Download,
  Printer,
  Share2,
  Droplet,
} from 'lucide-react';
import type { Payment } from '@/types/common.types';

export interface PaymentReceiptProps {
  payment: Payment;
  onDownload?: () => void;
  onPrint?: () => void;
  onShare?: () => void;
}

export const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  payment,
  onDownload,
  onPrint,
  onShare,
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">
          Payment Successful!
        </h2>
        <p className="text-green-700">
          Your payment of <span className="font-semibold">{formatCurrency(payment.amount)}</span> has been received
        </p>
      </div>

      {/* Receipt Card */}
      <Card padding="none" className="overflow-hidden" id="payment-receipt">
        {/* Receipt Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Droplet className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{APP_CONFIG.app.shortName}</h3>
                <p className="text-sm text-blue-100">{APP_CONFIG.app.department}</p>
              </div>
            </div>
            <Badge variant="success" size="lg">
              Paid
            </Badge>
          </div>
        </div>

        {/* Receipt Body */}
        <div className="p-8 space-y-6">
          {/* Payment Details */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4">
              Payment Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Receipt Number</p>
                <p className="font-semibold text-gray-900">{payment.receiptNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="font-semibold text-gray-900">{payment.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Date</p>
                <p className="font-semibold text-gray-900">{formatDate(payment.paymentDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold text-gray-900 capitalize">
                  {payment.paymentMethod.replace(/_/g, ' ')}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Bill Details */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4">
              Bill Details
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Consumer ID</p>
                <p className="font-semibold text-gray-900">{payment.consumerId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bill Number</p>
                <p className="font-semibold text-gray-900">{payment.billId}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200" />

          {/* Amount Breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 uppercase mb-4">
              Amount Details
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Bill Amount</span>
                <span className="text-gray-900">{formatCurrency(payment.amount)}</span>
              </div>
              {payment.convenienceFee && payment.convenienceFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="text-gray-900">{formatCurrency(payment.convenienceFee)}</span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Paid</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(payment.amount + (payment.convenienceFee || 0))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-2">
              <strong>Note:</strong> This is a computer-generated receipt and does not require a signature.
            </p>
            <p className="text-xs text-gray-600">
              For any queries, please contact: {APP_CONFIG.contact.helplineNumber} or email: {APP_CONFIG.contact.email}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Generated on {formatDate(new Date().toISOString())}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {APP_CONFIG.app.name} - {APP_CONFIG.contact.address}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        {onDownload && (
          <Button
            variant="primary"
            fullWidth
            leftIcon={<Download className="h-5 w-5" />}
            onClick={onDownload}
          >
            Download PDF
          </Button>
        )}
        {onPrint && (
          <Button
            variant="outline"
            fullWidth
            leftIcon={<Printer className="h-5 w-5" />}
            onClick={onPrint}
          >
            Print Receipt
          </Button>
        )}
        {onShare && (
          <Button
            variant="outline"
            fullWidth
            leftIcon={<Share2 className="h-5 w-5" />}
            onClick={onShare}
          >
            Share
          </Button>
        )}
      </div>

      {/* Back to Dashboard */}
      <div className="text-center mt-6">
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/citizen/dashboard'}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};
