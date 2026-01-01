import React, { useState } from 'react';
import { toast } from 'sonner';
import { NewGrievanceFormContent } from './NewGrievanceFormContent';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface NewGrievanceFormWrapperProps {
  user: any;
  onClose: () => void;
  onBackToDashboard?: () => void;
}

export function NewGrievanceFormWrapper({ user, onClose, onBackToDashboard }: NewGrievanceFormWrapperProps) {
  const [formData, setFormData] = useState({
    applicantName: '',
    applicantAddress: '',
    contactNumber: '',
    connectionId: '',
    connectionType: '',
    connectionCategory: '',
    complaintType: '',
    remark: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState({
    connectionId: '',
    complaintType: '',
    remark: ''
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [grievanceId, setGrievanceId] = useState('');

  // Get user's property ID
  const selectedPropertyNumber = user?.propertyNumber || user?.selectedProperty;

  // All connection details
  const allConnectionDetails = [
    { id: 'WC-2025-001', propertyId: 'A1-1', address: '123, MG Road, Zone A, Ward 5', type: 'Residential', meterType: 'Metered' },
    { id: 'WC-2025-002', propertyId: 'A1-1', address: '123, MG Road, Zone A, Ward 5 - Shop Area', type: 'Residential', meterType: 'Metered' },
    { id: 'WC-2025-003', propertyId: 'B2-5', address: '456, Park Street, Zone B, Ward 8', type: 'Commercial', meterType: 'Metered' },
    { id: 'WC-2025-004', propertyId: 'B2-5', address: '456, Park Street, Zone B, Ward 8 - Unit 2', type: 'Commercial', meterType: 'Metered' },
    { id: 'WC-2025-005', propertyId: 'B2-5', address: '456, Park Street, Zone B, Ward 8 - Unit 3', type: 'Commercial', meterType: 'Metered' },
    { id: 'WC-2025-006', propertyId: 'C3-12', address: '789, Lake View, Zone A, Ward 5', type: 'Residential', meterType: 'Metered' },
    { id: 'WC-2025-007', propertyId: 'D1-8', address: '321, Green Valley, Zone C, Ward 12 - Main Unit', type: 'Industrial', meterType: 'Metered' },
    { id: 'WC-2025-008', propertyId: 'D1-8', address: '321, Green Valley, Zone C, Ward 12 - Unit 2', type: 'Industrial', meterType: 'Metered' }
  ];

  const userConnections = allConnectionDetails.filter(conn => conn.propertyId === selectedPropertyNumber);

  const handleConnectionSelect = (connectionId: string) => {
    const selectedConnection = userConnections.find(conn => conn.id === connectionId);
    if (selectedConnection) {
      const applicantName = user?.name || user?.ownerName || 'N/A';
      const applicantContact = user?.mobile || user?.phone || 'N/A';
      
      setFormData({
        ...formData,
        connectionId,
        applicantName,
        applicantAddress: selectedConnection.address,
        contactNumber: applicantContact,
        connectionType: selectedConnection.meterType,
        connectionCategory: selectedConnection.type
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(file => {
        const isValidSize = file.size <= 10 * 1024 * 1024;
        const isValidType = file.type.includes('image') || file.type.includes('pdf');
        return isValidSize && isValidType;
      });
      
      if (validFiles.length < fileArray.length) {
        toast.error('Some files were skipped', {
          description: 'Only images and PDFs under 10MB are allowed',
          duration: 3000,
        });
      }
      
      setSelectedFiles([...selectedFiles, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {
      connectionId: '',
      complaintType: '',
      remark: ''
    };

    let isValid = true;

    // Validate Connection ID
    if (!formData.connectionId || formData.connectionId.trim() === '') {
      newErrors.connectionId = 'Please select a water connection';
      isValid = false;
    }

    // Validate Complaint Type
    if (!formData.complaintType || formData.complaintType.trim() === '') {
      newErrors.complaintType = 'Please select a complaint type';
      isValid = false;
    }

    // Validate Description/Remark
    if (!formData.remark || formData.remark.trim() === '') {
      newErrors.remark = 'Please provide a description of your grievance';
      isValid = false;
    } else if (formData.remark.trim().length < 20) {
      newErrors.remark = 'Description must be at least 20 characters';
      isValid = false;
    } else if (formData.remark.length > 500) {
      newErrors.remark = 'Description must not exceed 500 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setErrors({
      connectionId: '',
      complaintType: '',
      remark: ''
    });

    // Validate form
    if (!validateForm()) {
      // Show validation error toast
      toast.error('Validation Error', {
        description: 'Please fill all required fields correctly',
        duration: 4000,
      });
      return;
    }

    // Generate grievance ID
    const newGrievanceId = `GRV-2025-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    setGrievanceId(newGrievanceId);
    setShowSuccessDialog(true);
  };

  const handleDoneClick = () => {
    setShowSuccessDialog(false);
    onClose();
    if (onBackToDashboard) {
      onBackToDashboard();
    }
  };

  return (
    <>
      <NewGrievanceFormContent
        formData={formData}
        setFormData={setFormData}
        userConnections={userConnections}
        handleConnectionSelect={handleConnectionSelect}
        selectedFiles={selectedFiles}
        handleFileChange={handleFileChange}
        handleRemoveFile={handleRemoveFile}
        onClose={onClose}
        handleSubmit={handleSubmit}
        errors={errors}
      />

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-white">
          <DialogHeader className="sr-only">
            <DialogTitle>Grievance Submitted Successfully</DialogTitle>
            <DialogDescription>
              Your grievance has been registered successfully. Your grievance ID is {grievanceId}
            </DialogDescription>
          </DialogHeader>
          <div className="relative text-center p-8">
            {/* Top Green Circle with Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
            </motion.div>

            {/* Title */}
            <h2 className="text-gray-900 mb-6">
              Grievance Submitted<br />Successfully!
            </h2>

            {/* Checkmark Illustration */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="mx-auto w-20 h-20 mb-6"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  d="M 20 50 L 40 70 L 80 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Description */}
            <p className="text-gray-600 mb-6">
              Your grievance has been registered successfully.
            </p>

            {/* Grievance ID Box */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-5 mb-6 shadow-lg"
            >
              <p className="text-sm opacity-90 mb-2">Your Grievance ID</p>
              <p className="text-3xl tracking-wider">
                {grievanceId}
              </p>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 space-y-1 mb-6"
            >
              <p className="text-sm">
                <span className="font-medium">Connection:</span> {formData.connectionId}
              </p>
              <p className="text-sm">
                <span className="font-medium">Type:</span> {formData.complaintType}
              </p>
              <p className="text-sm">
                <span className="font-medium">Processing Time:</span> 7-10 business days
              </p>
            </motion.div>

            {/* Footer Note */}
            <p className="text-xs text-gray-400 italic mb-6">
              You will receive updates via SMS and Email
            </p>

            {/* Done Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleDoneClick}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 rounded-lg shadow-lg"
              >
                OK, Got It!
              </Button>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}