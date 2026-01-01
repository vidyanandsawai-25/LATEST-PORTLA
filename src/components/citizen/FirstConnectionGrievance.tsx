import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Upload,
  User,
  X,
  Camera,
  Send,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface FirstConnectionGrievanceProps {
  onBack?: () => void;
  prefilledApplicationId?: string;
}

export function FirstConnectionGrievance({ onBack, prefilledApplicationId }: FirstConnectionGrievanceProps) {
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [grievanceId, setGrievanceId] = useState('');

  const [formData, setFormData] = useState({
    applicationId: prefilledApplicationId || '',
    applicantName: '',
    mobile: '',
    email: '',
    grievanceType: '',
    subject: '',
    description: '',
    priority: 'medium',
    attachments: [] as File[]
  });

  const grievanceTypes = [
    { value: 'delay', label: 'Application Processing Delay', icon: Clock },
    { value: 'document', label: 'Document Verification Issue', icon: FileText },
    { value: 'payment', label: 'Payment Related Issue', icon: AlertCircle },
    { value: 'communication', label: 'Communication/Update Issue', icon: Mail },
    { value: 'other', label: 'Other Issue', icon: MessageSquare }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles].slice(0, 3) // Max 3 files
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    // Generate grievance ID
    const newGrievanceId = `GRV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    setGrievanceId(newGrievanceId);
    setShowSuccess(true);

    toast.success('Grievance submitted successfully!', {
      description: `Your grievance ID is ${newGrievanceId}`,
    });
  };

  const isStep1Valid = formData.applicationId && formData.applicantName && formData.mobile;
  const isStep2Valid = formData.grievanceType && formData.subject && formData.description;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-25">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            x: [0, 60, 0],
            y: [0, 40, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, -40, 0],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="w-full mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            <div className="flex-1"></div>
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-600 to-red-500 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-2">
            Raise Grievance - First Connection
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Report issues with your first connection application
          </p>
          <Badge className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
            <AlertCircle className="w-3 h-3 mr-1" />
            No Login Required
          </Badge>
        </motion.div>

        {/* Progress Indicator */}
        <Card className="p-4 sm:p-6 mb-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1 ? 'bg-gradient-to-br from-orange-600 to-red-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Details</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2 ? 'bg-gradient-to-br from-orange-600 to-red-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
              </div>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Grievance</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 3 ? 'bg-gradient-to-br from-orange-600 to-red-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Review</span>
            </div>
          </div>
        </Card>

        {/* Form Content */}
        <Card className="p-4 sm:p-6 lg:p-8 bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <AnimatePresence mode="wait">
            {/* Step 1: Application & Contact Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl text-gray-900">Application & Contact Details</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Enter your application and contact information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="applicationId" className="text-xs sm:text-sm">
                      First Connection Application ID *
                    </Label>
                    <Input
                      id="applicationId"
                      placeholder="e.g., APP-2025-001"
                      value={formData.applicationId}
                      onChange={(e) => handleInputChange('applicationId', e.target.value)}
                      className="mt-1"
                      disabled={!!prefilledApplicationId}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the Application ID you received after submitting first connection application
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="applicantName" className="text-xs sm:text-sm">Your Name *</Label>
                      <Input
                        id="applicantName"
                        placeholder="Enter your full name"
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mobile" className="text-xs sm:text-sm">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-xs sm:text-sm">Email Address (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-blue-900 font-semibold mb-1">Important</p>
                      <p className="text-[10px] sm:text-xs text-blue-800">
                        Please use the same mobile number you provided in your first connection application for faster resolution.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Grievance Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl text-gray-900">Grievance Details</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Describe your issue in detail</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="grievanceType" className="text-xs sm:text-sm">Grievance Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('grievanceType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select grievance type" />
                      </SelectTrigger>
                      <SelectContent>
                        {grievanceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              <type.icon className="w-4 h-4" />
                              {type.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-xs sm:text-sm">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-xs sm:text-sm">
                      Detailed Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Explain your issue in detail. Include relevant dates, officer names, or any other important information."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="mt-1 min-h-[120px]"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="priority" className="text-xs sm:text-sm">Priority Level</Label>
                    <Select 
                      value={formData.priority}
                      onValueChange={(value) => handleInputChange('priority', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General Query</SelectItem>
                        <SelectItem value="medium">Medium - Needs Attention</SelectItem>
                        <SelectItem value="high">High - Urgent Issue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs sm:text-sm mb-2 block">
                      Attachments (Optional) - Max 3 files
                    </Label>
                    <div className="space-y-2">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-900">{file.name}</span>
                            <span className="text-xs text-gray-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      {formData.attachments.length < 3 && (
                        <label className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 cursor-pointer transition-all bg-gray-50 hover:bg-orange-50">
                          <Upload className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            Click to upload supporting documents (PDF, JPG, PNG - Max 2MB each)
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => {
                              if (e.target.files) {
                                handleFileUpload(e.target.files);
                              }
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl text-gray-900">Review & Submit</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Please review your grievance details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Application Details */}
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      Application Details
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Application ID:</span>
                        <p className="font-medium">{formData.applicationId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium">{formData.applicantName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Mobile:</span>
                        <p className="font-medium">{formData.mobile}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium">{formData.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Grievance Details */}
                  <Card className="p-4 bg-orange-50 border-orange-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-orange-600" />
                      Grievance Details
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <p className="font-medium capitalize">
                          {grievanceTypes.find(t => t.value === formData.grievanceType)?.label}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-600">Subject:</span>
                        <p className="font-medium">{formData.subject}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Description:</span>
                        <p className="font-medium">{formData.description}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={`${
                          formData.priority === 'high' 
                            ? 'bg-red-500' 
                            : formData.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}>
                          {formData.priority.toUpperCase()}
                        </Badge>
                      </div>
                      {formData.attachments.length > 0 && (
                        <div>
                          <span className="text-gray-600">Attachments:</span>
                          <p className="font-medium">{formData.attachments.length} file(s) attached</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 mb-1">What happens next?</p>
                      <ul className="text-xs text-green-800 space-y-1">
                        <li>✓ Your grievance will be assigned to a resolution officer within 24 hours</li>
                        <li>✓ You'll receive updates via SMS on {formData.mobile}</li>
                        <li>✓ Track status anytime using your Grievance ID</li>
                        <li>✓ Expected resolution within 3-5 business days</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 sm:mt-8 pt-6 border-t">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 sm:flex-none"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Grievance
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Grievance Submitted Successfully!</DialogTitle>
              <DialogDescription className="text-center">
                Your grievance has been registered and will be resolved soon
              </DialogDescription>
            </DialogHeader>
            
            <div className="text-center py-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="mx-auto mb-4 w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
              >
                <CheckCircle className="w-12 h-12 text-green-600" />
              </motion.div>
              
              <h3 className="text-2xl text-gray-900 mb-2">Grievance Registered!</h3>
              
              <Card className="p-4 bg-gray-50 mb-4 text-left">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Grievance ID</span>
                    <span className="font-medium">{grievanceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application ID</span>
                    <span className="font-medium">{formData.applicationId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Priority</span>
                    <Badge className={`${
                      formData.priority === 'high' 
                        ? 'bg-red-500' 
                        : formData.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}>
                      {formData.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className="bg-blue-500">Registered</Badge>
                  </div>
                </div>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-left">
                <p className="text-xs text-blue-900">
                  <Shield className="w-3 h-3 inline mr-1" />
                  Save your Grievance ID: <strong>{grievanceId}</strong>
                </p>
                <p className="text-xs text-blue-800 mt-1">
                  You'll receive updates on {formData.mobile}
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowSuccess(false);
                    if (onBack) onBack();
                  }}
                >
                  Back to Home
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500"
                  onClick={() => {
                    setShowSuccess(false);
                    if (onBack) onBack();
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
