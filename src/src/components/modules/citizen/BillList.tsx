/**
 * Bill List Component
 * Display list of water bills with filters
 */

'use client';

import React, { useState } from 'react';
import { BillCard } from './BillCard';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Badge } from '@/components/common/Badge';
import { Search, Filter, FileText } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import type { WaterBill } from '@/types/common.types';

export interface BillListProps {
  bills: WaterBill[];
  loading?: boolean;
  onPay?: (bill: WaterBill) => void;
  onDownload?: (bill: WaterBill) => void;
}

export const BillList: React.FC<BillListProps> = ({
  bills,
  loading = false,
  onPay,
  onDownload,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Calculate summary
  const totalDue = bills
    .filter(b => b.billStatus !== 'paid')
    .reduce((sum, b) => sum + b.balanceAmount, 0);
  
  const unpaidCount = bills.filter(b => b.billStatus !== 'paid').length;

  // Filter bills
  const filteredBills = bills.filter(bill => {
    const matchesSearch = 
      bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.consumerId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      bill.billStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Bills</h1>
        <p className="text-gray-600 mt-1">
          View and manage your water bills
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-sm text-blue-100 mb-1">Total Bills</p>
          <p className="text-3xl font-bold">{bills.length}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white">
          <p className="text-sm text-red-100 mb-1">Unpaid Bills</p>
          <p className="text-3xl font-bold">{unpaidCount}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-6 text-white">
          <p className="text-sm text-orange-100 mb-1">Total Due</p>
          <p className="text-3xl font-bold">{formatCurrency(totalDue)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by Bill Number or Consumer ID..."
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
              { value: 'all', label: 'All Bills' },
              { value: 'unpaid', label: 'Unpaid' },
              { value: 'partially_paid', label: 'Partially Paid' },
              { value: 'paid', label: 'Paid' },
              { value: 'overdue', label: 'Overdue' },
            ]}
            fullWidth
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredBills.length} of {bills.length} bills
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-96" />
            </div>
          ))}
        </div>
      )}

      {/* Bill Cards */}
      {!loading && filteredBills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.map(bill => (
            <BillCard
              key={bill.id}
              bill={bill}
              onPay={onPay}
              onDownload={onDownload}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBills.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No bills found
          </h3>
          <p className="text-gray-600">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'You don\'t have any bills yet'}
          </p>
        </div>
      )}
    </div>
  );
};
