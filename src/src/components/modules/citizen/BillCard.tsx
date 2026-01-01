/**
 * Bill Card Component
 * Display water bill summary in a card
 */

import React from 'react';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { formatDate, formatCurrency, isOverdue, daysRemaining } from '@/lib/utils/format';
import { FileText, Calendar, Droplet, Download, CreditCard, AlertCircle } from 'lucide-react';
import type { WaterBill } from '@/types/common.types';

export interface BillCardProps {
  bill: WaterBill;
  onPay?: (bill: WaterBill) => void;
  onDownload?: (bill: WaterBill) => void;
}

const statusVariantMap: Record<string, 'default' | 'success' | 'warning' | 'error'> = {
  unpaid: 'error',
  partially_paid: 'warning',
  paid: 'success',
  overdue: 'error',
};

export const BillCard: React.FC<BillCardProps> = ({
  bill,
  onPay,
  onDownload,
}) => {
  const isOverdueBill = bill.billStatus !== 'paid' && isOverdue(bill.dueDate);
  const daysUntilDue = daysRemaining(bill.dueDate);

  return (
    <Card padding="lg" className="h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Bill #{bill.billNumber}
              </h3>
              <p className="text-sm text-gray-600">
                {formatDate(bill.billingPeriodStart)} - {formatDate(bill.billingPeriodEnd)}
              </p>
            </div>
          </div>
          <Badge variant={statusVariantMap[bill.billStatus]} size="sm">
            {bill.billStatus.replace(/_/g, ' ')}
          </Badge>
        </div>

        {/* Amount Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(bill.netAmount)}
            </span>
          </div>
          {bill.billStatus !== 'paid' && bill.balanceAmount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Balance Due</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(bill.balanceAmount)}
              </span>
            </div>
          )}
        </div>

        {/* Consumption Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Droplet className="h-4 w-4 text-blue-400" />
            <span className="text-gray-600">
              Consumption: <span className="font-medium text-gray-900">{bill.consumption} KL</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">
              Due Date: <span className="font-medium text-gray-900">{formatDate(bill.dueDate)}</span>
            </span>
          </div>
        </div>

        {/* Due Date Warning */}
        {isOverdueBill && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Overdue</p>
              <p className="text-xs text-red-700">
                Payment is overdue. Late payment charges may apply.
              </p>
            </div>
          </div>
        )}

        {!isOverdueBill && bill.billStatus !== 'paid' && daysUntilDue <= 5 && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900">
                Due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}
              </p>
              <p className="text-xs text-yellow-700">
                Pay before due date to avoid late charges.
              </p>
            </div>
          </div>
        )}

        {/* Charges Breakdown */}
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Charges Breakdown</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Water Charges</span>
              <span className="text-gray-900">{formatCurrency(bill.waterCharges)}</span>
            </div>
            {bill.sewerageCharges > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Sewerage Charges</span>
                <span className="text-gray-900">{formatCurrency(bill.sewerageCharges)}</span>
              </div>
            )}
            {bill.meterRent > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Meter Rent</span>
                <span className="text-gray-900">{formatCurrency(bill.meterRent)}</span>
              </div>
            )}
            {bill.penaltyAmount > 0 && (
              <div className="flex justify-between text-red-600">
                <span>Penalty</span>
                <span>{formatCurrency(bill.penaltyAmount)}</span>
              </div>
            )}
            {bill.rebateAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Rebate</span>
                <span>-{formatCurrency(bill.rebateAmount)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
          {bill.billStatus !== 'paid' && onPay && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              leftIcon={<CreditCard className="h-4 w-4" />}
              onClick={() => onPay(bill)}
            >
              Pay Now
            </Button>
          )}
          {onDownload && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => onDownload(bill)}
            >
              Download
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
