/**
 * Common Type Definitions for Water Tax Management System
 * Production-ready types for frontend-backend integration
 */

// ============= User & Authentication Types =============

export type UserRole = 'citizen' | 'officer' | 'admin' | 'fieldOfficer';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email?: string;
  mobileNumber: string;
  consumerId?: string; // For citizens
  employeeId?: string; // For officers/admin
  department?: string;
  designation?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  refreshToken?: string;
}

export interface OTPRequest {
  mobileNumber?: string;
  consumerId?: string;
  purpose: 'login' | 'verify' | 'reset';
}

export interface OTPVerification {
  mobileNumber?: string;
  consumerId?: string;
  otp: string;
  role: UserRole;
}

// ============= Water Connection Types =============

export type ConnectionStatus = 
  | 'pending' 
  | 'under_verification' 
  | 'inspection_scheduled'
  | 'inspection_completed'
  | 'approved' 
  | 'rejected' 
  | 'active'
  | 'disconnected'
  | 'suspended';

export type ConnectionType = 
  | 'domestic' 
  | 'commercial' 
  | 'industrial' 
  | 'institutional';

export type MeterType = 'mechanical' | 'digital' | 'smart';

export interface WaterConnection {
  id: string;
  consumerId: string;
  applicationNumber: string;
  userId: string;
  propertyId: string; // Link to property tax system
  connectionType: ConnectionType;
  connectionStatus: ConnectionStatus;
  
  // Applicant Details
  applicantName: string;
  fatherName: string;
  mobileNumber: string;
  email?: string;
  aadharNumber: string;
  
  // Address Details
  address: string;
  wardNumber: string;
  zone: string;
  landmark?: string;
  pincode: string;
  
  // Property Details
  plotNumber: string;
  plotArea: number;
  builtUpArea: number;
  propertyType: string;
  
  // Connection Details
  meterNumber?: string;
  meterType?: MeterType;
  pipeSize: string;
  estimatedMonthlyConsumption: number;
  
  // Billing Details
  securityDeposit: number;
  connectionCharges: number;
  developmentCharges: number;
  totalCharges: number;
  
  // Status Tracking
  appliedDate: string;
  approvedDate?: string;
  rejectionReason?: string;
  activationDate?: string;
  
  // RTS (Right to Service) Tracking
  rtsTimeline: number; // Days as per RTS norms
  rtsDueDate: string;
  isRTSComplied: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ============= Bill & Payment Types =============

export type BillStatus = 'unpaid' | 'partially_paid' | 'paid' | 'overdue';
export type PaymentMode = 'online' | 'cash' | 'cheque' | 'dd' | 'upi';
export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface WaterBill {
  id: string;
  billNumber: string;
  connectionId: string;
  consumerId: string;
  userId: string;
  
  // Billing Period
  billingPeriodStart: string;
  billingPeriodEnd: string;
  billDate: string;
  dueDate: string;
  
  // Meter Reading
  previousReading: number;
  currentReading: number;
  consumption: number; // in KL (Kilo Liters)
  
  // Charges Breakdown
  waterCharges: number;
  sewerageCharges: number;
  meterRent: number;
  developmentCharges: number;
  environmentalCharges: number;
  
  // Discounts & Penalties
  rebateAmount: number;
  penaltyAmount: number;
  latePaymentCharges: number;
  
  // Total Amount
  grossAmount: number;
  netAmount: number;
  paidAmount: number;
  balanceAmount: number;
  
  // Status
  billStatus: BillStatus;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  paymentId: string;
  billId: string;
  connectionId: string;
  userId: string;
  
  amount: number;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
  
  // Payment Gateway Details
  transactionId?: string;
  gatewayResponse?: string;
  
  // Offline Payment Details
  chequeNumber?: string;
  chequeDate?: string;
  bankName?: string;
  
  // Receipt
  receiptNumber?: string;
  receiptDate?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ============= Meter Reading Types =============

export interface MeterReading {
  id: string;
  connectionId: string;
  consumerId: string;
  
  readingDate: string;
  meterReading: number;
  consumption: number;
  
  // Reading Method
  readingType: 'self' | 'field_officer' | 'automated';
  submittedBy: string;
  
  // Verification
  isVerified: boolean;
  verifiedBy?: string;
  verificationDate?: string;
  verificationRemarks?: string;
  
  // Photo Evidence
  photoUrl?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ============= Grievance Types =============

export type GrievanceCategory = 
  | 'billing_issue'
  | 'meter_issue'
  | 'water_supply'
  | 'connection_delay'
  | 'quality_issue'
  | 'leakage'
  | 'other';

export type GrievanceStatus = 
  | 'submitted'
  | 'acknowledged'
  | 'under_review'
  | 'in_progress'
  | 'resolved'
  | 'rejected'
  | 'closed';

export type GrievancePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Grievance {
  id: string;
  grievanceNumber: string;
  userId: string;
  consumerId?: string;
  connectionId?: string;
  applicationNumber?: string; // For first connection grievances
  
  // Grievance Details
  category: GrievanceCategory;
  subject: string;
  description: string;
  priority: GrievancePriority;
  
  // Status Tracking
  status: GrievanceStatus;
  
  // Assignment
  assignedTo?: string;
  assignedToName?: string;
  assignedDepartment?: string;
  
  // Resolution
  resolutionRemarks?: string;
  resolutionDate?: string;
  resolvedBy?: string;
  
  // Attachments
  attachments: string[];
  
  // RTS Compliance
  rtsTimeline: number; // Days
  rtsDueDate: string;
  isRTSComplied: boolean;
  
  // Timestamps
  submittedDate: string;
  createdAt: string;
  updatedAt: string;
}

// ============= Field Operations Types =============

export type TaskType = 
  | 'new_connection_verification'
  | 'meter_installation'
  | 'inspection'
  | 'disconnection'
  | 'reconnection'
  | 'meter_reading'
  | 'complaint_resolution';

export type TaskStatus = 
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'on_hold'
  | 'cancelled';

export interface FieldTask {
  id: string;
  taskNumber: string;
  taskType: TaskType;
  
  connectionId?: string;
  applicationNumber?: string;
  grievanceId?: string;
  
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  
  scheduledDate: string;
  scheduledTime?: string;
  
  // Location
  address: string;
  wardNumber: string;
  zone: string;
  latitude?: number;
  longitude?: number;
  
  // Task Details
  description: string;
  priority: GrievancePriority;
  status: TaskStatus;
  
  // Completion
  completionDate?: string;
  completionRemarks?: string;
  photos?: string[];
  
  // RTS Timeline
  rtsDueDate: string;
  isRTSComplied: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// ============= Property Tax Integration =============

export interface PropertyTaxLink {
  propertyId: string;
  propertyNumber: string;
  ownerName: string;
  ownerMobile: string;
  address: string;
  wardNumber: string;
  zone: string;
  propertyType: string;
  plotArea: number;
  builtUpArea: number;
  isActive: boolean;
}

// ============= Master Data Types =============

export interface Zone {
  id: string;
  zoneCode: string;
  zoneName: string;
  description?: string;
  isActive: boolean;
}

export interface Ward {
  id: string;
  wardNumber: string;
  wardName: string;
  zoneId: string;
  population?: number;
  area?: number;
  isActive: boolean;
}

export interface TariffSlab {
  id: string;
  connectionType: ConnectionType;
  slabNumber: number;
  minConsumption: number;
  maxConsumption: number;
  ratePerKL: number;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
}

export interface RTSService {
  id: string;
  serviceCode: string;
  serviceName: string;
  department: string;
  timeline: number; // Days
  description: string;
  documentsRequired: string[];
  isActive: boolean;
}

// ============= Reports & Analytics Types =============

export interface DashboardStats {
  totalConnections: number;
  activeConnections: number;
  pendingApplications: number;
  todayCollection: number;
  monthlyCollection: number;
  pendingGrievances: number;
  overduePayments: number;
  rtsCompliance: number; // Percentage
}

export interface RevenueReport {
  period: string;
  waterCharges: number;
  sewerageCharges: number;
  penalties: number;
  totalCollection: number;
  outstandingAmount: number;
}

export interface ConnectionReport {
  period: string;
  newConnections: number;
  disconnections: number;
  reconnections: number;
  activeConnections: number;
}

// ============= API Response Types =============

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// ============= Filter Types =============

export interface ConnectionFilters extends PaginationParams {
  status?: ConnectionStatus;
  connectionType?: ConnectionType;
  wardNumber?: string;
  zone?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface BillFilters extends PaginationParams {
  status?: BillStatus;
  consumerId?: string;
  wardNumber?: string;
  zone?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface GrievanceFilters extends PaginationParams {
  status?: GrievanceStatus;
  category?: GrievanceCategory;
  priority?: GrievancePriority;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
}
