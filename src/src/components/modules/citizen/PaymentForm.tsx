/**
 * Payment Form Component
 * Form for making bill payments with multiple payment methods
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Badge } from '@/components/common/Badge';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Wallet,
  Lock,
  CheckCircle
} from 'lucide-react';
import type { WaterBill } from '@/types/common.types';

export interface PaymentFormProps {
  bill: WaterBill;
  onSubmit: (paymentData: PaymentData) => Promise<void>;
  loading?: boolean;
}

export interface PaymentData {
  billId: string;
  amount: number;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'wallet';
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCVV?: string;
  upiId?: string;
  bankName?: string;
  walletType?: string;
}

type PaymentMethod = 'card' | 'upi' | 'netbanking' | 'wallet';

export const PaymentForm: React.FC<PaymentFormProps> = ({
  bill,
  onSubmit,
  loading = false,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [paymentData, setPaymentData] = useState<Partial<PaymentData>>({
    billId: bill.id,
    amount: bill.balanceAmount,
    paymentMethod: 'card',
  });

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Credit/Debit Card',
      icon: <CreditCard className="h-5 w-5" />,
      description: 'Pay using your card',
    },
    {
      id: 'upi' as PaymentMethod,
      name: 'UPI',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Pay via UPI ID',
    },
    {
      id: 'netbanking' as PaymentMethod,
      name: 'Net Banking',
      icon: <Building2 className="h-5 w-5" />,
      description: 'Pay through your bank',
    },
    {
      id: 'wallet' as PaymentMethod,
      name: 'Wallet',
      icon: <Wallet className="h-5 w-5" />,
      description: 'Pay using wallet',
    },
  ];

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setPaymentData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(paymentData as PaymentData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bill Summary */}
        <Card padding="lg" className="lg:col-span-1">
          <CardHeader title="Bill Summary" />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Bill Number</span>
              <span className="font-medium text-gray-900">{bill.billNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Period</span>
              <span className="font-medium text-gray-900">
                {formatDate(bill.billingPeriodStart)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Due Date</span>
              <span className="font-medium text-gray-900">
                {formatDate(bill.dueDate)}
              </span>
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Water Charges</span>
                <span className="text-gray-900">{formatCurrency(bill.waterCharges)}</span>
              </div>
              {bill.sewerageCharges > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Sewerage</span>
                  <span className="text-gray-900">{formatCurrency(bill.sewerageCharges)}</span>
                </div>
              )}
              {bill.meterRent > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Meter Rent</span>
                  <span className="text-gray-900">{formatCurrency(bill.meterRent)}</span>
                </div>
              )}
              {bill.penaltyAmount > 0 && (
                <div className="flex justify-between text-sm mb-2 text-red-600">
                  <span>Penalty</span>
                  <span>{formatCurrency(bill.penaltyAmount)}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(bill.balanceAmount)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Form */}
        <Card padding="lg" className="lg:col-span-2">
          <CardHeader 
            title="Select Payment Method" 
            subtitle="Choose your preferred payment option"
          />

          {/* Payment Method Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                type="button"
                onClick={() => handleMethodSelect(method.id)}
                className={`
                  p-4 border-2 rounded-lg transition-all text-left
                  ${selectedMethod === method.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    p-2 rounded-lg
                    ${selectedMethod === method.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
                  `}>
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{method.name}</h4>
                    <p className="text-xs text-gray-600">{method.description}</p>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="h-5 w-5 text-blue-600 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Payment */}
            {selectedMethod === 'card' && (
              <>
                <Input
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber || ''}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  required
                  fullWidth
                />
                <Input
                  label="Cardholder Name"
                  placeholder="Name on card"
                  value={paymentData.cardName || ''}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardName: e.target.value }))}
                  required
                  fullWidth
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentData.cardExpiry || ''}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardExpiry: e.target.value }))}
                    required
                    fullWidth
                  />
                  <Input
                    label="CVV"
                    type="password"
                    placeholder="123"
                    maxLength={3}
                    value={paymentData.cardCVV || ''}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cardCVV: e.target.value }))}
                    required
                    fullWidth
                  />
                </div>
              </>
            )}

            {/* UPI Payment */}
            {selectedMethod === 'upi' && (
              <>
                <Input
                  label="UPI ID"
                  placeholder="yourname@upi"
                  value={paymentData.upiId || ''}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e.target.value }))}
                  helperText="Enter your UPI ID (e.g., yourname@paytm)"
                  required
                  fullWidth
                />
              </>
            )}

            {/* Net Banking */}
            {selectedMethod === 'netbanking' && (
              <>
                <Select
                  label="Select Bank"
                  placeholder="Choose your bank"
                  value={paymentData.bankName || ''}
                  onChange={(value) => setPaymentData(prev => ({ ...prev, bankName: value }))}
                  options={[
                    { value: 'sbi', label: 'State Bank of India' },
                    { value: 'hdfc', label: 'HDFC Bank' },
                    { value: 'icici', label: 'ICICI Bank' },
                    { value: 'axis', label: 'Axis Bank' },
                    { value: 'pnb', label: 'Punjab National Bank' },
                  ]}
                  required
                  fullWidth
                />
              </>
            )}

            {/* Wallet Payment */}
            {selectedMethod === 'wallet' && (
              <>
                <Select
                  label="Select Wallet"
                  placeholder="Choose wallet provider"
                  value={paymentData.walletType || ''}
                  onChange={(value) => setPaymentData(prev => ({ ...prev, walletType: value }))}
                  options={[
                    { value: 'paytm', label: 'Paytm' },
                    { value: 'phonepe', label: 'PhonePe' },
                    { value: 'googlepay', label: 'Google Pay' },
                    { value: 'amazonpay', label: 'Amazon Pay' },
                  ]}
                  required
                  fullWidth
                />
              </>
            )}

            {/* Security Note */}
            <div className="flex items-start gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
              <Lock className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-green-900">Secure Payment</h4>
                <p className="text-xs text-green-700 mt-1">
                  Your payment information is encrypted and secure. We do not store any payment details.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                leftIcon={<Lock className="h-5 w-5" />}
              >
                Pay {formatCurrency(bill.balanceAmount)}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};
