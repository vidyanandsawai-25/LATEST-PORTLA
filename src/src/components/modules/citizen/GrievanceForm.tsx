/**
 * Grievance Form Component
 * Form for registering new grievances
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { TextArea } from '@/components/common/Input';
import { AlertCircle, Upload, X, CheckCircle } from 'lucide-react';

export interface GrievanceFormData {
  connectionId: string;
  category: string;
  subCategory: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  attachments: File[];
  mobileNumber: string;
  email?: string;
}

export interface GrievanceFormProps {
  connections: Array<{ value: string; label: string }>;
  onSubmit: (data: GrievanceFormData) => Promise<void>;
  loading?: boolean;
}

export const GrievanceForm: React.FC<GrievanceFormProps> = ({
  connections,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<GrievanceFormData>({
    connectionId: '',
    category: '',
    subCategory: '',
    subject: '',
    description: '',
    priority: 'medium',
    attachments: [],
    mobileNumber: '',
    email: '',
  });

  const [attachments, setAttachments] = useState<File[]>([]);

  const categories = [
    {
      value: 'billing',
      label: 'Billing Issues',
      subCategories: [
        { value: 'incorrect_bill', label: 'Incorrect Bill Amount' },
        { value: 'duplicate_bill', label: 'Duplicate Billing' },
        { value: 'meter_reading', label: 'Meter Reading Issue' },
      ],
    },
    {
      value: 'supply',
      label: 'Water Supply',
      subCategories: [
        { value: 'no_supply', label: 'No Water Supply' },
        { value: 'low_pressure', label: 'Low Water Pressure' },
        { value: 'contaminated', label: 'Water Quality Issue' },
      ],
    },
    {
      value: 'connection',
      label: 'Connection Issues',
      subCategories: [
        { value: 'leakage', label: 'Pipe Leakage' },
        { value: 'meter_fault', label: 'Meter Malfunction' },
        { value: 'unauthorized', label: 'Unauthorized Connection' },
      ],
    },
    {
      value: 'service',
      label: 'Service Request',
      subCategories: [
        { value: 'new_connection', label: 'New Connection Delay' },
        { value: 'disconnection', label: 'Disconnection Issue' },
        { value: 'other', label: 'Other Services' },
      ],
    },
  ];

  const handleChange = (field: keyof GrievanceFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + attachments.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }
    setAttachments(prev => [...prev, ...files]);
    setFormData(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="max-w-3xl mx-auto">
      <Card padding="lg">
        <CardHeader
          title="Register Grievance"
          subtitle="Please provide details about your issue"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Connection Selection */}
          <Select
            label="Select Connection"
            placeholder="Choose water connection"
            value={formData.connectionId}
            onChange={(value) => handleChange('connectionId', value)}
            options={connections}
            required
            fullWidth
          />

          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              placeholder="Select category"
              value={formData.category}
              onChange={(value) => {
                handleChange('category', value);
                handleChange('subCategory', '');
              }}
              options={categories.map(cat => ({
                value: cat.value,
                label: cat.label,
              }))}
              required
              fullWidth
            />

            <Select
              label="Sub Category"
              placeholder="Select sub-category"
              value={formData.subCategory}
              onChange={(value) => handleChange('subCategory', value)}
              options={selectedCategory?.subCategories || []}
              disabled={!formData.category}
              required
              fullWidth
            />
          </div>

          {/* Priority */}
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(value) => handleChange('priority', value as 'low' | 'medium' | 'high')}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High - Urgent' },
            ]}
            required
            fullWidth
          />

          {/* Subject */}
          <Input
            label="Subject"
            placeholder="Brief description of the issue"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            required
            fullWidth
          />

          {/* Description */}
          <TextArea
            label="Detailed Description"
            placeholder="Provide detailed information about your grievance..."
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            fullWidth
            rows={6}
          />

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="10-digit mobile number"
              value={formData.mobileNumber}
              onChange={(e) => handleChange('mobileNumber', e.target.value)}
              helperText="For updates via SMS"
              required
              fullWidth
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              helperText="For updates via email"
              fullWidth
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Upload supporting documents or images
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileSelect}
                disabled={attachments.length >= 3}
              />
              <label htmlFor="file-upload">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  disabled={attachments.length >= 3}
                >
                  Choose Files
                </Button>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                PDF, JPG, PNG (Max 3 files, 2MB each)
              </p>
            </div>

            {/* Uploaded Files */}
            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-900 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="ml-2 p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Important Notes */}
          <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Important Information:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>You will receive a grievance ID after submission</li>
                <li>Track your grievance status using the grievance ID</li>
                <li>Resolution timeline as per RTS policy will be communicated</li>
                <li>Updates will be sent via SMS and email</li>
              </ul>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              leftIcon={<CheckCircle className="h-5 w-5" />}
            >
              Submit Grievance
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
