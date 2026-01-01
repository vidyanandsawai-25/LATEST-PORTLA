/**
 * Service-specific Type Definitions
 * Additional types for service layer
 */

import type {
  WaterConnection,
  WaterBill,
  Payment,
  Grievance,
  MeterReading,
  FieldTask,
  User
} from './common.types';

// ============= Service Request/Response Types =============

// New Connection Application
export interface NewConnectionRequest {
  // Applicant Details
  applicantName: string;
  fatherName: string;
  mobileNumber: string;
  email?: string;
  aadharNumber: string;
  
  // Property Details from Property Tax
  propertyId: string;
  propertyNumber: string;
  
  // Address (auto-filled from property tax)
  address: string;
  wardNumber: string;
  zone: string;
  landmark?: string;
  pincode: string;
  
  // Plot Details
  plotNumber: string;
  plotArea: number;
  builtUpArea: number;
  
  // Connection Details
  connectionType: 'domestic' | 'commercial' | 'industrial' | 'institutional';
  pipeSize: string;
  estimatedMonthlyConsumption: number;
  
  // Documents
  documents: {
    aadharCard: File | string;
    propertyDocument: File | string;
    photograph: File | string;
    sitePhoto: File | string;
  };
}

export interface NewConnectionResponse {
  applicationNumber: string;
  connection: WaterConnection;
  estimatedCharges: {
    securityDeposit: number;
    connectionCharges: number;
    developmentCharges: number;
    totalAmount: number;
  };
  rtsDueDate: string;
}

// Bill Payment
export interface BillPaymentRequest {
  billId: string;
  amount: number;
  paymentMode: 'online' | 'cash' | 'cheque' | 'dd' | 'upi';
  
  // For cheque/DD
  chequeNumber?: string;
  chequeDate?: string;
  bankName?: string;
  
  // For UPI
  upiId?: string;
  
  // Notes
  remarks?: string;
}

export interface BillPaymentResponse {
  payment: Payment;
  receiptNumber: string;
  receiptDate: string;
  remainingBalance: number;
}

// Meter Reading Submission
export interface MeterReadingRequest {
  connectionId: string;
  meterReading: number;
  readingDate: string;
  photo?: File | string;
  remarks?: string;
}

export interface MeterReadingResponse {
  reading: MeterReading;
  consumption: number;
  estimatedBillAmount: number;
  lastReading: number;
}

// Grievance Submission
export interface GrievanceRequest {
  consumerId?: string;
  connectionId?: string;
  applicationNumber?: string; // For first connection
  
  category: string;
  subject: string;
  description: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  
  attachments?: File[] | string[];
}

export interface GrievanceResponse {
  grievance: Grievance;
  grievanceNumber: string;
  rtsDueDate: string;
  expectedResolutionDays: number;
}

// Application Status Tracking
export interface ApplicationStatusResponse {
  applicationNumber: string;
  currentStatus: string;
  statusHistory: {
    status: string;
    remarks: string;
    updatedBy: string;
    updatedAt: string;
  }[];
  nextAction?: string;
  expectedCompletionDate?: string;
  isRTSComplied: boolean;
  daysElapsed: number;
  daysRemaining: number;
}

// ============= OfficerDashboard Service Types =============

export interface OfficerDashboardData {
  stats: {
    pendingApplications: number;
    todayInspections: number;
    pendingGrievances: number;
    todayCollection: number;
    monthlyCollection: number;
    rtsComplianceRate: number;
  };
  recentApplications: WaterConnection[];
  urgentGrievances: Grievance[];
  scheduledTasks: FieldTask[];
  collectionSummary: {
    today: number;
    week: number;
    month: number;
    outstanding: number;
  };
}

// Application Approval/Rejection
export interface ApplicationActionRequest {
  applicationId: string;
  action: 'approve' | 'reject' | 'request_clarification';
  remarks: string;
  
  // For approval
  estimatedCharges?: {
    securityDeposit: number;
    connectionCharges: number;
    developmentCharges: number;
  };
  
  // For field tasks
  assignToFieldOfficer?: string;
  scheduledDate?: string;
}

// ============= Field Officer Service Types =============

export interface FieldTaskUpdate {
  taskId: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  remarks: string;
  
  // For inspections
  inspectionReport?: {
    plotAccessible: boolean;
    plotMatches: boolean;
    pipelineAvailable: boolean;
    recommendedPipeSize: string;
    estimatedDistance: number;
    sitePhotos: File[] | string[];
    remarks: string;
  };
  
  // For meter installation
  meterInstallation?: {
    meterNumber: string;
    meterType: 'mechanical' | 'digital' | 'smart';
    initialReading: number;
    installationPhotos: File[] | string[];
    remarks: string;
  };
  
  // Location tracking
  latitude?: number;
  longitude?: number;
  completionTime?: string;
}

// ============= Admin Service Types =============

export interface UserManagementRequest {
  name: string;
  email: string;
  mobileNumber: string;
  role: 'officer' | 'fieldOfficer' | 'admin';
  employeeId: string;
  department: string;
  designation: string;
  zone?: string;
  ward?: string;
}

export interface MasterDataRequest {
  type: 'zone' | 'ward' | 'tariff' | 'rts_service';
  data: Record<string, any>;
}

// ============= Report Generation Types =============

export interface ReportRequest {
  reportType: 
    | 'collection_report'
    | 'connection_report'
    | 'grievance_report'
    | 'rts_compliance_report'
    | 'ward_wise_report'
    | 'outstanding_report';
  
  dateFrom: string;
  dateTo: string;
  
  filters?: {
    zone?: string;
    ward?: string;
    connectionType?: string;
    status?: string;
  };
  
  format: 'pdf' | 'excel' | 'csv';
}

export interface ReportResponse {
  reportId: string;
  reportUrl: string;
  generatedAt: string;
  expiresAt: string;
}

// ============= Bulk Operations Types =============

export interface BulkBillGenerationRequest {
  billingPeriodStart: string;
  billingPeriodEnd: string;
  zone?: string;
  ward?: string;
  connectionType?: string;
}

export interface BulkBillGenerationResponse {
  jobId: string;
  totalConnections: number;
  billsGenerated: number;
  errors: {
    connectionId: string;
    error: string;
  }[];
}

// ============= SMS/Email Notification Types =============

export interface NotificationRequest {
  type: 'sms' | 'email' | 'both';
  recipients: string[];
  template: string;
  variables: Record<string, string>;
  priority: 'low' | 'medium' | 'high';
}

// ============= Audit Log Types =============

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  entityType: string;
  entityId: string;
  changes?: {
    field: string;
    oldValue: string;
    newValue: string;
  }[];
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

// ============= System Configuration Types =============

export interface SystemConfig {
  billing: {
    billingCycleDay: number;
    dueDateDays: number;
    rebatePercentage: number;
    rebateDays: number;
    penaltyPercentage: number;
    penaltyStartDay: number;
  };
  connection: {
    domesticSecurityDeposit: number;
    commercialSecurityDeposit: number;
    industrialSecurityDeposit: number;
    connectionChargesPerMeter: number;
    developmentCharges: number;
  };
  rts: {
    newConnectionDays: number;
    grievanceResolutionDays: number;
    meterInstallationDays: number;
  };
  payment: {
    enableOnlinePayment: boolean;
    paymentGateway: string;
    merchantId: string;
    enableCashPayment: boolean;
    enableChequePayment: boolean;
  };
}

// ============= Integration Types =============

// Property Tax Integration
export interface PropertyTaxApiRequest {
  propertyNumber: string;
}

export interface PropertyTaxApiResponse {
  propertyId: string;
  propertyNumber: string;
  ownerName: string;
  ownerMobile: string;
  ownerEmail?: string;
  ownerAadhar?: string;
  address: string;
  wardNumber: string;
  zone: string;
  propertyType: string;
  plotNumber: string;
  plotArea: number;
  builtUpArea: number;
  isActive: boolean;
  taxPaid: boolean;
  outstandingAmount: number;
}

// Payment Gateway Integration
export interface PaymentGatewayRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerMobile: string;
  returnUrl: string;
  callbackUrl: string;
  metadata: Record<string, any>;
}

export interface PaymentGatewayResponse {
  success: boolean;
  transactionId: string;
  paymentUrl?: string;
  status: 'initiated' | 'success' | 'failed';
  message: string;
  gatewayResponse?: any;
}

// SMS Gateway Integration
export interface SMSRequest {
  mobileNumbers: string[];
  message: string;
  templateId?: string;
  senderId?: string;
}

export interface SMSResponse {
  success: boolean;
  messageId: string;
  status: string;
}
