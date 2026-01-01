/**
 * Meter Reading Form Component
 * Form for submitting meter readings
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { AlertCircle, Camera, Upload, CheckCircle } from 'lucide-react';

export interface MeterReadingData {
  connectionId: string;
  meterNumber: string;
  previousReading: number;
  currentReading: number;
  readingDate: string;
  meterPhoto?: File;
  remarks?: string;
}

export interface MeterReadingFormProps {
  connections: Array<{
    value: string;
    label: string;
    meterNumber: string;
    previousReading: number;
  }>;
  onSubmit: (data: MeterReadingData) => Promise<void>;
  loading?: boolean;
}

export const MeterReadingForm: React.FC<MeterReadingFormProps> = ({
  connections,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<MeterReadingData>({
    connectionId: '',
    meterNumber: '',
    previousReading: 0,
    currentReading: 0,
    readingDate: new Date().toISOString().split('T')[0],
    remarks: '',
  });

  const [meterPhoto, setMeterPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [consumption, setConsumption] = useState<number>(0);

  const handleConnectionChange = (connectionId: string) => {
    const connection = connections.find(c => c.value === connectionId);
    if (connection) {
      setFormData(prev => ({
        ...prev,
        connectionId,
        meterNumber: connection.meterNumber,
        previousReading: connection.previousReading,
      }));
    }
  };

  const handleCurrentReadingChange = (value: string) => {
    const reading = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, currentReading: reading }));
    setConsumption(reading - formData.previousReading);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMeterPhoto(file);
      setFormData(prev => ({ ...prev, meterPhoto: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.currentReading <= formData.previousReading) {
      alert('Current reading must be greater than previous reading');
      return;
    }
    
    await onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card padding="lg">
        <CardHeader
          title="Submit Meter Reading"
          subtitle="Enter your current water meter reading"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Connection Selection */}
          <Select
            label="Select Connection"
            placeholder="Choose your water connection"
            value={formData.connectionId}
            onChange={handleConnectionChange}
            options={connections}
            required
            fullWidth
          />

          {formData.connectionId && (
            <>
              {/* Meter Number */}
              <Input
                label="Meter Number"
                value={formData.meterNumber}
                disabled
                fullWidth
              />

              {/* Reading Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Previous Reading (KL)"
                    type="number"
                    value={formData.previousReading.toString()}
                    disabled
                    fullWidth
                  />
                </div>
                <div>
                  <Input
                    label="Current Reading (KL)"
                    type="number"
                    step="0.01"
                    placeholder="Enter current reading"
                    value={formData.currentReading || ''}
                    onChange={(e) => handleCurrentReadingChange(e.target.value)}
                    required
                    fullWidth
                  />
                </div>
              </div>

              {/* Consumption Display */}
              {consumption > 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-900 font-medium">
                        Calculated Consumption
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Current Reading - Previous Reading
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        {consumption.toFixed(2)}
                      </p>
                      <p className="text-sm text-blue-700">Kiloliters</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reading Date */}
              <Input
                label="Reading Date"
                type="date"
                value={formData.readingDate}
                onChange={(e) => setFormData(prev => ({ ...prev, readingDate: e.target.value }))}
                max={new Date().toISOString().split('T')[0]}
                required
                fullWidth
              />

              {/* Meter Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meter Photo <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {photoPreview ? (
                    <div className="space-y-3">
                      <div className="relative">
                        <img
                          src={photoPreview}
                          alt="Meter"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setMeterPhoto(null);
                            setPhotoPreview('');
                            setFormData(prev => ({ ...prev, meterPhoto: undefined }));
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        Photo uploaded successfully
                      </div>
                    </div>
                  ) : (
                    <>
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-4 text-center">
                        Take a clear photo of your water meter
                      </p>
                      <input
                        type="file"
                        id="meter-photo"
                        className="hidden"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoUpload}
                      />
                      <div className="flex gap-2 justify-center">
                        <label htmlFor="meter-photo">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            leftIcon={<Camera className="h-4 w-4" />}
                            onClick={() => document.getElementById('meter-photo')?.click()}
                          >
                            Take Photo
                          </Button>
                        </label>
                        <label htmlFor="meter-photo">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            leftIcon={<Upload className="h-4 w-4" />}
                            onClick={() => document.getElementById('meter-photo')?.click()}
                          >
                            Upload
                          </Button>
                        </label>
                      </div>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please ensure the meter reading is clearly visible in the photo
                </p>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData(prev => ({ ...prev, remarks: e.target.value }))}
                  placeholder="Any additional information..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Important Notes */}
              <div className="flex items-start gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-1">Important Guidelines:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ensure meter reading is accurate and clearly visible</li>
                    <li>Photo should show complete meter display</li>
                    <li>Submit reading before the due date</li>
                    <li>Incorrect readings may result in estimated billing</li>
                  </ul>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
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
                  disabled={!meterPhoto || consumption <= 0}
                  leftIcon={<CheckCircle className="h-5 w-5" />}
                >
                  Submit Reading
                </Button>
              </div>
            </>
          )}
        </form>
      </Card>
    </div>
  );
};
