/**
 * API Services
 * Service layer for all API calls
 */

import { apiClient } from '@/lib/api/api-client';
import { API_ENDPOINTS } from '@/config/app.config';
import type {
  ApiResponse,
  User,
  AuthResponse,
  OTPRequest,
  OTPVerification,
  WaterConnection,
  WaterBill,
  Payment,
  Grievance,
  MeterReading,
  FieldTask,
  DashboardStats,
  ConnectionFilters,
  BillFilters,
  GrievanceFilters,
  PaginationParams,
} from '@/types/common.types';
import type {
  NewConnectionRequest,
  NewConnectionResponse,
  BillPaymentRequest,
  BillPaymentResponse,
  MeterReadingRequest,
  MeterReadingResponse,
  GrievanceRequest,
  GrievanceResponse,
  ApplicationStatusResponse,
  OfficerDashboardData,
  ApplicationActionRequest,
  FieldTaskUpdate,
  PropertyTaxApiRequest,
  PropertyTaxApiResponse,
  ReportRequest,
  ReportResponse,
} from '@/types/service.types';

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Send OTP for login/verification
   */
  sendOTP: async (data: OTPRequest): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.auth.sendOtp, data);
  },

  /**
   * Verify OTP and login
   */
  verifyOTP: async (data: OTPVerification): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(API_ENDPOINTS.auth.verifyOtp, data);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.auth.logout);
  },

  /**
   * Get current user details
   */
  me: async (): Promise<ApiResponse<User>> => {
    return apiClient.get(API_ENDPOINTS.auth.me);
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    return apiClient.post(API_ENDPOINTS.auth.refreshToken);
  },
};

/**
 * Water Connection Service
 */
export const connectionService = {
  /**
   * Get list of connections with filters
   */
  getConnections: async (filters?: ConnectionFilters): Promise<ApiResponse<WaterConnection[]>> => {
    return apiClient.get(API_ENDPOINTS.connections.list, filters);
  },

  /**
   * Get my connections (for citizens)
   */
  getMyConnections: async (): Promise<ApiResponse<WaterConnection[]>> => {
    return apiClient.get(API_ENDPOINTS.connections.myConnections);
  },

  /**
   * Get single connection details
   */
  getConnection: async (id: string): Promise<ApiResponse<WaterConnection>> => {
    return apiClient.get(API_ENDPOINTS.connections.get(id));
  },

  /**
   * Create new water connection application
   */
  createConnection: async (data: NewConnectionRequest): Promise<ApiResponse<NewConnectionResponse>> => {
    return apiClient.post(API_ENDPOINTS.connections.create, data);
  },

  /**
   * Update connection details
   */
  updateConnection: async (id: string, data: Partial<WaterConnection>): Promise<ApiResponse<WaterConnection>> => {
    return apiClient.put(API_ENDPOINTS.connections.update(id), data);
  },

  /**
   * Track application status
   */
  trackStatus: async (applicationNumber: string): Promise<ApiResponse<ApplicationStatusResponse>> => {
    return apiClient.get(API_ENDPOINTS.connections.trackStatus(applicationNumber));
  },

  /**
   * Approve/Reject application (Officer)
   */
  processApplication: async (data: ApplicationActionRequest): Promise<ApiResponse> => {
    return apiClient.post('/connections/process', data);
  },
};

/**
 * Bill Service
 */
export const billService = {
  /**
   * Get list of bills
   */
  getBills: async (filters?: BillFilters): Promise<ApiResponse<WaterBill[]>> => {
    return apiClient.get(API_ENDPOINTS.bills.list, filters);
  },

  /**
   * Get my bills (for citizens)
   */
  getMyBills: async (params?: PaginationParams): Promise<ApiResponse<WaterBill[]>> => {
    return apiClient.get(API_ENDPOINTS.bills.myBills, params);
  },

  /**
   * Get single bill details
   */
  getBill: async (id: string): Promise<ApiResponse<WaterBill>> => {
    return apiClient.get(API_ENDPOINTS.bills.get(id));
  },

  /**
   * Generate bill for a connection
   */
  generateBill: async (connectionId: string): Promise<ApiResponse<WaterBill>> => {
    return apiClient.post(API_ENDPOINTS.bills.generate, { connectionId });
  },

  /**
   * Bulk generate bills
   */
  bulkGenerateBills: async (data: any): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.bills.bulkGenerate, data);
  },

  /**
   * Download bill PDF
   */
  downloadBill: async (id: string): Promise<void> => {
    return apiClient.downloadFile(API_ENDPOINTS.bills.download(id), `bill_${id}.pdf`);
  },
};

/**
 * Payment Service
 */
export const paymentService = {
  /**
   * Create payment
   */
  createPayment: async (data: BillPaymentRequest): Promise<ApiResponse<BillPaymentResponse>> => {
    return apiClient.post(API_ENDPOINTS.payments.create, data);
  },

  /**
   * Verify payment
   */
  verifyPayment: async (paymentId: string, transactionId: string): Promise<ApiResponse<Payment>> => {
    return apiClient.post(API_ENDPOINTS.payments.verify, { paymentId, transactionId });
  },

  /**
   * Get payment history
   */
  getPayments: async (params?: PaginationParams): Promise<ApiResponse<Payment[]>> => {
    return apiClient.get(API_ENDPOINTS.payments.list, params);
  },

  /**
   * Get single payment details
   */
  getPayment: async (id: string): Promise<ApiResponse<Payment>> => {
    return apiClient.get(API_ENDPOINTS.payments.get(id));
  },

  /**
   * Download payment receipt
   */
  downloadReceipt: async (id: string): Promise<void> => {
    return apiClient.downloadFile(API_ENDPOINTS.payments.receipt(id), `receipt_${id}.pdf`);
  },
};

/**
 * Meter Reading Service
 */
export const meterReadingService = {
  /**
   * Get meter readings
   */
  getReadings: async (connectionId: string): Promise<ApiResponse<MeterReading[]>> => {
    return apiClient.get(API_ENDPOINTS.readings.list, { connectionId });
  },

  /**
   * Submit meter reading
   */
  submitReading: async (data: MeterReadingRequest): Promise<ApiResponse<MeterReadingResponse>> => {
    return apiClient.post(API_ENDPOINTS.readings.create, data);
  },

  /**
   * Verify meter reading (Field Officer)
   */
  verifyReading: async (id: string, remarks: string): Promise<ApiResponse> => {
    return apiClient.post(API_ENDPOINTS.readings.verify(id), { remarks });
  },
};

/**
 * Grievance Service
 */
export const grievanceService = {
  /**
   * Get list of grievances
   */
  getGrievances: async (filters?: GrievanceFilters): Promise<ApiResponse<Grievance[]>> => {
    return apiClient.get(API_ENDPOINTS.grievances.list, filters);
  },

  /**
   * Create new grievance
   */
  createGrievance: async (data: GrievanceRequest): Promise<ApiResponse<GrievanceResponse>> => {
    return apiClient.post(API_ENDPOINTS.grievances.create, data);
  },

  /**
   * Get single grievance details
   */
  getGrievance: async (id: string): Promise<ApiResponse<Grievance>> => {
    return apiClient.get(API_ENDPOINTS.grievances.get(id));
  },

  /**
   * Update grievance
   */
  updateGrievance: async (id: string, data: Partial<Grievance>): Promise<ApiResponse<Grievance>> => {
    return apiClient.put(API_ENDPOINTS.grievances.update(id), data);
  },

  /**
   * Track grievance status
   */
  trackGrievance: async (grievanceNumber: string): Promise<ApiResponse<Grievance>> => {
    return apiClient.get(API_ENDPOINTS.grievances.track(grievanceNumber));
  },
};

/**
 * Field Task Service
 */
export const fieldTaskService = {
  /**
   * Get assigned tasks
   */
  getMyTasks: async (): Promise<ApiResponse<FieldTask[]>> => {
    return apiClient.get(API_ENDPOINTS.fieldTasks.myTasks);
  },

  /**
   * Get all tasks (for officers)
   */
  getAllTasks: async (filters?: any): Promise<ApiResponse<FieldTask[]>> => {
    return apiClient.get(API_ENDPOINTS.fieldTasks.list, filters);
  },

  /**
   * Get single task details
   */
  getTask: async (id: string): Promise<ApiResponse<FieldTask>> => {
    return apiClient.get(API_ENDPOINTS.fieldTasks.get(id));
  },

  /**
   * Update task status
   */
  updateTask: async (id: string, data: FieldTaskUpdate): Promise<ApiResponse<FieldTask>> => {
    return apiClient.put(API_ENDPOINTS.fieldTasks.update(id), data);
  },
};

/**
 * Report Service
 */
export const reportService = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async (role: string): Promise<ApiResponse<DashboardStats>> => {
    return apiClient.get(API_ENDPOINTS.reports.dashboard, { role });
  },

  /**
   * Get officer dashboard data
   */
  getOfficerDashboard: async (): Promise<ApiResponse<OfficerDashboardData>> => {
    return apiClient.get('/reports/officer-dashboard');
  },

  /**
   * Generate report
   */
  generateReport: async (data: ReportRequest): Promise<ApiResponse<ReportResponse>> => {
    return apiClient.post('/reports/generate', data);
  },

  /**
   * Get collection report
   */
  getCollectionReport: async (dateFrom: string, dateTo: string): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.reports.collection, { dateFrom, dateTo });
  },

  /**
   * Get connection report
   */
  getConnectionReport: async (dateFrom: string, dateTo: string): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.reports.connections, { dateFrom, dateTo });
  },

  /**
   * Get RTS compliance report
   */
  getRTSComplianceReport: async (dateFrom: string, dateTo: string): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.reports.rtsCompliance, { dateFrom, dateTo });
  },
};

/**
 * Property Tax Integration Service
 */
export const propertyTaxService = {
  /**
   * Search property by property number
   */
  searchProperty: async (propertyNumber: string): Promise<ApiResponse<PropertyTaxApiResponse>> => {
    return apiClient.post(API_ENDPOINTS.propertyTax.search, { propertyNumber });
  },

  /**
   * Get property details
   */
  getPropertyDetails: async (propertyNumber: string): Promise<ApiResponse<PropertyTaxApiResponse>> => {
    return apiClient.get(API_ENDPOINTS.propertyTax.getDetails(propertyNumber));
  },
};

/**
 * Master Data Service
 */
export const masterDataService = {
  /**
   * Get zones
   */
  getZones: async (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.masters.zones);
  },

  /**
   * Get wards
   */
  getWards: async (zoneId?: string): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.masters.wards, { zoneId });
  },

  /**
   * Get tariff slabs
   */
  getTariffs: async (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.masters.tariffs);
  },

  /**
   * Get RTS services
   */
  getRTSServices: async (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.masters.rtsServices);
  },
};

/**
 * File Upload Service
 */
export const fileService = {
  /**
   * Upload single file
   */
  uploadFile: async (file: File, type: string): Promise<ApiResponse<{ url: string; id: string }>> => {
    return apiClient.uploadFile(API_ENDPOINTS.files.upload, file, { type });
  },

  /**
   * Upload multiple files
   */
  uploadFiles: async (files: File[], type: string): Promise<ApiResponse<{ urls: string[]; ids: string[] }>> => {
    return apiClient.uploadFiles(API_ENDPOINTS.files.upload, files, { type });
  },
};

/**
 * Admin Service
 */
export const adminService = {
  /**
   * Get users
   */
  getUsers: async (params?: PaginationParams): Promise<ApiResponse<User[]>> => {
    return apiClient.get(API_ENDPOINTS.admin.users, params);
  },

  /**
   * Create user
   */
  createUser: async (data: any): Promise<ApiResponse<User>> => {
    return apiClient.post(API_ENDPOINTS.admin.users, data);
  },

  /**
   * Update user
   */
  updateUser: async (id: string, data: any): Promise<ApiResponse<User>> => {
    return apiClient.put(`${API_ENDPOINTS.admin.users}/${id}`, data);
  },

  /**
   * Get system configuration
   */
  getSystemConfig: async (): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.admin.systemConfig);
  },

  /**
   * Update system configuration
   */
  updateSystemConfig: async (data: any): Promise<ApiResponse> => {
    return apiClient.put(API_ENDPOINTS.admin.systemConfig, data);
  },

  /**
   * Get audit logs
   */
  getAuditLogs: async (params?: any): Promise<ApiResponse> => {
    return apiClient.get(API_ENDPOINTS.admin.auditLogs, params);
  },
};
