/**
 * Connection List Component
 * Display list of water connections
 */

'use client';

import React, { useState } from 'react';
import { ConnectionCard } from './ConnectionCard';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { Plus, Search, Filter } from 'lucide-react';
import type { WaterConnection } from '@/types/common.types';

export interface ConnectionListProps {
  connections: WaterConnection[];
  loading?: boolean;
  onViewDetails?: (connection: WaterConnection) => void;
  onNewConnection?: () => void;
}

export const ConnectionList: React.FC<ConnectionListProps> = ({
  connections,
  loading = false,
  onViewDetails,
  onNewConnection,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter connections
  const filteredConnections = connections.filter(connection => {
    const matchesSearch = 
      connection.consumerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      connection.connectionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Connections</h1>
          <p className="text-gray-600 mt-1">
            Manage your water connections
          </p>
        </div>
        {onNewConnection && (
          <Button
            variant="primary"
            leftIcon={<Plus className="h-5 w-5" />}
            onClick={onNewConnection}
          >
            New Connection
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by Consumer ID, Name, or Address..."
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
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'under_verification', label: 'Under Verification' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
            ]}
            fullWidth
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredConnections.length} of {connections.length} connections
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-64" />
            </div>
          ))}
        </div>
      )}

      {/* Connection Cards */}
      {!loading && filteredConnections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map(connection => (
            <ConnectionCard
              key={connection.id}
              connection={connection}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredConnections.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No connections found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'You haven\'t applied for any water connections yet'}
          </p>
          {onNewConnection && !searchQuery && statusFilter === 'all' && (
            <Button
              variant="primary"
              leftIcon={<Plus className="h-5 w-5" />}
              onClick={onNewConnection}
            >
              Apply for New Connection
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
