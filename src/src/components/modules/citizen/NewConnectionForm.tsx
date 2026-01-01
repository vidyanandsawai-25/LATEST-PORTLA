/**
 * New Connection Form Component
 * Multi-step form for new water connection application
 */

'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Select } from '@/components/common/Select';
import { TextArea } from '@/components/common/Input';
import { Badge } from '@/components/common/Badge';
import { 
  User, 
  MapPin, 
  Home, 
  FileText, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Personal Details
  applicantName: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
  aadharNumber: string;
  
  // Address Details
  address: string;
  landmark: string;
  pincode: string;
  wardNumber: string;
  zone: string;
  
  // Property Details
  propertyId: string;
  propertyType: string;
  connectionType: string;
  pipeSize: string;
  
  // Documents
  aadharDoc: File | null;
  propertyDoc: File | null;
  photoDoc: File | null;
}

export interface NewConnectionFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  loading?: boolean;
}

export const NewConnectionForm: React.FC<NewConnectionFormProps> = ({
  onSubmit,
  loading = false,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    applicantName: '',
    fatherName: '',
    mobileNumber: '',
    email: '',
    aadharNumber: '',
    address: '',
    landmark: '',
    pincode: '',
    wardNumber: '',
    zone: '',
    propertyId: '',
    propertyType: '',
    connectionType: '',
    pipeSize: '',
    aadharDoc: null,
    propertyDoc: null,
    photoDoc: null,
  });

  const steps = [
    { number: 1, title: 'Personal Details', icon: <User className="h-5 w-5" /> },
    { number: 2, title: 'Address Details', icon: <MapPin className="h-5 w-5" /> },
    { number: 3, title: 'Property Details', icon: <Home className="h-5 w-5" /> },
    { number: 4, title: 'Documents', icon: <FileText className="h-5 w-5" /> },
  ];

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleSubmit = async () => {
    await onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <Card padding="lg" className="mb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex items-center gap-3">
                <div
                  className={`
                    flex items-center justify-center h-10 w-10 rounded-full transition-all
                    ${currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-600">Step {step.number} of 4</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`
                    flex-1 h-1 mx-4 rounded transition-all
                    ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>

      {/* Form Content */}
      <Card padding="lg">
        <CardHeader
          title={steps[currentStep - 1].title}
          subtitle={`Step ${currentStep} of 4`}
        />

        <div className="space-y-4">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <>
              <Input
                label="Applicant Name"
                placeholder="Enter full name"
                value={formData.applicantName}
                onChange={(e) => handleChange('applicantName', e.target.value)}
                required
                fullWidth
              />
              <Input
                label="Father's/Husband's Name"
                placeholder="Enter father's/husband's name"
                value={formData.fatherName}
                onChange={(e) => handleChange('fatherName', e.target.value)}
                required
                fullWidth
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  required
                  fullWidth
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  fullWidth
                />
              </div>
              <Input
                label="Aadhar Number"
                placeholder="12-digit Aadhar number"
                value={formData.aadharNumber}
                onChange={(e) => handleChange('aadharNumber', e.target.value)}
                required
                fullWidth
              />
            </>
          )}

          {/* Step 2: Address Details */}
          {currentStep === 2 && (
            <>
              <TextArea
                label="Complete Address"
                placeholder="House/Building number, Street, Area"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                required
                fullWidth
              />
              <Input
                label="Landmark"
                placeholder="Nearby landmark"
                value={formData.landmark}
                onChange={(e) => handleChange('landmark', e.target.value)}
                fullWidth
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Pincode"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  required
                  fullWidth
                />
                <Select
                  label="Ward Number"
                  placeholder="Select ward"
                  value={formData.wardNumber}
                  onChange={(value) => handleChange('wardNumber', value)}
                  options={[
                    { value: '1', label: 'Ward 1' },
                    { value: '2', label: 'Ward 2' },
                    { value: '3', label: 'Ward 3' },
                  ]}
                  required
                  fullWidth
                />
                <Select
                  label="Zone"
                  placeholder="Select zone"
                  value={formData.zone}
                  onChange={(value) => handleChange('zone', value)}
                  options={[
                    { value: 'A', label: 'Zone A' },
                    { value: 'B', label: 'Zone B' },
                    { value: 'C', label: 'Zone C' },
                  ]}
                  required
                  fullWidth
                />
              </div>
            </>
          )}

          {/* Step 3: Property Details */}
          {currentStep === 3 && (
            <>
              <Input
                label="Property ID"
                placeholder="Property tax ID"
                value={formData.propertyId}
                onChange={(e) => handleChange('propertyId', e.target.value)}
                helperText="Enter your property tax ID for verification"
                required
                fullWidth
              />
              <Select
                label="Property Type"
                placeholder="Select property type"
                value={formData.propertyType}
                onChange={(value) => handleChange('propertyType', value)}
                options={[
                  { value: 'residential', label: 'Residential' },
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'industrial', label: 'Industrial' },
                  { value: 'institutional', label: 'Institutional' },
                ]}
                required
                fullWidth
              />
              <Select
                label="Connection Type"
                placeholder="Select connection type"
                value={formData.connectionType}
                onChange={(value) => handleChange('connectionType', value)}
                options={[
                  { value: 'domestic', label: 'Domestic' },
                  { value: 'commercial', label: 'Commercial' },
                  { value: 'industrial', label: 'Industrial' },
                ]}
                required
                fullWidth
              />
              <Select
                label="Pipe Size"
                placeholder="Select pipe size"
                value={formData.pipeSize}
                onChange={(value) => handleChange('pipeSize', value)}
                options={[
                  { value: '15mm', label: '15mm (1/2 inch)' },
                  { value: '20mm', label: '20mm (3/4 inch)' },
                  { value: '25mm', label: '25mm (1 inch)' },
                  { value: '40mm', label: '40mm (1.5 inch)' },
                ]}
                required
                fullWidth
              />
            </>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleChange('aadharDoc', e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Upload PDF, JPG, or PNG (Max 2MB)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Document <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleChange('propertyDoc', e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Property tax receipt or ownership proof
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passport Size Photo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => handleChange('photoDoc', e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recent passport size photograph
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>All documents should be clear and readable</li>
                  <li>File size should not exceed 2MB</li>
                  <li>Accepted formats: PDF, JPG, PNG</li>
                  <li>Ensure all details are visible in the documents</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              variant="primary"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={handleNext}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="success"
              rightIcon={<CheckCircle className="h-4 w-4" />}
              onClick={handleSubmit}
              loading={loading}
            >
              Submit Application
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
